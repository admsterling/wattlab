import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const LoginView = Vue.component('Login', () =>
  import('../components/LoginVue')
);
const TestComponent = Vue.component('Login', () =>
  import('../components/TestComponent')
);

const ifAuth = (to, from, next) => {
  if(store.getters['prof/isLoggedIn']){
    next();
    return
  }
  next('/login');
}

const routes = [
  { path: '/', redirect: '/login' },

  { path: '/login', component: LoginView },

  {
    path: '/prof',
    beforeEnter: ifAuth,
    component: TestComponent,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
