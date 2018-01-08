import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import ExpensesMonth from '@/components/ExpensesMonth';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/expenses',
      name: 'ExpensesMonth',
      component: ExpensesMonth,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('expenses');
  } else {
    next();
  }
});

export default router;
