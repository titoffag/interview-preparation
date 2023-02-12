type Comparator<T> = (a: T, b: T) => number;

class OrderedQueue<T> {
  private comparator: Comparator<T>;
  private heap: (T | null)[] = [];
  private size = 0;

  constructor(comparator: Comparator<T>) {
    this.comparator = comparator;
  }

  push(value: T) {
    this.heap[this.size++] = value;
    this.swim(this.size - 1);
  }

  pop(): T | null {
    this.swap(0, --this.size);

    const value = this.heap[this.size];
    this.heap[this.size] = null;
    this.sink(0, this.size - 1);
    return value;
  }

  swim(index: number) {
    while (index > 0) {
      const parent = this.parent(index);
      if (this.comparator(this.heap[index]!, this.heap[parent]!) > 0) {
        this.swap(index, parent);
        index = parent;
      } else break;
    }
  }

  sink(index: number, N: number) {
    while (this.left(index) <= N) {
      const left = this.left(index);
      const right = this.right(index);
      const ch =
        right <= N &&
        this.heap[right] &&
        this.comparator(this.heap[right]!, this.heap[left]!) >= 0
          ? right
          : left;

      if (this.comparator(this.heap[index]!, this.heap[ch]!) < 0)
        this.swap(index, ch);
      else break;
      index = ch;
    }
  }

  parent = (i: number) => Math.floor((i - 1) / 2);
  left = (parent: number) => 2 * parent + 1;
  right = (parent: number) => 2 * parent + 2;
  swap = (i: number, j: number) =>
    ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]);
}

const queue = new OrderedQueue<number>((a, b) => a - b);

queue.push(1);
queue.push(5);
queue.push(2);
queue.push(-1);
queue.push(5);
queue.push(2);
queue.push(-1);
queue.push(5);

console.log(queue.pop()); // 5
console.log(queue.pop()); // 5

console.log(queue.pop()); // 5
console.log(queue.pop()); // 2
console.log(queue.pop()); // 2
