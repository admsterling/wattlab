const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Prof = require('../models/prof');
const Lab = require('../models/lab');
const Message = require('../models/message');
const LabMember = require('../models/labmember');
const { api_key } = require('../../config');

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

    const lab = new Lab({
      title: labInput.title,
      helpers: labInput.helpers,
      code: code,
      desc: labInput.desc,
      url: labInput.url,
      messages: [],
      labMembers: [],
      socketIDQue: [],
      creator: prof,
    });
    const createdLab = await lab.save();
    prof.labs.push(createdLab);
    await prof.save();
    return {
      ...createdLab._doc,
      _id: createdLab._id.toString(),
      createdAt: createdLab.createdAt.toISOString(),
      updatedAt: createdLab.updatedAt.toISOString(),
    };
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
  joinLab: async function ({ code, username, socketid }, req) {
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
    await lab.save();
    return true;
  },
  endLab: async function ({ id }, req) {
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

    lab.status = false;
    lab.socketIDQue = [];
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

    for (let i = 0; i < lab.labMembers.length; i++) {
      await LabMember.findByIdAndDelete(lab.labMembers[i]._id);
    }
    for (let i = 0; i < lab.messages.length; i++) {
      await Message.findByIdAndDelete(lab.messages[i]._id);
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
    const lab = await Lab.findById(lab_id);

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    return lab.socketIDQue;
  },
  joinQue: async function ({ lab_id, socketid }) {
    const lab = await Lab.findById(lab_id);

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    lab.socketIDQue.push(socketid);
    await lab.save();

    return lab.socketIDQue;
  },
  leaveQue: async function ({ lab_id, socketid }) {
    const lab = await Lab.findById(lab_id);

    if (!lab) {
      const error = new Error('No lab found!');
      error.code = 404;
      throw error;
    }

    lab.socketIDQue.splice(lab.socketIDQue.indexOf(socketid), 1);
    await lab.save();

    return lab.socketIDQue;
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
};
