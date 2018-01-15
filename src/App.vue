<template>
  <div id="app" v-bind:class="{ 'show-modal': showModal }">
    <router-view v-on:toggleModal="toggleModal" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  bottom: 0;
  box-shadow: 0 0 10px #00193D;
  color: #2c3e50;
  left: 0;
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app.show-modal {
  overflow: hidden;
}
#app.show-modal::before {
  background-color: rgba(0, 25, 61, 0);
  bottom: 0;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  transition: .3s;
  visibility: hidden;
  width: 100%;
  z-index: 25;
}
#app.show-modal::before {
  background-color: rgba(0, 25, 61, .5);
  visibility: visible;
}
#app > * {
  margin: 0 auto;
  max-width: 600px;
}
@font-face {
  font-family: 'fontello';
  src: url('/static/fontello/font/fontello.eot?46826270');
  src: url('/static/fontello/font/fontello.eot?46826270#iefix') format('embedded-opentype'),
        url('/static/fontello/font/fontello.woff?46826270') format('woff'),
        url('/static/fontello/font/fontello.ttf?46826270') format('truetype'),
        url('/static/fontello/font/fontello.svg?46826270#fontello') format('svg');
  font-weight: normal;
  font-style: normal;
}
[class^="icon-"] {
  font-family: "fontello";
  font-style: normal;
  font-weight: normal;
  speak: none;
  
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: .2em;
  text-align: center;
  
  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;
  
  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;
  
  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: .2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

label {
  color: #9e9e9e;
  font-size: .8rem;
  position: initial;
}

input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  font-size: 1rem;
  height: 3rem;
  margin: 0 0 20px 0;
  outline: none;
  padding: 0;
  width: 100%;
}

input[type="date"]::-webkit-clear-button {
 -webkit-appearance: none;
  display: none;
}

button,
.btn {
  background-color: #00193D;
  border: none;
  color: #fff;
  font-size: 22px;
  line-height: 50px;
  text-align: center;
  width: 100%;
}

.row {
  background-color: #fff;
  color: #00193D;
  line-height: initial;
  margin: 0;
  overflow-y: auto;
  text-align: left;
}
.row .col {
  box-sizing: border-box;
  float: left;
  min-height: 1px;
  padding: 0 .75rem;
  -webkit-box-sizing: border-box;
}
.row .col.s6 {
  left: auto;
  margin-left: auto;
  right: auto;
  width: 50%;
}
.row .col.s12 {
  left: auto;
  margin-left: auto;
  right: auto;
  width: 100%;
}

header.main {
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
header.main a {
  color: #fff;
  text-decoration: none;
}
header.main .left,
header.main .right {
  font-size: 24px;
  left: 0;
  line-height: 50px;
  position: absolute;
  top: 0;
  user-select: none;
  width: 50px;
}
header.main .right {
  left: auto;
  right: 0;
}
header.main h3 {
  font-size: 24px;
  line-height: 50px;
  margin: 0 50px;
  user-select: none;
}
</style>
