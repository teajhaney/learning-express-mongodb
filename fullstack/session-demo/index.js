const express = require('express');
const app = express();
const session = require('express-session');

app.use(
  session({
    secret: 'mysecret',
  })
);

app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(
    `You have viewed this page ${req.session.views } times. 
  `
  );
});

app.listen(3000, () => {
  console.log(`server started on port:  3000`);
});
