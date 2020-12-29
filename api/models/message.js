const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ['STUDENT', 'HELPER', 'PROFESSOR'],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    lab_id: {
      type: Schema.Types.ObjectId,
      ref: 'Lab',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
