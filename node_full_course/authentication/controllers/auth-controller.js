const { asyncWrapper } = require('../utils');
const User = require('../model/user');

//register controller
const registerUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
  });
  //   await newUser.save();
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser,
  });
});

//login controller

const loginUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
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
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: foundUser,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
