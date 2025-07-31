const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/uplaod-middleware');
const { imageUpload } = require('../controllers/upload-controller');
const { asyncWrapper } = require('../utils');
const Image = require('../model/image');
const router = express.Router();

//get images
router.get(
  '/',
  authMiddleware,
  asyncWrapper(async (req, res) => {
    const AllImages = await Image.find();
    res.status(200).json({
      succues: true,
      data: AllImages,
    });
  })
);

//uplaod image
router.post(
  '/upload',
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single('image'),
  imageUpload
);
module.exports = router;
