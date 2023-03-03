const express = require("express");
const router = express.Router();

const {
  createMessage,
  getallMessage,
} = require("../controllers/messageController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/createmessage", verifyToken, createMessage);
router.get("/createmessage/:chatid", verifyToken, getallMessage);

module.exports = router;
