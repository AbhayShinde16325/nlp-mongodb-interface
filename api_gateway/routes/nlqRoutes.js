const express = require("express");
const { handleNLQ } = require("../controllers/nlqController");

const router = express.Router();

router.post("/", handleNLQ);

module.exports = router;
