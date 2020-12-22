import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import store from './store';
import router from './router/router';

const options = {
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  rtl: false,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  maxToasts: 5,
  newestOnTop: true,
};
Vue.use(Toast, options);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
