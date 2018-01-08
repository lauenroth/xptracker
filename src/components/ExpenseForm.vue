<template>
  <form v-on:submit.prevent="addExpense" id="add-expense" v-bind:class="addExpenseClass">
    <header id="add-button">
      <i class="material-icons" v-on:click="showAddExpenseForm">add</i>
      <h3>Add Expense</h3>
    </header>

    <div class="row">
      <div class="col s12">
        <label class="active">Category</label>
        <ul class="categories">
          <li v-for="category in getCategories()" :key="category.id">
            <label>
              <input type="radio" name="category" :value="category.name">
              <i :class="iconClass(category.icon)"></i>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <label for="expense-date" class="active">Date</label>
        <input type="date" id="expense-date" class="datepicker" required="required" v-model="newExpense.date">
      </div>
      <div class="input-field col s6">
        <label for="expense-amount">Amount</label>
        <input type="number" id="expense-amount" class="" step=".01" required v-model="newExpense.amount">
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <label for="expense-description">Description</label>
        <input type="text" id="expense-description" v-model="newExpense.description">
      </div>
    </div>
    <div class="row">
      <div class="vat switch col s6">
        <label>
          <input type="checkbox" name="vat" v-model="newExpense.vat">
          <span class="lever"></span>
          VAT
        </label>
      </div>
      <div class="input-field col s6">
        <button type="submit" class="btn btn-primary">Add Expense</button>
      </div>
    </div>
  </form>
</template>

<script>
import moment from 'moment';
import CategoriesMixin from '../mixins/categories';

export default {
  name: 'ExpenseForm',
  mixins: [CategoriesMixin],
  data() {
    return {
      newExpense: {
        amount: '',
        category: 'shopping',
        description: '',
        date: moment().format('YYYY-MM-DD'),
        vat: true,
      },
      addExpenseClass: '',
    };
  },
  methods: {
    showAddExpenseForm() {
      this.addExpenseClass = this.addExpenseClass === 'show' ? '' : 'show';
    },
    addExpense() {
      this.newExpense.category = document.querySelector('input[name="category"]:checked').value;
      this.$emit('addExpense', this.newExpense);
      this.newExpense.amount = '';
      this.newExpense.description = '';
      this.newExpense.category = 'shopping';
      this.addExpenseClass = '';
    },
    iconClass(category) {
      return `icon-${category}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  background-color: #fff;
  border-radius: 60px;
  bottom: 15px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  font-size: 28px;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  position: fixed;
  right: 15px;
  text-align: center;
  transition: .3s;
  user-select: none;
  width: 60px;
  z-index: 20;
  -webkit-tap-highlight-color: transparent;
}

header {
  background-color: #00193D;
  color: #fff;
}

header i {
  cursor: pointer;
  line-height: 60px;
  width: 60px;
}

header h3 {
  font-size: 24px;
  line-height: 50px;
  margin: 0 50px;
  user-select: none;
  opacity: 0;
  transition: .3s;
}

#add-expense.show header h3 {
  opacity: 1;
}

.row {
  background-color: #fff;
  color: #00193D;
  line-height: initial;
  margin: 0;
  overflow-y: auto;
  text-align: left;
}

.categories {
  margin: 10px 0 20px;
  padding: 0;
  overflow-x: auto;
  position: relative;
  white-space: nowrap;
  width: 100%;
}
.categories li {
  display: inline-block;
}
.categories input {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
.categories i {
  background-color: #9e9e9e;
  border-radius: 100%;
  color: #fff;
  font-size: 22px;
  line-height: 50px;
  margin: 0 10px 10px 0;
  transition: .3s;
  width: 50px;
}
.categories input:checked + i {
  background-color: #00193D;
}
.vat label {
  display: block;
  margin: 10px 0 20px;
}
#expense-amount {
  text-align: right;
}
#add-expense form {
  background-color: #fff;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  padding: 20px 0;
  position: absolute;
  right: 0;
  top: 100%;
  transition: .3s;
  z-index: 50;
}
#add-expense.show {
  border-radius: 0;
  bottom: 0;
  height: 100%;
  right: 0;
  width: 100%;
}
#add-expense.show form {
  min-height: 600px;
}
#add-expense.show header i {
  float: right;
  font-size: 30px;
  line-height: 50px;
  transform: rotate(45deg);
  width: 50px;
}
</style>
