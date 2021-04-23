import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    DeviceDesk: true,
    Admintoken: localStorage.getItem('admin_token'),
    Usertoken: localStorage.getItem('user_token'),
    AdminIsLog: localStorage.getItem('admin_token') || false,
    UserIsLog: localStorage.getItem('user_token') || false,
    banana: [
      {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
      },
      {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
      },
      {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
      },
      {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
      },
      {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
      },
      {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
      },
      {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
      },
      {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
      },
      {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
      },
      {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
      }
  ]
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
    },
    banana(state){
      return state.banana
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
