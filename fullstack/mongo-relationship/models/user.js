// const express = require('express');
// const path = require('path');
// const AppError = require('../express-middleware/appError');
// const app = express();
// const port = 3000;
// const Product = require('./model/product');
const { default: mongoose } = require('mongoose');
// const methodOverride = require('method-override');

mongoose
  .connect('mongodb://localhost:27017/relationshipDemo')
  .then(() => {
    console.log('connected to mongdb');
  })
  .catch(error => {
    console.log('error connecting to mongo');
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name cannot be empty'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name cannot be empty'],
  },
  addresses: [
    {
      street: {
        type: String,
        required: [true, 'Street cannot be empty'],
      },
      city: {
        type: String,
        required: [true, 'City cannot be empty'],
      },
      state: {
        type: String,
        required: [true, 'State cannot be empty'],
      },
      country: {
        type: String,
        required: [true, 'Zip code cannot be empty'],
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    addresses: [
      {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
      },
    ],
  });
  const res = await user.save();
  console.log(res);
};

// makeUser();

const addAddress = async id => {
  {
    const user = await User.findById(id);
    if (user) {
      user.addresses.push({
        street: '456 Elm St',
        city: 'Othertown',
        state: 'NY',
        country: 'USA',
      });
    } else {
      console.log('User not found');
      return;
    }
    const res = user.save();
    console.log(res);
  }
};

addAddress('687e80edc82cd2eb2d3ebf32');
module.exports = User;
