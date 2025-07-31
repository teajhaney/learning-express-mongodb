const Image = require('../model/image');
const { uplaodToCloudinary } = require('../helpers/cloudinary-helpers');
const { asyncWrapper } = require('../utils');
const fs = require('fs');

const imageUpload = asyncWrapper(async (req, res) => {
  //check if file is available in req
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded. Please upload an image.',
    });
  }

  //upload to cloudinary
  const { url, publicID } = await uplaodToCloudinary(req.file.path);

  //store image url and public ID to mongodb
  const uplaodedImage = await Image.create({
    url,
    publicID,
    uploadBy: req.userInfo.userID,
  });

  //delete from local Storage
  fs.unlinkSync(req.file.path);

  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully',
    data: uplaodedImage,
  });
});

const fetchAllImage = asyncWrapper(async (req, res) => {
  const allImages = await Image.find();
  if (allImages) {
    res.status(200).json({
      succues: true,
      data: allImages,
    });
  }
});

module.exports = { imageUpload, fetchAllImage };
