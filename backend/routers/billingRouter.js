require("dotenv").config();

const stripeSecret = process.env.SECRET_KEY;

const express = require("express");

const db = require("../db/config");
const stripe = require("stripe")(stripeSecret);
const router = express.Router();

// billing plan object to pass to Stripe
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
      // adds billing object to the charge object to be sent to Stripe
      const chargeObject = Object.assign(billingOptions[option], { source });

      let status = await stripe.charges.create(chargeObject);

      if (status.amount && status.status === "succeeded") {
        switch (status.amount) {
          case 999:
            // if purchase was for $9.99, increase balance by 1
            await db("users")
              .where({ user_uid })
              .increment("balance", 1);
            break;
          case 9999:
            // if purchase was $99.99, increase balance by 12
            await db("users")
              .where({ user_uid })
              .increment("balance", 12);
            break;
          case 29999:
            /* if purchase was $299.99, either set expiry to 30 
             days future or add 30 days to current expiry */
            let unlimitedStatus = await db("users")
              .select("unlimited", "expiration")
              .where({ user_uid });
            unlimitedStatus = unlimitedStatus[0];
            if (
              // if status is unlimited, and expiry is still valid
              unlimitedStatus.unlimited &&
              !unlimitedExpired(unlimitedStatus.expiration)
            ) {
              // add 30 days to current expiry
              await db("users")
                .where({ user_uid })
                .update({
                  expiration: addMonthToDate(unlimitedStatus.expiration)
                });
            } else {
              // set new expiry 30 days future
              await db("users")
                .where({ user_uid })
                .update({
                  unlimited: true,
                  expiration: addMonthToDate(new Date())
                });
            }
            break;
          // default is if charge other than 999, 9999, 29999
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
// returns balance and expiry date if valid
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
            /* if status is unlimited and expiration non-null */
            if (unlimitedExpired(user.expiration)) {
              // ----------------------- TO DO -------------------------
              // reset unlimited=false and expiration=null
              // change if statement once unlimited is reset if expired
              res.status(200).json({ balance: user.balance, expiration: null });
            } else {
              res
                .status(200)
                .json({ balance: user.balance, expiration: user.expiration });
            }
          } else {
            res.status(200).json({ balance: user.balance, expiration: null });
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
  let expiration;

  if (!(date instanceof Date)) {
    expiration = Date.parse(date);

    if (!expiration) {
      return "Invalid arguement";
    }
  } else {
    expiration = date.getTime();
  }

  return expiration - now > 0 ? false : true;
}

// returns date string with added 30 days
function addMonthToDate(date) {
  let expiration;

  if (!(date instanceof Date)) {
    expiration = Date.parse(date);

    if (!expiration) {
      return "Invalid arguement";
    }
  } else {
    expiration = date.getTime();
  }

  return new Date(expiration + 2592000000);
}

module.exports = router;
