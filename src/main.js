import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './routes'
import router from './router'
import Master from './components/layouts/Master'
import {store} from './store/store'

window.eventBus = new Vue()

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  components: { Master },
  template: '<Master/>'
})
