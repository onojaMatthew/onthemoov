const { Terms } = require("../models/terms&condition");
const mongoose = require("mongoose");

exports.createTerms = async (req, res) => {
  const { termData } = req.body;
  const { _id, role } = req.user;
  if (!role || !_id) return res.status(400).json({ error: "Please login to continue" });
  if (role !== "admin" && role !== "user") return res.status(400).json({ error: "You are not allowed to perform this operation" });
  if (!termData) return res.status(400).json({ error: "All fields are required" });
  const term = await Terms.find({})
  if (term.length) return res.status(400).json({ error: "Terms and Conditions already exists. You may want to update the existing document" });
  let newTerms = new Terms({ terms: termData, senderId: _id });
  newTerms.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: "Document created", doc });
  });
}

exports.getTerms = (req, res) => {
  Terms.find()
    .populate("senderId", "firstName lastName phone email portfolio")
    .then(term => {
      if (!term) return res.status(404).json({ error: "Terms and Conditions not found" });
      return res.json(term);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.updateTerms = (req, res) => {
  const { termData } = req.body;
  console.log(req.body)
  const { termsId } = req.params;
  const { _id, role } = req.user;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ error: "Invalid user ID" });
  if (!role || !_id) return res.status(400).json({ error: "Please login to continue" });
  if (role !== "admin" && role !== "user") return res.status(400).json({ error: "You are not allowed to perform this operation" });
  
  if (!termsId) return res.status(400).json({ error: "Unknown terms and condition" });
  if (!termData) return res.status(400).json({ error: "Terms and conditions must have contents to update" });

  Terms.findByIdAndUpdate({ _id: termsId }, { $set: { terms: termData }}, { new: true })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Document not found" });
      return res.json({ message: "Document updated", result });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteTerms = (req, res) => {
  const { termsId } = req.params;
  const { _id, role } = req.user;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ error: "Invalid user Id" });
  if (!mongoose.Types.ObjectId.isValid(termsId)) return res.status(400).json({ error: "Invalid ID" });
  if (!role || !_id) return res.status(400).json({ error: "Please login to continue" });
  if (role !== "admin" && role !== "user") return res.status(400).json({ error: "You are not allowed to perform this operation" });
  if (!termsId) return res.status(400).json({ error: "Unknown Terms and Conditions" });

  Terms.findByIdAndDelete({ _id: termsId })
    .then(terms => {
      if (!terms) return res.status(404).json({ error: "Document not found" });
      return res.json({ message: "Terms and Conditions deleted", terms });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}