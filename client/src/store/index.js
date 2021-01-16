import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Admintoken: localStorage.getItem('admin_token'),
    Usertoken: localStorage.getItem('user_token')
  },
  getters:{
    AdminIsLoggedIn(state){
      return !!state.Admintoken
    },
    UserIsLoggedIn(state){
      return !!state.Usertoken
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
