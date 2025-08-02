const express = require('express');
const router = express.Router();
const {
  insertProducts,
  getProductStats,
} = require('../controllers/product-controller');

router.post('/add', insertProducts);
router.get('/get', getProductStats);

module.exports = router;
