const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const earningSchema = new Schema({
  riderId: { type: ObjectId, ref: "Rider", required: [ true, "The driver ID is required" ] },
  orderId: { type: ObjectId, ref: "Order", required: [ true, "The order ID is required" ] },
  amount: { type: Number, required: [ true, "The amount earned is required" ] }
}, { timestamps: true });

const Earning = mongoose.model("Earning", earningSchema);

exports.Earning = Earning;