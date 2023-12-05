const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'india@123',
    database: 'dummy',
  },
});

module.exports = knex;
