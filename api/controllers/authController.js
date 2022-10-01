const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const createError = require("../utils/error");
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      password: hash,
      email: req.body.email,
    });
    await newUser.save();
    res.status(200).send("User Has Been Created");
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
    });

    if (!user) {
      return next(createError(404, "User Not Found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong Password and userName"));
    }

    const token =  jwt.sign({id:user._id ,isAdmin:user.isAdmin},"shubhamScreate")
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("acess_token",token,{
      httpOnly:true,
    }).status(200).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
module.exports = { register, login };
