import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { PopUpService } from './select-city-popup.service';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import zod from 'zod';
import { City, cityValidator } from '../types/City';

@Component({
  selector: 'app-select-city-popup',
  templateUrl: './select-city-popup.component.html',
  styleUrls: ['./select-city-popup.component.scss'],
})
export class SelectCityPopupComponent implements OnInit {
  ALPHABET1 = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И'];
  ALPHABET2 = ['І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С'];
  ALPHABET3 = ['Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ю', 'Я'];
  PIZZERIAS_TEXT_ENDINGS = ['й', 'я', 'ї', 'ї', 'ї', 'й', 'й', 'й', 'й', 'й'];

  display$!: Observable<boolean>;

  bigCities: City[] = [];
  cities: City[] = [];
  searchCities: City[] = [];

  numberOfPizzeriasText = '';

  constructor(
    private http: HttpClient,
    private popupService: PopUpService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.display$ = this.popupService.watch();
    this.popupService.watch().subscribe((display) => {
      if (display) {
        const scrollBarWidth =
          window.innerWidth - this.document.body.offsetWidth;
        this.document.body.classList.add('body--hidden-scroll');
        this.document.body.style.marginRight = scrollBarWidth.toString() + 'px';
      } else {
        this.document.body.classList.remove('body--hidden-scroll');
        this.document.body.style.marginRight = '0';
        this.searchCities = [];
      }
    });
    this.http
      .get<{
        big_cities: City[];
        cities: City[];
      }>('/api/city/')
      .subscribe({
        next: ({ big_cities, cities }) => {
          this.bigCities = big_cities;
          this.cities = cities;
        },
      });
    this.http
      .get<{ pizzeriasNumber: number }>('/api/pizzerias-number/')
      .subscribe({
        next: ({ pizzeriasNumber }) => {
          this.numberOfPizzeriasText =
            this.generatePizzeriasText(pizzeriasNumber);
        },
      });
  }

  closePopUp() {
    this.popupService.close();
  }

  filterCities(letter: string): City[] {
    if (this.searchCities.length) {
      return this.searchCities.filter((el) => el.name.startsWith(letter));
    }
    return this.cities.filter((el) => el.name.startsWith(letter));
  }

  findCities(e: Event) {
    const searchValue = (e.target as HTMLInputElement).value;

    if (searchValue.length) {
      this.searchCities = this.cities.filter((el) => {
        return el.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    } else {
      this.searchCities = [];
    }
  }

  checkIfNeedToDisplayColumn(lettersList: string[]): boolean {
    let countOfGroups = 0;
    for (let i = 0; i < lettersList.length; i++) {
      const letter = lettersList[i];
      if (this.filterCities(letter).length) {
        countOfGroups++;
      }
    }
    if (!countOfGroups) {
      return false;
    }
    return true;
  }

  generatePizzeriasText(pizzeriasNumber: number): string {
    if (pizzeriasNumber > 10 && pizzeriasNumber < 20) {
      return `${pizzeriasNumber} піцерій`;
    } else {
      return `${pizzeriasNumber} піцері${
        this.PIZZERIAS_TEXT_ENDINGS[
          parseInt(
            pizzeriasNumber
              .toString()
              .slice(pizzeriasNumber.toString().length - 1)
          )
        ]
      }`;
    }
  }

  selectCity(city: City) {
    this.popupService.selectCity(city);
    localStorage.setItem('city', JSON.stringify(city));
    this.closePopUp();
  }
}
