import type { VercelRequest, VercelResponse } from '@vercel/node';

import { Kysely, PostgresDialect, Generated } from 'kysely';
import zod from 'zod';
import pg from 'pg';

export interface PromoCodeTable {
  id: Generated<number>;
  text: string;
  uses_left: number;
  discount_percent: number;
}

interface Database {
  promo_code: PromoCodeTable;
}
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

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const queryValidator = zod.object({
      promocode: zod.string().nonempty(),
    });
    const { promocode } = queryValidator.parse(request.query);
    const obj = await db
      .selectFrom('promo_code')
      .selectAll()
      .where('promo_code.text', '=', promocode)
      .executeTakeFirst();
    if (obj?.uses_left) {
      response.send({ valid: true, percentage: obj.discount_percent });
    } else {
      response.send({ valid: false, percentage: 0 });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ valid: false, percentage: 0 });
  }
}
