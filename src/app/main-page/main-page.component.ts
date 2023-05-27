import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PizzaService } from '../pizza.service';
import { categoryIdSelector, sortByIdSelector } from '../store/filter.selectors';
import { Pizza } from '../types/Pizza';
import { AppStateInterface } from '../types/appState.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
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
