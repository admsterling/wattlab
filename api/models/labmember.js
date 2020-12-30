const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labMemberSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    socketid: {
      type: String,
      enum: ['STUDENT', 'HELPER', 'PROFESSOR'],
      required: true,
    },
    lab_id: {
      type: Schema.Types.ObjectId,
      ref: 'Lab',
      required: true,
    },
  },
);

module.exports = mongoose.model('LabMember', labMemberSchema);
