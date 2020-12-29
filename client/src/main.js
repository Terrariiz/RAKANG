import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false

// Bootstrap-vue
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
// Bootstrap-vue
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

