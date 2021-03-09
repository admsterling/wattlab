const getDefaultState = () => {
  return {
    volume: true,
    micPerm: false,
  };
};

const state = getDefaultState();

const getters = {
  volume: (state) => state.volume,
  micPerm: (state) => state.micPerm,
};

const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  FLIP_VOLUME(state) {
    state.volume = !state.volume;
  },
  MIC_PERM(state, payload) {
    state.micPerm = payload;
  },
};

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE');
  },
  flip_volume({ commit }) {
    commit('FLIP_VOLUME');
  },
  mic_perm({ commit }, context) {
    commit('MIC_PERM', context);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
