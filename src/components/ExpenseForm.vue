<template>
  <form v-on:submit.prevent="addExpense" v-bind:class="formClass">
    <div class="action-button">
      <i class="icon-plus" v-on:click="showAddExpenseForm"></i>
    </div>

    <div class="row">
      <div class="input-field col s6">
        <label for="expense-date" class="active">Date</label>
        <input type="date" id="expense-date" class="datepicker" required="required" v-model="expense.date">
      </div>
      <div class="input-field col s6">
        <label for="expense-amount">Amount</label>
        <input type="number" id="expense-amount" class="" step=".01" placeholder="0.00" required v-model="expense.amount">
      </div>
    </div>
    <div class="row">
      <div class="col s6">
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
      <div class="input-field col s6">
        <label for="expense-description">Description</label>
        <input type="text" id="expense-description" v-model="expense.description">
      </div>
    </div>
    <div class="row" style="display: none">
      <div class="vat switch col s6">
        <label>
          <input type="checkbox" name="vat" v-model="expense.vat">
          <span class="lever"></span>
          VAT
        </label>
      </div>
      <div class="input-field col s6">
      </div>
    </div>
    <div class="row">
      <button type="submit" class="btn btn-primary" v-if="expense.id">Update Expense</button>
      <button type="submit" class="btn btn-primary" v-else>Add Expense</button>
    </div>
  </form>
</template>

<script>
import moment from 'moment';
import CategoriesMixin from '../mixins/categories';

export default {
  name: 'ExpenseForm',
  mixins: [CategoriesMixin],
  props: ['currentExpense'],
  data() {
    return {
      expense: {
        amount: '',
        category: 'shopping',
        description: '',
        date: moment().format('YYYY-MM-DD'),
        vat: true,
      },
      formClass: '',
    };
  },
  methods: {
    showAddExpenseForm() {
      this.$emit('toggleModal');
      this.formClass = this.formClass === 'show' ? '' : 'show';
      if (this.formClass === '') {
        this.resetForm();
      }
    },
    addExpense() {
      this.expense.category = document.querySelector('input[name="category"]:checked').value;
      this.$emit('toggleModal');
      if (this.expense.id) {
        this.$emit('updateExpense', this.expense);
      } else {
        this.$emit('addExpense', this.expense);
      }
      this.resetForm();
      this.formClass = '';
      document.activeElement.blur();
    },
    iconClass(category) {
      return `icon-${category}`;
    },
    resetForm() {
      this.expense.amount = '';
      this.expense.description = '';
      this.expense.category = 'shopping';
      this.expense.date = moment().format('YYYY-MM-DD');
    },
  },
  watch: {
    currentExpense() {
      if (this.currentExpense) {
        this.expense = {
          id: this.currentExpense.id,
          amount: this.currentExpense.amount,
          category: this.currentExpense.category,
          description: this.currentExpense.description,
          date: this.currentExpense.date,
        };
        const category = document.querySelector(`input[name="category"][value="${this.expense.category}"]`);
        category.checked = true;
        this.showAddExpenseForm();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  bottom: -258px;
  font-size: 28px;
  height: 336px;
  left: 0;
  overflow: hidden;
  position: fixed;
  text-align: center;
  transition: .3s;
  user-select: none;
  width: 100%;
  z-index: 30;
  -webkit-tap-highlight-color: transparent;
}

.action-button {
  background-color: #00193D;
  border-radius: 60px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  color: #fff;
  cursor: pointer;
  float: right;
  line-height: 60px;
  margin: 5px 15px 15px 0;
  text-align: center;
  transition: .3s;
  width: 60px;
}

.action-button i {
  line-height: inherit;
  margin: 0;
  width: 100%;
}

.row {
  background-color: #fff;
  color: #00193D;
  clear: both;
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
  margin: 0;
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
.categories i {
  background-color: #9e9e9e;
  border-radius: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 45px;
  margin: 0 10px 10px 0;
  transition: .3s;
  width: 45px;
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
form.show {
  border-radius: 0;
  bottom: 0;
  right: 0;
  width: 100%;
}
form.show .action-button {
  line-height: 40px;
  opacity: .9;
  transform: rotate(135deg);
  width: 40px;
}
</style>
