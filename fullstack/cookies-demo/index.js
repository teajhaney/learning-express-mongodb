const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, res) => {
	const {name}= req.cookies;
  res.send(`${name} Welcome to the cookies DEMO`);
});

app.get('/setname', (req, res) => {
  res.cookie('name', 'teajhaney');
  res.send('Name cookie set');
});
app.listen(3000, () => {
  console.log(`server started on port:  3000`);
});
