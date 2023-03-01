const usermodel = require("../models/usermodel");

const signup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password ) {
      return res.status(400).json({ msg: "property missing" });
    }

    const createuser = await usermodel.create(req.body);
    return res.status(201).json({ msg: "user has been created successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup };
