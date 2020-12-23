import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const LoginView = Vue.component('Login', () =>
  import('../components/login/LoginVue')
);
const RegisterView = Vue.component('Register', () =>
  import('../components/login/Register')
);
// const TestComponent = Vue.component('Login', () =>
//   import('../components/TestComponent')
// );

const TeacherView = Vue.component('TeacherView', () =>
  import('../components/prof/ProfView.vue')
);

const CreateLabView = Vue.component('CreateLabView', () =>
  import('../components/prof/create/CreateLab')
);
const ViewLabs = Vue.component('ViewLabs', () =>
  import('../components/prof/viewLabs/ViewLabs')
);

const NotFound = Vue.component('NotFound', () =>
  import('../components/NotFound')
);

const ifAuth = (to, from, next) => {
  if (store.getters['prof/isLoggedIn']) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  { path: '/', redirect: '/login' },

  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },

  {
    path: '/prof',
    beforeEnter: ifAuth,
    component: TeacherView,
    redirect: '/viewLabs',
    children: [
      { path: '/createLab', component: CreateLabView },
      { path: '/viewLabs', component: ViewLabs },
    ],
  },

  { path: '*', component: NotFound },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
