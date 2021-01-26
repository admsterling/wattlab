const getDefaultState = () => {
  return {
    volume: true,
  };
};

const state = getDefaultState();

const getters = {
  volume: (state) => state.volume,
};

const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  FLIP_VOLUME(state) {
    state.volume = !state.volume;
  },
};

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE');
  },
  flip_volume({ commit }) {
    commit('FLIP_VOLUME');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
