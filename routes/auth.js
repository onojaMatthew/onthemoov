const express = require("express");
const {
  createUser,
  signIn,
  recover,
  reset,
  resetPassword,
  verifyCode,
  uploadPhoto,
  verifyPhone,
} = require("../controllers/auth");
const { upload } = require("../middlware/fileupload");

const router = express.Router();

router.post("/auth/verify", verifyPhone);
router.post("/signup/:userType", createUser);
router.post("/login/:userType", signIn);
router.put("/auth/recover/:userType", recover);
router.put("/auth/verify_code/:code/:userType", verifyCode);
router.get("/auth/reset/:token/:userType", reset);
router.put("/auth/photo/:userId/:userType", upload.single("file"), uploadPhoto);
router.put("/auth/reset_password/:userType", resetPassword);

module.exports = router;