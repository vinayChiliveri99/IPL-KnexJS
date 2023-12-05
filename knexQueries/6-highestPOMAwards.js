// 6. Find a player who has won the highest number of Player of the Match awards for each season

const knex = require('../index');

knex
  .select('season', 'player_of_match', 'times')
  .from(
    knex
      .select(
        'season',
        'player_of_match',
        knex.raw(
          `RANK() OVER (PARTITION BY season ORDER BY COUNT(player_of_match) DESC) AS rnk`
        )
      )
      .count('player_of_match as times')
      .from('matchesTable')
      .whereNot('player_of_match', '=', '')
      .groupBy('season', 'player_of_match')
      .as('subquery')
  )
  .where('rnk', '=', '1')
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => knex.destroy());
