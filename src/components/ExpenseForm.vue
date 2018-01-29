<template>
  <form v-on:submit.prevent="addExpense" v-bind:class="{ show: showExpenseForm }">
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
        <div class="category" @click="toggleCategorySelector()">
          <i :class="iconClass(getIcon(expense.category))"></i>
        </div>
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

    <section class="category-picker" v-bind:class="{ show: showCategories }">
      <h3>Please choose a category:</h3>
      <ul class="categories">
        <li v-for="category in getCategories()" :key="category.id">
          <label>
            <input type="radio" name="category" :value="category.name">
            <i :class="iconClass(category.icon)" @click="toggleCategorySelector(category.name)"></i>
          </label>
        </li>
      </ul>
    </section>
  </form>
</template>

<script>
import moment from 'moment';
import CategoriesMixin from '../mixins/categories';

export default {
  name: 'ExpenseForm',
  mixins: [CategoriesMixin],
  props: ['currentExpense', 'showExpenseForm'],
  data() {
    return {
      expense: {
        amount: '',
        category: 'Shopping',
        description: '',
        date: moment().format('YYYY-MM-DD'),
        vat: true,
      },
      showCategories: false,
    };
  },
  methods: {
    showAddExpenseForm() {
      this.$emit('toggleModal');
      if (this.showExpenseForm) {
        this.resetForm();
      }
    },
    toggleCategorySelector(category) {
      this.showCategories = !this.showCategories;
      if (category) {
        this.expense.category = category;
      }
    },
    addExpense() {
      if (this.expense.id) {
        this.$emit('updateExpense', this.expense);
      } else {
        this.$emit('addExpense', this.expense);
      }
      document.activeElement.blur();
    },
    iconClass(category) {
      return `icon-${category}`;
    },
    resetForm() {
      this.expense.id = false;
      this.expense.amount = '';
      this.expense.description = '';
      this.expense.category = 'Shopping';
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
      } else {
        this.resetForm();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  bottom: -300px;
  font-size: 28px;
  height: 259px;
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

.row {
  background-color: #fff;
  color: #00193D;
  clear: both;
  line-height: initial;
  margin: 0;
  overflow-y: auto;
  text-align: left;
}

.category-picker {
  background-color: rgba(255, 255, 255, 0.95);
  bottom: 0;
  color: #00193D;
  display: flex;
  flex-direction: column;
  left: 0;
  margin: 0;
  padding: 20px;
  position: fixed;
  right: 0;
  top: 100%;
  transition: .3s top;
  visibility: hidden;
}
.category-picker.show {
  top: 0;
  visibility: visible;
}
.category-picker h3 {
  font-size: 22px;
  margin: 20px 0 40px;
}
.categories {
  margin: auto 0;
  padding: 0;
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
.category i,
.categories i {
  background-color: #9e9e9e;
  border-radius: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 45px;
  margin: 0 15px 15px 0;
  transition: .3s;
  width: 45px;
}
.categories input:checked + i,
.category i {
  background-color: #00193D;
}

.category i {
  margin: 5px 0;
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
</style>
