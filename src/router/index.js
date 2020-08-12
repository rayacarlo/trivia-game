import Vue from 'vue';
import VueRouter from 'vue-router';

import Auth from '@/components/Auth.vue'
import Home from '@/components/Home.vue'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})