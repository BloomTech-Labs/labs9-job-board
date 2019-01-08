const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const testRouter = require('../routers/testRouter.js');

module.exports = server => {
    server.use(express.json());
    server.use(cors());
    server.use(helmet());

    server.use('/test', testRouter);
}