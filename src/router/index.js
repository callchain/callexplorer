import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/block/:height',
    name: 'Block',
    component: () => import(/* webpackChunkName: "about" */ '../views/Block.vue')
  },
  {
    path: '/account/:address',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  },
  {
    path: '/transaction/:hash',
    name: 'Transaction',
    component: () => import(/* webpackChunkName: "about" */ '../views/Transaction.vue')
  },
  {
    path: '/token/:issue',
    name: 'Token',
    component: () => import(/* webpackChunkName: "about" */ '../views/Token.vue')
  },
  {
    path: '*',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
