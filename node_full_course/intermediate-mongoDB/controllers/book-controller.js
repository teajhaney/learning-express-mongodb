const Author = require('../model/author');
const Book = require('../model/book');
const { asyncWrapper } = require('../utils');

const createAuthor = asyncWrapper(async (req, res) => {
  const author = await Author.create(req.body);
  res.status(201).json({
    success: true,
    data: author,
  });
});
const createBook = asyncWrapper(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    success: true,
    data: book,
  });
});
const getBookByID = asyncWrapper(async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author');

  res.status(201).json({
    success: true,
    data: book,
  });
});

module.exports = { createAuthor, createBook, getBookByID };
