<template>
  <form v-on:submit.prevent="signUp">
    <header class="main">
      <h3>Create new account</h3>
    </header>
    <div class="content">
      <label for="email">E-mail</label>
      <input type="email" v-model="email" id="email" required autocomplete="email">

      <label for="password">Password</label>
      <input type="password" v-model="password" id="password" placeholder="at least 6 characters" minlength="6" required autocomplete="new-password">
      <p>Already have an account?<br><router-link to="/login">Go back to login</router-link></p>
      <button type="submit">Sign up</button>
    </div>
    <div class="error-popup" v-bind:class="{ show: showError }">{{currentError}}</div>
  </form>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'signUp',
  data() {
    return {
      email: '',
      password: '',
      currentError: '',
      showError: false,
    };
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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
