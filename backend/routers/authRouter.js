const express = require("express");

const db = require("../db/config");
const router = express.Router();

// [POST] /api/auth/login
router.post("/login", (req, res) => {
  const newUser = { ...req.body };

  if (newUser) {
    db("login")
      .insert(newUser)
      .then(() => {
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

// [GET] /api/auth/hasAccountInfo
router.post("/hasAccountInfo", (req, res) => {
  const user_uid = { ...req.body };

  if (user_uid) {
    db("login")
      .where(user_uid)
      .then(res => {
        if (!res.length) {
          res.status(200).send(false);
        } else {
          return db("users").where(user_uid);
        }
      })
      .then(res => {
        if (!res.length) {
          res.status(200).send(false);
        } else {
          res.status(200).send(true);
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Error determining first login" });
      });
  }
});

module.exports = router;
