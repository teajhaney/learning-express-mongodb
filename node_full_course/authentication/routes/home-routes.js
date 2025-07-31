const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();

//authentication and authorisation route
router.get('/', authMiddleware, (req, res) => {
  const { username, userID, role } = req.userInfo;
  res.json({
    message: 'welcome to the home page',
    user: {
      username,
      userID,
      role,
    },
  });
});

module.exports = router;
