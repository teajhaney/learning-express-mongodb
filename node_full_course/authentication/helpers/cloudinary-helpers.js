const cloudinary = require('../config/cloudinary');

const uplaodToCloudinary = async file => {
  try {
    const result = await cloudinary.uploader.upload(file);
    return {
      url: result.secure_url,
      publicID: result.public_id,
    };
  } catch (error) {
    console.error('error while uploadning to cloudinary', error);
  }
};

module.exports = { uplaodToCloudinary };
