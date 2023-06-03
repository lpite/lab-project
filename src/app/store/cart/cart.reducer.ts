import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Pizza } from 'src/app/types/Pizza';

export interface CartPizza extends Pizza {
  quantity: number;
}

export interface CartStateInterface {
  totalCount: number;
  totalPrice: number;
  pizzas: CartPizza[];
}

const initialState: CartStateInterface = {
  totalCount: 0,
  totalPrice: 0,
  pizzas: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, pizza) => {
    const isPizzaInCart = state.pizzas.filter(
      (el) => el.id === pizza.id
    ).length;
    if (isPizzaInCart) {
      const newState = state.pizzas.map((el) => {
        if (el.id === pizza.id) {
          return {
            ...el,
            quantity: el.quantity + 1,
          };
        }
        return el;
      });
      return {
        ...state,
        totalPrice: state.totalPrice + pizza.price,
        totalCount: state.totalCount + 1,
        pizzas: newState,
      };
    } else {
      return {
        ...state,
        totalPrice: state.totalPrice + pizza.price,
        totalCount: state.totalCount + 1,
        pizzas: [...state.pizzas, pizza],
      };
    }
  }),
  on(CartActions.clearCart, (state) => initialState),
  on(CartActions.removePizza, (state, { pizzaId }) => {
    const pizza = state.pizzas.find((el) => el.id === pizzaId);
    return {
      ...state,
      pizzas: state.pizzas.filter((el) => el.id !== pizzaId),
      totalCount: state.totalCount - (pizza?.quantity || 0),
      totalPrice:
        state.totalPrice - (pizza?.price || 0) * (pizza?.quantity || 0),
    };
  }),
  on(CartActions.removeOnePizza, (state, { pizzaId }) => {
    const pizza = state.pizzas.find((el) => el.id === pizzaId);
    if (pizza?.quantity === 1) {
      return {
        ...state,
      };
    }
    const newPizzas = state.pizzas.map((el) => {
      if (el.id === pizzaId && el.quantity !== 1) {
        return {
          ...el,
          quantity: el.quantity - 1,
        };
      }
      return el;
    });

    return {
      pizzas: newPizzas,
      totalCount: state.totalCount - 1,
      totalPrice: state.totalPrice - (pizza?.price || 0),
    };
  })
);
