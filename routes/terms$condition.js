const express = require("express");
const { 
  createTerms, getTerms, updateTerms, deleteTerms,
} = require("../controllers/terms$condition");
const requireLogin = require('../config/auth');


const router = express.Router();

router.post("/terms/new", requireLogin, createTerms);
router.get("/terms", getTerms);
router.put("/terms/update/:termsId", requireLogin, updateTerms);
router.delete("/terms/delete/:termsId", requireLogin, deleteTerms);

module.exports = router;