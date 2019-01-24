require('dotenv').config();
const stripeSecret = process.env.SECRET_KEY;
const app = require('express')();
const stripe = require('stripe')(stripeSecret);
const cors = require('cors');

app.use(cors());
app.use(require('body-parser').text());

app.get('/', async (req, res) => {
	res.send({
		message: 'Hello Stripe checkout server!',
		timestamp: new Date().toISOString(),
	});
});
app.get('/charge', async (req, res) => {
	//TODO: Need to have all of the charges listed
	// try {
	// 	await stripe.charges.list({ limit: 10 }, function(err, charges) {
	// 		if (!err) {
	// 			res.send(200).json({ charges });
	// 		}
	// 	});
	// } catch (err) {
	// 	res.status(500).end();
	// }
});

app.post('/charge', async (req, res) => {
	if (req.body.option === '100 credits') {
		try {
			let { status } = await stripe.charges.create({
				amount: 29999,
				currency: 'usd',
				description: '100 credits charge',
				source: req.body,
			});
			res.json({ status });
		} catch (err) {
			res.status(500).end();
		}
	} else if (req.body.option === '50 credits') {
		try {
			let { status } = await stripe.charges.create({
				amount: 9999,
				currency: 'usd',
				description: '50 credits charge',
				source: req.body,
			});
			res.json({ status });
		} catch (err) {
			res.status(500).end();
		}
	} else {
		try {
			let { status } = await stripe.charges.create({
				amount: 999,
				currency: 'usd',
				description: '1 credit charge',
				source: req.body,
			});
			res.json({ status });
		} catch (err) {
			res.status(500).end();
		}
	}
});

app.listen(9000, () => console.log('Listening on port 9000'));
