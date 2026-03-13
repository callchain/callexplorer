/**
 * Call-Core API Wrapper for callexplorer
 * Provides a compatibility layer between call-core-lib and the old call-lib API
 */

import { WebSocketClient, RpcClient, parseBalanceChanges, parseOrderbookChanges } from '@callchain/call-core-lib';
import EventEmitter from 'events';

/**
 * CallAPI - WebSocket-based API client compatible with legacy call-lib API
 */
export class CallAPI extends EventEmitter {
  constructor(options = {}) {
    super();
    this.server = options.server;
    this.wsClient = null;
    this.rpcClient = null;
    this._isConnected = false;
    this._ledgerVersion = 0;
    this.subscriptions = new Set();
  }

  /**
   * Connect to the Call-Core server
   */
  async connect() {
    if (this._isConnected) return;

    const wsUrl = this.server.replace(/^http/, 'ws');

    this.wsClient = new WebSocketClient({
      url: wsUrl,
      reconnect: true,
      reconnectDelay: 5000,
      maxReconnectAttempts: 10,
    });

    // Set up event handlers
    this.wsClient.ws.onopen = () => {
      this._isConnected = true;
      this.emit('connected');
    };

    this.wsClient.ws.onclose = () => {
      this._isConnected = false;
      this.emit('disconnected');
    };

    this.wsClient.ws.onerror = (error) => {
      this.emit('error', 'websocket', error.message);
    };

    await this.wsClient.connect();

    // Subscribe to ledger stream by default
    this.wsClient.onLedger((message) => {
      this._ledgerVersion = message.ledger_index || message.ledger_index;
      this.emit('ledger', this._formatLedger(message));
    });

    // Subscribe to transaction stream
    this.wsClient.onTransaction((message) => {
      this.emit('transactions', this._formatTransaction(message));
    });

    // Create RPC client for REST calls
    const rpcUrl = this.server.replace(/^ws/, 'http');
    this.rpcClient = new RpcClient({ server: rpcUrl });
  }

  /**
   * Disconnect from the server
   */
  async disconnect() {
    if (this.wsClient) {
      await this.wsClient.disconnect();
      this._isConnected = false;
    }
  }

  /**
   * Check if connected
   */
  isConnected() {
    return this._isConnected && this.wsClient?.isConnected();
  }

  /**
   * Get server info
   */
  async getServerInfo() {
    return this.rpcClient.serverInfo();
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash) {
    const result = await this.rpcClient.tx({ transaction: hash });
    return this._formatTxResult(result);
  }

  /**
   * Get transactions for an account
   */
  async getTransactions(address, options = {}) {
    const result = await this.rpcClient.accountTx({
      account: address,
      limit: options.limit || 20,
      marker: options.marker,
    });

    return {
      transactions: result.transactions.map(tx => this._formatTxResult(tx)),
      marker: result.marker,
    };
  }

  /**
   * Get account info
   */
  async getAccountInfo(address) {
    return this.rpcClient.accountInfo({ account: address });
  }

  /**
   * Get account balances
   */
  async getBalances(address) {
    const result = await this.rpcClient.accountLines({ account: address });
    const balances = [{ currency: 'CALL', value: '0' }];

    if (result.lines) {
      result.lines.forEach(line => {
        balances.push({
          currency: line.currency,
          counterparty: line.account,
          value: line.balance,
        });
      });
    }

    return balances;
  }

  /**
   * Get ledger
   */
  async getLedger(options = {}) {
    return this.rpcClient.ledger({
      ledger_hash: options.ledgerHash,
      ledger_index: options.ledgerVersion || 'validated',
      transactions: options.transactions || false,
      expand: options.expand || false,
    });
  }

  /**
   * Get current ledger version
   */
  getLedgerVersion() {
    return this._ledgerVersion;
  }

  /**
   * Format ledger message
   */
  _formatLedger(message) {
    return {
      ledgerVersion: message.ledger_index,
      ledgerHash: message.ledger_hash,
      closeTime: message.close_time,
      txnCount: message.txn_count,
    };
  }

  /**
   * Format transaction message from WebSocket
   */
  _formatTransaction(message) {
    return {
      transaction: {
        hash: message.transaction?.hash || message.transaction?.tx_id,
        account: message.transaction?.account,
        type: message.transaction?.transaction_type,
      },
      meta: message.meta || message.metadata,
      ledger_index: message.ledger_index,
      validated: message.validated,
    };
  }

  /**
   * Format transaction result from RPC
   */
  _formatTxResult(result) {
    const tx = result.tx || result.transaction || result;
    const meta = result.meta || result.metadata || {};

    // Parse balance changes
    const balanceChanges = parseBalanceChanges(meta);

    // Parse orderbook changes
    const orderbookChanges = parseOrderbookChanges(meta);

    return {
      id: tx.hash,
      address: tx.account,
      type: (tx.transaction_type || 'unknown').toLowerCase(),
      outcome: {
        result: meta.TransactionResult || 'tesSUCCESS',
        ledgerVersion: result.ledger_index || tx.ledger_index,
        indexInLedger: meta.TransactionIndex,
        timestamp: new Date((tx.date || Date.now()) * 1000).toISOString(),
        fee: (tx.fee || tx.Fee || '0'),
        balanceChanges: balanceChanges,
        orderbookChanges: orderbookChanges,
      },
      specification: this._extractSpecification(tx),
    };
  }

  /**
   * Extract transaction specification
   */
  _extractSpecification(tx) {
    const type = tx.transaction_type;

    switch (type) {
      case 'Payment':
        return {
          source: {
            address: tx.account,
            maxAmount: tx.amount ? this._formatAmount(tx.send_max || tx.amount) : undefined,
          },
          destination: {
            address: tx.destination,
            amount: tx.amount ? this._formatAmount(tx.amount) : undefined,
          },
          paths: tx.paths,
          memos: tx.memos,
        };

      case 'TrustSet':
        return {
          currency: tx.limit_amount?.currency,
          counterparty: tx.limit_amount?.issuer,
          limit: tx.limit_amount?.value,
        };

      case 'OfferCreate':
        return {
          direction: 'buy',
          quantity: tx.taker_gets ? this._formatAmount(tx.taker_gets) : undefined,
          totalPrice: tx.taker_pays ? this._formatAmount(tx.taker_pays) : undefined,
        };

      case 'OfferCancel':
        return {
          orderSequence: tx.offer_sequence,
        };

      case 'AccountSet':
        return {
          domain: tx.domain,
          emailHash: tx.email_hash,
          messageKey: tx.message_key,
          setFlag: tx.set_flag,
          clearFlag: tx.clear_flag,
        };

      default:
        return {};
    }
  }

  /**
   * Format amount value
   */
  _formatAmount(amount) {
    if (typeof amount === 'string') {
      return { currency: 'CALL', value: amount };
    }
    return {
      currency: amount.currency,
      value: amount.value,
      counterparty: amount.issuer,
    };
  }
}

export default CallAPI;
