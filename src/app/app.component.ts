import { Component, OnInit } from '@angular/core';
import { Pizza } from './types/Pizza';
import { PizzaService } from './pizza.service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './types/appState.interface';
import { categoryIdSelector, sortByIdSelector } from './store/filter.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pizzas!: Pizza[];
  categoryId: number = 0;
  sortById: number = 0;
  constructor(
    private pizzaService: PizzaService,
    private store: Store<AppStateInterface>
  ) {}
  ngOnInit(): void {
    this.getPizzas();
    this.store.select(categoryIdSelector).subscribe((id) => {
      this.categoryId = id;
      this.getPizzas();
    });
    this.store.select(sortByIdSelector).subscribe((id) => {
      this.sortById = id;
      this.getPizzas();
    });
  }
  getPizzas() {
    this.pizzaService
      .getPizzas({ categoryId: this.categoryId, sortById: this.sortById })
      .subscribe((pizzas) => (this.pizzas = pizzas));
  }
}
