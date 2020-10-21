const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const reportSchema = new Schema({
  subject: { type: String, required: [ true, "Report subject is required" ]},
  report: { type: String, required: [ true, "Your report is required to complete this request" ]},
  senderId: { type: ObjectId, ref: "Admin", required: true }
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

exports.Report = Report;