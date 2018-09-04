import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import api from './modules/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters,
  mutations,
  actions,
  modules: {
    api
  }
})
