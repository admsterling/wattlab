// import axios from 'axios';

const getDefaultState = () => {
  return {
    token: undefined,
    profData: {},
  };
};

const state = getDefaultState();

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  SET_LOGIN(state, { token, prof }) {
    state.token = token;
    state.profData = prof;
  },
};

const actions = {
  resetState({commit}){
    commit('RESET_STATE');
  },
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
