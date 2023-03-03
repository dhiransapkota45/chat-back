const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
    },
    content: { type: String, trim: true },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatmodel",
    },
  },
  { timestamps: true }
);

const messagemodel = mongoose.model("messagemodel", messageSchema);
module.exports = messagemodel;
