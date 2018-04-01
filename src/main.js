import Vue from 'vue';
import router from './router';
import VeeValidate from 'vee-validate';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VeeValidate, { inject: false });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
