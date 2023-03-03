const jwt = require("jsonwebtoken");

const generateToken = (userid) => {
  const userdetails = { user: userid };
  const accessToken = jwt.sign(userdetails, process.env.ACCESS_TOKEN_SECRECT, {
    expiresIn: "2d",
  });
  return accessToken;
};

module.exports = generateToken;
