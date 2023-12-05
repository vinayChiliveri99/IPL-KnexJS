// 5. Find the number of times each team won the toss and also won the match

const knex = require('../index');

knex
  .select('winner as team')
  .count('toss_winner as times')
  .from('matchesTable')
  .where('toss_winner', '=', knex.ref('winner'))
  .groupBy('winner')
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => knex.destroy());
