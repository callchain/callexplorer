import store from '../store/Index';
import CreateApi from './Index';

export default function() {
    return new Promise((resolve, reject) => {
        // check connection status
        var api = store.state.api;
        var state = api.isConnected && api.isConnected();
        console.log('api connected?' + state);

        if (state) return resolve(true);

        var server = store.state.server;
        api = CreateApi(server)
        api.connect().then(function() {
            console.log('api connected');
            store.commit('initApi', api);
            resolve(true);
        }).catch(function(e) {
            console.log('fail to connect api: ');
            console.dir(e);
            resolve(false);
        });
    });
}

