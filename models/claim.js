const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const claimSchema = new Schema({
  senderId: { type: ObjectId, ref: "Customer", required: true },
  subject: { type: String, required: true },
  attachment: { data: Buffer, contentType: String },
  message: { type: String, required: true },
  status: { type: String, enum: [ "pending", "resolved", "unresolvable" ], default: "pending" }
}, { timestamps: true });

const Claim = mongoose.model("Claim", claimSchema);

exports.Claim = Claim;