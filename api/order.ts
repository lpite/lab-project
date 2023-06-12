import { VercelRequest, VercelResponse } from '@vercel/node';

import { Kysely, PostgresDialect, Generated } from 'kysely';
import pg from 'pg';
import zod from 'zod';
import { PizzaTable } from './pizza';
import { PromoCodeTable } from './promocode';

interface OrderTable {
  id: Generated<number>;
  customer_name: string;
  customer_phonenumber: string;
  payment_method: string;
  sum: number;
}

interface OrderPizzaTable {
  id: Generated<number>;
  pizza_id: number;
  order_id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Database {
  order: OrderTable;
  order_pizza: OrderPizzaTable;
  pizza: PizzaTable;
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
    if (request.method !== 'POST') {
      response.status(404);
    }

    const bodyValidator = zod.object({
      customer: zod.object({
        name: zod.string().nonempty(),
        phoneNumber: zod.string().regex(/\+380\d{3}\d{2}\d{2}\d{2}/gi),
      }),
      paymentMethod: zod.string(),
      pizzas: zod.array(
        zod.object({
          id: zod
            .string()
            .nonempty()
            .transform((val) => parseFloat(val)),
          quantity: zod.number(),
        })
      ),
      promocode: zod.string(),
    });

    const { customer, paymentMethod, pizzas, promocode } = bodyValidator.parse(
      request.body
    );
    let orderSum = 0;
    const orderPizzas: OrderPizzaTable[] = [];

    for (let i = 0; i < pizzas.length; i++) {
      const orderPizza = pizzas[i];
      const pizza = await db
        .selectFrom('pizza')
        .selectAll()
        .where('id', '=', orderPizza.id)
        .executeTakeFirstOrThrow();

      orderSum += orderPizza.quantity * pizza.price;
    }

    const promo = await db
      .selectFrom('promo_code')
      .selectAll()
      .where('text', '=', promocode)
      .where('uses_left', '>', 0)
      .executeTakeFirst();

    orderSum = orderSum - (orderSum * (promo?.discount_percent || 0)) / 100;

    const order = await db
      .insertInto('order')
      .returning('id')
      .values({
        customer_name: customer.name,
        customer_phonenumber: customer.phoneNumber,
        sum: orderSum,
        payment_method: paymentMethod,
      })
      .executeTakeFirstOrThrow();
    for (let i = 0; i < pizzas.length; i++) {
      const orderPizza = pizzas[i];
      const pizza = await db
        .selectFrom('pizza')
        .selectAll()
        .where('id', '=', orderPizza.id)
        .executeTakeFirstOrThrow();

      await db
        .insertInto('order_pizza')
        .values({
          order_id: order.id,
          pizza_id: pizza.id,
          name: pizza.name,
          price: pizza.price,
          quantity: orderPizza.quantity,
        })
        .executeTakeFirstOrThrow();
    }
    if (promo?.id) {
      if ((promo?.uses_left || 0) > 0) {
        await db
          .updateTable('promo_code')
          .where('id', '=', promo.id)
          .set({
            uses_left: (promo?.uses_left || 0) - 1,
          })
          .executeTakeFirstOrThrow();
      }
    }
    response.send({ success: true });
  } catch (error) {
    console.error(error);
    response.status(500).send({ success: false });
  }
}
