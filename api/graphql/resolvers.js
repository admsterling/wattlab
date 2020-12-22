const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Prof = require('../models/prof');
const Lab = require('../models/lab');
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

    const count = await Lab.countDocuments();
    const code = String('00000' + count).slice(-5);
    const lab = new Lab({
      title: labInput.title,
      helpers: labInput.helpers,
      code: code,
      desc: labInput.desc,
      url: labInput.url,
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
};
