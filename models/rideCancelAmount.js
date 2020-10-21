const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const amountSchema = new Schema({
  amount: { type: Number, required: true },
  createdBy: { type: ObjectId, required: true, ref: "Admin" }
}, { timestamps: true })

const CancelAmount = mongoose.model("CancelAmount", amountSchema);

exports.CancelAmount = CancelAmount;