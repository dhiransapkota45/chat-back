const express = require("express");
const { createchat } = require("../controllers/chatController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/createchat", verifyToken, createchat);

module.exports = router;
