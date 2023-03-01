const jwt = require("jsonwebtoken");

const generateToken = () => {
  const userdetails = { user: userdata._id };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRECT, {
    expiresIn: "10m",
  });
};

module.exports = generateToken;
