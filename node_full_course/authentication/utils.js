const bcrypt = require('bcrypt');

// Async wrapper to handle try-catch
const asyncWrapper = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      if (error.name === 'CastError') {
        return res.status(404).json({
          success: false,
          message: 'Please provide valid credentials',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Something went wrong, please try again!',
        error: error.message,
      });
    }
  };
};

const hashPassword = password => {
  return bcrypt.hash(password, 10);
};
const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  asyncWrapper,
  hashPassword,
  comparePassword,
};
