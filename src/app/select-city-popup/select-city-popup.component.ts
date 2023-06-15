import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import pizzeriasNumber from 'api/pizzerias-number';

interface City {
  name: string;
  pizzerias_quantity: string;
}

@Component({
  selector: 'app-select-city-popup',
  templateUrl: './select-city-popup.component.html',
  styleUrls: ['./select-city-popup.component.scss'],
})
export class SelectCityPopupComponent implements OnInit {
  @Input('visible') visible: boolean = false;

  ALPHABET1 = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И'];
  ALPHABET2 = ['І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С'];
  ALPHABET3 = ['Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ю', 'Я'];
  PIZZERIAS_TEXT_ENDINGS = ['й', 'я', 'ї', 'ї', 'ї', 'й', 'й', 'й', 'й', 'й'];

  bigCities: City[] = [];
  cities: City[] = [];
  searchCities: City[] = [];

  numberOfPizzeriasText = '';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get<{
        big_cities: City[];
        cities: City[];
      }>('/api/city/')
      .subscribe({
        next: ({ cities, big_cities }) => {
          this.bigCities = big_cities;
          this.cities = cities;
        },
      });
    this.http
      .get<{ pizzeriasNumber: number }>('/api/pizzerias-number/')
      .subscribe({
        next: ({ pizzeriasNumber }) => {
          this.numberOfPizzeriasText = this.generatePizzeriasText(pizzeriasNumber);
        },
      });
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
    return '';
  }
}
