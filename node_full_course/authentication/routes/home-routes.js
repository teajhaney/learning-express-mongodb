const express = require('express');
const router = express.Router();

//authentication and authorisation route
router.get('/', (req, res) => {
  res.json({
    message: 'welcome to the home page',
  });
});

module.exports = router;
