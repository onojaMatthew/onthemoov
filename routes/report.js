const express = require("express");
const { 
  sendReport, getReports, getReport, deleteReport,
} = require("../controllers/report");

const requireLogin = require("../config/auth");


const router = express.Router();

router.post("/reports/new", requireLogin, sendReport);
router.get("/reports/all", requireLogin, getReports);
router.get("/reports/:reportId", requireLogin, getReport);
router.delete("/reports/delete/:reportId", requireLogin, deleteReport);
module.exports = router;