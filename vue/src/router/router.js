import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const LoginView = Vue.component('Login', () => import('../components/LoginVue'));

const routes = [
  { path: '/', redirect: '/login'},

  { path: '/login', name: 'Login', component: LoginView },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;