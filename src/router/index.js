import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Login from '../components/Login'


Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/',
      name: 'Themes',
      component: App 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})