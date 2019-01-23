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
    res.status(500).json(error);
  }
});

// [POST] /api/auth/hasAccountInfo
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
      console.log(error);
      res.status(500).json(error);
    }
  }
});

module.exports = router;
