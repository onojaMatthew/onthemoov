const { Policy } = require("../models/privacyPolicy");
const mongoose = require("mongoose");

exports.createPolicy = async (req, res) => {
  const { data } = req.body;
  const { _id, role } = req.user;
  if (!role || !_id) return res.status(400).json({ error: "Please login to continue" });
  if (role !== "admin" && role !== "user") return res.status(400).json({ error: "You are not allowed to perform this operation" });
  if (!data) return res.status(400).json({ error: "All fields are required" });

  const policy = await Policy.find({});
  if (policy.length) return res.status(400).json({ error: "Policy already exists. You may want to update the existing document" });
  let newPolicy = new Policy({ policy: data, createdBy: _id });
  newPolicy.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: "Document created", doc });
  });
}

exports.getPolicy = (req, res) => {
  Policy.find()
    .populate("senderId", "firstName lastName phone email portfolio")
    .then(policy => {
      if (!policy) return res.status(404).json({ error: "Privacy policy not found" });
      return res.json(policy);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.updatePolicy = (req, res) => {
  const { data } = req.body;
  console.log(req.body)
  const { policyId } = req.params;
  const { _id, role } = req.user;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ error: "Invalid user ID" });
  if (!role || !_id) return res.status(400).json({ error: "Please login to continue" });
  if (role !== "admin" && role !== "user") return res.status(400).json({ error: "You are not allowed to perform this operation" });
  
  if (!policyId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!data) return res.status(400).json({ error: "Privacy policy not found" });

  Policy.findByIdAndUpdate({ _id: policyId }, { $set: { policy: data }}, { new: true })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Document not found" });
      return res.json({ message: "Document updated", result });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deletePolicy = (req, res) => {
  const { policyId } = req.params;
  const { _id, role } = req.user;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ error: "Invalid user Id" });
  if (!mongoose.Types.ObjectId.isValid(policyId)) return res.status(400).json({ error: "Invalid ID" });
  if (!role || !_id) return res.status(400).json({ error: "Please login to continue" });
  if (role !== "admin" && role !== "user") return res.status(400).json({ error: "You are not allowed to perform this operation" });
  if (!policyId) return res.status(400).json({ error: "Privacy policy does not exist" });

  Policy.findByIdAndDelete({ _id: policyId })
    .then(policy => {
      if (!policy) return res.status(404).json({ error: "Document not found" });
      return res.json({ message: "Privacy Policy deleted", policy });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}