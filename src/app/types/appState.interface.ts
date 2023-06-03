import { CartStateInterface } from '../store/cart/cart.reducer';
import { FiltersStateInterface } from '../store/filter.reducer';

export interface AppStateInterface {
  filters: FiltersStateInterface;
  cart: CartStateInterface;
}
