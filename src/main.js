import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import Master from './components/layouts/Master'
import {store} from './store/store'
import firebase from 'firebase'
import './firebase.js'

window.eventBus = new Vue()

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { Master },
      template: '<Master/>'
    })
  }
});

Vue.use(VueRouter)