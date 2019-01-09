// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://sokhsjoocomver:2de0cb97c78c736c1a83986d9eed35930dcf2f7e1752ab246a1f07a2c1df80d4@ec2-54-235-67-106.compute-1.amazonaws.com:5432/d7371r9etk7t03',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true,
    ssl: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
