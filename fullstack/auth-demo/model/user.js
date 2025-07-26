const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../utils');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
});

userSchema.statics.findByUsername = async function (username, password) {
  const founduser = await this.findOne({ username });
  const isPasswordValid = await comparePassword(password, founduser.password);
  return isPasswordValid ? founduser : false;
};

userSchema.pre('save', async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
