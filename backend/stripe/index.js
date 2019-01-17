// connects server.js to payment.js (endpoint)
const paymentApi = require('./payment');
const configureRoutes = app => {
	paymentApi(app);
};
module.exports = configureRoutes;
