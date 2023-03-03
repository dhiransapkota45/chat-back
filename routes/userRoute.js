const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  signup,
  login,
  searchusers,
  fetchuser,
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);

router.get("/allusers", verifyToken, searchusers);

router.get("/fetchuser", verifyToken, fetchuser);

module.exports = router;
