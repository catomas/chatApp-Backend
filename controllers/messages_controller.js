const Message = require("../models/message_model");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const newMessage = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (newMessage) {
      return res.json({ status: true, message: newMessage });
    } else {
      return res.json({ status: false, message: "Message not sent" });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: { $all: [from, to] },
    }).sort({ createdAt: 1 });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from.toString(),
        message: msg.message.text,
        timestamp: msg.createdAt,
      };
    });

    return res.json(projectMessages);
  } catch (ex) {
    next(ex);
  }
};
