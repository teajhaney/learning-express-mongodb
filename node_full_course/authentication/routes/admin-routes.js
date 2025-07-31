const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

//authentication and authorisation route
router.get('/', authMiddleware, adminMiddleware, (req, res) => {
  const { username, userID, role } = req.userInfo;
  res.json({
    message: 'welcome to the Admin page',
    user: {
      username,
      userID,
      role,
    },
  });
});

module.exports = router;
