<template>
  <section class="settings">
    <header class="main">
      <router-link to="Expenses"><i class="icon-left left"></i></router-link>
      <h3>Settings</h3>
    </header>

    <div class="content">

      <SaveableInput label="Name" :value="name" v-on:onSaveValue="saveName"></SaveableInput>

      <SaveableInput label="E-mail" :value="email" v-on:onSaveValue="saveEmail"></SaveableInput>

      <SaveableInput label="Currency" :value="currency" :options="currencies" v-on:onSaveValue="saveCurrency"></SaveableInput>

      <footer>
        <p class="version">Version: 1.0.0</p>
        <div class="btn" @click="logout">Logout</div>
      </footer>
    </div>
    <div class="error-popup" v-bind:class="{ show: showError }">{{currentError}}</div>
  </section>
</template>

<script>
import firebase from 'firebase';
import SaveableInput from './SaveableInput';

export default {
  name: 'Settings',
  components: {
    SaveableInput,
  },
  data() {
    return {
      email: '',
      name: '',
      currency: '',
      currencies: [
        { name: 'EUR', value: '€' },
        { name: 'USD', value: '$' },
        { name: 'JPY', value: '¥' },
        { name: 'GBP', value: '£' },
        { name: 'AUD', value: 'A$' },
        { name: 'CAD', value: 'C$' },
        { name: 'CHF', value: 'Fr' },
        { name: 'CNY', value: '£' },
        { name: 'SEK', value: 'kr' },
        { name: 'NZD', value: 'NZ$' },
        { name: 'MXN', value: '$' },
        { name: 'SGD', value: 'S$' },
        { name: 'HKD', value: 'HK$' },
        { name: 'NOK', value: 'kr' },
        { name: 'KRW', value: '₩' },
        { name: 'TRY', value: '₺' },
        { name: 'RUB', value: '₽' },
        { name: 'INR', value: '₹' },
        { name: 'BRL', value: 'R$' },
        { name: 'ZAR', value: 'R' },
      ],
      currentError: 'TEST',
      showError: false,
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      });
    },
    saveName(newName) {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: newName,
      }).then(() => {
        this.name = newName;
      });
    },
    saveEmail(email) {
      const user = firebase.auth().currentUser;
      user.updateEmail(email).then(() => {
        this.email = email;
      }).catch((error) => {
        this.currentError = error.message;
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3500);
      });
    },
    saveCurrency(currency) {
      window.localStorage.setItem('currency', currency);
      this.currency = currency;
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
        this.name = user.displayName;
      }
    });
    this.currency = window.localStorage.getItem('currency') || '€';
  },
};
</script>

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    text-align: left;
  }
  header.main {
    position: initial;
  }
  header.main i {
    font-size: 32px;
    margin: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 60px);
    padding-top: 10px;
  }

  label {
    padding: 0 10px;
  }

  input {
    padding: 0 10px;
  }

  .btn.save {
    margin-top: 50px;
  }

  .version {
    font-size: .8em;
    text-align: center;
  }

  footer {
    margin-top: auto;
  }
</style>

