const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicID: {
      type: String,
      required: true,
    },
    uploadBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Image = model('Image', imageSchema);

module.exports = Image;
