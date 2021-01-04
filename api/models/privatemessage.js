const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privateMessageSchema = new Schema(
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
    private_id: {
      type: Schema.Types.ObjectId,
      ref: 'PrivateChat',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PrivateMessage', privateMessageSchema);
