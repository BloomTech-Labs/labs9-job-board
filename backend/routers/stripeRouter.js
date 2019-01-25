require("dotenv").config();

const stripeSecret = process.env.SECRET_KEY;

const express = require("express");
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

router.post("/charge", async (req, res) => {
  const { option, source } = req.body;
  console.log(req.body);

  try {
    const chargeObject = Object.assign(billingOptions[option], { source });

    let status = await stripe.charges.create(chargeObject);
    console.log(chargeObject);

    if (status.amount && status.status) {
      res.status(200).json({ amount: status.amount, status: status.status });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(500).json({ message: "Error processing payment" });
  }
});

// router.get("/test", (req, res) => {
//   res.status(200).json({ message: "test auth endpoint" });
// });

module.exports = router;
