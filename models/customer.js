require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  code: { type: Number },
  verificationCodeExpires: { type: Date, required: false },
  deviceToken: { type: String },
  address: { type: String },
  verified: { type: Boolean, default: false },
  role: { type: String, enum: [ "admin","customer" ], default: "customer" },
  imageUrl: { data: Buffer, contentType: String },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
}, { timestamps: true });

customerSchema.index({ position: "2dsphere"});

customerSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email, phone: this.phone }, process.env.SECRET_KEY);
  return token;
}

customerSchema.methods.verificationCode = function(code) {
  this.code = code;
  this.verificationCodeExpires = Date.now() + 900000 //expires in 15 mins
  return code;
}

customerSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;