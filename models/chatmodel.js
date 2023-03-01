const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chatname: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messagemodel",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
    },
  },
  { timestamps: true }
);

const chatmodel = require("chatmodel", chatSchema);
module.exports = chatmodel;
