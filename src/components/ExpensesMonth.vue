<template>
  <section>
    <Header :currentMonth="currentMonth" v-on:updateMonth="updateMonth" />
    <ExpensesList 
      :currentMonth="currentMonth" 
      :expenses="expenses" 
      v-on:updateMonth="updateMonth"
      v-on:editItem="selectExpense"
      v-on:deleteExpense="deleteExpense"
    ></ExpensesList>
    <ExpenseForm
      :currentExpense="currentExpense"
      v-on:addExpense="addExpense"
      v-on:updateExpense="updateExpense"
      v-on:toggleModal="toggleModal"
    ></ExpenseForm>
    <i class="icon-plus" @click="toggleModal"></i>
  </section>
</template>

<script>
import firebase from 'firebase';
import moment from 'moment';
import Header from './Header';
import ExpenseForm from './ExpenseForm';
import ExpensesList from './ExpensesList';

export default {
  name: 'ExpensesMonth',
  components: {
    Header,
    ExpensesList,
    ExpenseForm,
  },
  data() {
    return {
      expenses: [],
      currentExpense: null,
      currentMonth: moment().startOf('month'),
    };
  },
  mounted() {
    this.updateExpenses();
  },
  methods: {
    formatCurrency(amount) {
      return Number(amount).toFixed(2);
    },
    updateExpenses() {
      const currentUser = firebase.auth().currentUser;
      const expensesRef = firebase.database()
        .ref(`expenses/${currentUser.uid}`)
        .orderByChild('date')
        .startAt(this.currentMonth.format('YYYY-MM-01'))
        .endAt(this.currentMonth.endOf('month').format('YYYY-MM-DD'));
      expensesRef.on('child_added', (item) => {
        const expense = item.val();
        expense.id = item.key;
        this.expenses.unshift(expense);
      });
      expensesRef.on('child_removed', (item) => {
        const expenseIndex = this.expenses.findIndex(expense => expense.id === item.key);
        this.expenses.splice(expenseIndex, 1);
      });
    },
    addExpense(newExpense) {
      const currentUser = firebase.auth().currentUser;
      firebase.database().ref(`expenses/${currentUser.uid}`).push(newExpense);
    },
    selectExpense(expense) {
      this.currentExpense = expense;
    },
    updateExpense(expense) {
      const currentUser = firebase.auth().currentUser;
      const update = {};
      update[`expenses/${currentUser.uid}/${expense.id}`] = expense;
      firebase.database().ref().update(update);
      this.expenses = [];
      this.updateExpenses();
    },
    deleteExpense(expense) {
      const currentUser = firebase.auth().currentUser;
      firebase.database().ref(`expenses/${currentUser.uid}`)
        .child(expense.id).remove();
    },
    updateMonth(diff) {
      this.currentMonth = this.currentMonth.clone().add(diff, 'month').startOf('month');
      this.expenses = [];
      this.updateExpenses();
    },
    toggleModal() {
      this.currentExpense = null;
      this.$emit('toggleModal');
    },
    getIcon(category) {
      switch (category) {
        case 'Eat/Drink':
          return 'restaurant';
        case 'Business':
          return 'business';
        case 'Home':
          return 'home';
        case 'Bus/Train':
          return 'train';
        case 'Car':
          return 'directions_car';
        case 'Taxi':
          return 'directions_taxi';
        case 'Gas Station':
          return 'local_gas_station';
        case 'Going out':
          return 'local_bar';
        case 'Hotel':
          return 'local_hotel';
        case 'Education':
          return 'school';
        case 'Holiday':
          return 'beach_access';
        case 'Health':
          return 'favorite';
        case 'Children':
          return 'child_care';
        default:
          return 'shopping_cart';
      }
    },
  },
};
</script>

<style scoped>
.show-modal {
  background: red;
  overflow: hidden;
}

.summary {
  align-content: center;
  background-color: #e6eaef;
  display: flex;
  height: 240px;
  margin-top: 50px;
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

.list {
  border: 1px solid #e6eaef;
  border-bottom: none;
  margin: 0;
  padding: 0;
}
.list::after {
  background: -webkit-linear-gradient(top, #ffffff 0%,#f6f6f6 100%);
  background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 100%);
  content: '';
  display: block;
  height: 100px;
}
.list li {
  background-color: #ffffff;
  border-bottom: 1px solid #e6eaef;
  box-sizing: border-box;
  font-size: 16px;
  list-style: none;
  height: 65px;
  padding: 0 20px 0 0;
}
.list .category {
  border-right: 1px solid #e6eaef;
  float: left;
  height: 65px;
  margin-right: 20px;
  padding-top: 20px;
  text-align: center;
  width: 65px;
}
.list .amount {
  color: #EE4370;
  float: right;
  line-height: 65px;
}
.list .description {
  padding: 12px 0 2px 40px;
}
.list .date {
  color: #aaa;
  font-size: 12px;
  margin-left: 40px;
}

.icon-plus {
  bottom: 15px;
  position: fixed;
  right: 15px;
}
</style>
