const express = require('express')();
const cors = require('cors');
const helmet = require('helmet');

const testRouter = require('../routers/testRouter.js');
const router = require('../routers/router.js');
const stripeRouter = require('../routers/stripeRouter.js');
module.exports = server => {
	// middleware
	server.use(express.json());
	server.use(cors());
	server.use(helmet());
	server.use(require('body-parser').text());

	// express routers
	server.use('/test', testRouter);
	server.use('/api', router);
};
