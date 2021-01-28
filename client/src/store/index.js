import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Admintoken: localStorage.getItem('admin_token'),
    Usertoken: localStorage.getItem('user_token'),
    AdminIsLog: localStorage.getItem('admin_token') || false,
    UserIsLog: localStorage.getItem('user_token') || false
  },
  getters:{
    AdminIsLoggedIn(state){
      return state.AdminIsLog
    },
    UserIsLoggedIn(state){
      return state.UserIsLog
    }
  },
  mutations: {
    AdminLogin(state){
      state.AdminIsLog = true      
    },
    UserLogin(state){
      state.UserIsLog = true
    },
    AdminLogout(state){
      state.AdminIsLog = false
      state.Admintoken = ''
    },
    UserLogout(state){
      state.UserIsLog = false
      state.Usertoken = ''
    }

  },
  actions: {
    AdminLoggedIn(context){
      context.commit('AdminLogin')
    },
    UserLoggedIn(context){
      context.commit('UserLogin')
    },
    AdminLoggedOut(context){
      context.commit('AdminLogout')
    },
    UserLoggedOut(context){
      context.commit('UserLogout')
    }
  },
  modules: {
  }
})
