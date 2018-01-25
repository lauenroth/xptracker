<template>
  <header class="main">
    <v-touch
      v-on:swipeleft="updateMonth(1)"
      v-on:swiperight="updateMonth(-1)">
      <!-- <router-link to="Statistics"><i class="icon-statistics left"></i></router-link> -->
      <h3 @click="goToCurrentMonth()">{{ formattedMonth }}</h3>
      <router-link to="Settings"><i class="icon-settings right"></i></router-link>
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

<style>

</style>
