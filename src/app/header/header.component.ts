import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import {
  selectTotalCount,
  selectTotalPrice,
} from '../store/cart/cart.selectors';
import { PopUpService } from '../select-city-popup/select-city-popup.service';
import { Observable } from 'rxjs';
import { City } from '../types/City';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  totalPrice$: Observable<number> = new Observable<0>();
  totalCount$: Observable<number> = new Observable<0>();

  selectedCity$: Observable<City> = new Observable<{
    id: '';
    name: '';
    pizzerias_quantity: '';
  }>();

  constructor(
    private store: Store<AppStateInterface>,
    private popupService: PopUpService
  ) {}

  ngOnInit(): void {
    this.totalPrice$ = this.store.select(selectTotalPrice);
    this.totalCount$ = this.store.select(selectTotalCount);
    this.selectedCity$ = this.popupService.getSelectedCity();
  }

  openPopup(): void {
    this.popupService.open();
  }
}
