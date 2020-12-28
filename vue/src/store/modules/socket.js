import axios from 'axios';

const getDefaultState = () => {
  return {
    lab: {},
    senderType: null,
    username: null,
  };
};

const state = getDefaultState();

const getters = {
  labInfo: (state) => {
    return {
      title: state.lab.title,
      desc: state.lab.desc,
      url: state.lab.url,
    };
  },
  labid: (state) => {
    return state.lab._id;
  },
  username: (state) => {
    return state.username;
  },
  messages: (state) => {
    return state.lab.messages;
  },
};

const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  SET_LAB(state, payload) {
    state.lab = payload.lab;
    state.username = payload.username;
    state.senderType = payload.senderType;
  },
  NEW_GROUP_MESSAGE(state, payload) {
    state.lab.messages.push(payload);
  },
};

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE');
  },
  SET_LAB({ commit }, context) {
    return axios('http://localhost:4000/graphql', {
      method: 'POST',
      data: {
        query: `
              query getLab($id: String!){
                getLab(id: $id){
                    _id
                    title
                    helpers
                    status
                    messages {
                      text
                      sender
                      senderType
                      createdAt
                    }
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
      const labData = {
        lab: res.data.data.getLab,
        username: context.username,
        senderType: context.senderType,
      };
      commit('SET_LAB', labData);
    });
  },
  newGroupMessage({ commit }, context) {
    commit('NEW_GROUP_MESSAGE', context);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
