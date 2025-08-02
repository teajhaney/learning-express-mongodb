const express = require('express');
const router = express.Router();
const {
  createAuthor,
  createBook,
  getBookByID,
} = require('../controllers/book-controller');

router.post('/author', createAuthor);
router.post('/book', createBook);
router.get('/book/:id', getBookByID);

module.exports = router;
