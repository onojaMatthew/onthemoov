const express = require("express");
const {
  createAdmin,
  getAdmin,
  getAdmins,
  deleteAdmin,
  adminPhoto,
} = require("../controllers/admin");
const requireLogin = require("../config/auth");
const router = express.Router();

router.get("/admin/:adminId/:role", requireLogin, getAdmin);
router.get("/admin/:role", requireLogin, getAdmins);
router.get("/admin/photo/:adminId", requireLogin, adminPhoto);
router.delete("/admin/delete/:adminId/:role", requireLogin, deleteAdmin);

module.exports = router;