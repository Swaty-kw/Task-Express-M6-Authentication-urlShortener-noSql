const User = require("../../models/User");
bycrypt = require("bcrypt");
const dotenv = require("dotenv");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
dotenv.config();

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const secrurePassword = await hashPassword(password);
    req.body.password = secrurePassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    return res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};
const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

const generateToken = (User) => {
  const payload = {
    username: User.username,
    id: User._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return token;
};
exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json(token);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
