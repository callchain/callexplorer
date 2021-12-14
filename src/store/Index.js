import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const HOME_DATA_LIMIT = 6

const DEFAULT_LEDGERS = [
  {"feePool":"8.696481","baseFeeCALL":"0.00001","ledgerHash":"C3B637C6057EE68FE0F20CCDC4994575DD44C25A769FE5CB125FF7D2002CB4E9","ledgerVersion":25693250,"ledgerTimestamp":"2020-08-27T04:15:33.000Z","reserveBaseCALL":"0.000001","reserveIncrementCALL":"0.000001","transactionCount":0,"validatedLedgerVersions":"11874029-25693250"},
  {"feePool":"8.696481","baseFeeCALL":"0.00001","ledgerHash":"73FD1B215C9D1C989ABB7AE75FA5A26D36076E26229E4865AFDB99E7174808D9","ledgerVersion":25693249,"ledgerTimestamp":"2020-08-27T04:15:32.000Z","reserveBaseCALL":"0.000001","reserveIncrementCALL":"0.000001","transactionCount":0,"validatedLedgerVersions":"11874029-25693249"},
  {"feePool":"8.696481","baseFeeCALL":"0.00001","ledgerHash":"DFD5BBA47E5619CE40AD0881D952A07DBDF36A21659577378E86410BDACECE01","ledgerVersion":25693248,"ledgerTimestamp":"2020-08-27T04:15:31.000Z","reserveBaseCALL":"0.000001","reserveIncrementCALL":"0.000001","transactionCount":0,"validatedLedgerVersions":"11874029-25693248"},
  {"feePool":"8.696481","baseFeeCALL":"0.00001","ledgerHash":"A33ED2FAC8008BCCB44787AF0A236D620C10410FF854AFDAA12332A62E454583","ledgerVersion":25693247,"ledgerTimestamp":"2020-08-27T04:15:30.000Z","reserveBaseCALL":"0.000001","reserveIncrementCALL":"0.000001","transactionCount":0,"validatedLedgerVersions":"11874029-25693247"},
  {"feePool":"8.696481","baseFeeCALL":"0.00001","ledgerHash":"4AFBD67F9ED8818EDD43C91F639FED3C12285F84A275DDEDD8EA0948F408CC29","ledgerVersion":25693246,"ledgerTimestamp":"2020-08-27T04:15:22.000Z","reserveBaseCALL":"0.000001","reserveIncrementCALL":"0.000001","transactionCount":0,"validatedLedgerVersions":"11874029-25693246"},
  {"feePool":"8.696481","baseFeeCALL":"0.00001","ledgerHash":"5C0B2121A328D97A3BF9A0FBAE417D017E3A3CCA908178B344F2396BB54C7121","ledgerVersion":25693245,"ledgerTimestamp":"2020-08-27T04:15:21.000Z","reserveBaseCALL":"0.000001","reserveIncrementCALL":"0.000001","transactionCount":0,"validatedLedgerVersions":"11874029-25693245"}
]

