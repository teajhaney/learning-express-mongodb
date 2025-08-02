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
    //filter
    {
      $match: {
        inStock: true,
        price: { $gte: 100 },
      },
    },
    //group documents
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        averagePrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    length: products.length,
    data: products,
  });
});

const getProductAnalysis = asyncWrapper(async (req, res) => {
  const products = await Product.aggregate([
    //filter
    {
      $match: {
        category: 'Tech',
      },
    },
    //group documents
    {
      $group: {
        _id: null,
        count: { $sum: '$price ' },
        averagePrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        averagePrice: 1,
        minPrice: 1,
        maxPrice: 1,
        priceRange: {
          $subtract: ['$maxPrice', '$minPrice'],
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    length: products.length,
    data: products,
  });
});

module.exports = { insertProducts, getProductStats, getProductAnalysis };
