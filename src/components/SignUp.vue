<template>
 <form v-on:submit="signUp">
   <h3>Sign up</h3>
   <input type="email" v-model="email" placeholder="Email"><br>
   <input type="password" v-model="password" placeholder="Password"><br>
   <button type="submit">Sign up</button>
   <p>Already have an account? Go back to <router-link to="/login">login</router-link></p>
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
    };
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          // eslint-disable-next-line no-console
          console.log(user);
          this.$router.replace('expenses');
        },
        (error) => {
          // eslint-disable-next-line
          alert('Oops. ' + error.message);
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
   width: 80%;
 }
 button {
   cursor: pointer;
   margin-top: 20px;
 }
</style>
