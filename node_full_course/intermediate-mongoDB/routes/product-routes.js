const express = require('express');
const router = express.Router();
const {
  insertProducts,
  getProductStats,
  getProductAnalysis,
} = require('../controllers/product-controller');

router.post('/add', insertProducts);
router.get('/stats', getProductStats);
router.get('/analysis', getProductAnalysis);

module.exports = router;
