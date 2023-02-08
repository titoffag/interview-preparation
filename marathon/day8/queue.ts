class Queue<T> {
  private storage: Record<string, T> = {};
  private head = 0;
  private tail = 0;

  push(value: T) {
    this.storage[this.tail++] = value;
  }

  pop(): T | undefined {
    if (this.head == this.tail) {
      return;
    }

    const value = this.storage[this.head];
    delete this.storage[this.head++];
    return value;
  }

  peek(): T {
    return this.storage[this.head];
  }

  get size(): number {
    return this.tail - this.head;
  }

  // *[Symbol.iterator]() {
  //   for (const value of Object.values(this.storage)) {
  //     yield value;
  //   }
  // }

  [Symbol.iterator]() {
    let cursor = this.head;

    return {
      next: () => {
        return {
          value: this.storage[cursor++],
          done: cursor > this.tail,
        }
      }
    }
  }
}

const queue = new Queue<number>();

queue.push(1);
queue.push(2);
queue.push(3);

for (const el of queue) {
  console.log(el);
}

console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
console.log(queue.pop()); // 3
console.log(queue.pop()); // undefined