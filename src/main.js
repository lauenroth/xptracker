import Vue from 'vue';
import firebase from 'firebase';
import VueTouch from 'vue-touch';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueTouch, { name: 'v-touch' });

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
};
let app;

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App },
    });
  }
});
