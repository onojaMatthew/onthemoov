const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const termsSchema = new Schema({
  terms: { type: String, required: true },
  senderId: { type: ObjectId, ref: "Admin", require: true },
}, { timestamps: true });

const Terms = mongoose.model("Terms", termsSchema);

exports.Terms = Terms;