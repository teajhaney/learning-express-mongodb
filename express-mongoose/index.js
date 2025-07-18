const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const Product = require('./model/product');
const { default: mongoose } = require('mongoose');
const methodOverride = require('method-override');

mongoose
  .connect('mongodb://localhost:27017/farmStand', {
    useNewUrlParser: true,
  })
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

// all products route
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  const category = await Product.find({}).distinct('category');
  res.render('products/index', { products, category });
});

//new products
app.get('/products/new', async (req, res) => {
  const categories = await Product.find({}).distinct('category');
  res.render('products/new', { categories });
});

//add products
app.post('/products', async (req, res) => {
  const { name, price, category } = req.body;
  await Product.insertOne({
    name,
    price,
    category,
  });
  res.redirect('/products');
});

//products by id route
app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  res.render('products/show', { product });
});

//edit products
app.get('/products/:id/edit', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  const categories = await Product.find({}).distinct('category');
  res.render('products/edit', { product, categories });
});

//update products
app.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const { name, price, category } = req.body;
  await Product.findByIdAndUpdate(id, {
    name,
    price,
    category,
  });
  res.redirect(`/products/${id}`);
});

//update products
app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;
  //   const { name, price, category } = req.body;
  await Product.findByIdAndDelete(id);
  res.redirect(`/products`);
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
