const getDefaultState = () => {
  return {
    token: undefined,
    profData: {},
  };
};

const state = getDefaultState();

const getters = {
  isLoggedIn: (state) => !!state.token,
  fullName: (state) => {
    return state.profData.fname + ' ' + state.profData.lname;
  },
  email: (state) => {
    return state.profData.email;
  },
  username: (state) => {
    if (state.profData.email) {
      return state.profData.email.substring(
        0,
        state.profData.email.indexOf('@')
      );
    }
    return undefined;
  },
  prof_id: (state) => {
    return state.profData._id;
  },
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
  resetState({ commit }) {
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
