import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router/router';

Vue.directive("uppercase", {
  update: function (el) {
      el.value = el.value.toUpperCase()
  }
})

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
