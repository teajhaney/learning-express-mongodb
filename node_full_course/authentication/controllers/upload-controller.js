const Image = require('../model/image');
const { uplaodToCloudinary } = require('../helpers/cloudinary-helpers');
const { asyncWrapper } = require('../utils');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const imageUpload = asyncWrapper(async (req, res) => {
  //check if file is available in req
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded. Please upload an image.',
    });
  }

  //upload to cloudinary.
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

//fetch image
const fetchAllImage = asyncWrapper(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
  const totalImages = await Image.countDocuments();
  const totalPages = Math.ceil(totalImages / limit);

  const sortObject = {};
  sortObject[sortBy] = sortOrder;

  const allImages = await Image.find().sort(sortObject).skip(skip).limit(limit);

  if (allImages) {
    res.status(200).json({
      succues: true,
      currentPage: page,
      totalPages: totalPages,
      totalImages: totalImages,
      message: 'All images fetched successfully',
      data: allImages,
    });
  }
});

const deleteImage = asyncWrapper(async (req, res) => {
  const imageId = req.params.id;
  const image = await Image.findById(imageId);
  if (!image) {
    return res.status(404).json({
      success: false,
      message: 'Image not found',
    });
  }

  //check if this image was uplaoded by the current user who is trying to delete

  if (image.uploadBy.toString() !== req.userInfo.userID) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to delete this image',
    });
  }
  //delete from cloudinary
  await cloudinary.uploader.destroy(image.publicID);

  //delete from mongodb
  await Image.findByIdAndDelete(imageId);
  res.status(200).json({
    success: true,
    message: 'Image deleted successfully',
  });
});

module.exports = { imageUpload, fetchAllImage, deleteImage };
