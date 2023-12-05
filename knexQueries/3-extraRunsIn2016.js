// 3. Extra runs conceded per team in the year 2016

const knex = require('../index');

knex
  .select({ team: 'bowling_team' })
  .sum({ extras: 'extra_runs' })
  .from('deliveriesTable')
  .innerJoin(
    'matchesTable',
    'deliveriesTable.match_id',
    '=',
    'matchesTable.id'
  )
  .where('season', '=', '2016')
  .groupBy('bowling_team')
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => knex.destroy());
