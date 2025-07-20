const express = require('express');
const morgan = require('morgan');
const AppError = require('./appError');
const app = express();
const port = 3000;

app.use(morgan('dev'));
//intro routes
app.get('/', (req, res) => {
  res.send('Welcome to our Home page');
});

//get dog
app.get('/dogs', (req, res) => {
  res.send('woofs');
});

app.get('/error', (req, res) => {
  throw new Error('This is an error');
});
app.get('/error2', (req, res) => {
  throw new AppError(404, 'This is a custom error');
});

app.use((err, req, res, next) => {
  console.log('I am an error');
  console.error(err);
  //   res.status(500).send('Something broke!');
  next(err);
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
  