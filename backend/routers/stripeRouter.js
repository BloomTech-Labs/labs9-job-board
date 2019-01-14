const express = require('express');
const stripe = require('stripe')('sk_test_W2k36bSR8IXQLEqa9IHJoCfz');
const router = express.Router();

router.post('/charge', async (req, res) => {
	try {
		let { status } = await stripe.charges.create({
			amount: 2000,
			currency: 'usd',
			description: 'An example cahrge',
			source: req.body,
		});
		res.jsson({ status });
	} catch (err) {
		res.status(500).end();
	}
});

module.exports = router;
