import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import store from './store';
import router from './router/router';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

import VueMobileDetection from 'vue-mobile-detection';
Vue.use(VueMobileDetection);

import AsyncComputed from 'vue-async-computed';

Vue.use(AsyncComputed);

import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';

const connectionString =
  process.env.VUE_APP_SOCKETIO_CONNECTION || window.location.hostname;
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
import moment from 'moment';

Vue.prototype.moment = moment;
Vue.filter('momentAgo', function(date) {
  let now = Date.now();
  let diff = now - new Date(date);
  return moment(diff).format('mm:ss');
});
Vue.filter('mmss', function(date) {
  return moment(date).format('mm:ss');
});

Vue.use(VuePeerJS, new Peer(socketConnection.id));

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
