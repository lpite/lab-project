import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../types/City';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  private display = new BehaviorSubject<boolean>(false);
  private selectedCity = new BehaviorSubject<City>({
    id: '',
    name: '',
    pizzerias_quantity: '',
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

  selectCity(city: City) {
    localStorage.setItem('city', JSON.stringify(city));
    this.selectedCity.next(city);
  }

  getSelectedCity() {
    return this.selectedCity.asObservable();
  }
}
