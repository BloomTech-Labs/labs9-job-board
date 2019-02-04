const express = require("express");

const db = require("../db/config");
const router = express.Router();

//-------------USER ENDPOINTS-------------------
// GET /api/users
// returns all users in users table
router.get("/users", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(501).json(err);
    });
});

// POST /api/users
// create new user in users table
router.post("/users", (req, res) => {
  const user = req.body;

  db("users")
    .insert(user)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: "Error inserting user", err });
    });
});

// GET /api/users/:id
// return user by primary key id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id: id })
    .first()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "A user with that ID was not found." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error getting the user.", err });
    });
});

// UPDATE /api/user
// update user in users table by Firebase ID (user_uid)
router.put("/user", (req, res) => {
  const changes = req.body;
  const user_uid = changes.user_uid;
  db("users")
    .where({ user_uid })
    .update(changes)
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "A user with that ID does not exist." });
      } else {
        res.status(201).json(changes);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error editing the user.", err });
    });
});

// [DELETE] /api/users/:id
// delete user in users table by primary key id
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id: id })
    .del()
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "A user with that ID does not exist." });
      } else {
        res
          .status(200)
          .json({ message: "deleted the following amount of users:", count });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error deleting the user.", err });
    });
});

// [GET] /api/company/:user_uid
// returns user in users table by Firebase ID (user_uid)
router.get("/company/:user_uid", (req, res) => {
  const post = req.params;
  const user_uid = post.user_uid;
  console.log(req.params);
  db("users")
    .where({ user_uid })
    .first()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ errorMessage: `nope` });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `something is wrong`
      });
    });
});

module.exports = router;
