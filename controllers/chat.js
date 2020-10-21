const { Chat } = require("../models/chat");

exports.getChats = (req, res) => {
  const { riderId, customerId } = req.params;

  if (!customerId || !riderId) return res.status(400).json({ error: "Invalid parameter value" });
  
  Chat.find({ riderId, customerId, roomId: customerId })
    .then(chat => {
      if (!chat) return res.status(400).json({ error: "Chat record is empty" });
      res.json(chat);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteChat = async (messageId) => {
  if (!messageId) return { error: "Message not found" };
  let message = await Chat.findByIdAndDelete({ _id: messageId });
  return { message };
}