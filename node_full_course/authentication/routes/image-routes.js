const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/uplaod-middleware');
const {
  imageUpload,
  fetchAllImage,
} = require('../controllers/upload-controller');

const Image = require('../model/image');
const router = express.Router();

//get images
router.get('/get', authMiddleware, fetchAllImage);

//uplaod image
router.post(
  '/upload',
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single('image'),
  imageUpload
);
module.exports = router;
