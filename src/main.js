// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Vant from 'vant'
// import 'vant/lib/vant-css/index.css'
// Vue.use(Vant)
import { Button, Row, Col, Swipe, SwipeItem, Lazyload, List, NavBar, Field, Tab, Tabs, PullRefresh, Stepper, Tabbar, TabbarItem } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Field).use(Tab)
  .use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
