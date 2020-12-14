const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
        type: String,
    },
    git: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Prof',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lab', labSchema);
