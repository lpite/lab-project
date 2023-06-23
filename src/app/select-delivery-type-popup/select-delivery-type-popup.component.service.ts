import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../types/City';
import { Pizzeria } from '../types/Pizzeria';

@Injectable({
  providedIn: 'root',
})
export class SelectOrderTypePopupService {
  private display = new BehaviorSubject<boolean>(false);
  private selectedPizzeria = new BehaviorSubject<Pizzeria>({
    id: '',
    city_id: '',
    address: '',
  });

  watch(): Observable<boolean> {
    return this.display.asObservable();
  }

  open() {
    this.display.next(true);
  }

  close() {
    this.display.next(false);
  }

  selectPizzeria(pizzeria: Pizzeria) {
    this.selectedPizzeria.next(pizzeria);
  }

  getSelectedPizzeria() {
    return this.selectedPizzeria.asObservable();
  }
}
