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

// [GET] /api/users/:id/balance
// returns either expiration date of unlimited job posting or balance
router.get("/users/:id/balance", (req, res) => {
  const user_uid = req.params.id;

  if (user_uid) {
    db("users")
      .select("balance", "unlimited", "expiration")
      .where({ user_uid })
      .then(response => {
        if (response.length) {
          const user = response[0];
          if (user.unlimited && user.expiration) {
            console.log(user.expiration);
            console.log(typeof user.expiration);
            console.log(user.expiration instanceof Date);
            if (unlimitedExpired(user.expiration)) {
              // reset unlimited=false and expiration=null
              res.status(200).json({ balance: user.balance, hello: "hello" });
            } else {
              res.status(200).json({ expiration: user.expiration });
            }
          } else {
            res.status(200).json({ balance: user.balance });
          }
        } else {
          res.status(404).json({ message: "User id does not exist" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to retrieve balance" });
      });
  } else {
    res.status(400).json({ message: "Invalid id", user_uid });
  }
});

// returns true if expiration date has passed
function unlimitedExpired(date) {
  const now = new Date();
  let expiration = date;

  if (!(date instanceof Date)) {
    expiration = Date.parse(date);

    if (!expiration) {
      return "Invalid arguement";
    }
  }
  
  return expiration - now > 0 ? false : true;
}

module.exports = router;
