const messagemodel = require("../models/messagemodel");

const createMessage = async (req, res) => {
  try {
    const { content, chat } = req.body;
    if (!content || !chat) {
      return res.status(400).json({ msg: "fill all the required fields" });
    }

    const newmessage = {
      sender: req.user._id,
      content,
      chat,
    };

    let createdmessage = await messagemodel.create(newmessage);
    // .populate("sender", "-password");
    // .populate("sender", "-password")
    // .populate("chat");
    // const newresponse = await createMessage.populate("sender");

    const populategeneratedMessage = await messagemodel
      .findById(createdmessage._id)
      .populate("sender", "-password")
      .populate("chat");

    console.log(populategeneratedMessage);

    return res.status(201).json({
      msg: "message has been created successfully",
      createdmessage: populategeneratedMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

const getallMessage = async (req, res) => {
  try {
    const allmessagesOfChat = await messagemodel
      .find({
        chat: req.params.chatid,
      })
      .populate("sender", "name image")
      .populate("chat")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ msg: "all messages had been read", allmessagesOfChat });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createMessage, getallMessage };
