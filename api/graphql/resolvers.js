const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Prof = require('../models/prof');
const Lab = require('../models/lab');
const Message = require('../models/message');
const PrivateChat = require('../models/privatechat');
const PrivateMessage = require('../models/privatemessage');
const LabMember = require('../models/labmember');
const QueObj = require('../models/queobj');
const api_key = process.env.KEY;

function checkAuth(flag) {
  if (!flag) {
    const error = new Error('Not authenticated');
    error.code = 401;
    throw error;
  }
}

function checkErrors(errors) {
  if (errors.length > 0) {
    const error = new Error('Invalid input.');
    error.data = errors;
    error.code = 422;
    throw error;
  }
}

module.exports = {
  createProf: async function ({ profInput }) {
    const errors = [];
    if (validator.isEmpty(profInput.fname)) {
      errors.push({ message: 'Please enter first name.' });
    }
    if (validator.isEmpty(profInput.lname)) {
      errors.push({ message: 'Please enter last name.' });
    }
    if (!validator.isEmail(profInput.email)) {
      errors.push({ message: 'E-Mail is invalid.' });
    }
    if (
      validator.isEmpty(profInput.password) ||
      !validator.isLength(profInput.password, { min: 5 })
    ) {
      errors.push({ message: 'Password too short!' });
    }
    checkErrors(errors);

    const existingProf = await Prof.findOne({ email: profInput.email });
    if (existingProf) {
      const error = new Error('Professor already exists.');
      throw error;
    }
    const hashedPw = await bcrypt.hash(profInput.password, 12);
    const prof = new Prof({
      fname: profInput.fname,
      lname: profInput.lname,
      email: profInput.email,
      name: profInput.name,
      password: hashedPw,
    });
    const createdProf = await prof.save();
    return { ...createdProf._doc, _id: createdProf._id.toString() };
  },
  login: async function ({ email, password }) {
    const prof = await Prof.findOne({ email: email });
    if (!prof) {
      const error = new Error('Account not found');
      error.code = 401;
      throw error;
    }
    if (!prof.approved) {
      const error = new Error('Account not approved');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, prof.password);
    if (!isEqual) {
      const error = new Error('Password is incorrect');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: prof._id.toString(),
        email: prof.email,
      },
      api_key,
      { expiresIn: '2h' }
    );
    let authData = { token: token, prof: prof };
    return authData;
  },
  prof: async function ({ id }, req) {
    checkAuth(req.isAuth);
    const prof = await Prof.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (!prof) {
      const error = new Error('No professor found!');
      error.code = 404;
      throw error;
    }
    return {
      ...prof._doc,
      _id: prof._id.toString(),
    };
  },
  createLab: async function ({ labInput }, req) {
    checkAuth(req.isAuth);
    const errors = [];
    if (
      validator.isEmpty(labInput.title) ||
      !validator.isLength(labInput.title, { min: 5 })
    ) {
      errors.push({ message: 'Title is invalid.' });
    }

    const prof = await Prof.findById(req.userId);
    if (!prof) {
      const error = new Error('Invalid professor.');
      error.code = 401;
      throw error;
    }
    checkErrors(errors);

    let code;
    while (true) {
      code = crypto.randomBytes(3).toString('hex').toUpperCase();
      let foundLab = await Lab.findOne({ code: code });
      if (!foundLab) {
        break;
      }
    }

    const helperPIN = Math.floor(1000 + Math.random() * 9000);

    const lab = new Lab({
      title: labInput.title,
      helpers: labInput.helpers,
      code: code,
      helperPIN: helperPIN,
      desc: labInput.desc,
      urlTitles: labInput.urlTitles,
      urlLinks: labInput.urlLinks,
      messages: [],
      labMembers: [],
      socketIDQue: [],
      queTimes: [],
      privateChats: [],
      creator: prof,
      submission: labInput.submission,
    });
    const createdLab = await lab.save();
    prof.labs.push(createdLab);
    await prof.save();
    return true;
  },
  getLabs: async function ({ id }, req) {
    checkAuth(req.isAuth);

    const prof = await Prof.findOne({
      _id: mongoose.Types.ObjectId(id),
    }).populate('labs');

    if (!prof) {
      const error = new Error('No professor found!');
      error.code = 404;
      throw error;
    }

    let labs = prof.labs;
    return {
      labs: labs.map((l) => {
        return {
          ...l._doc,
          _id: l._id.toString(),
          createdAt: l.createdAt.toISOString(),
          updatedAt: l.updatedAt.toISOString(),
        };
      }),
    };
  },
  getLab: async function ({ code }, req) {
    checkAuth(req.isAuth);

    const lab = await Lab.findOne({
      code: code,
    });

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    return {
      ...lab._doc,
      _id: lab._doc._id.toString(),
      createdAt: lab._doc.createdAt.toISOString(),
      updatedAt: lab._doc.updatedAt.toISOString(),
    };
  },
  updateLab: async function (
    { code, title, urlTitles, urlLinks, desc, helpers, submission },
    req
  ) {
    checkAuth(req.isAuth);

    const lab = await Lab.findOne({
      code: code,
    });

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    lab.title = title;
    lab.desc = desc;
    lab.urlTitles = urlTitles;
    lab.urlLinks = urlLinks;
    lab.helpers = helpers;
    lab.submission = submission;

    lab.save();
    return true;
  },
  joinLab: async function ({ code, username, helperPIN, socketid }) {
    const lab = await Lab.findOne({
      code: code,
    })
      .populate('creator')
      .populate('messages')
      .populate('labMembers');

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }
    if (!lab.status) {
      const error = new Error('Lab has not started');
      error.code = 404;
      throw error;
    }
    if (lab.helpers.includes(username) && helperPIN != lab.helperPIN) {
      const error = new Error('Lab Helper PIN Incorrect');
      error.code = 404;
      throw error;
    }

    let accountExists = false;
    let labMember;
    for (let i = 0; i < lab.labMembers.length; i++) {
      if (lab.labMembers[i].username === username && lab.labMembers[i].inRoom) {
        const error = new Error('Account already in lab.');
        error.code = 404;
        throw error;
      } else if (lab.labMembers[i].username === username) {
        labMember = lab.labMembers[i];
        labMember.socketid = socketid;
        accountExists = true;
        break;
      }
    }
    if (!accountExists) {
      labMember = new LabMember({
        username: username,
        socketid: socketid,
        inRoom: true,
        lab_id: lab._id,
      });
      lab.labMembers.push(labMember);
      await lab.save();
    } else {
      labMember.inRoom = true;
    }
    await labMember.save();

    return {
      lab: {
        ...lab._doc,
        _id: lab._doc._id.toString(),
        createdAt: lab._doc.createdAt.toISOString(),
        updatedAt: lab._doc.updatedAt.toISOString(),
        messages: lab._doc.messages.map((m) => {
          return {
            ...m._doc,
            _id: m._id.toString(),
            createdAt: m.createdAt.toISOString(),
            updatedAt: m.updatedAt.toISOString(),
          };
        }),
        labMembers: lab._doc.labMembers.map((lm) => {
          return {
            ...lm._doc,
            _id: lm._id.toString(),
          };
        }),
      },
      memberid: labMember._id.toString(),
    };
  },
  memberLeaveLab: async function ({ id }) {
    let labMember = await LabMember.findById(id);
    if (!labMember) {
      const error = new Error('No lab member found.');
      error.code = 404;
      throw error;
    }

    labMember.inRoom = false;
    await labMember.save();
    return true;
  },
  socketMemberLeaveLab: async function ({ id }) {
    const labMember = await LabMember.findOne({ socketid: id });
    if (!labMember) {
      const error = new Error('No lab member found.');
      error.code = 404;
      throw error;
    }
    labMember.inRoom = false;
    await labMember.save();

    const lab = await Lab.findOne(labMember.lab_id);
    return {
      ...lab._doc,
      _id: lab._doc._id.toString(),
      createdAt: lab._doc.createdAt.toISOString(),
      updatedAt: lab._doc.updatedAt.toISOString(),
    };
  },
  startLab: async function ({ id }, req) {
    checkAuth(req.isAuth);

    const lab = await Lab.findById(id);
    if (!lab) {
      const error = new Error('No lab found.');
      error.code = 404;
      throw error;
    }
    if (lab.creator.toString() !== req.userId.toString()) {
      const error = new Error('Not lab owner.');
      error.code = 403;
      throw error;
    }

    lab.status = true;
    lab.socketIDQue = [];
    lab.queTimes = [];
    await lab.save();
    return true;
  },
  endLab: async function ({ id }, req) {
    checkAuth(req.isAuth);

    const lab = await Lab.findById(id).populate('labMembers');
    if (!lab) {
      const error = new Error('No lab found.');
      error.code = 404;
      throw error;
    }
    if (lab.creator.toString() !== req.userId.toString()) {
      const error = new Error('Not lab owner.');
      error.code = 403;
      throw error;
    }

    lab.status = false;
    lab.socketIDQue = [];

    await LabMember.updateMany(
      { lab_id: lab._id, inRoom: true },
      {
        inRoom: false,
      }
    );

    await PrivateChat.updateMany(
      { lab_id: lab._id, active: true },
      {
        active: false,
      }
    );

    await lab.save();
    return true;
  },
  deleteLab: async function ({ id }, req) {
    checkAuth(req.isAuth);

    const lab = await Lab.findById(id);
    if (!lab) {
      const error = new Error('No lab found');
      error.code = 404;
      throw error;
    }
    if (lab.creator.toString() !== req.userId.toString()) {
      const error = new Error('Not lab owner.');
      error.code = 403;
      throw error;
    }

    await LabMember.deleteMany({ lab_id: lab._id });
    await Message.deleteMany({ lab_id: lab._id });

    // Fix here
    for (let i = 0; i < lab.privateChats.length; i++) {
      let privateChat = await PrivateChat.findById(lab.privateChats[i]);
      await PrivateMessage.deleteMany({ private_id: privateChat._id });
      await PrivateChat.findByIdAndRemove(lab.privateChats[i]);
    }

    await Lab.findByIdAndRemove(id);
    const prof = await Prof.findById(req.userId);
    prof.labs.pull(id);
    await prof.save();
    return true;
  },
  labExist: async function ({ code }) {
    const lab = await Lab.findOne({ code: code });
    if (!lab) {
      const error = new Error('No lab found.');
      error.code = 404;
      throw error;
    }
    return true;
  },
  createMessage: async function ({ messageInput }) {
    const lab = await Lab.findOne({
      _id: mongoose.Types.ObjectId(messageInput.lab_id),
    });
    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    const message = new Message({
      sender: messageInput.sender,
      accountType: messageInput.accountType,
      text: messageInput.text,
      lab_id: lab._id,
    });

    lab.messages.push(message);
    await lab.save();
    await message.save();

    message._id = lab._id.toString();
    message.createdAt = message.createdAt.toISOString();
    message.updatedAt = message.updatedAt.toISOString();

    return {
      ...message._doc,
      _id: message._doc._id.toString(),
      createdAt: message._doc.createdAt.toISOString(),
      updatedAt: message._doc.updatedAt.toISOString(),
      labCode: lab.code,
    };
  },
  getQue: async function ({ lab_id }) {
    const lab = await Lab.findById(lab_id).populate('socketIDQue');

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    const sum = lab.queTimes.reduce((a, b) => a + b, 0);
    const avg = Math.floor(sum / lab.queTimes.length) || 0;

    return {
      que: lab.socketIDQue.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
          lab_id: q._id.toString(),
          createdAt: q.createdAt.toISOString(),
          updatedAt: q.updatedAt.toISOString(),
        };
      }),
      averageTime: avg,
    };
  },
  joinQue: async function ({ queObj }) {
    let lab = await Lab.findById(queObj.lab_id);

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    const newQueObj = new QueObj({
      ...queObj,
    });
    await newQueObj.save();

    lab.socketIDQue.push(newQueObj);
    await lab.save();

    lab = await Lab.findById(queObj.lab_id).populate('socketIDQue');

    const sum = lab.queTimes.reduce((a, b) => a + b, 0);
    const avg = Math.floor(sum / lab.queTimes.length) || 0;

    return {
      que: lab.socketIDQue.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
          lab_id: q._id.toString(),
          createdAt: q.createdAt.toISOString(),
          updatedAt: q.updatedAt.toISOString(),
        };
      }),
      averageTime: avg,
    };
  },
  leaveQue: async function ({ lab_id, socketid, helpingTime }) {
    const lab = await Lab.findById(lab_id).populate('socketIDQue');

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    if (helpingTime) {
      lab.queTimes.push(helpingTime);
    }

    for (let i = 0; i < lab.socketIDQue.length; i++) {
      if (lab.socketIDQue[i].socketid === socketid) {
        lab.socketIDQue.splice(i, 1);
        break;
      }
    }
    await lab.save();
    await QueObj.deleteOne({ socketid: socketid });

    const sum = lab.queTimes.reduce((a, b) => a + b, 0);
    const avg = Math.floor(sum / lab.queTimes.length) || 0;

    return {
      que: lab.socketIDQue.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
          lab_id: q._id.toString(),
          createdAt: q.createdAt.toISOString(),
          updatedAt: q.updatedAt.toISOString(),
        };
      }),
      averageTime: avg,
    };
  },
  getFirstInQueAndShift: async function ({ lab_id }) {
    const lab = await Lab.findById(lab_id);

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }
    if (!lab.socketIDQue.length > 0) {
      const error = new Error('Que empty');
      error.code = 404;
      throw error;
    }

    lab.socketIDQue.shift();
    await lab.save();
    return lab.socketIDQue;
  },
  createPrivateChat: async function ({ lab_id, student, staff }) {
    const lab = await Lab.findOne({
      _id: mongoose.Types.ObjectId(lab_id),
    });

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    const privateChat = new PrivateChat({
      student: student,
      staff: staff,
      lab_id: lab._id,
      messages: [],
    });

    lab.privateChats.push(privateChat);
    await lab.save();
    await privateChat.save();

    return {
      ...privateChat._doc,
      _id: privateChat._id.toString(),
    };
  },
  createPrivateMessage: async function ({ privateMessageInput }) {
    const privateChat = await PrivateChat.findById(
      privateMessageInput.private_id
    );

    if (!privateChat) {
      const error = new Error('No private chat found!');
      error.code = 404;
      throw error;
    }

    const privatemessage = new PrivateMessage({
      sender: privateMessageInput.sender,
      accountType: privateMessageInput.accountType,
      text: privateMessageInput.text,
      private_id: privateMessageInput.private_id,
    });

    privateChat.messages.push(privatemessage);
    await privatemessage.save();
    await privateChat.save();

    return {
      ...privatemessage._doc,
      _id: privatemessage._doc._id.toString(),
      createdAt: privatemessage._doc.createdAt.toISOString(),
      updatedAt: privatemessage._doc.updatedAt.toISOString(),
    };
  },
  sendFeedback: async function ({ id, value, feedback }) {
    const privateChat = await PrivateChat.findById(id);

    if (!privateChat) {
      const error = new Error('No private chat found!');
      error.code = 404;
      throw error;
    }

    if (value > 0) {
      privateChat.rating = value;
    }
    if (feedback && feedback.length > 0) {
      privateChat.feedback = feedback;
    }

    privateChat.save();
    return true;
  },
  addSubmission: async function ({ member_id, submissionLink }) {
    const labmember = await LabMember.findById(member_id);

    if (submissionLink.substring(0, 3) === 'www') {
      submissionLink = 'https://' + submissionLink;
    }

    labmember.submissionLink = submissionLink;
    labmember.save();
    return labmember.submissionLink;
  },
  getSubmission: async function ({ member_id }) {
    const labmember = await LabMember.findById(member_id);

    if (!labmember.submissionLink) {
      return 'No submission link set';
    } else {
      return labmember.submissionLink;
    }
  },
  requireCall: async function ({ private_chat_id }) {
    const privateChat = await PrivateChat.findById(private_chat_id);

    if (!privateChat) {
      const error = new Error('No Private Chat found.');
      error.code = 404;
      throw error;
    }

    privateChat.requiredCall = true;
    privateChat.save();

    return true;
  },
  getActiveMembers: async function ({ lab_id }, req) {
    checkAuth(req.isAuth);

    const lab = await Lab.findById(lab_id);

    if (!lab) {
      const error = new Error('No Lab found.');
      error.code = 404;
      throw error;
    }

    const result = await LabMember.find({
      lab_id: lab_id,
      inRoom: true,
    }).countDocuments();

    return result;
  },
  getActiveChats: async function ({ lab_id }, req) {
    checkAuth(req.isAuth);

    const lab = await Lab.findById(lab_id);

    if (!lab) {
      const error = new Error('No Lab found.');
      error.code = 404;
      throw error;
    }

    const result = await PrivateChat.find({
      lab_id: lab_id,
      active: true,
    }).countDocuments();

    return result;
  },
  stopHelp: async function ({ priv_id }) {
    const privateChat = await PrivateChat.findById(priv_id);

    privateChat.active = false;

    privateChat.save();

    return true;
  },
  getPrivateChat: async function ({ id, staff }, req) {
    checkAuth(req.isAuth);
    const chats = await PrivateChat.find({ staff: staff });

    return chats.map((p) => {
      return {
        ...p._doc,
        _id: p._id.toString(),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      };
    });
  },
};
