require("dotenv").config();

const stripeSecret = process.env.SECRET_KEY;

const express = require("express");

const db = require("../db/config");
const stripe = require("stripe")(stripeSecret);
const router = express.Router();

const billingOptions = {
  job1: {
    amount: 999,
    currency: "usd",
    description: "Increase account balance by 1 postable job"
  },
  job12: {
    amount: 9999,
    currency: "usd",
    description: "Increase account balance by 12 postable jobs"
  },
  unlimited: {
    amount: 29999,
    currency: "usd",
    description:
      "Account can post unlimited jobs for 1 month from time of purchase"
  }
};

// [POST] /api/billing/charge
// charges through Stripe and updates account accordingly
router.post("/charge", async (req, res) => {
  const { option, source, user_uid } = req.body;

  if (option && source && user_uid) {
    try {
      const chargeObject = Object.assign(billingOptions[option], { source });

      let status = await stripe.charges.create(chargeObject);
      console.log(chargeObject);

      if (status.amount && status.status === "succeeded") {
        switch (status.amount) {
          case 999:
            await db("users")
              .where({ user_uid })
              .increment("balance", 1);
            console.log("in 999");
            break;
          case 9999:
            await db("users")
              .where({ user_uid })
              .increment("balance", 12);
            break;
          case 29999:
            console.log("bought unlimited jobs for 1 month");
            break;
          default:
        }
        res.status(200).json({ amount: status.amount, status: status.status });
      } else {
        throw new Error();
      }
    } catch (err) {
      res.status(500).json({ message: "Error processing payment" });
    }
  } else {
    res.status(400).json({ message: "Malformed request" });
  }
});

// [GET] /api/billing/balance/:id
// returns either expiration date of unlimited job posting or balance
router.get("/balance/:id", (req, res) => {
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
              // change if statement once unlimited is reset if expired
              res.status(200).json({ balance: user.balance, expiration: null });
            } else {
              res
                .status(200)
                .json({ balance: user.balance, expiration: user.expiration });
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
