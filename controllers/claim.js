const { Claim } = require("../models/claim");
const mongoose = require("mongoose");
const fs = require("fs");
const roles = [ "admin", "customer", "rider" ];

exports.postClaim = (req, res) => {
  const { subject, senderId, message } = req.body;

  if (!subject || !senderId || !message) return res.status(400).json({ error: "One or more fields are missing" });

  if (!mongoose.Types.ObjectId.isValid(senderId)) return res.status(400).json({ error: "Invalid sender ID" });

  let newClaim = new Claim({ senderId, message, subject });
  if (req.file) {
    newClaim.attachment.data = fs.readFileSync(req.file.path);
    newClaim.attachment.contentType = "image/jpg";
  }
  
  newClaim.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: "Message sent", doc });
  });
}

exports.getClaims = (req, res) => {
  const { role } = req.params;

  if (!role) return res.status(400).json({ error: "Undefined user role" });
  if (role !== "admin") return res.status(403).json({ error: "Unauthorized access" });

  Claim.find()
    .populate("senderId", "firstName lastName email phone")
    .then(claim => {
      if (!claim) return res.status(400).json({ error: "Record empty" });
      return res.json(claim);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getClaim = (req, res) => {
  const { claimId, role } = req.params;
  if (!mongoose.Types.ObjectId.isValid(claimId)) return res.status(400).json({ error: "Invalid claim ID" });
  if (!role) return res.status(400).json({ error: "User role is required" });
  if (!roles.includes(role)) return re.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(403).json({ error: "Unauthorized access" });

  Claim.findById({ _id: claimId })
    .populate("senderId", "firstName lastName email phone")
    .then(claim => {
      if (!claim) return res.status(404).json({ error: "Record not found" });
      return res.json(claim);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getClaimByCustomer = (req, res) => {
  const { customerId } = req.params;

  if (!customerId) return res.status(400).json({ error: "Customer ID is required" });
  if (!mongoose.Types.ObjectId.isValid(customerId)) return res.status(400).json({ error: "Invalid customer ID" });

  Claim.find({ senderId: customerId })
    .populate("senderId", "firstName lastName email phone")
    .then(result => {
      if (!result) return res.status(400).json({ error: "No records for this customer" });
      return res.json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.updateStatus = (req, res) => {
  const { claimId, status } = req.body;
  if (!claimId) return res.status(400).json({ error: "Customer ID is required" });
  if (!mongoose.Types.ObjectId.isValid(claimId)) return res.status(400).json({ error: "Invalid customer Id" });

  Claim.findByIdAndUpdate({ _id: claimId })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Claim not found" });
      result.status = status;
      result.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.messsage });
        return res.json({ message: "Status changed", result });
      })
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteClaim = (req, res) => {
  const { claimId, role } = req.params;
  if (!claimId) return res.status(400).json({ error: "Customer ID is required" });
  if (!mongoose.Types.ObjectId.isValid(claimId)) return res.status(400).json({ error: "Invalid customer Id" });
  if (!role) return res.status(400).json({ error: "User role is required" });
  if (!roles.includes(role)) return re.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(403).json({ error: "Unauthorized access" });

  Claim.findByIdAndDelete({ _id: claimId })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Record not found" });
      return res.json({ message: "Record deleted", result });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}