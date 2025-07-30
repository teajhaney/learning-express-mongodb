const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const User = require('./model/user');
const connectDB = require('./mongoose');
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 },
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  next();
};

app.get('/', (req, res) => {
  res.send('This is the home page');
});

app.get('/register', (req, res) => {
  if (req.session.user_id) {
    return res.redirect('/secret');
  } else {
    res.render('register');
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({
      username,
      password,
    });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/secret');
  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).send('Something went wrong during registration.');
  }
});

app.get('/login', async (req, res) => {
  if (req.session.user_id) {
    return res.redirect('/secret');
  } else {
    res.render('login');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findByUsername(username, password);
    if (foundUser) {
      req.session.user_id = foundUser._id;
      res.redirect('/secret');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error('Login failed:', err);
    return res.status(500).send('Something went wrong during login.');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out.');
    }
    res.redirect('/login');
  });
});

app.get('/secret', requireLogin, (req, res) => {
  res.render('secret');
});

app.listen(3000, () => {
  console.log(`server started on port:  3000`);
});
