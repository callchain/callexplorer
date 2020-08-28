import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/Index'
import vuetify from './plugins/vuetify';
import * as filters from './filters/Index'

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default vue