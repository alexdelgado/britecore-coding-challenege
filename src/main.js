import Vue from 'vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VeeValidate, { inject: false });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
