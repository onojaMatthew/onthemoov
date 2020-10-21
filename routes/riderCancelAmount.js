const express = require("express");
const {
  createAmount,
  getCancelAmount,
  updateCharge,
  deleteCharge
} = require("../controllers/rideCancelAmount");
const requireLogin = require("../config/auth");

const router = express.Router();

router.post("/charge/new", requireLogin, createAmount);
router.get("/charge", getCancelAmount);
router.put("/charge/:chargeId", requireLogin, updateCharge);
router.delete("/charge/:chargeId", requireLogin, deleteCharge);

module.exports = router;