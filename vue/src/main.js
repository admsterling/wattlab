import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import store from './store';
import router from './router/router';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

const PORT = process.env.PORT || 3000;
const socketConnection = SocketIO('http://localhost:' + PORT);

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socketConnection,
    vuex: {
      store,
      actionPrefix: 'socket/SOCKET_',
      mutationPrefix: 'socket/SOCKET_',
    },
  }),
  store
);

const options = {
  timeout: 5000,
  position: 'top-right',
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

Vue.use(require('vue-moment'));

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
