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
    };
  },
  labid: (state) => {
    return state.lab._id;
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
  NEW_MESSAGE(state, payload) {
    state.lab.messages.push(payload);
  }
};

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE');
  },
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
  newMessage({ commit }, context) {
    commit('NEW_MESSAGE', context);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
