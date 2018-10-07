<template>
<div class="row">
  <div class="col s12 m8 offset-m2">
    <div class="login card-panel black-text center">
      <h3>Login</h3>
      <form>
        <div class="input-field">
          <i class="material-icons prefix">email</i>
          <input type="text" id="email" v-model="email">
          <label for="email">Email</label>
        </div>
        <div class="input-field">
          <i class="material-icons prefix">lock</i>
          <input type="password" id="password" v-model="password">
          <label for="password">Password</label>
        </div>
        <button v-on:click="login" class="btn" id="login-btn">Login</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login(e) {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // alert(`You are logged in as: ${user.email}`);
        this.$router.go({path: this.$router.path})
      },
      err => {
        alert(err.message)
      })
      
      e.preventDefault();
    }
  }
}
</script>

<style lang='scss'>
body {
  background-color: #2a3a4a;
}
.card-panel {
  width: 500px;
  margin: 0 auto;
}

input, label, i {
   -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}

#login-btn {
  border: 1px solid #4682b4;
  border-radius: 50px;
  background-color: transparent;
  color: #4682b4;
  -webkit-box-shadow: none;
  box-shadow: none;
  margin-right: 10px;
  &:focus {
    background-color: #4682b4;
    color: #fff;
    box-shadow: none;
  }
  &:hover {
    background-color: #4682b4;
    color: #fff;
    box-shadow: none;
  }
}
</style>
