import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import './firebase.js'
import 'firebase/auth'

import VueFirestore from 'vue-firestore'
import App from './App.vue'
import router from '@/router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});
firebase.auth().languageCode = 'en';

const store = new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    set_user(state, new_user) {
      state.user = new_user;
    },
    set_error(state, new_error) {
      state.error = new_error;
    }
  },
  actions: {
    register(context, data) {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(response => {
        console.log(response)
        firebase.auth().currentUser.updateProfile({
          displayName: data.name
        })
      })
      .then(response => {
        console.log(response)
        context.commit('set_error_register', null);
        context.commit('set_user', {email: data.email, displayName: data.name});
        router.push('/home');
      })
      .catch(error => {
        context.commit('set_error_register', error.message);
        context.commit('set_user', null);
      })
    },
    login(context, data) {
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(function (response) {
        console.log(response);
        console.log(data.email);
        var name = firebase.auth().currentUser.displayName;
          context.commit('set_error', null);
          context.commit('set_user',{email: data.email, name: name});
          router.push('/home');
      })
      .catch(function(error) {
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      })
    },
    home() {
      router.push('/home');
    },
    toregister() {
      router.push('/register');
    },
    tologin() {
      router.push('/');
    },
    question() {
      router.push('/question');
    },
    logout(context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('set_error', null);
        context.commit('set_user', null);
        router.push('/');
      })
    },
    play() {
      router.push('/game');
    },
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')