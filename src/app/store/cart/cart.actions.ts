import { createAction, props } from '@ngrx/store';
import { Pizza } from 'src/app/types/Pizza';
import { CartPizza } from './cart.reducer';

export const addToCart = createAction(
  '[Cart Store] Add To Cart',
  props<CartPizza>()
);

export const clearCart = createAction('[Cart Store] Clear Cart');

export const removePizza = createAction(
  '[Cart Store] Remove Pizza',
  props<{ pizzaId: string }>()
);

export const removeOnePizza = createAction(
  '[Cart Store] Remove One Pizza',
  props<{ pizzaId: string }>()
);
