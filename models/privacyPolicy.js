const mongoose = require("mongoose");

const { ObjectId, Schema } = mongoose;

const policySchema = new Schema({
  policy: { type: String, required: true },
  createdBy: { type: ObjectId, ref: "Admin" },
}, { timestamp: true });

const Policy = mongoose.model("Policy", policySchema);

exports.Policy = Policy;