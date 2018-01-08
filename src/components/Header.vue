<template>
  <header>
    <v-touch
      v-on:swipeleft="updateMonth(1)"
      v-on:swiperight="updateMonth(-1)">
      <i class="prev material-icons" @click="updateMonth(-1)">keyboard_arrow_left</i>
      <h3 @click="goToCurrentMonth()">{{ formattedMonth }}</h3>
      <i class="next material-icons" @click="updateMonth(1)">keyboard_arrow_right</i>
    </v-touch>
  </header>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ExpensesHeader',
  props: ['currentMonth'],
  computed: {
    formattedMonth() {
      return this.currentMonth.format('MMMM YYYY');
    },
  },
  methods: {
    goToCurrentMonth() {
      const today = moment().startOf('month');
      let diff = today.diff(this.currentMonth, 'months');
      if (diff > 0) diff += 1;
      this.$emit('updateMonth', diff);
    },
    updateMonth(diff) {
      this.$emit('updateMonth', diff);
    },
  },
};
</script>

<style scoped>
header {
  background-color: #00193D;
  color: #fff;
  height: 50px;
  left: 0;
  line-height: 50px;
  position: fixed;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 20;
}
.prev,
.next {
  font-size: 35px;
  left: 0;
  line-height: 50px;
  position: absolute;
  top: 0;
  user-select: none;
  width: 50px;
}
.next {
  left: auto;
  right: 0;
}
h3 {
  font-size: 24px;
  line-height: 50px;
  margin: 0 50px;
  user-select: none;
}
</style>