const DEFAULT_TRANSACTIONS = [{"type":"payment","address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","sequence":12338,"id":"1438E9EBF436DD42F2A41C3C5A26CCF0A7A3F37E075550225F7477261E484DDC","specification":{"source":{"address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","maxAmount":{"currency":"CNY","value":"0.0000001","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}},"destination":{"address":"c4Yw28h6f5eYAat688vNX3CfijuH4dBiAi","amount":{"currency":"CNY","value":"0.0000001","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T01:19:10.000Z","fee":"0.000012","balanceChanges":{"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4":[{"currency":"CALL","value":"-0.000012"}],"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit":[{"counterparty":"c4Yw28h6f5eYAat688vNX3CfijuH4dBiAi","currency":"CNY","value":"-1e-7"}],"c4Yw28h6f5eYAat688vNX3CfijuH4dBiAi":[{"counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit","currency":"CNY","value":"1e-7"}]},"orderbookChanges":{},"ledgerVersion":27100094,"indexInLedger":5,"deliveredAmount":{"currency":"CNY","value":"0.0000001","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},{"type":"payment","address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","sequence":12337,"id":"DE6567B87A6B9EAE136DF755E9AF756A70C0B42EC71803B34360B12EC35451A1","specification":{"source":{"address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","maxAmount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}},"destination":{"address":"c4Yw28h6f5eYAat688vNX3CfijuH4dBiAi","amount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T01:19:10.000Z","fee":"0.000012","balanceChanges":{"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4":[{"currency":"CALL","value":"-0.000012"},{"counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit","currency":"TRD","value":"-100"}],"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit":[{"counterparty":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","currency":"TRD","value":"100"},{"counterparty":"c4Yw28h6f5eYAat688vNX3CfijuH4dBiAi","currency":"TRD","value":"-100"}],"c4Yw28h6f5eYAat688vNX3CfijuH4dBiAi":[{"counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit","currency":"TRD","value":"100"}]},"orderbookChanges":{},"ledgerVersion":27100094,"indexInLedger":4,"deliveredAmount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},{"type":"payment","address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","sequence":12336,"id":"F8E99884919D74E5A9C2760FB45E5C093C47F0DEB8EC03325CB70DDFC1270AF3","specification":{"source":{"address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","maxAmount":{"currency":"CALL","value":"0.1"}},"destination":{"address":"c4Yw28h6f5eYAat688vNX3CfijuH4dBiAi","amount":{"currency":"CALL","value":"0.1"}}},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T01:19:10.000Z","fee":"0.000012","balanceChanges":{"c4Yw28h6f5eYAat688vNX3CfijuH4dBiAi":[{"currency":"CALL","value":"0.1"}],"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4":[{"currency":"CALL","value":"-0.100012"}]},"orderbookChanges":{},"ledgerVersion":27100094,"indexInLedger":3,"deliveredAmount":{"currency":"CALL","value":"0.1"}}},{"type":"payment","address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","sequence":12334,"id":"F27F8CA901DDC8547CFC8EB68AFC0E6B398D342D4CC192A5A4C2BECE72FE5450","specification":{"source":{"address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","maxAmount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}},"destination":{"address":"cNmmTQgmGVekjUiojZSeVfpzVLNnmwTjNo","amount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T01:19:10.000Z","fee":"0.000012","balanceChanges":{"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit":[{"counterparty":"cNmmTQgmGVekjUiojZSeVfpzVLNnmwTjNo","currency":"TRD","value":"-100"},{"counterparty":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","currency":"TRD","value":"100"}],"cNmmTQgmGVekjUiojZSeVfpzVLNnmwTjNo":[{"counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit","currency":"TRD","value":"100"}],"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4":[{"currency":"CALL","value":"-0.000012"},{"counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit","currency":"TRD","value":"-100"}]},"orderbookChanges":{},"ledgerVersion":27100094,"indexInLedger":1,"deliveredAmount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},{"type":"payment","address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","sequence":12333,"id":"3C5835E21F592A4B15478FCD71038074B38884B4C81E6D90BFED4D3B8272D792","specification":{"source":{"address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","maxAmount":{"currency":"CALL","value":"0.1"}},"destination":{"address":"cNmmTQgmGVekjUiojZSeVfpzVLNnmwTjNo","amount":{"currency":"CALL","value":"0.1"}}},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T01:19:10.000Z","fee":"0.000012","balanceChanges":{"cNmmTQgmGVekjUiojZSeVfpzVLNnmwTjNo":[{"currency":"CALL","value":"0.1"}],"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4":[{"currency":"CALL","value":"-0.100012"}]},"orderbookChanges":{},"ledgerVersion":27100094,"indexInLedger":0,"deliveredAmount":{"currency":"CALL","value":"0.1"}}},{"type":"orderCancellation","address":"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP","sequence":289,"id":"15AB523801074DFA6A43F70E5B2581F9FC575D75C1B7D94B331E40F8D8CD6152","specification":{"orderSequence":286},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T01:13:01.000Z","fee":"0.000012","balanceChanges":{"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP":[{"currency":"CALL","value":"-0.000012"}]},"orderbookChanges":{"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP":[{"direction":"sell","quantity":{"currency":"CALL","value":"0.100001"},"totalPrice":{"currency":"CNY","counterparty":"cEJNrFNcTA6BxiSY6TKvtxT7Kg7vrVq9hz","value":"0.016910069099"},"sequence":286,"status":"cancelled","makerExchangeRate":"0.169099"}]},"ledgerVersion":27099972,"indexInLedger":0}},{"type":"issueSet","address":"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP","sequence":288,"id":"6CEB061DD5989DDDF4E787D7D32B2882BF6A23487332C8F418644BA951914F9C","specification":{"currency":"NEW","issuer":"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP","total":"1000","additional":false,"invoice":false},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T01:11:51.000Z","fee":"0.000012","balanceChanges":{"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP":[{"currency":"CALL","value":"-0.000012"}]},"orderbookChanges":{},"ledgerVersion":27099948,"indexInLedger":0}},{"type":"order","address":"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP","sequence":287,"id":"7804E5C18119E63223ED38106BCCD84CFC0C2E0775260D1EA986EF5BD6A8278D","specification":{"direction":"sell","quantity":{"currency":"CALL","value":"1"},"totalPrice":{"currency":"CNY","value":"0.169","counterparty":"cEJNrFNcTA6BxiSY6TKvtxT7Kg7vrVq9hz"}},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T01:10:00.000Z","fee":"0.000012","balanceChanges":{"cs2Fwu4CVoiCZtaH991PxWmKh64MaRFojJ":[{"counterparty":"cEJNrFNcTA6BxiSY6TKvtxT7Kg7vrVq9hz","currency":"CNY","value":"-0.169"},{"currency":"CALL","value":"1"}],"cEJNrFNcTA6BxiSY6TKvtxT7Kg7vrVq9hz":[{"counterparty":"cs2Fwu4CVoiCZtaH991PxWmKh64MaRFojJ","currency":"CNY","value":"0.169"},{"counterparty":"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP","currency":"CNY","value":"-0.169"}],"chkw6nVJ1g1APQ1vA5EX9ek5Vb4ZGrckwP":[{"currency":"CALL","value":"-1.000012"},{"counterparty":"cEJNrFNcTA6BxiSY6TKvtxT7Kg7vrVq9hz","currency":"CNY","value":"0.169"}]},"orderbookChanges":{"cs2Fwu4CVoiCZtaH991PxWmKh64MaRFojJ":[{"direction":"buy","quantity":{"currency":"CALL","value":"1"},"totalPrice":{"currency":"CNY","counterparty":"cEJNrFNcTA6BxiSY6TKvtxT7Kg7vrVq9hz","value":"0.1690000000000001"},"sequence":9,"status":"partially-filled","makerExchangeRate":"5.917159763313609"}]},"ledgerVersion":27099911,"indexInLedger":0}},{"type":"payment","address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","sequence":12332,"id":"084636C971932D7EFB2CFEBB2BF87D7004574BB99B530992FD9975A05E7AAB9D","specification":{"source":{"address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","maxAmount":{"currency":"CNY","value":"0.0000001","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}},"destination":{"address":"cPF5fbxkJQF2AGiJRf6PsYYBH71ii9ccDS","amount":{"currency":"CNY","value":"0.0000001","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T00:20:10.000Z","fee":"0.000012","balanceChanges":{"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4":[{"currency":"CALL","value":"-0.000012"}],"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit":[{"counterparty":"cPF5fbxkJQF2AGiJRf6PsYYBH71ii9ccDS","currency":"CNY","value":"-1e-7"}],"cPF5fbxkJQF2AGiJRf6PsYYBH71ii9ccDS":[{"counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit","currency":"CNY","value":"1e-7"}]},"orderbookChanges":{},"ledgerVersion":27098914,"indexInLedger":5,"deliveredAmount":{"currency":"CNY","value":"0.0000001","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},{"type":"payment","address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","sequence":12331,"id":"EBE4F0FC82909B054FEF182EA8FCFD23A9BC171DDD60AFEB5756766CF770CC5A","specification":{"source":{"address":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","maxAmount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}},"destination":{"address":"cPF5fbxkJQF2AGiJRf6PsYYBH71ii9ccDS","amount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}},"outcome":{"result":"tesSUCCESS","timestamp":"2020-10-15T00:20:10.000Z","fee":"0.000012","balanceChanges":{"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4":[{"currency":"CALL","value":"-0.000012"},{"counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit","currency":"TRD","value":"-100"}],"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit":[{"counterparty":"cPF5fbxkJQF2AGiJRf6PsYYBH71ii9ccDS","currency":"TRD","value":"-100"},{"counterparty":"cJm9pZBjckgA1zbr1ezFEhRdoCxBdajYH4","currency":"TRD","value":"100"}],"cPF5fbxkJQF2AGiJRf6PsYYBH71ii9ccDS":[{"counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit","currency":"TRD","value":"100"}]},"orderbookChanges":{},"ledgerVersion":27098914,"indexInLedger":4,"deliveredAmount":{"currency":"TRD","value":"100","counterparty":"cNCRTRQYzxrybd5cYZm89xS2siN2uo9eit"}}}]

