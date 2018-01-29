<template>
  <form v-on:submit.prevent="signUp">
    <header class="main">
      <h3>Create new account</h3>
    </header>
    <div class="content">
      <input type="email" v-model="email" placeholder="Email" required autocomplete="email"><br>
      <input type="password" v-model="password" placeholder="Password" required autocomplete="new-password"><br>
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
 .content {
   display: flex;
   flex-direction: column;
   margin-top: 50px;
   min-height: calc(100vh - 50px);
 }
 input {
   margin: 10px auto;
   padding: 15px;
   width: 80%;
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
 .error-popup {
   background-color: crimson;
   color: #fff;
   left: 0;
   line-height: 30px;
   padding: 10px;
   position: fixed;
   right: 0;
   top: -100px;
   transition: .3s top;
   z-index: 30;
 }
 .error-popup.show {
   top: 0;
 }
</style>
