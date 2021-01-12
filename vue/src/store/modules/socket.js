import axios from 'axios';

const getDefaultState = () => {
  return {
    joinedLabFlag: false,
    queWaiting: false,
    lab: {},
    accountType: null,
    username: null,
    member_id: null,
    gettingSupport: {
      flag: false,
      reciever: null,
    },
    privateChat: {},
    submission: false,
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
  submission: (state) => {
    return state.lab.submission;
  },
  joinedLabFlag: (state) => {
    return state.joinedLabFlag;
  },
  queWaiting: (state) => {
    return state.queWaiting;
  },
  gettingSupport: (state) => {
    return state.gettingSupport;
  },
  privateChat: (state) => {
    return state.privateChat;
  },
  privateChatMessages: (state) => {
    return state.privateChat.messages;
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
  JOIN_QUE(state) {
    state.queWaiting = true;
  },
  LEAVE_QUE(state) {
    state.queWaiting = false;
  },
  START_HELP(state, payload) {
    state.gettingSupport.reciever = payload;
    state.gettingSupport.flag = true;
  },
  STOP_HELP(state) {
    state.gettingSupport.reciever = null;
    state.gettingSupport.flag = false;
    state.privateChat = {};
  },
  START_PRIVATE_CHAT(state, payload) {
    state.privateChat = payload;
  },
  ADD_PRIVATE_MESSAGE(state, payload) {
    state.privateChat.messages.push(payload);
  },
};

const actions = {
  resetState({ commit, rootGetters }) {
    return axios(process.env.VUE_APP_ENDPOINT, {
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
    return axios(process.env.VUE_APP_ENDPOINT, {
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
              submission
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
        } else if (
          res.data.data.joinLab.lab.helpers.includes(context.username)
        ) {
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
  joinQue({ commit }) {
    commit('JOIN_QUE');
  },
  leaveQue({ commit }) {
    commit('LEAVE_QUE');
  },
  stopHelp({ commit }) {
    commit('STOP_HELP');
  },
  privateChatInfo({ commit, rootGetters }, context) {
    return axios(process.env.VUE_APP_ENDPOINT, {
      method: 'POST',
      data: {
        query: `
              mutation createPrivateChat($lab_id: ID!, $student: String!, $staff: String!){
                createPrivateChat(lab_id: $lab_id, student: $student, staff: $staff){
                  _id
                  student
                  staff
                  messages {
                    _id
                  }
                }
              }
            `,
        variables: {
          lab_id: rootGetters['socket/lab_id'],
          student: rootGetters['socket/username'],
          staff: context.staff,
        },
      },
    }).then((res) => {
      commit('START_HELP', context.reciever);
      commit('START_PRIVATE_CHAT', res.data.data.createPrivateChat);
    });
  },
  setprivateChatInfo({ commit }, context) {
    commit('START_HELP', context.reciever);
    commit('START_PRIVATE_CHAT', context.privateChat);
  },
  addPrivateMessage({ commit }, context) {
    commit('ADD_PRIVATE_MESSAGE', context);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
