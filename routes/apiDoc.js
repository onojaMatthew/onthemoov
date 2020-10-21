const express = require("express");
const {
  apiDoc
} = require("../controllers/apiDoc");

const router = express.Router();

router.get("/api_doc", apiDoc);

module.exports = router;