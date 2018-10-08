<template>
  <!-- <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel black-text center">
            <h3>Register</h3>
            <form action="index.html">
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="email" id="email" v-model="email">
                <label for="email">Email Address</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" id="password" v-model="password">
                <label for="password">Password</label>
              </div>
              <button v-on:click="register" class="btn" id="register-btn">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <div class="login">
    <div class="login-screen">
      <div class="app-title">
        <h1>Register</h1>
      </div>

      <div class="login-form">
        <div class="control-group">
        <input type="text" class="login-field" value="" placeholder="Email" id="login-name" v-model="email">
        <label class="login-field-icon fui-user" for="login-name"></label>
        </div>

        <div class="control-group">
        <input type="password" class="login-field" value="" placeholder="Password" id="login-pass" v-model="password">
        <label class="login-field-icon fui-lock" for="login-pass"></label>
        </div>

        <a v-on:click="register" class="btn" id="login-btn">Register</a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register(e) {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // alert(`Account created for ${user.email}`);
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

input, label, i {
   -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}

#register-btn {
  border: 1px solid #4682b4;
  border-radius: 50px;
  background-color: transparent;
  color: #4682b4;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 21px;
  display: block;
  width: 250px;
  line-height: 45px;
  height: 50px;
  margin: 0 auto;
  margin-top: 40px;
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

.login {
margin: 20px auto;
width: 400px;
}
.login-screen {
  background-color: #FFF;
  padding: 1px 50px 55px 50px;
  border-radius: 5px
}

.app-title {
text-align: center;
color: #777;
}

.login-form {
text-align: left;
}
.control-group {
margin-bottom: 10px;
}

input {
text-align: left;
background-color: #ECF0F1;
border: 2px solid transparent;
border-radius: 3px;
font-size: 16px;
font-weight: 200;
padding: 10px 0;
width: 250px;
transition: border .5s;
}

input:focus {
border: 2px solid #3498DB;
box-shadow: none;
}

.login-link {
  font-size: 12px;
  color: #444;
  display: block;
	margin-top: 12px;
}

input[type=text]:not(.browser-default):focus:not([readonly]), 
input[type=password]:not(.browser-default):focus:not([readonly]) {
  border-bottom: 1px solid #4682b4;
  -webkit-box-shadow: 0 1px 0 0 #4682b4;
  box-shadow: 0 1px 0 0 #4682b4;
  color: black;
}

</style>
