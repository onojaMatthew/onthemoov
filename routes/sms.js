const express = require("express");
const { sms } = require("../services/sms");

const router = express.Router();

router.post("/sms", sms);

module.exports = router;