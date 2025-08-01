require('dotenv').config();
const { asyncWrapper } = require('../utils');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { comparePassword, hashPassword } = require('../utils');
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
      { expiresIn: '1h' } 
    );
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      accessToken,
      data: foundUser,
    });
  }
});

//change password

const changePassword = asyncWrapper(async (req, res) => {
  const userId = req.userInfo.userID;
  const { oldPassword, newPassword } = req.body;
  //find current logged in user
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  //check if old password is valid
  const isOldPasswordValid = await comparePassword(
    oldPassword,
    currentUser.password
  );

  if (!isOldPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid old password! try again',
    });
  }

  //   //hash new password
  //   const hashedNewPassword = await hashPassword(newPassword);
  //update password
  currentUser.password = newPassword;
  await currentUser.save();
  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
    date: currentUser,
  });
});

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
