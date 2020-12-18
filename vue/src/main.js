import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router/router';

new Vue({
  vuetify,
  store,
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
