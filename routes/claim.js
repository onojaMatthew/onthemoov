const express = require("express");
const { 
  getClaims, 
  getClaim,
  postClaim,
  updateStatus,
  deleteClaim,
  getClaimByCustomer,
} = require("../controllers/claim");
const requireLogin = require("../config/auth");

const router = express.Router();

router.get("/claims/:customerId/customer", requireLogin, getClaimByCustomer);
router.get("/claims/:role", requireLogin, getClaims);
router.get("/claims/:claimId/:role", requireLogin, getClaim);
router.post("/claims/new", requireLogin, postClaim);
router.put("/claims/status", requireLogin, updateStatus);
router.delete("/claims/delete/:claimId/:role", requireLogin, deleteClaim);

module.exports = router;