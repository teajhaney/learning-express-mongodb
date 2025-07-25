const bcrypt = require('bcrypt');

const hashPassword = async password => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
};

// hashPassword('yusuf1234');
const login = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (isMatch) {
    console.log('Password matches!');
  } else {
    console.log('Password does not match.');
  }
};

login(
  'yusuf1234',
  '$2b$12$GxQew45n7k0LJa7LyUPOCumn1To3V6CKUiBAFJNcDwbCZEu014u4i'
); //
