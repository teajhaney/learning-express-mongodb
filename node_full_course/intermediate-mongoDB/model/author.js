const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Author = model('Author', authorSchema);

module.exports = Author;
