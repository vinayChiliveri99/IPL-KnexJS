// 4. Top 10 economical bowlers in the year 2015

const knex = require('../index');

knex
  .select('bowler')
  .sum({ economy: knex.raw('(total_runs * 6 / totalBalls)') })
  .from(
    knex
      .select(
        'bowler',
        knex.raw(
          'sum(batsman_runs + wide_runs + noball_runs) as total_runs'
        ),
        knex.raw(
          'sum(case when noball_runs = 0 and wide_runs = 0 then 1 else 0 end) as totalBalls'
        )
      )
      .from('deliveriesTable')
      .innerJoin(
        'matchesTable',
        'deliveriesTable.match_id',
        '=',
        'matchesTable.id'
      )
      .where('season', '=', '2015')
      .groupBy('bowler')
      .as('subquery')
  )
  .groupBy('bowler')
  .orderBy('economy', 'asc')
  .limit(10)
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally(() => knex.destroy());
