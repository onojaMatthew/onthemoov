const { Rating } = require("../models/rating");
const mongoose = require("mongoose");

exports.ratingRider = (req, res) => {
  const { riderId, customerId, rating } = req.body;
  if (!riderId) return res.status(400).json({ error: "Rider ID is required" });
  if (!customerId) return res.status(400).json({ error: "Customer ID is required" });
  if (!rating) return res.status(400).json({ error: "Rating is required" });
  if (!mongoose.Types.ObjectId.isValid(riderId) || !mongoose.Types.ObjectId.isValid(customerId)) return res.status(400).json({ error: "Invalid customer's ID or rider's ID" });

  let newRating = new Rating({ 
    rating,
    riderId,
    customerId
  });

  newRating.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: "Rating submitted", doc });
  });
}

exports.getRating = (req, res) => {
  const { riderId } = req.params;
  if (!riderId) return res.status(400).json({ error: "Rider's ID is required" });
  if (!mongoose.Types.ObjectId.isValid(riderId)) return res.status(400).json({ error: "Invalid rider ID" });
  Rating.find({ riderId })
    .then(rating => {
      if (!rating) return res.status(404).json({ error: "No rating found" });
      let total = 0;
      for (let i = 0; i < rating.length; i++) {
        total += rating[i].rating
      }
      const averageRating = total/rating.length;
      return res.json(averageRating);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}