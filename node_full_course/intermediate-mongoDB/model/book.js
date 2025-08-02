const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
  },
  { timestamps: true }
);

const Book = model('Book', bookSchema);

module.exports = Book;
