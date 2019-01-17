const express = require("express");

const db = require("../db/config");
const router = express.Router();

// [POST] /api/auth/login
router.post("/login", (req, res) => {
  const newUser = { ...req.body };

  if (newUser) {
    db("login")
      .insert(newUser)
      .then(addJob => {
        res.status(201).send(true);
      })
      .catch(err => {
        if (err.code === 23505) {
          res.status(400).send(false);
        } else {
          res.status(500).json({ message: "Error posting to table" });
        }
      });
  }
});

module.exports = router;
