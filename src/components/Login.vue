<template>
 <form v-on:submit="login">
   <h3>Sign in</h3>
   <input type="email" placeholder="Email" v-model="email"><br>
   <input type="password" placeholder="Password" v-model="password"><br>
   <button type="submit">Sign in</button>
   <p>You don't have an account yet? You can <router-link to="/sign-up">create one</router-link></p>
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
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          // eslint-disable-next-line no-console
          console.log(user);
          this.$router.replace('expenses');
        },
        (error) => {
          // eslint-disable-next-line
          alert('Oops! ' + error.message);
        },
      );
    },
  },
};
</script>

<style scoped>
 form {
   margin-top: 40px;
 }
 input {
   margin: 10px 0;
   padding: 15px;
   width: 20%;
 }
 button {
   cursor: pointer;
   margin-top: 20px;
   width: 10%; 
 }
</style>
