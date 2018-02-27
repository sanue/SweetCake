import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import home from '@/views/home'
import login from '@/views/login'
import register from '@/views/register'
import cart from '@/views/cart'
import center from '@/views/center'
import star from '@/views/star'
import about from '@/views/about'
import proDetails from '@/views/proDetails'
import orderList from '@/views/orderList'
//后台
import adminHome from '@/views/admin/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path:'/',
      name:'home',
      component:home
    },
    {
      path: '/pro',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/center',
      name: 'center',
      component: center
    },
    {
      path: '/star',
      name: 'star',
      component: star
    },
    {
      path: '/proDetails',
      name: 'proDetails',
      component: proDetails
    },
    {
      path: '/404',
      name: '404',
      component: 404
    },
    {
      path: '/admin/home',
      name:'adminHome',
      component:adminHome
    }
    ,
    {
      path:'/orderList',
      name:'orderList',
      component:orderList
    }
  ]
})
