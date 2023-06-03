import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.cart;

export const selectTotalCount = createSelector(
  selectFeature,
  (state) => state.totalCount
);

export const selectTotalPrice = createSelector(
  selectFeature,
  (state) => state.totalPrice
);

export const selectPizzas = createSelector(
  selectFeature,
  (state) => state.pizzas
);

export const selectPizzaQuantity = (props: { id: number }) =>
  createSelector(
    selectFeature,
    (state) => state.pizzas.find((el) => el.id === props.id)?.quantity
  );
