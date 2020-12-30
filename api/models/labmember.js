const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabMemberSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  inRoom: {
    type: Boolean,
    required: true,
    default: false,
  },
  socketid: {
    type: String,
    required: true,
  },
  lab_id: {
    type: Schema.Types.ObjectId,
    ref: 'Lab',
    required: true,
  },
});

module.exports = mongoose.model('LabMember', LabMemberSchema);
