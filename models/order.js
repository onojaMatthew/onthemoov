const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const orderSchema = new Schema({
  packageDescription: { type: String },
  packageImage: { data: Buffer, contentType: String },
  senderId: { type: ObjectId, ref: "Customer" },
  vehicleType: { type: String, enum: [ "bike", "car", "truck", "van" ]},
  pickupLong: { type: Number },
  pickupLat: { type: Number },
  payer: { type: String },
  cost: { type: Number, required: false },
  cancelled: { type: Boolean, default: false},
  deliveryLocation: [{
    address: { type:  String },
    receiver: { type: String },
    receiverPhone: { type: String },
    packgeDescription: { type: String },
    packageId: { type: String }
  }],
  trxnId: { type: String },
  pickupLocation: { type: String },
  uniqueId: { type: String },
  toll: {
    charge: { type: Number, default: 0 },
    paymentSlip: { data: Buffer, contentType: String },
    code: { type: String }
  },
  timeCompleted: { type: Date },
  timeStarted: { type: Date },
  on_going: { type: Boolean, default: false },
  rejectedRiders: [{ type: ObjectId, ref: "Rider" }],
  preDeliveryImage: { data: Buffer, contentType: String },
  preDeliveryMessage: { type: String, minlength: 10, maxlength: 50 },
  postDeliveryImage: { data: Buffer, contentType: String },
  postDeliveryMessage: { type: String, minlength: 10, maxlength: 50 },
  tripCompleted: { type: Boolean, default: false },
  orderBy: { type: String },
  riderId: { type: ObjectId, ref: "Rider" },
  senderName: { type: String },
  senderPhone: { type: String }
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
