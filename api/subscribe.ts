import type { VercelRequest, VercelResponse } from '@vercel/node';

import { Kysely, PostgresDialect, Generated } from 'kysely';
import zod from 'zod';
import pg from 'pg';

interface FeedBackTable {
  id: Generated<number>;
  name: string;
  phoneNumber: string;
  text: string;
}

interface Database {
  feedback: FeedBackTable;
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
  
switch (request.method) {
  case "POST":
    const bodyValidator = zod.object({
      name: zod.string().regex(/[А-Яа-яЇїЄє ]/g),
      phoneNumber: zod.string().regex(/\+380\d{3}\d{2}\d{2}\d{2}/gi),
      text: zod.string().min(1),
    });
    const body = bodyValidator.parse(request.body);
    await db
      .insertInto('feedback')
      .values({
        name: body.name,
        phoneNumber: body.phoneNumber,
        text: body.text,
      })
      .executeTakeFirstOrThrow();
  
    response.send({ success: true });
    try {
    } catch (error) {
      console.error(error);
      response.status(500).send({ success: false });
    }
    break;
    case "GET":
      const subscriptions: any[] =  await db.selectFrom("feedback")
      .selectAll()
      .execute()
      return response.send(subscriptions.map((el)=>` 
      <div>
        <h2>${el.name}</h2>
        <h2>${el.phoneNumber}</h2>
        <h4>${el.text}</h4>
    </div>
  `).join(""));
      break;

  default:
    if (request.method !== 'POST') {
     return  response.status(404);
    }
    break;
}
  
}
