require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const imageRoutes = require('./routes/image-routes');
const connectDB = require('./database/db');
const { image } = require('./config/cloudinary');

//connect to database
connectDB();

//middleware-> express.json()
app.use(express.json());

//user routes
app.use('/api/auth', authRoutes);

//home routes
app.use('/api/home', homeRoutes);
//admin routes
app.use('/api/admin', adminRoutes);
//image routes
app.use('/api/image', imageRoutes);

//start server
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
