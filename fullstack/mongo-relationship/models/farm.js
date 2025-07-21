const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
mongoose
  .connect('mongodb://localhost:27017/relationshipDemo')
  .then(() => {
    console.log('connected to mongdb');
  })
  .catch(error => {
    console.log('error connecting to mongo');
    console.log(error);
  });

// products schema
const productSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter'],
  },
});

const Product = model('Product', productSchema);

// Product.insertMany([
//   { name: 'Apple', price: 1.2, season: 'fall' },
//   { name: 'Banana', price: 0.5, season: 'summer' },
//   { name: 'Carrot', price: 0.8, season: 'spring' },
//   { name: 'Dairy Milk', price: 2.5, season: 'summer' },
//   { name: 'Eggplant', price: 1.5, season: 'summer' },
// ]);

//farm schema
const farmSchema = new Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Farm = model('Farm', farmSchema);

const makeFarm = async () => {
  const farm = new Farm({
    name: 'Sunny Acres',
    city: 'Springfield',
  });

  const apple = await Product.findOne({ name: 'Apple' });
  const banana = await Product.findOne({ name: 'Banana' });
  farm.products.push(apple, banana);
  await farm.save();
  console.log(farm);
};

// makeFarm();

//add prodyct to farm
const addProductToFarm = async (farmId, productId) => {
  const farm = await Farm.findOne({ name: 'Sunny Acres' });
  if (farm) {
    const product = await Product.findOne({ name: 'Carrot' });
    if (product) {
      farm.products.push(product);
      await farm.save();
      console.log(`Added ${product.name} to ${farm.name}`);
    } else {
      console.log('Product not found');
    }
  } else {
    console.log('Farm not found');
  }
};

// addProductToFarm();

Farm.findOne({ name: 'Sunny Acres' }).then(farm => {
  if (farm) {
    console.log('Farm found:', farm);
  } else {
    console.log('Farm not found');
  }
});
