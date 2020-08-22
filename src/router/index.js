import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from "firebase/app";

import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Question from '@/components/Question.vue'
import Game from '@/components/Game.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/question',
      name: 'question',
      component: Question
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: "*",
      redirect: "/",
    },
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let userLoggedIn = to.matched.some(record => record.meta.requiresAuth);

  if (userLoggedIn && !currentUser) {
    next('/login')
  }
  else next ()
})

export default router;