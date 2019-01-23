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
});

app.post('/charge', async (req, res) => {
	try {
		let { status } = await stripe.charges.create({
			amount: 9999,
			currency: 'usd',
			description: 'An example charge',
			source: req.body,
		});

		res.json({ status });
	} catch (err) {
		res.status(500).end();
	}
});

app.listen(9000, () => console.log('Listening on port 9000'));
