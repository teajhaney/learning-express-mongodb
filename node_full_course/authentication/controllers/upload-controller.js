const Image = require('./model/image');
const { uplaodToCloudinary } = require('../helpers/cloudinary-helpers');

const imageUpload = async (req, res) => {
  try {
    //check if file is available in req

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please upload an image.',
      });
    }

    //upload to cloudinary

    const [url, publicID] = await uplaodToCloudinary(req.file.path);

    //store image url and public ID to mongodb
    const uplaodedImage = await Image.create({
      url,
      publicID,
      uploadBy: req.userInfo.userID,
    });

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: uplaodedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).jsoan({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

module.exports = { imageUpload };
