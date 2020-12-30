import axios from 'axios';

const getDefaultState = () => {
  return {
    joinedLabFlag: false,
    lab: {},
    accountType: null,
    username: null,
    member_id: null,
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
  member_id: (state) => {
    return state.member_id;
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
    state.member_id = payload.member_id;
    state.accountType = payload.accountType;
    state.joinedLabFlag = true;
  },
  NEW_GROUP_MESSAGE(state, payload) {
    state.lab.messages.push(payload);
  },
};

const actions = {
  resetState({ commit, rootGetters }) {
    return axios('http://localhost:4000/graphql', {
      method: 'POST',
      data: {
        query: `
              mutation memberLeaveLab($id: ID!){
                memberLeaveLab(id: $id)
              }
          `,
        variables: {
          id: rootGetters['socket/member_id'],
        },
      },
    }).then(() => {
      commit('RESET_STATE');
    });
  },
  setLab({ commit, rootGetters }, context) {
    return axios('http://localhost:4000/graphql', {
      method: 'POST',
      data: {
        query: `
        mutation joinLab($code: String!, $username: String!, $socketid: String!) {
          joinLab(code: $code, username: $username, socketid: $socketid) {
            lab {
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
              labMembers {
                username
                socketid
              }
              code
              desc
              url
              creator {
                fname
                lname
              }
            }
            memberid
          }
        }
          `,
        variables: {
          code: context.code,
          username: context.username,
          socketid: context.socketid,
        },
      },
    }).then((res) => {
      if (res.data.data.joinLab.lab.status) {
        let accountType;
        if (rootGetters['prof/isLoggedIn']) {
          accountType = 'PROFESSOR';
        } else if (res.data.data.joinLab.lab.helpers.includes(context.username)) {
          accountType = 'HELPER';
        } else {
          accountType = 'STUDENT';
        }

        const labData = {
          lab: res.data.data.joinLab.lab,
          username: context.username,
          member_id: res.data.data.joinLab.memberid,
          accountType: accountType,
        };
        commit('SET_LAB', labData);
      } else {
        const error = new Error('Lab has not started');
        throw error;
      }
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
