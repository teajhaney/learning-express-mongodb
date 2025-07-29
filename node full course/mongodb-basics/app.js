const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://teajhaney:futarian%4020@cluster0.csijp9n.mongodb.net/myDatabase?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create user model
const User = model('User', userSchema);

const runQueryExample = async () => {
  try {
    // const newUser = await User.create({
    //   name: 'Tayo',
    //   email: 'Tayo@gmail.com',
    //   age: 20,
    //   isActive: false,
    //   tags: ['developer'],
    // });
    // console.log('created new user', newUser);
    // const allUser = await User.find({});
    // console.log(allUser);

    // const falseUser = await User.find({ isActive: false });
    // console.log(falseUser);
    // const selectedField = await User.find({}).select('name email -_id');
    // console.log(selectedField);
    // const limitedUser = await User.find({}).limit(3).skip(1);
    // console.log(limitedUser);
    const sortUser = await User.find({}).sort({ age: +1 });
    console.log(sortUser);
  } catch (error) {
    console.error('Error running query example:', error);
  } finally {
    mongoose.connection.close();
  }
};

runQueryExample();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
