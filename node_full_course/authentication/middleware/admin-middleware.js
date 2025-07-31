require('dotenv').config();
const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  if (req.userInfo.role !== 'admin') {
    return res.status(500).json({
      success: false,
      message: 'Access denied. You are not an admin',
    });
  }
  next();
};

module.exports = adminMiddleware;
