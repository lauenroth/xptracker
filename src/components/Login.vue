<template>
  <form v-on:submit.prevent="login">
    <header class="main">
      <h3>Sign in</h3>
    </header>
    <div class="content">
      <label for="email">E-mail</label>
      <input type="email" id="email" v-model="email" required autocomplete="email">

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required autocomplete="current-password">

      <p>You don't have an account yet?<br><router-link to="/sign-up">Create a new one</router-link></p>
      <button type="submit">Sign in</button>
    </div>
    <div class="error-popup" v-bind:class="{ show: showError }">{{currentError}}</div>
  </form>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      currentError: '',
      showError: false,
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        () => {
          this.$router.replace('expenses');
        },
        (error) => {
          this.currentError = error.message;
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3500);
        },
      );
    },
  },
};
</script>

<style scoped>
form {
  min-height: initial;
}
 .content {
   display: flex;
   flex-direction: column;
   margin-top: 50px;
   min-height: calc(100vh - 50px);
 }
 label {
   margin: 0 10px;
   text-align: left;
 }
 label:first-child {
   margin-top: 10px;
 }
 input {
   padding: 0 10px;
 }
 p {
   line-height: 2em;
   margin-top: auto;
 }
 a {
   border-bottom: 1px solid #00193D;
   color: #00193D;
   text-decoration: none;
 }
 button {
   cursor: pointer;
   margin-top: auto;
 }
</style>
