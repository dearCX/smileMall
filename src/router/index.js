import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import ShoppingMall from '@/pages/ShoppingMall'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Goods from '@/pages/Goods'
import CategoryList from '@/pages/CategoryList'
import Cart from '@/pages/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
        },
        {
          path: '/categoryList',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }
  ]
})
