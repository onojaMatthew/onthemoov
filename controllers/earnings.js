const { Earning } = require("../models/earnings");

const mongoose = require("mongoose");

exports.newEarning = (req, res, data) => {
  const { amount, orderId, riderId } = data;

  if (!amount) return res.status(400).json({ error: "Unknown amount is provided" });
  if (!orderId || !riderId) return res.status(400).json({ error: "One of order ID or rider ID is missing" });
  if (!mongoose.Types.ObjectId.isValid(orderId)) return res.status(400).json({ error: "Invalid order ID" });
  if (!mongoose.Types.ObjectId.isValid(riderId)) return res.status(400).json({ error: "Invalid rider ID" });

  const earning = amount * 0.2;

  let newEarning = new Earning({
    riderId,
    orderId,
    amount: earning
  });

  newEarning.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: `Thank your for completing the ride. You've just earned ${doc.amount}` });
  })
}

exports.getEarnings = (req, res) => {
  const { role } = req.params;

  if (!role) return res.status(403).json({ error: "Unknown user role" });
  if (role !== "admin" && role !== "rider") return res.status(400).json({ error: "Unauthorized access" });

  Earning.find()
    .populate("riderId", "firstName lastName email phone")
    .populate("orderId", "on_going tripCompleted")
    .then(earnings => {
      if (!earnings) return res.status(404).json({ error: "No records found" });
      return res.json(earnings);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getEanrning = (req, res) => {
  const { earningId } = req.params;
  if (!earningId) return res.status(400).json({ error: "Earning ID is required" });
  if (!mongoose.Types.ObjectId.isValid(earningId)) return res.status(400).json({ error: "Invalid earning ID" });
  
  Earning.findById({ _id: earningId })
    .populate("riderId", "firstName lastName email phone")
    .populate("orderId")
    .then(earning => {
      if (!earning) return res.status(404).json({ error: "Not foound" });
      return res.json(earning);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getEarningsByRider = (req, res) => {
  const { riderId, role } = req.params;
  if (!riderId || !role) return res.status(400).json({ error: "One of rider ID or user role not provided" });
  if (!mongoose.Types.ObjectId.isValid(riderId)) return res.status(400).json({ error: "Invalid rider ID" });
  if (role !== "admin" && role !== "rider") return res.status(400).json({ error: "Only admin and rider can access this information" });
  
  Earning.find({ riderId })
    .populate("riderId", "firstName lastName email phone")
    .populate("orderId")
    .then(earnings => {
      if (!earnings) return res.status(400).json({ error: "No earnings for this rider yet" });
      return res.json(earnings);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteEarning = (req, res) => {
  const { earningId, role } = req.params;

  if (!earningId || !role) return res.status(400).json({ error: "Invalid parameter values" });
  if (!mongoose.Types.ObjectId.isValid(earningId)) return res.status(400).json({ error: "Invalid earning ID" });
  if (role !== "admin") return res.status(400).json({ error: "Unauthorized access" });

  Earning.findByIdAndDelete({ _id: earningId })
    .then(earning => {
      if (!earning) return res.status(400).json({ error: "Earning not found" });
      return res.json({ message: "Earning deleted" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}