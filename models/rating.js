const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const ratingSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, default: 0 },
  riderId: { type: ObjectId, ref: "Rider", required: true },
  customerId: { type: ObjectId, ref: "Customer", required: true }
}, { timestamps: true });


const Rating = mongoose.model("Rating", ratingSchema);

exports.Rating = Rating;