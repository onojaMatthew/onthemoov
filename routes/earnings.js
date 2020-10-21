const express = require("express");
const { 
  getEarnings, 
  getEanrning,
  getEarningsByRider,
  deleteEarning,
  // newEarning,
} = require("../controllers/earnings");
const requireLogin = require("../config/auth");

const router = express.Router();

router.get("/earning/all/:role", getEarnings);
router.get("/earning/:earningId", getEanrning);
router.get("/earning/rider/:riderId", getEarningsByRider);
router.delete("/earning/delete/:earningId", deleteEarning);

module.exports = router;