export default new Vuex.Store({
  state: {
    api: new call.CallAPI({ server: 'wss://s1.callchain.cc:5020' }),
    status: {feePool: '0', baseFeeCALL: '0', reserveBaseCALL: '0', reserveIncrementCALL: '0'},
    height: 24997812,
    server: {host: 's1.callchain.cc', port: '5020', ssl: true},
    blocks: [],
    transactions: []
  },
  getters: {
    networkStatus(state) {
      return state.api.isConnected && state.api.isConnected()
    }
  },
  mutations: {
    initApi(state, api) {
      state.api = api
    },
    initBlocks(state, list) {
      state.blocks = list;
    },
    initTransactions(state, list) {
      state.transactions = list;
    },
    initStatus(state, ledger) {
      state.status.feePool = ledger.feePool;
      state.status.baseFeeCALL = ledger.baseFeeCALL;
      state.status.reserveBaseCALL = ledger.reserveBaseCALL;
      state.status.reserveIncrementCALL = ledger.reserveIncrementCALL;
    },
    updateLedger(state, ledger) {
      state.status.feePool = ledger.feePool;
      state.status.baseFeeCALL = ledger.baseFeeCALL;
      state.status.reserveBaseCALL = ledger.reserveBaseCALL;
      state.status.reserveIncrementCALL = ledger.reserveIncrementCALL;
      state.blocks.unshift(ledger);
      if (state.blocks.length > HOME_DATA_LIMIT) {
        state.blocks.pop();
      }
    },
    updateTransactions(state, tx) {
      state.transactions.unshift(tx);
      if (state.transactions.length > HOME_DATA_LIMIT) {
        state.transactions.pop();
      }
    }
  },
  actions: {
    initData(context, data) {
      var blk_list = data.blk_list;
      var tx_list = data.tx_list;
      blk_list = blk_list.length === 0 ? DEFAULT_LEDGERS : blk_list;
      tx_list = tx_list.length === 0 ? DEFAULT_TRANSACTIONS : tx_list;
      context.commit('initBlocks', blk_list.slice(0, 6));
      context.commit('initTransactions', tx_list.slice(0, 6));
      context.commit('initStatus', blk_list[0]);
    }
  },
  modules: {
  }
})
