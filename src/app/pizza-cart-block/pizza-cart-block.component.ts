import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CartPizza } from '../store/cart/cart.reducer';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import {
  addToCart,
  removeOnePizza,
  removePizza,
} from '../store/cart/cart.actions';

@Component({
  selector: 'app-pizza-cart-block',
  templateUrl: './pizza-cart-block.component.html',
  styleUrls: ['./pizza-cart-block.component.scss'],
})
export class PizzaCartBlockComponent implements OnInit {
  @HostBinding('class.cart__item') someField: boolean = true;
  @Input() pizza!: CartPizza;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {}

  removePizza(pizzaId: number): void {
    this.store.dispatch(removePizza({ pizzaId }));
  }

  addOnePizza(): void {
    this.store.dispatch(addToCart(this.pizza));
  }

  removeOnePizza(): void {
    this.store.dispatch(removeOnePizza({ pizzaId: this.pizza.id }));
  }
}
