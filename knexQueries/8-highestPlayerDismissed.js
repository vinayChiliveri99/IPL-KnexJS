// 8. Find the highest number of times one player has been dismissed by another player

const knex = require('../index');

knex
  .select('bowler', 'player_dismissed')
  .count({ times: 'player_dismissed' })
  .from('deliveriesTable')
  .whereNotIn('player_dismissed', ['', 'run out', 'retired hurt'])
  .groupBy('bowler', 'player_dismissed')
  .orderBy('times', 'desc')
  .limit(1)
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => knex.destroy());
