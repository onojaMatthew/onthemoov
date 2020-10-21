const express = require("express");
const { distanceCalculator } = require("../controllers/distance_calculator");

const router = express.Router();

router.post("/cost", distanceCalculator);

module.exports = router;