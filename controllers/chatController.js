const chatmodel = require("../models/chatmodel");

const createchat = async (req, res) => {
  const { userid } = req.body;

  try {
    if (!req.body) {
      return res.status(400).json({ msg: "receiver id not provoded" });
    }

    const checkIfChatExists = await chatmodel
      .find({
        isGroupChat: false,
        $and: [{ users: userid }, { users: req.user._id }],
      })
      .populate("users", "-password")
      .populate("latestMessage");

    // console.log(checkIfChatExists);

    if (checkIfChatExists.length > 0) {
      return res
        .status(200)
        .json({ msg: "chat found", fullchat: checkIfChatExists });
    } else {
      const chatdetails = {
        chatname: "randomchatname",
        users: [req.user._id, userid],
      };

      const createchat = await chatmodel.create(chatdetails);

      const fullchat = await chatmodel
        .findById(createchat._id)
        .populate("users", "-password");

      return res.status(200).json({ msg: "chat created", fullchat });
    }
  } catch (error) {
    console.log(error);
  }
};

const allchat = async (req, res) => {
  try {
    const allchatdetails = await chatmodel
      .find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    return res.status(200).json({ msg: "success", allchatdetails });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createchat, allchat };
