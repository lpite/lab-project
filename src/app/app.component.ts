import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lab-project';
  pizzas = [
    {
      id: 0,
      name: 'Італійська',
      imageUrl: 'italic.png',
      price: 1,
    },
    {
      id: 1,
      name: 'Пепероні',
      imageUrl: 'peperoni.jpg',
      price: 1,
    },
    {
      id: 2,
      name: "М'ясна",
      imageUrl: 'meat.png',
      price: 1,
    },
    {
      id: 3,
      name: 'Маргарита',
      imageUrl: 'margarita.jpg',
      price: 1,
    },
    {
      id: 4,
      name: 'Чотири сири',
      imageUrl: '4 cheese.jpg',
      price: 1,
    },
    {
      id: 5,
      name: 'Домашня',
      imageUrl: 'homemade.png',
      price: 1,
      inFuture: true,
    },
    {
      id: 6,
      name: 'Овочі та гриби',
      imageUrl: 'vegetablesAndMushrooms.png',
      price: 1,
      inFuture: true,
    },
    {
      id: 7,
      name: 'Подвійне курча',
      imageUrl: 'doublechicken.png',
      price: 1,
      inFuture: true,
    },
  ];
}
