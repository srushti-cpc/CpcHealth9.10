const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const {firstName,lastName,email,phoneNumber,birthdate,password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      birthdate,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
module.exports = { registerUser };
