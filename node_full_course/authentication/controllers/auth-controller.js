require('dotenv').config();
const { asyncWrapper } = require('../utils');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

//register controller
const registerUser = asyncWrapper(async (req, res) => {
  const { username, email, password, role } = req.body;

  // check if user exist
  const ifUserExist = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (ifUserExist) {
    return res.status(400).json({
      success: false,
      message: 'User already exist with this email or username',
    });
  }
  const newUser = await User.create({
    username,
    email,
    password,
    role: role || 'user',
  });
  //   await newUser.save();
  if (newUser) {
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Unable to create user, please try again',
    });
  }
});

//login controller

const loginUser = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  //   const foundUser = new User.find({
  //     username,
  //   });
  //   const isPasswordValid = await comparePassword(password, foundUser.password);

  const foundUser = await User.findUserByUsername(username, password);

  if (!foundUser) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  } else {
    //create token
    const accessToken = jwt.sign(
      {
        userID: foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15m' }
    );
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      accessToken,
      data: foundUser,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
