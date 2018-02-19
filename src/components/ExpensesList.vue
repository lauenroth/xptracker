<template>
  <section class="expenses-list">
    <div class="summary">
      <div class="total">{{ total }}</div>
      <i class="icon-left" @click="updateMonth(-1)"></i>
      <ExpensesChart class="chart" v-bind:chart-data="chartData" :options="chartOptions"></ExpensesChart>
      <i class="icon-right" @click="updateMonth(1)"></i>
    </div>
    <!-- <v-touch class="swipe-month"
      v-on:swipeleft="updateMonth(1)"
      v-on:swiperight="updateMonth(-1)">
    </v-touch> -->
    <ul class="list" v-if="expenses.length">
      <ExpenseListItem v-for="item in expenses" :key="item.id" :expense="item"
        :showOptions="showOptions"
        v-on:toggleOption="toggleOption"
        v-on:editItem="editItem"
        v-on:deleteItem="deleteItem"></ExpenseListItem>
    </ul>
    <p v-else class="no-data">no data yet</p>
    <section class="modal confirm" v-bind:class="{ show: showDeleteModal }">
      <p>Do you really want to delete this item?</p>
      <p v-if="currentItem">
        {{ currentItem.description }}: {{ formatCurrency(currentItem.amount) }} {{currency}}<br>
        <span class="date">{{ currentItem.formattedDate }}</span>
      </p>
      <div class="buttons">
        <div class="button cancel" @click="hideDeleteModal">Cancel</div>
        <div class="button delete" @click="deleteItemConfirmed">Delete</div>
      </div>
    </section>
  </section>
</template>

<script>
import moment from 'moment';
import ExpensesChart from './ExpensesChart';
import CategoriesMixin from '../mixins/categories';
import ExpenseListItem from './ListItem';

export default {
  name: 'ExpensesList',
  props: ['currentMonth', 'expenses'],
  components: {
    ExpensesChart,
    ExpenseListItem,
  },
  mixins: [CategoriesMixin],
  data() {
    return {
      currency: '',
      currentItem: null,
      showDeleteModal: false,
      showOptions: '',
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Expenses',
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        legend: {
          display: false,
        },
      },
    };
  },
  computed: {
    formattedMonth() {
      return this.currentMonth.format('MMMM YYYY');
    },
    total() {
      let total = 0.0;
      this.expenses.forEach((expense) => {
        total -= parseFloat(expense.amount);
      });
      return `${total.toFixed(2)} ${this.currency}`;
    },
    groupedExpenses() {
      const groupedExpenses = {};
      const categories = this.getCategories();
      this.expenses.forEach((expense) => {
        if (!groupedExpenses[expense.category]) {
          groupedExpenses[expense.category] = parseFloat(expense.amount);
        } else {
          groupedExpenses[expense.category] = parseFloat(groupedExpenses[expense.category]
            + parseFloat(expense.amount));
        }
      });
      const groupedAndSorted = [];
      categories.forEach((category) => {
        if (groupedExpenses[category.name] > 0) {
          groupedAndSorted.push({
            amount: groupedExpenses[category.name],
            category,
          });
        }
      });
      return groupedAndSorted;
    },
  },
  methods: {
    updateMonth(diff) {
      this.$emit('updateMonth', diff);
    },
    toggleOption(id) {
      this.showOptions = id;
    },
    editItem(item) {
      this.$emit('editItem', item);
    },
    deleteItem(item) {
      this.showDeleteModal = true;
      this.currentItem = item;
      this.currentItem.description = this.currentItem.description || this.currentItem.category;
      this.currentItem.formattedDate = moment(item.date, 'YYYY-MM-DD').format('DD.MM.YYYY');
    },
    hideDeleteModal() {
      this.showDeleteModal = false;
      this.currentItem = null;
    },
    deleteItemConfirmed() {
      this.showDeleteModal = false;
      this.$emit('deleteExpense', this.currentItem);
    },
    formatCurrency(amount) {
      return Number(amount).toFixed(2);
    },
  },
  mounted() {
    this.currency = window.localStorage.getItem('currency') || '€';
  },
  watch: {
    groupedExpenses() {
      const labels = [];
      const data = [];
      const backgroundColor = [];
      this.groupedExpenses.forEach((total) => {
        labels.push(total.category.name);
        backgroundColor.push(total.category.color);
        data.push(Number(total.amount).toFixed(2));
      });
      this.chartData = Object.assign({});
      this.$set(this.chartData, 'labels', labels);
      this.$set(this.chartData, 'datasets', []);
      this.chartData.datasets.push({
        backgroundColor,
        data,
      });
    },
  },
};
</script>

<style scoped>
.expenses-list {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.summary {
  align-content: center;
  background-color: #e6eaef;
  display: flex;
  height: 240px;
  margin-top: 50px;
  max-width: 600px;
  width: 100%;
}
.summary i {
  font-size: 34px;
  line-height: 240px;
}
.total {
  align-self: center;
  color: #EE4370;
  font-size: 20px;
  left: calc(50% - 60px);
  position: absolute;
  text-align: center;
  width: 120px;
}

.chart {
  background-color: #fff;
  border-radius: 100%;
  height: 200px;
  margin: 20px auto;
  width: 200px;
}

.swipe-month {
  height: 240px;
  position: relative;
  z-index: 10;
}

.list {
  border: 1px solid #e6eaef;
  border-bottom: none;
  margin: 0;
  padding: 0;
  position: relative;
}
.list::after {
  background: -webkit-linear-gradient(top, #f6f6f6 0%,#ffffff 100%);
  background: linear-gradient(to bottom, #f6f6f6 0%,#ffffff 100%);
  content: '';
  display: block;
  height: 90px;
}
.no-data {
  color: #aaa;
  font-size: 28px;
  margin: auto;
  text-align: center;
}

.modal {
  background-color: rgba(0, 25, 61, .9);
  bottom: 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: .2s;
  visibility: hidden;
  z-index: 100;
}
.modal.show {
  opacity: 1;
  visibility: visible;
}
.modal p {
  font-size: 18px;
  flex: 1;
  line-height: 1.6em;
  padding: 20px 10px;
}
.modal .buttons {
  margin-bottom: -50vh;
  margin-top: auto;
  transition: .3s;
  width: 100%;
}
.modal.show .buttons {
  margin-bottom: 0;
}

.modal .button {
  background-color:#aaa;
  box-sizing: border-box;
  cursor: pointer;
  float: right;
  opacity: .8;
  padding: 20px;
  transition: .2s;
  width: 50%;
}
.modal .button:hover {
  opacity: 1;
}
.modal .cancel {
  float: left;
}
.modal .delete {
  background-color: #EE4370;
}

.date {
  font-size: .8em;
}
</style>
