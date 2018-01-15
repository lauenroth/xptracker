<template>
  <section class="settings">
    <header class="main">
      <router-link to="Expenses"><i class="icon-left left"></i></router-link>
      <h3>Settings</h3>
    </header>

    <div>Version: 1.0.0</div>

    <div class="btn">Logout</div>
  </section>
</template>

<script>
export default {
  name: 'Settings',
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

  .btn {
    margin-top: auto;
  }
</style>

