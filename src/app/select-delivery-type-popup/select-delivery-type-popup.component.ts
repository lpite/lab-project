import { Component, OnInit } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { SelectOrderTypePopupService } from './select-delivery-type-popup.component.service';
import { Pizzeria } from '../types/Pizzeria';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from '../select-city-popup/select-city-popup.service';
import { City } from '../types/City';

@Component({
  selector: 'app-select-delivery-type-popup',
  templateUrl: './select-delivery-type-popup.component.html',
  styleUrls: ['./select-delivery-type-popup.component.scss'],
})
export class SelectDeliveryTypePopupComponent implements OnInit {
  display$!: Observable<boolean>;
  pizzerias: Pizzeria[] = [];
  selectedPizzeria$!: Observable<Pizzeria>;
  selectedCity!: City;

  constructor(
    private popupService: SelectOrderTypePopupService,
    private selectCityPopupService: PopUpService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.display$ = this.popupService.watch();
    this.selectedPizzeria$ = this.popupService.getSelectedPizzeria();
    this.selectCityPopupService.getSelectedCity().subscribe((city) => {
      console.log(city)
      this.selectedCity = city;
      this.http
        .get<Pizzeria[]>(`/api/pizzeria/?cityId=${this.selectedCity.id}`)
        .subscribe({
          next: (pizzerias) => {
            this.pizzerias = pizzerias;
          },
        });
    });
  }

  setPizzeria(pizzeria: Pizzeria) {
    this.popupService.selectPizzeria(pizzeria);
  }

  closePopUp() {
    this.popupService.close();
  }
}
