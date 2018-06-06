import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../components/pages/Main.vue'),
    },
    {
      path: '/user',
      component: () => import('../components/pages/User.vue'),
    },
    {
      path: '/donate',
      component: () => import('../components/pages/Donate.vue'),
    },
    {
      path: '/add-card',
      component: () => import('../components/pages/CardAdd.vue'),
    },
  ],
});
