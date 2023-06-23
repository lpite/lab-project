import { Component, OnInit } from '@angular/core';
import { PopUpService } from './select-city-popup/select-city-popup.service';
import { cityValidator } from './types/City';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private selectCityPopupService: PopUpService) {}
  ngOnInit(): void {
    const savedCity = cityValidator.parse(
      JSON.parse(localStorage.getItem('city') || '')
    );

    this.selectCityPopupService.selectCity(savedCity || '');
  }
}
