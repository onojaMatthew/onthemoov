const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const riderSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  vehicleType: { type: String, enum: [ "bike", "car", "van", "truck" ] },
  email: { type: String, require: true },
  password: { type: String, require: true },
  activated: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
  phone: { type: String, require: true },
  address: { type: String },
  available: { type: Boolean, default: false },
  imageUrl: { data: Buffer, contentType: String },
  vehicleImage: { data: Buffer, contentType: String },
  vehicleNumber: { type: String  },
  driverLicense: { data: Buffer, contentType: String },
  vehicleInsurance: { data: Buffer, contentType: String },
  vehicleModel: { type: String },
  code: { type: Number },
  deviceToken: { type: String },
  verificationCodeExpires: { type: Date, required: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
  position: {
    type: { type: String },
    coordinates: [ Number ]
  },
  acceptedRequests: [{ type: ObjectId, ref: "Order" }],
  balance: { type: Number, default: 0 }
}, { timestamps: true });

riderSchema.index({ position: "2dsphere" });

riderSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email, phone: this.phone }, process.env.SECRET_KEY);
  return token;
}

riderSchema.methods.verificationCode = function(code) {
  this.code = code;
  this.verificationCodeExpires = Date.now() + 900000 //expires in 15 mins
  return code;
}

riderSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

const Rider = mongoose.model("Rider", riderSchema);

exports.Rider = Rider;
