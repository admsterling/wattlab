const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  approved: {
      type: Boolean,
      default: false
  },
  labs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lab'
    }
  ]
});

module.exports = mongoose.model('Prof', profSchema);
