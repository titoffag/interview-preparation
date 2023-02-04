export default class OrdersAnalyzer {
  constructor() {
    this.weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  }

  /*
    1. Сформировать мапу в котором по дням недели будет доступен
    массив всех продуктов заказанных за этот день

    {
      "SATURDAY": [
        { productId: 9872 },
        ...
      ]
    }
  */
  prepareOrdersByWeekDayMap(orders) {
    // семантика имени переменной     
    const map = {};
    for (let order of orders) {
      const orderWeekDay = this.weekdays[new Date(order.creationDate).getDay()];

      // в одну строку через тернарку       
      if (!map[orderWeekDay]) {
        map[orderWeekDay] = [];
      }

      // лучше бы мутабел допуш       
      map[orderWeekDay] = [...map[orderWeekDay], ...order.orderLines];
    }

    return map;
  }

  /*
    2. Для каждого значения в мапе (всего их 7 как дней в недели),
    пробежаться по массиву и посчитать сколько за этот день
    был продукт с переданным айди

    {
      "SATURDAY": 1, // default - 0
      ...
    }
  */
  totalQuantity(productId, orders) {
    const result = {
      "SUNDAY": 0,
      "MONDAY": 0,
      "TUESDAY": 0,
      "WEDNESDAY": 0,
      "THURSDAY": 0,
      "FRIDAY": 0,
      "SATURDAY": 0
    };
    const ordersByWeekDayMap = this.prepareOrdersByWeekDayMap(orders);

    // for in по ключам объекта полезет по прототипной цепочки
    // hasOwnProperty линтеры требуют для for in
    // надо привести к for of по кортежам ключ-значение через map.entries()    
    for (let weekday in ordersByWeekDayMap) {
      // не нрав семантика переменных в теле редюса       
      result[weekday] = ordersByWeekDayMap[weekday].reduce((acc, cur, idx, arr) => {
        if (cur.productId === productId) {
          acc += cur.quantity;
        }

        return acc;
      }, 0);
    }

    return result;
  }
}
