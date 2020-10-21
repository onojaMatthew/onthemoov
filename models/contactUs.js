const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const contactSchema = new Schema({
  senderId: { type: ObjectId, refPath: "senderModel", required: true },
  senderModel: {
    type: String,
    required: true,
    enum: ['Rider', 'Customer']
  },
  title: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  reply: { type: String },
  isViewed: { type: Boolean, default: false },
  status: { type: Boolean, default: false }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

exports.Contact = Contact;