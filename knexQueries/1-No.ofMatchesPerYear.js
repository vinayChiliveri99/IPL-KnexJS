// 1. Number of matches played per year for all the years in IPL.

const knex = require('../index');

knex
  .select('season')
  .count({ matchesPlayed: 'season' })
  .from('matchesTable')
  .groupBy('season')
  .orderBy('season')
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally(() => knex.destroy());
