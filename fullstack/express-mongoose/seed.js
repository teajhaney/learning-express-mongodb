const Product = require('./model/product');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/farmStand')
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(error => {
    console.log('error connecting to mongo');
    console.log(error);
  });

// const p = new Product({
//   name: 'Apple',
//   price: 1.99,
//   category: 'fruit',
// });

// Sample product data

const seedProducts = [
  {
    name: 'Apple',
    price: 1.99,
    category: 'fruit',
  },
  {
    name: 'Carrot',
    price: 0.99,
    category: 'vegetable',
  },
  {
    name: 'Milk',
    price: 2.49,
    category: 'dairy',
  },
  {
    name: 'Banana',
    price: 1.29,
    category: 'fruit',
  },
  {
    name: 'Broccoli',
    price: 1.89,
    category: 'vegetable',
  },
];

Product.deleteMany({});

Product.insertMany(seedProducts)
  .then(res => {
    console.log('Products inserted:');
    console.log(res);
    mongoose.connection.close(); // Close connection after insertion
  })
  .catch(err => {
    console.log('Insert error:', err);
  });
