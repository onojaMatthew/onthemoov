const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const vehicleSchema = new Schema({
  type: { type: String, require: true },
  baseFare: { type: Number },
  minimumFare: { type: Number, min: 400 },
  per_distance_charge: { type: Number, min: 20 },
  createdBy: { type: ObjectId, ref: "Admin" }
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

exports.Vehicle = Vehicle;