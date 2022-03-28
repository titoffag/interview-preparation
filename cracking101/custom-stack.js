// Написать реализацию стека с методами getMin, push, top и получение элемента за константное время
class CustomStack {
  constructor() {
    this.store = [];
    this.minValue = null;
  }

  findById(id) {
    return this.store[id];
  }

  top() {
    return this.store[this.store.length - 1];
  }

  push(element) {
    if (this.store.length === 0 || element < this.minValue) {
      this.minValue = element;
    }
    
    this.store.push(element);
  }

  getMin() {
    return this.minValue;
  }

  dump() {
    return this.store;
  }
}

const cs = new CustomStack();
cs.push(10);
cs.push(-10);
cs.push(0);
console.log(cs.getMin());
console.log(cs.dump());
