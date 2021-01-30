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
      required: true,
    },
    helperPIN: {
      type: String,
      required: true,
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
      },
    ],
    privateChats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PrivateMessage',
        required: true,
      },
    ],
    labMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LabMember',
        required: true,
      },
    ],
    socketIDQue: [
      {
        type: Schema.Types.ObjectId,
        ref: 'QueObj',
        required: true,
      },
    ],
    queTimes: {
      times: [
        {
          type: Number,
          required: false,
        },
      ],
      total: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Prof',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lab', labSchema);
