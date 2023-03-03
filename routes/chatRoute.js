const express = require("express");
const { createchat, allchat } = require("../controllers/chatController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/createchat", verifyToken, createchat);
router.get("/allchat", verifyToken, allchat);

// create crud operation for group chat

module.exports = router;
