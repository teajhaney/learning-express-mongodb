const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const {
  registerUser,
  loginUser,
  changePassword,
} = require('../controllers/auth-controller');

//authentication and authorisation route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);
module.exports = router;
