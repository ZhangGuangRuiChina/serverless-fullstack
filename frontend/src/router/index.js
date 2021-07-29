import Vue from 'vue';
import Router from 'vue-router'
import layout from '@/layout'
Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/itemPage'
  },
  {
    path: '/itemPage',
    component: () => import('@/view/itemPage')
  },
  {
    path: '/home',
    component: layout
  }
]
export default new Router({
  routes
})