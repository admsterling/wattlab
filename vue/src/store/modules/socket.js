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
    peerid: null,
    student_mic: false,
    gitLink: null,
  };
};

const state = getDefaultState();

const getters = {
  labInfo: (state) => {
    return {
      title: state.lab.title,
      desc: state.lab.desc,
      urlLinks: state.lab.urlLinks,
      urlTitles: state.lab.urlTitles,
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
  peerid: (state) => {
    return state.peerid;
  },
  profOnlyQue: (state) => {
    return state.lab.profOnlyQue;
  },
  studentMic: (state) => {
    return state.student_mic;
  },
  gitLink: (state) => {
    return state.gitLink;
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
    state.gitLink = null;
  },
  START_PRIVATE_CHAT(state, payload) {
    state.privateChat = payload;
  },
  ADD_PRIVATE_MESSAGE(state, payload) {
    state.privateChat.messages.push(payload);
  },
  PEER_ID(state, payload) {
    state.peerid = payload;
  },
  STUDENT_MIC(state, payload) {
    state.student_mic = payload;
  },
  QUE_WAITING(state, payload) {
    state.queWaiting = payload;
  },
  GIT_LINK(state, payload) {
    state.gitLink = payload;
  },
};

const actions = {
  resetState({ commit, rootGetters }) {
    if (rootGetters['socket/member_id']) {
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
    } else {
      commit('RESET_STATE');
    }
  },
  setLab({ commit, rootGetters }, context) {
    return axios(process.env.VUE_APP_ENDPOINT, {
      method: 'POST',
      data: {
        query: `
        mutation joinLab($code: String!, $username: String!, $helperPIN: Int, $socketid: String!, $prof: Boolean!) {
          joinLab(code: $code, username: $username, helperPIN: $helperPIN, socketid: $socketid, prof: $prof) {
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
              urlTitles
              urlLinks
              creator {
                fname
                lname
              }
              submission
              profOnlyQue
            }
            memberid
          }
        }
          `,
        variables: {
          code: context.code,
          username: context.username,
          helperPIN: context.helperPIN,
          socketid: context.socketid,
          prof: context.prof,
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
    commit('PEER_ID', context.peerid);
    commit('STUDENT_MIC', context.student_mic);
    commit('GIT_LINK', context.gitLink);
  },
  addPrivateMessage({ commit }, context) {
    commit('ADD_PRIVATE_MESSAGE', context);
  },
  queWaiting({ commit }, context) {
    commit('QUE_WAITING', context);
  },
  gitLink({ commit }, context) {
    commit('GIT_LINK', context);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
