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
    <div class="action-button" v-bind:class="{ clicked: showExpenseForm }">
      <i class="icon-plus" v-on:click="addClose"></i>
    </div>
    <ExpenseForm
      :currentExpense="currentExpense"
      :showExpenseForm="showExpenseForm"
      v-on:addExpense="addExpense"
      v-on:updateExpense="updateExpense"
    ></ExpenseForm>
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
      showExpenseForm: false,
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
    addClose() {
      this.showExpenseForm = !this.showExpenseForm;
      if (this.showExpenseForm) {
        this.currentExpense = null;
      }
      this.$emit('toggleModal');
    },
    addExpense(newExpense) {
      const currentUser = firebase.auth().currentUser;
      firebase.database().ref(`expenses/${currentUser.uid}`).push(newExpense);
      this.toggleModal();
    },
    selectExpense(expense) {
      this.currentExpense = expense;
      this.showExpenseForm = true;
      this.$emit('toggleModal');
    },
    updateExpense(expense) {
      const currentUser = firebase.auth().currentUser;
      const update = {};
      update[`expenses/${currentUser.uid}/${expense.id}`] = expense;
      firebase.database().ref().update(update);
      this.expenses = [];
      this.updateExpenses();
      this.toggleModal();
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
      this.currentExpense = false;
      this.showExpenseForm = false;
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

.action-button {
  background-color: #00193D;
  border-radius: 60px;
  bottom: 15px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  color: #fff;
  cursor: pointer;
  font-size: 26px;
  line-height: 60px;
  position: fixed;
  right: 15px;
  text-align: center;
  transition: .3s;
  width: 60px;
  z-index: 30;
}

.action-button.clicked {
  bottom: 290px;
  line-height: 40px;
  opacity: .9;
  transform: rotate(135deg);
  width: 40px;
}

.action-button i {
  line-height: inherit;
  margin: 0;
  width: 100%;
}
</style>
