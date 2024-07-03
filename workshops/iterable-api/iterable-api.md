Hash table
Разрешение коллизий хэш ф-ции:
Открытая адресация - долго перебераются и вычисляет снова и снова ф-ция с отклонением для вставки
Создание бакетов (связанных списков) - долго ищется вставленное значение, если оно попало в бакет
Перелокация буфера если закончился размер хэш таблица (также как с массива, когда аллоцируемая память под массив закончилась, то нужно выделить новый блок памяти размеров как правило больше в 2 раза от исходного и перекопировать эл-ты из старого в новый)

function objToIter(obj) {

}

function arrToIter(arr) {

}

const aIter = objToIter(obj);
for (let el = aIter.next(); !el.done; el = aIter.next()) {
  console.log(el.value);
}

Итератор - объект ктр предоставляет универсальный API обхода любой сущности -> полиморфные ф-ции принимающие такую коллекцию
Перечислимый объект - объект у ктр есть итератор
Итетаторы опред по дефолту у большинства коллекций джса
Можно объявлять и переопределять собственные итераторы
У простого объекта по дефолту нет интератора
Для написания итераторов удобно юзать ф-ции генераторы
Генератор - ф-ция возвращающая итератор со значение через yeild/yeild* с сохранением состояния, где ф-ция остановилась

транзакционные модели на генераторах