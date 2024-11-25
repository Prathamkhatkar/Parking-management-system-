const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/usermodel");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, phoneNumber, password, role } = req.body;
  
    if (!username || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ success: false, message: "Please enter all the details" });
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = await User.create({ username, email, phoneNumber, password: hashedPassword, role });
    res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  });
  
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter correct details" });
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }
  
    res.status(200).json({ success: true, message: "Login successful" });
  });
  

module.exports  = {registerUser, loginUser};

