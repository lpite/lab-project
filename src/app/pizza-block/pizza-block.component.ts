import { Component, Input, OnInit } from '@angular/core';
import { Pizza } from '../types/Pizza';
import { CartPizza } from '../store/cart/cart.reducer';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import { addToCart } from '../store/cart/cart.actions';
import {
  selectPizzaQuantity,
  selectPizzas,
} from '../store/cart/cart.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza-block',
  templateUrl: './pizza-block.component.html',
  styleUrls: ['./pizza-block.component.scss'],
})
export class PizzaBlockComponent implements OnInit {
  @Input() pizza!: Pizza;
  pizzaQuantity!: Observable<number | undefined>;

  constructor(private store: Store<AppStateInterface>) {}
  ngOnInit(): void {
    this.pizzaQuantity = this.store.select(
      selectPizzaQuantity({ id: this.pizza.id })
    );
  }

  addToCart() {
    this.store.dispatch(addToCart({ ...this.pizza, quantity: 1 }));
  }
}
