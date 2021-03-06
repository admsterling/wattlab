const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privateChatSchema = new Schema(
  {
    student: {
      type: String,
      required: true,
    },
    staff: {
      type: String,
      required: true,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PrivateMessage',
        required: true,
      },
    ],
    rating: {
      type: Number,
      required: false,
    },
    feedback: {
      type: String,
      required: false,
    },
    response: {
      type: String,
      required: false,
    },
    requiredCall: {
      type: Boolean,
      required: true,
      default: false,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    lab_id: {
      type: Schema.Types.ObjectId,
      ref: 'Lab',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PrivateChat', privateChatSchema);
