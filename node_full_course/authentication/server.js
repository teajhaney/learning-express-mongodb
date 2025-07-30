require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const app = express();

const connectDB = require('./database/db');

//connect to database
connectDB();

//middleware-> express.json()
app.use(express.json());

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
