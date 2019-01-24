const express = require("express");

const db = require("../db/config");
const router = express.Router();

//-------------USER ENDPOINTS-------------------
//GET all users
router.get("/users", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(501).json(err);
    });
});

//POST new user
router.post("/users", (req, res) => {
  console.log("in new user");
  const user = req.body;

  db("users")
    .insert(user)
    .then(ids => {
      console.log("ids", ids);
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log("err", err);
      res.status(500).json({ message: "Error inserting user", err });
    });
});

//GET user by id
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

//UPDATE user
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
