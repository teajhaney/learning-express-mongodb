require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const authRoutes = require('./routes/auth-routes');
const connectDB = require('./database/db');

//connect to database
connectDB();

//middleware-> express.json()
app.use(express.json());

//user routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
