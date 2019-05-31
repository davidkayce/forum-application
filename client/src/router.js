import Vue from 'vue'
import Router from 'vue-router'
import Rest from './views/rest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Rest
    },
    {
      path: '/graph',
      name: 'graph',
      component: () => import(/* webpackChunkName: "about" */ './views/graphQL')
    }
  ]
})
