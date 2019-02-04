const express = require("express");

const db = require("../db/config");
const router = express.Router();

// [POST] /api/auth/login
// returns if provided user_uid and email exist in login table
// updates email field or creates new user accordingly
router.post("/login", async (req, res, next) => {
  const { user_uid, email } = req.body;

  try {
    if (user_uid && email) {
      // checks for Firebase ID in login table
      const checkId = await db("login").where({ user_uid: user_uid });

      if (checkId.length) {
        // checks for Firebase ID and email together in login table
        const checkIdEmail = await db("login").where({ user_uid, email });

        if (checkIdEmail.length) {
          // if ID and email pair already exist
          res.status(200).json({
            status: "already exists in login",
            action: "check user table"
          });
        } else {
          // if ID and different email, update email
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
        // if ID not in login table, insert new row
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
    res.status(500).json(error);
  }
});

// [POST] /api/auth/hasAccountInfo
// returns if user has filled out account info before (Firebase ID is in users table)
router.post("/hasAccountInfo", async (req, res) => {
  const { user_uid } = req.body;

  if (user_uid) {
    try {
      const checkUser = await db("users").where({ user_uid });
      checkUser.length
        ? res
            .status(200)
            .json({ status: "exists in users", action: "redirect to landing" })
        : res.status(200).json({
            status: "no account information",
            action: "redirect to new user"
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
