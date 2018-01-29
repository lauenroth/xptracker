<template>
  <section class="settings">
    <header class="main">
      <router-link to="Expenses"><i class="icon-left left"></i></router-link>
      <h3>Settings</h3>
    </header>

    <div class="content">

      <footer>
        <p class="version">Version: 1.0.0</p>
        <div class="btn" @click="logout">Logout</div>
      </footer>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Settings',
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      });
    },
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
    min-height: calc(100vh - 50px);
  }

  .version {
    font-size: .8em;
    text-align: center;
  }

  footer {
    margin-top: auto;
  }
</style>

