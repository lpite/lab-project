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

    const { pizzeriasNumber } = await db
      .selectFrom('pizzeria')
      .select(({ fn }) => fn.count('id').as('pizzeriasNumber'))
      .executeTakeFirstOrThrow();

    response.send({ pizzeriasNumber: parseInt(pizzeriasNumber.toString()) });
  } catch (error) {
    response.send({ pizzeriasNumber: 0 });
  }
}
