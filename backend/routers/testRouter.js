const express = require("express");

const db = require("../db/config");

const router = express.Router();

// [GET] /test
// testing for server running
router.get("/", (req, res) => {
  res.status(200).json({ server: "running" });
});

module.exports = router;
