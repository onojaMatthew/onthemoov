const { Report } = require("../models/report");
const mongoose = require("mongoose");
const roles = [ "admin", "user" ];

exports.sendReport = (req, res) => {
  const { subject, report, senderId } = req.body;
  const { _id, role } = req.user;
  if (!subject || !report || !senderId) return res.status(400).json({ error: "All fields are required" });
  if (!_id) return res.status(400).json({ error: "Invalid authorization access" });
  if (_id !== senderId) return res.status(400).json({ error: "Unknown user. Please login and try again" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin" && role !== "user") return res.status(400).json({ error: "You do not have the permission to send a report" });

  let newReport = new Report({
    subject,
    senderId,
    report
  });

  newReport.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: "Report submitted", doc });
  });
}

exports.getReports = (req, res) => {
  const { _id, role } = req.user;
  if (!_id || !role) return res.status(400).json({ error: "Unathorized access" });
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ error: "Invalid user ID" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });

  Report.find()
    .populate("senderId", "firstName lastName email phone")
    .then(reports => {
      if (!reports) return res.status(403).json({ error: "No records found" });
      return res.json(reports);
    })
    .catch(err => {
      res.status(400).json({ error: err.mesage });
    });
}

exports.getReport = (req, res) => {
  const { reportId } = req.params;
  const { _id, role } = req.user;
  if (!reportId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!_id || !role) return res.status(400).json({ error: "Unathorized access" });
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ error: "Invalid user ID" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });

  Report.findById({ _id: reportId })
    .populate("senderId", "firstName lastName email phone portfolio")
    .then(report => {
      if (!report) return res.status(404).json({ error: "Report not found" });
      return res.json(report);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteReport = (req, res) => {
  const { reportId } = req.params;
  const { _id, role } = req.user;
  if (!reportId) return res.status(400).json({ error: "Invalid parameter values" });
  // if (!_id || !role) return res.status(400).json({ error: "Unathorized access" });
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ error: "Invalid user ID" });
  // if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });

  Report.findByIdAndDelete({ _id: reportId })
    .then(report => {
      if (!report) return res.status(404).json({ error: "Report not found" });
      return res.json({ message: "Report deleted", report });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}