const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const chatSchema = new Schema({
  roomId: { type: ObjectId, ref: "Customer", required: true },
  message: { type: String, required: true },
  username: { type: String, required: true },
  riderId: { type: ObjectId, ref: "Rider", required: true },
  customerId: { type: ObjectId, ref: "Customer", required: true }
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

exports.Chat = Chat;
