import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/router';
import VueApollo from 'vue-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(VueApollo);
const api_port = require('../../config').api_port;
const httpLink = createHttpLink({
  uri: 'http://localhost:' + api_port + '/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  vuetify,
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
