const express = require('express');
const app = express();
const sheltersRouter = require('./routes/shelters');
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Shelter API');
});

app.use('/shelters', sheltersRouter);

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
