const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const roomSchema = new Schema({
  room: { type: ObjectId, ref: "Customer", required: true },
  socketId: { type: String, required: true },
  username: { type: String, required: true },
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);

exports.Room = Room;