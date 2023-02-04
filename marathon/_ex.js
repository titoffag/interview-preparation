console.log = (...args) => document.write('<br/>', ...args);

function closure() {
  return (function () {
    const arr = []
    for (let i = 0; i < 9; i++) {
      arr.push(() => i)
    }
    return arr
  })()
}

console.log('Проверка должна возвращать истину. Нужно разобраться и поправить')
console.log('Проверка вызова closure()[3]() === 3: ', closure()[3]() === 3)
