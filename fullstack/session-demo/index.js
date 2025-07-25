const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = {
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(
    `You have viewed this page ${req.session.views} times. 
  `
  );
});
  
app.get('/register', (req, res) => {
  const { username = 'anonymous' } = req.query;
  if (username) {
    req.session.username = username;
    res.send(`Username ${username} registered successfully.`);
  } else {
    res.send('Please provide a username.');
  }
});

app.get('/greet', (req, res) => {
  if (req.session.username) {
    res.send(`Hello, ${req.session.username}!`);
  } else {
    res.send('Please register a username first.');
  }
});

app.listen(3000, () => {
  console.log(`server started on port:  3000`);
});
  