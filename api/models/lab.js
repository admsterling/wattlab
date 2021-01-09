const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    helpers: [
      {
        type: String,
        required: true,
      },
    ],
    code: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    submission: {
      type: Boolean,
      default: false,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
      }
    ],
    privateChats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PrivateMessage',
        required: true,
      }
    ],
    labMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LabMember',
        required: true,
      }
    ],
    socketIDQue: [
      {
        type: String,
        required: true,
      }
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Prof',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lab', labSchema);
