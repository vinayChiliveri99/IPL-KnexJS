// 2. Number of matches won per team per year in IPL.

const knex = require('../index');

knex
  .select('season', 'winner')
  .count({ won: 'winner' })
  .from('matchesTable')
  .whereNot('winner', '=', '')
  .groupBy('winner', 'season')
  .orderBy('season')
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => knex.destroy());
