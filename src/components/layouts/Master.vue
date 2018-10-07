<template>
  <div id="app">
    <nav id="navbar">
      <div class="nav-wrapper">
      <a class="brand-logo"><img id="logo" src="../../assets/dota2.svg"></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="isLoggedIn"><router-link :to="{ name: 'Themes' }">App</router-link></li>
        <li v-if="!isLoggedIn"><router-link :to="{ name: 'Login' }">Login</router-link></li>
        <li v-if="!isLoggedIn"><router-link :to="{ name: 'Register' }">Register</router-link></li>
        <li v-if="isLoggedIn"><button v-on:click="logout" class="btn" id="logout-btn">LOGOUT</button></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
    
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.go({path: this.$router.path})
      })
    }
  }
}
</script>

<style lang='scss'>
.nav-wrapper {
  background-color: #A52A2A;
}
#navbar {
  margin-bottom: 1em;
}
#logo {
  padding: 6px 10px;
  width: 50px;
  height: 65px;
}

#logout-btn {
  border: 1px solid #fff;
  border-radius: 50px;
  background-color: transparent;
  color: #fff;
  -webkit-box-shadow: none;
  box-shadow: none;
  margin-right: 10px;
  line-height: 0px;
  &:focus {
    background-color: #4682b4;
    color: #fff;
    box-shadow: none;
  }
  &:hover {
    background-color: #FFF;
    color: #A52A2A;
    box-shadow: none;
  }
}
</style>