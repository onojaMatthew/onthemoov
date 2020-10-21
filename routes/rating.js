const express = require("express");
const { getRating, ratingRider } = require("../controllers/rating");

const router = express.Router();

router.get("/rating/:riderId", getRating);
router.post("/rating", ratingRider);

module.exports = router;