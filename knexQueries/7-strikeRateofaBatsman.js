// 7. Find the strike rate of a batsman for each season

const knex = require('../index');

knex
  .select('batsman', 'season')
  .sum({
    strikeRate: knex.raw('(batsmanRuns/totalBalls) * 100.0'),
  })
  .from(
    knex
      .select(
        'batsman',
        'season',
        knex.raw(
          'sum(case when noball_runs = 0 and wide_runs = 0 then 1 else 0 end) as totalBalls'
        )
      )
      .sum({ batsmanRuns: 'batsman_runs' })
      .from('deliveriesTable')
      .innerJoin(
        'matchesTable',
        'deliveriesTable.match_id',
        '=',
        'matchesTable.id'
      )
      .where('batsman', '=', 'MS Dhoni')
      .groupBy('season')
      .as('subquery')
  )
  .groupBy('season')
  .orderBy('season', 'asc')
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => knex.destroy());
