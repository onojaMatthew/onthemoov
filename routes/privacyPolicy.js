const express = require("express");
const { createPolicy, getPolicy, updatePolicy, deletePolicy } = require("../controllers/policy");
const requireLogin = require("../config/auth");

const router = express.Router();

router.post("/policy/new", requireLogin, createPolicy);
router.get("/policy", getPolicy);
router.put("/policy/update/:policyId", requireLogin, updatePolicy);
router.delete("/policy/delete/:policyId", requireLogin, deletePolicy);

module.exports = router;