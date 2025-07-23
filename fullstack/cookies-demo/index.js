const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('password'));

app.get('/', (req, res) => {
  const { name } = req.cookies;
  const { fruit } = req.signedCookies;
  res.send(
    `${name} Welcome to the cookies DEMO, I know your favorite fruit is ${fruit}`
  );
});

app.get('/setname', (req, res) => {
  res.cookie('name', 'Yusuf');
  res.send('Name cookie set');
});
 
app.get('/getsignedcookie', (req, res) => {
  res.cookie('fruit', 'apple', { signed: true });
  res.send('Signed cookie for fruit set');
});
app.listen(3000, () => {
  console.log(`server started on port:  3000`);
});
