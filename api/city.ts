import { VercelRequest, VercelResponse } from '@vercel/node';
import { Database } from 'db/db';
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

export default async function (_: VercelRequest, response: VercelResponse) {
  try {
    const db = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new pg.Pool({
          host: process.env?.['DB_HOST_URL'],
          database: process.env?.['DB_NAME'],
          port: parseInt(process.env?.['DB_PORT'] || ''),
          user: process.env?.['DB_USER'],
          password: process.env?.['DB_PASSWORD'],
        }),
      }),
    });
    const cities = await db
      .selectFrom('city')
      .leftJoin('pizzeria', 'pizzeria.city_id', 'city.id')
      .select(['city.name', 'city.id'])
      .select(({ fn }) =>
        fn.count<number>('pizzeria.id').as('pizzerias_quantity')
      )
      .where('hidden', '!=', true)
      .orderBy('pizzerias_quantity')
      .groupBy(['city.name', 'city.id'])
      .execute();
    const bigCities = await db
      .selectFrom('city')
      .leftJoin('pizzeria', 'pizzeria.city_id', 'city.id')
      .select(['city.name', 'city.id'])
      .select(({ fn }) => fn.count('pizzeria.city_id').as('pizzerias_quantity'))
      .where('hidden', '!=', true)
      .orderBy('pizzerias_quantity', 'desc')
      .groupBy(['city.name', 'city.id'])
      .limit(2)
      .execute();
    response.send({
      big_cities: bigCities,
      cities: cities,
    });
  } catch (error) {
    console.log(error);
    response.send([]);
  }
}
