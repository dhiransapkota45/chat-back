const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("accessToken");
    if (!token) {
      return res
        .status(400)
        .json({ msg: "Couldnot find token", success: false });
    }
    const payload_data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT);

    const user = await usermodel
      .findById(payload_data.user)
      .select("-password");
    console.log(user);

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, msg: error.message });
  }
};

module.exports = verifyToken;
