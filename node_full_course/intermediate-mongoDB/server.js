require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const connectDB = require('./database/db');
const productRoutes = require('./routes/product-routes');
const bookRoutes = require('./routes/book-routes');

//connect to database
connectDB();

//middleware-> express.json()
app.use(express.json());
//product routes
app.use('/api/products', productRoutes);
//book routes
app.use('/api/reference', bookRoutes);

//start server
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
