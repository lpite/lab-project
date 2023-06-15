import { Generated } from 'kysely';

export interface OrderTable {
  id: Generated<number>;
  customer_name: string;
  customer_phonenumber: string;
  payment_method: string;
  sum: number;
}

export interface OrderPizzaTable {
  id: Generated<number>;
  pizza_id: number;
  order_id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface PizzaTable {
  id: Generated<number>;
  name: string;
  price: number;
  imageUrl: string;
  inFuture: boolean;
  categoryId: number;
}

export interface PromoCodeTable {
  id: Generated<number>;
  text: string;
  uses_left: number;
  discount_percent: number;
}

export interface FeedBackTable {
  id: Generated<number>;
  name: string;
  phoneNumber: string;
  text: string;
}

export interface CityTable {
  id: Generated<number>;
  name: string;
  hidden: boolean;
}

export interface PizzeriaTable {
  id: Generated<number>;
  city_id: number;
  address: string;
}

export interface Database {
  order: OrderTable;
  order_pizza: OrderPizzaTable;
  pizza: PizzaTable;
  promo_code: PromoCodeTable;
  city: CityTable;
  pizzeria: PizzeriaTable;
  feedback: FeedBackTable;
}
