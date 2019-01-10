const dbEnvironment = process.env.DB|| 'development';

const config = require('../knexfile.js')[dbEnvironment];

module.exports = require('knex')(config);