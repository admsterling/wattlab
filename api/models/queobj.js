const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queObjSchema = new Schema(
  {
    socketid: {
      type: String,
      required: true,
    },
    queType: {
      type: String,
      enum: ['Help', 'Marking'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    requireProf: {
      type: Boolean,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    lab_id: {
      type: Schema.Types.ObjectId,
      ref: 'Lab',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QueObj', queObjSchema);
