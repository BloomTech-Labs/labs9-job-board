// Update with your config settings.
require('dotenv').config();


const dbConnection = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/database.sqlite3'
    },
    migrations: {
      
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true,
  },

 

  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  }

};
