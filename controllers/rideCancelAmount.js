const { CancelAmount } = require("../models/rideCancelAmount");
const mongoose = require("mongoose");

exports.createAmount = (req, res) => {
  const { adminId, amount } = req.body;

  if (!adminId || !amount) return res.status(400).json({ error: "Invalid parameter " });
  if (!mongoose.Types.ObjectId.isValid(adminId)) return res.status(400).json({ error: "Invalid admin ID" });

  let newAmount = new CancelAmount({ amount, createdBy: adminId });
  newAmount.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json(doc);
  });
}

exports.getCancelAmount = (req, res) => {
  CancelAmount.find()
    .then(amount => {
      if (!amount) return res.status(400).json({ error: "Failed to fetch request cancellation charge" });
      return res.json(amoun.amount);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.getAmount = () => {
  CancelAmount.find()
    .then(amount => {
      if (!amount) return res.status(400).json({ error: "Failed to fetch request cancellation charge" });
      return res.json(amoun.amount);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.updateCharge = (req, res) => {
  const { chargeId } = req.params;
  if (!chargeId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!mongoose.Types.ObjectId.isValid(chargeId)) return res.status(400).json({ error: "Invalid charge ID" });
  CancelAmount.findByIdAndUpdate({ _id: chargeId })
    .then(amount => {
      if (!amount) return res.status(404).json({ error: "Charge not found" });
      return res.json(amount);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.deleteCharge = (req, res) => {
  const { chargeId } = req.params;

  CancelAmount.findByIdAndDelete({ _id: chargeId })
    .then(amount => {
      if (!amount) return res.status(404).json({ error: "Charge not found" });
      return res.json({ message: "Charge has been deleted" });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}