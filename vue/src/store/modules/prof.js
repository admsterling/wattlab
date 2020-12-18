// import axios from 'axios';

const state = {
  token: '',
  isAuth: false,
  profData: {},
};

const getters = {
  isLoggedIn: (state) => state.isAuth,
};

const mutations = {
  SET_LOGIN(state, { token, prof }) {
    state.token = token;
    state.isAuth = true;
    state.profData = prof;
  },
};

const actions = {
  loginProf({ commit }, loginData) {
    commit('SET_LOGIN', loginData);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
