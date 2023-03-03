const usermodel = require("../models/usermodel");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ msg: "property missing" });
    }
    const finduser = await usermodel.findOne({ username: req.body.username });

    if (finduser) {
      return res.status(400).json({ msg: "username already exists" });
    }

    const createuser = await usermodel.create(req.body);
    const accessToken = generateToken(createuser._id);
    return res
      .status(201)
      .json({ msg: "user has been created successfully", accessToken });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ msg: "property missing" });
    }

    const verifyuser = await usermodel.findOne({ username: req.body.username });
    if (!verifyuser) {
      return res
        .status(400)
        .json({ msg: "user with that username doesnot exists" });
    }

    if (verifyuser.password !== req.body.password) {
      return res.status(400).json({ msg: "password did not matched" });
    }

    const accessToken = generateToken(verifyuser._id);
    return res
      .status(200)
      .json({ msg: "user logged in successfully", accessToken });
  } catch (error) {
    console.log(error);
  }
};

const searchusers = async (req, res) => {
  const query = req.query;
  // console.log(query);

  const findusers = await usermodel.find({
    $and: [
      { _id: { $ne: req.user._id } },
      { username: { $regex: req.query.search, $options: 1 } },
    ],
  });

  console.log(findusers);
};

const fetchuser = (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup, login, searchusers, fetchuser };
