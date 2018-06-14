import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import VueMDCAdapter from 'vue-mdc-adapter';

Vue.config.productionTip = false;

Vue.use(VueMDCAdapter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
});
