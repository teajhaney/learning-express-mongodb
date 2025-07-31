const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/auth-middleware');
const imageUpload = require('../controllers/upload-controller');
const router = express.Router();

//get images
router.get(
  '/',
  authMiddleware,
  asyncWrapper(async (req, res) => {
    const AllImages= await Image.find();
    res.status(200).json({
      succues: true,
      data: AllImages,
    });
  })
);

//uplaod image
router.post('/', authMiddleware, adminMiddleware, imageUpload);
module.exports = router;
