const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../utils');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

//login static method on user schema
userSchema.statics.findUserByUsername = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  //check password validity
  const isPasswordValid = await comparePassword(password, user.password);
  return isPasswordValid ? user : false;
};

//hash password on save user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    console.log('Hashing password...');
    this.password = await hashPassword(this.password);
  }
  next();
});

const User = model('User', userSchema);

module.exports = User;
