const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user_model");
const userService = require("../services/user_service");
const jwtProvider = require("../config/jwtProvider");
const cartService = require("../services/cart_service");
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "one or more feilds are empty" });
    }
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res
        .status(500)
        .json({ error: "user with this email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ ...req.body, password: hashPassword });
    const resp = await newUser.save();
    const jwt = jwtProvider.genrateToken(resp._id);
    await cartService.createCart(resp);
    return res.status(200).json({ message: "user registered successfully", token: jwt });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "one or more feilds are empty" });
    }
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const didMatch = await bcrypt.compare(password, userFound.password);
    if (!didMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const jswToken = jwtProvider.genrateToken(userFound._id);
    userFound.password = undefined;
    return res.status(200).json({token: jswToken, message: "login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports ={createUser, login}