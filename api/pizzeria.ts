import { VercelRequest, VercelResponse } from '@vercel/node';

import type { Database } from 'db/db';

import { Kysely, PostgresDialect, Generated } from 'kysely';
import pg from 'pg';

import zod from 'zod';

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
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

    const queryValidator = zod.object({
      cityId: zod
        .string()
        .nonempty()
        .transform((val) => parseInt(val)),
    });
    const { cityId } = queryValidator.parse(request.query);

    const pizzerias = await db
      .selectFrom('pizzeria')
      .selectAll()
      .where('city_id', '=', cityId)
      .execute();
    response.send(pizzerias);
  } catch (error) {
    console.error(error);
    response.send([]);
  }
}
