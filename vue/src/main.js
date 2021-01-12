import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import store from './store';
import router from './router/router';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

const connectionString = process.env.VUE_APP_SOCKETIO_CONNECTION || window.location.hostname;
const socketConnection = SocketIO(connectionString);

const devFlag = process.env.VUE_APP_DEV_FLAG || false;

Vue.use(
  new VueSocketIO({
    debug: devFlag,
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
