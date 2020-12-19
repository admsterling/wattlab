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
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

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
      { expiresIn: '1h' }
    );
    let authData = { token: token, prof: prof }
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
};
