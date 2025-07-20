const express = require('express');
const path = require('path');
const AppError = require('../express-middleware/appError');
const app = express();
const port = 3000;
const Product = require('./model/product');
const { default: mongoose } = require('mongoose');
const methodOverride = require('method-override');

mongoose
  .connect('mongodb://localhost:27017/farmStand')
  .then(() => {
    console.log('connected to mongdb');
  })
  .catch(error => {
    console.log('error connecting to mongo');
    console.log(error);
  });
//middleware
// app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
//override post
app.use(methodOverride('_method'));

function wrappAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(error => {
      if (error.name === 'CastError') {
        return next(new AppError(400, 'Invalid ID'));
      } else if (error.name === 'ValidationError') {
        return next(new AppError(400, error.message));
      }
      next(error);
    });
  };
}

// all products route
app.get(
  '/products',
  wrappAsync(async (req, res) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.render('products/index', { products, category });
    } else {
      const products = await Product.find({});
      res.render('products/index', { products, category: 'All' });
    }
  })
);

//new products
app.get(
  '/products/new',
  wrappAsync(async (req, res, next) => {
    const categories = await Product.find({}).distinct('category');
    res.render('products/new', { categories });
  })
);

//add products
app.post(
  '/products',
  wrappAsync(async (req, res, next) => {
    const { name, price, category } = req.body;
    const product = await Product.insertOne({
      name,
      price,
      category,
    });
    res.redirect(`/products/${product._id}`);
  })
);

//products by id route
// app.get('/products/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const product = await Product.findById(id);
//     if (!product) {
//       throw new new AppError(404, 'Product not found')();
//     }
//     res.render('products/show', { product });
//   } catch (err) {
//     if (err.name === 'CastError') {
//       return next(new AppError(400, 'Invalid product ID'));
//     }
//     next(err);
//   }
// });
app.get(
  '/products/:id',
  wrappAsync(async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      throw new new AppError(404, 'Product not found')();
    }
    res.render('products/show', { product });
  })
);

//edit products
app.get('/products/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    const categories = await Product.find({}).distinct('category');
    res.render('products/edit', { product, categories });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new AppError(400, 'Invalid product ID'));
    }
    next(error);
  }
});

//update products
app.put(
  '/products/:id',
  wrappAsync(async (req, res, next) => {
    const id = req.params.id;
    const { name, price, category } = req.body;
    await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
      },
      { runValidators: true }
    );
    res.redirect(`/products/${id}`);
  })
);

//update products
app.delete(
  '/products/:id',
  wrappAsync(async (req, res, next) => {
    const id = req.params.id;
    //   const { name, price, category } = req.body;
    await Product.findByIdAndDelete(id);
    res.redirect('/products/');
  })
);

app.use((err, req, res, next) => {
  const { statusCode = 501, message = 'Something went wrong' } = err;
  res.status(statusCode).send(`${statusCode} - ${message}`);
  console.error(err);
  //   res.status(500).send('Something broke!');
  //   next(err);
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
