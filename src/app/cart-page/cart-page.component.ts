import { Component, OnInit } from '@angular/core';
import { CartPizza } from '../store/cart/cart.reducer';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import {
  selectPizzas,
  selectTotalCount,
  selectTotalPrice,
} from '../store/cart/cart.selectors';
import { Observable } from 'rxjs';
import { clearCart } from '../store/cart/cart.actions';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  pizzas$!: Observable<CartPizza[]>;
  totalCount$!: Observable<number>;
  totalPrice$!: Observable<number>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.pizzas$ = this.store.select(selectPizzas);
    this.totalCount$ = this.store.select(selectTotalCount);
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}
