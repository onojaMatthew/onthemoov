require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: { type: String, required: [ true, "You have not given your name" ]},
  lastName: { type: String, required: [ true, "You have not given your name" ]},
  email: { type: String, required: [ true, "Your email is required" ], unique: true },
  password: { type: String, required: [ true, "Your password is required" ]},
  phone: { type: String, required: [ true, "Your phone number is required" ]},
  imageUrl: { data: Buffer, contentType: String },
  portfolio: { type: String },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
  role: { type: String, enum: [ "admin", "user" ] },
}, { timestamps: true });

adminSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email, phone: this.phone, role: this.role }, process.env.SECRET_KEY);
  return token;
}

adminSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000;
};

const Admin = mongoose.model("Admin", adminSchema);

exports.Admin = Admin;
