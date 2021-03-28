import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    DeviceDesk: true,
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
    },
    IsDesk(state){
      return state.DeviceDesk
    }
  },
  mutations: {
    DeviceIsMob(state){
      state.DeviceDesk = false
    },
    DeviceIsDesk(state){
      state.DeviceDesk = true
    },
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
    },
    DeviceIsMobile(context){
      context.commit('DeviceIsMob')
    },
    DeviceIsDesktop(context){
      context.commit('DeviceIsDesk')
    },
  },
  modules: {
  }
})
