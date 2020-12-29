import axios from 'axios';

const getDefaultState = () => {
  return {
    joinedLabFlag: false,
    lab: {},
    accountType: null,
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
  lab_id: (state) => {
    return state.lab._id;
  },
  labCode: (state) => {
    return state.lab.code;
  },
  username: (state) => {
    return state.username;
  },
  accountType: (state) => {
    return state.accountType;
  },
  messages: (state) => {
    return state.lab.messages;
  },
  joinedLabFlag: (state) => {
    return state.joinedLabFlag;
  },
};

const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  SET_LAB(state, payload) {
    state.lab = payload.lab;
    state.username = payload.username;
    state.accountType = payload.accountType;
    state.joinedLabFlag = true;
  },
  NEW_GROUP_MESSAGE(state, payload) {
    state.lab.messages.push(payload);
  },
};

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE');
  },
  setLab({ commit, rootGetters }, context) {
    return axios('http://localhost:4000/graphql', {
      method: 'POST',
      data: {
        query: `
              query getLab($code: String!){
                getLab(code: $code){
                    _id
                    title
                    helpers
                    status
                    messages {
                      text
                      sender
                      accountType
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
          code: context.code,
        },
      },
    }).then((res) => {
      let accountType;
      if (rootGetters['prof/isLoggedIn']) {
        accountType = 'PROFESSOR';
      } else if (res.data.data.getLab.helpers.includes(context.username)) {
        accountType = 'HELPER';
      } else {
        accountType = 'STUDENT';
      }

      const labData = {
        lab: res.data.data.getLab,
        username: context.username,
        accountType: accountType,
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
