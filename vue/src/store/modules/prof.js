// import axios from 'axios';

const state = {
  token: undefined,
  profData: {},
};

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const mutations = {
  SET_LOGIN(state, { token, prof }) {
    state.token = token;
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
