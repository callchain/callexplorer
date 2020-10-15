import store from '../store/Index';
// import Parser from './transaction-parser';
import vue from '../main';

export default function(server) {
    const url = (server.ssl ? 'wss://' : 'ws://') + server.host + ':' + server.port;
    var api = new call.CallAPI({
        server: url
    });

    api.on('error', function(code, msg) {
        vue.$toast.error('call connection error, code=' + code + ', msg=' + msg);
        console.log('call connection error, code=' + code + ', msg=' + msg);
    });
    
    api.on('connected', function() {
        vue.$toast.success('Server Connected');
        console.log('connect it');
    });
    
    api.on('disconnected', function() {
        vue.$toast.warning('Server Disconnected');
        console.log('server disconnect');
    });

    api.on('ledger', function(ledger) {
        store.commit('updateLedger', ledger);
    });
    
    api.on('transactions', async function(tx) {
        var data = await api.getTransaction(tx.transaction.hash);
        console.log(JSON.stringify(data));
        store.commit('updateTransactions', data);
    });

    return api;
}

