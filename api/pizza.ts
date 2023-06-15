import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Database } from 'db/db';

import { Kysely, PostgresDialect, Generated } from 'kysely';
import pg from 'pg';

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
  const { sortById, categoryId } = request.query;
  const orderBy: Array<'categoryId' | 'price' | 'name'> = [
    'categoryId',
    'price',
    'name',
  ];
  const pizzas = db
    .selectFrom('pizza')
    .selectAll()
    .where('categoryId', '=', parseInt(categoryId[0]))
    .orderBy(orderBy[parseInt(sortById[0])] || 'categoryId');
  if (categoryId === '0') {
    return response.send(await pizzas.clearWhere().execute());
  }
  return response.send(await pizzas.execute());
}
