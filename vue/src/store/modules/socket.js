import axios from 'axios';

const getDefaultState = () => {
  return {
    isConnected: false,
    lab: {},
  };
};

const state = getDefaultState();

const getters = {
  labInfo: (state) => {
    return {
      title: state.lab.title,
      desc: state.lab.desc,
      url: state.lab.url,
    }
  },
};

const mutations = {
  SET_LAB(state, payload) {
    state.lab = payload;
  },
  START_LAB(state, payload) {
    state.lab = payload;
  },
  SOCKET_CONNECT(state) {
    state.isConnected = true;
  },
  SOCKET_DISCONNECT(state) {
    state.isConnected = false;
  },
};

const actions = {
  SET_LAB({ commit }, context) {
    console.log();
    axios('http://localhost:4000/graphql', {
      method: 'POST',
      data: {
        query: `
              query getLab($id: String!){
                getLab(id: $id){
                    _id
                    title
                    helpers
                    status
                    code
                    desc
                    url
                    creator {
                        fname
                        lname
                    }
                }
                }
          `,
        variables: {
          id: context.labid,
        },
      },
      headers: {
        Authorization: `Bearer ${context.profid}`,
      },
    }).then((res) => {
      commit('SET_LAB', res.data.data.getLab);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
