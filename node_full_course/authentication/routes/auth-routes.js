const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth-controller');


//authentication and authorisation route 
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
