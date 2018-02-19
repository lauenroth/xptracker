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

      <a @click="changePasswordForm">Need to change your password?</a>

      <footer>
        <p class="version">Version: 1.0.0</p>
        <div class="btn" @click="logout">Logout</div>
      </footer>
    </div>
    <form class="change-email" v-if="showConfirmPassword" v-on:submit.prevent="onConfirmEmailChange">
      <div>
        <label>Confirm with password</label>
        <input type="password" v-model="currentPassword" autocomplete="current-password" minlength="6" required>
        <div class="buttons">
          <div class="btn cancel" @click="hideConformEmailChange">Cancel</div>
          <button type="submit">Change e-mail</button>
        </div>
      </div>
    </form>
    <form class="change-password" v-if="showChangePassword" v-on:submit.prevent="onChangePassword">
      <div>
        <label>Current password</label>
        <input type="password" v-model="currentPassword" autocomplete="current-password" minlength="6" required>
        <label>New password</label>
        <input type="password" v-model="newPassword" autocomplete="new-password" minlength="6" required>
        <div class="buttons">
          <div class="btn cancel" @click="hideChangePasswordForm">Cancel</div>
          <button type="submit">Change password</button>
        </div>
      </div>
    </form>
    <div class="error-popup" v-bind:class="{ show: showError }">{{currentError}}</div>
    <InfoPopup :message="infoMessage"></InfoPopup>
  </section>
</template>

<script>
import firebase from 'firebase';
import SaveableInput from './SaveableInput';
import InfoPopup from './InfoPopup';

export default {
  name: 'Settings',
  components: {
    InfoPopup,
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
      currentPassword: '',
      infoMessage: 'Password has been changed',
      newPassword: '',
      newEmail: '',
      showError: false,
      showInfo: true,
      showChangePassword: false,
      showConfirmPassword: false,
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
        this.infoMessage = 'Name has been updated';
      });
    },
    saveEmail(email) {
      this.showConfirmPassword = true;
      this.newEmail = email;
    },
    hideConformEmailChange() {
      this.currentPassword = '';
      this.showConfirmPassword = false;
    },
    onConfirmEmailChange() {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.email,
        this.currentPassword,
      );

      user.reauthenticateWithCredential(credential).then(() => {
        user.updateEmail(this.newEmail).then(() => {
          this.infoMessage = 'E-mail has been updated';
          this.showConfirmPassword = false;
          this.currentPassword = '';
        }).catch((error) => {
          this.currentError = error.message;
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3500);
        });
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
      this.infoMessage = 'Currency has been updated';
    },
    changePasswordForm() {
      this.showChangePassword = true;
    },
    hideChangePasswordForm() {
      this.currentPassword = '';
      this.newPassword = '';
      this.showChangePassword = false;
    },
    onChangePassword() {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.email,
        this.currentPassword,
      );

      user.reauthenticateWithCredential(credential).then(() => {
        user.updatePassword(this.newPassword).then(() => {
          this.showChangePassword = false;
          this.currentPassword = '';
          this.newPassword = '';
          this.infoMessage = 'Password has been updated';
        }).catch((error) => {
          this.currentError = error.message;
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3500);
        });
      }).catch((error) => {
        this.currentError = error.message;
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3500);
      });
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

  a {
    text-align: center;
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

  form {
    background-color: rgba(0, 25, 61, .9);
    bottom: 0;
    display: flex;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 20;
  }
  form > div {
    background: #fff;
    margin: auto;
    width: 320px;
  }
  form label,
  form input {
    box-sizing: border-box;
    display: block;
    margin: 0;
    padding: 0 10px;
  }
  form label {
    margin-top: 10px;
  }
  .buttons button {
    float: left;
    width: 66%;
  }
  .buttons .cancel {
    background-color:#aaa;
    float: left;
    width: 34%;
  }
</style>

