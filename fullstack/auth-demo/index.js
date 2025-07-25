const express = require('express');
const app = express();
const path = require('path');
const User = require('./model/user');
const connectDB = require('./mongoose');
const { hashPassword, comparePassword } = require('./utils');
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send('This is the home page');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    await user.save();
    res.redirect('/');
  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).send('Something went wrong during registration.');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const isPasswordValid = await comparePassword(password, user.password);
    if (!user) {
      return res.status(400).send('User not found.');
    }
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password.');
    }

    res.redirect('/secret');
  } catch (err) {
    console.error('Login failed:', err);
    return res.status(500).send('Something went wrong during login.');
  }
});

app.get('/secret', async (req, res) => {
  res.send('This is a secret page, can be viewd by logged in users only!!');
});

app.listen(3000, () => {
  console.log(`server started on port:  3000`);
});
