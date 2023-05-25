import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (request: VercelRequest, response: VercelResponse) {
  let pizzas = [
    {
      id: 0,
      name: 'Італійська',
      imageUrl: 'italic.png',
      price: 1,
      categoryId: 1,
    },
    {
      id: 1,
      name: 'Пепероні',
      imageUrl: 'peperoni.jpg',
      price: 1,
      categoryId: 1,
    },
    {
      id: 2,
      name: "М'ясна",
      imageUrl: 'meat.png',
      price: 1,
      categoryId: 1,
    },
    {
      id: 3,
      name: 'Маргарита',
      imageUrl: 'margarita.jpg',
      price: 1,
      categoryId: 1,
    },
    {
      id: 4,
      name: 'Чотири сири',
      imageUrl: '4 cheese.jpg',
      price: 1,
      categoryId: 2,
    },
    {
      id: 5,
      name: 'Домашня',
      imageUrl: 'homemade.png',
      price: 11,
      inFuture: true,
      categoryId: 1,
    },
    {
      id: 6,
      name: 'Овочі та гриби',
      imageUrl: 'vegetablesAndMushrooms.png',
      price: 15,
      inFuture: true,
      categoryId: 2,
    },
    {
      id: 7,
      name: 'Подвійне курча',
      imageUrl: 'doublechicken.png',
      price: 13,
      inFuture: true,
      categoryId: 1,
    },
    {
      id: 8,
      name: 'Діабло',
      imageUrl: 'diablo.png',
      price: 1123,
      inFuture: true,
      categoryId: 4,
    },
    {
      id: 8,
      name: 'Курча барбекю',
      imageUrl: 'chickenbbq.png',
      price: 112,
      inFuture: true,
      categoryId: 3,
    },
  ];

  console.log(request.query);
  //@ts-ignore
  switch (request.query.sortById) {
    case '1':
      pizzas = pizzas.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
      break;
    case '2':
      pizzas = pizzas.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      break;
  }
  //@ts-ignore
  if (request.query.categoryId !== '0') {
    response.send(
      //@ts-ignore
      pizzas.filter((el) => el.categoryId === Number(request.query.categoryId))
    );
  } else {
    response.send(pizzas);
  }
}
