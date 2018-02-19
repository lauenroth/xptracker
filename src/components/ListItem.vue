<template>
  <li :class="this.cssClass">
    <div @click="toggleOptions()">
      <div class="category">
        <i :class="iconClass(expense.category)"></i>
      </div>
      <div class="edit" @click="editItem()"><i class="icon-edit"></i></div>
      <div class="delete" @click="deleteItem()"><i class="icon-delete"></i></div>
      <div class="amount">-{{ formatCurrency(expense.amount) }} {{currency}}</div>
      <div class="description" v-if="expense.description">{{ expense.description }}</div>
      <div class="description" v-else>{{ expense.category }}</div>
      <div class="date">{{ expense.date.split('-').reverse().join('.') }}</div>
    </div>
  </li>
</template>

<script>
import CategoriesMixin from '../mixins/categories';

export default {
  name: 'ListItem',
  props: ['expense', 'showOptions'],
  mixins: [CategoriesMixin],
  computed: {
    cssClass() {
      return this.showOptions === this.expense.id ? 'show-options' : '';
    },
  },
  data() {
    return {
      currency: '',
    };
  },
  methods: {
    formatCurrency(amount) {
      return Number(amount).toFixed(2);
    },
    iconClass(category) {
      return `icon-${this.getIcon(category)}`;
    },
    toggleOptions() {
      const id = this.showOptions !== this.expense.id ? this.expense.id : '';
      this.$emit('toggleOption', id);
    },
    editItem() {
      this.$emit('editItem', this.expense);
    },
    deleteItem() {
      this.$emit('deleteItem', this.expense);
    },
  },
  mounted() {
    this.currency = window.localStorage.getItem('currency') || '€';
  },
};
</script>

<style scoped>
li {
  background-color: #ffffff;
  border-bottom: 1px solid #e6eaef;
  box-sizing: border-box;
  font-size: 16px;
  list-style: none;
  height: 65px;
  overflow: hidden;
  padding: 0 20px 0 0;
  position: relative;
}
.category {
  border-right: 1px solid #e6eaef;
  float: left;
  font-size: 22px;
  height: 65px;
  line-height: 65px;
  margin-right: 20px;
  text-align: center;
  width: 65px;
}
.amount {
  color: #EE4370;
  float: right;
  line-height: 65px;
}
.description {
  padding: 12px 0 2px 40px;
  text-align: left;
}
.date {
  color: #aaa;
  font-size: 12px;
  margin-left: 40px;
  text-align: left;
}
.edit,
.delete {
  background-color: #00193D;
  color: #fff;
  font-size: 22px;
  line-height: 64px;
  position: absolute;
  right: -100px;
  top: 0;
  transition: .3s right;
  width: 65px;
  z-index: 1;
}
.delete {
  background-color: #EE4370;
  color: #fff;
  right: -66px;
}
.show-options .delete {
  right: 0;
}
.show-options .edit {
  right: 65px;
}
</style>