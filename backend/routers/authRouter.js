const express = require("express");

const db = require("../db/config");
const router = express.Router();

// [POST] /api/auth/login/:id
// returns if provided user_uid and email exist in login table
router.post("/login/:firebase_id", async (req, res, next) => {
  const { user_uid, email } = req.body;

  try {
    if (user_uid && email) {
      const checkId = await db("login").where({ user_uid: user_uid });
      console.log("checkId", checkId);
      if (checkId.length) {
        const checkIdEmail = await db("login").where({ user_uid, email });
        if (checkIdEmail.length) {
          res.status(200).json({
            status: "already exists in login",
            action: "check user table"
          });
        } else {
          const update = await db("login")
            .where({ user_uid })
            .update({ email });
          update
            ? res.status(200).json({
                status: "successfully updated",
                action: "check user table"
              })
            : res.status(400).json({ status: "failed to update" });
        }
      } else {
        const createNewLogin = await db("login").insert({ user_uid, email });
        createNewLogin.rowCount
          ? res.status(201).json({
              status: "created new user",
              action: "redirect to new user"
            })
          : res.status(400).json({ status: "failed to create new user" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

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
