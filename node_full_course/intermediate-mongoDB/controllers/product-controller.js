const Product = require('../model/products');
const { asyncWrapper } = require('../utils');
const { seedProducts } = require('../database/dummy-data');

const insertProducts = asyncWrapper(async (req, res) => {
  await Product.deleteMany({});
  const result = await Product.insertMany(seedProducts, {
    validateBeforeSave: true,
  });
  console.log('Products seeded successfully');
  res.status(200).json({
    success: true,
    message: `Inserted ${result.length} products successfully`,
    data: result,
  });
});

const getProductStats = asyncWrapper(async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: {
        inStock: true,
        price: { $gte: 100 },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    length: products.length,
    data: products,
  });
});

module.exports = { insertProducts, getProductStats };
