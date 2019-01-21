// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// app.use(cors());
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());

// const configureRoutes = require('./payment');

// configureRoutes(app);

// app.listen(9000, error => {
// 	if (error) throw error;
// 	console.log('Server running on port ' + 9000);
// });

const app = require('express');
const stripe = require('stripe')('sk_test_W2k36bSR8IXQLEqa9IHJoCfz');

app.use(require('body-parser').text());

app.get('/', async (req, res) => {
	res.send({
		message: 'Hello Stripe checkout server!',
		timestamp: new Date().toISOString(),
	});
});

app.post('/charge', async (req, res) => {
	try {
		let { status } = await stripe.charges.create({
			amount: 29999,
			currency: 'usd',
			description: 'Unlimited Jobs - 100 tokens',
			source: req.body,
		});

		res.json({ status });
	} catch (err) {
		res.status(500).end();
	}
});

app.listen(9000, () => console.log('Listening on port 9000'));
