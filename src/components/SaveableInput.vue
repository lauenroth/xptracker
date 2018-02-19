<template>
  <div class="saveable-input">
    <label for="">{{label}}</label>
    <select v-if="options" @change="valueChanged" v-model="fieldValue">
      <option v-for="currency in options" :key="currency.id" :value="currency.value">{{ currency.name }} ({{ currency.value }})</option>
    </select>
    <input v-else type="text" v-model="fieldValue" v-on:keyup="valueChanged">
    <div class="btn" v-if="showSaveButton" @click="saveValue">Save</div>
  </div>
</template>

<script>
export default {
  name: 'SaveableInput',
  props: ['label', 'value', 'options'],
  data() {
    return {
      fieldValue: '',
      initalValue: '',
      showSaveButton: false,
    };
  },
  mounted() {
    this.fieldValue = this.value;
    this.initialValue = this.value;
  },
  methods: {
    valueChanged(event) {
      if (event.type === 'change') {
        this.fieldValue = event.srcElement.value;
      }
      this.showSaveButton = (this.initialValue !== event.target.value);
      if (this.showSaveButton && event.keyCode === 13) {
        this.saveValue();
      }
    },
    saveValue() {
      this.$emit('onSaveValue', this.fieldValue);
      this.showSaveButton = false;
    },
  },
  watch: {
    value() {
      if (this.value) {
        this.fieldValue = this.value;
        this.initalValue = this.value;
      }
    },
  },
};
</script>

<style scoped>
.saveable-input {
  position: relative;
}
label,
input {
  display: block;
  padding: 0 10px;
}
select,
option {
  font-size: 1em;
  height: 3rem;
  padding: 0 10px;
  width: 100%;
}

select {
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  border-radius: 0;
  margin-bottom: 20px;
  outline: none;
}
.btn {
  bottom: 20px;
  font-size: 1em;
  padding: 0 20px;
  position: absolute;
  right: 0;
  width: auto;
}
</style>