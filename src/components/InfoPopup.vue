<template>
  <div class="info-popup" v-bind:class="{ show: showPopup }">{{ message }}</div>
</template>

<script>
export default {
  name: 'InfoPopup',
  props: ['message'],
  data() {
    return {
      showPopup: false,
    };
  },
  watch: {
    message() {
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 3500);
    },
  },
};
</script>

<style scoped>
  .info-popup {
   background-color: rgb(0, 61, 25);
   top: -150px;
   color: #fff;
   left: 0;
   line-height: 30px;
   padding: 10px;
   position: fixed;
   right: 0;
   text-align: center;
   transition: .3s top;
   z-index: 30;
 }
 .info-popup.show {
   top: 0;
 }
</style>