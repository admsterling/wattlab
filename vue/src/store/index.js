import Vue from 'vue';
import Vuex from 'vuex';
import prof from './modules/prof';
import socket from './modules/socket';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    prof: prof,
    socket: socket,
  },
  strict: debug,
});
