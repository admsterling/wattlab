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

const JoinLabView = Vue.component('Join', () =>
  import('../components/lab/LabRoom')
);

const TeacherView = Vue.component('TeacherView', () =>
  import('../components/prof/ProfView.vue')
);

const CreateLabView = Vue.component('CreateLabView', () =>
  import('../components/prof/create/CreateLab')
);
const ViewLabs = Vue.component('ViewLabs', () =>
  import('../components/prof/viewLabs/ViewLabs')
);
const EditLabView = Vue.component('EditLab', () =>
  import('../components/prof/editLab/EditLab')
);
const LabInfoView = Vue.component('LabInfo', () =>
  import('../components/prof/labInfo/LabInfo')
);
const SubmissionsView = Vue.component('Submissions', () =>
  import('../components/prof/submissions/Submissions')
);

const MobileView = Vue.component('MobileView', () =>
  import('../components/MobileView')
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

const ifLab = (to, from, next) => {
  if (store.getters['socket/joinedLabFlag']) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/mobile', component: MobileView },

  {
    path: '/join/:labCode',
    beforeEnter: ifLab,
    component: JoinLabView,
  },

  { path: '/login', component: LoginView },
  { path: '/login/:code', component: LoginView },
  { path: '/register', component: RegisterView },

  {
    path: '/prof',
    beforeEnter: ifAuth,
    component: TeacherView,
    redirect: '/viewLabs',
    children: [
      { path: '/createLab', component: CreateLabView },
      { path: '/viewLabs', component: ViewLabs },
      { path: '/edit/:labCode', component: EditLabView },
      { path: '/labInfo/:code', component: LabInfoView },
      { path: '/submissions/:code/:id/:submissions', component: SubmissionsView },
    ],
  },
  { path: '*', component: NotFound },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
