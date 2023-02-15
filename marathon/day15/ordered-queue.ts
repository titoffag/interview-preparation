type Comparator<T> = (a: T, b: T) => number;

class OrderedQueue<T> {
  private comparator: Comparator<T>;
  private heap: (T | undefined)[] = [];
  private size = 0;

  constructor(comparator: Comparator<T>) {
    this.comparator = comparator;
  }

  push(value: T) {
    this.heap[++this.size] = value;
    this.bubbleUp();
	}

  private bubbleUp() {
		let
			cursor = this.size;
    const
			value = this.heap[cursor];

		while (cursor > 0) {
			const
				parentIndex = this.parent(cursor),
				parent = this.heap[parentIndex];

			if (value != null && parent != null && this.comparator(value, parent) <= 0) {
				break;
			}

			this.heap[cursor] = parent;
			cursor = parentIndex;
		}

		this.heap[cursor] = value;
	}

  pop(): T | undefined {
    const head = this.heap[0];

    this.heap[0] = this.heap[this.size];
    this.heap[this.size] = undefined;
    this.size--;
    this.sinkDown();
    return head;
  }

  sinkDown() {
		const
			value = this.heap[0];

		let
			cursor = 0,
			leftIndex = 1,
			rightIndex = 2;

		while (leftIndex <= this.size) {
			let
				childIndex: number;

			const
				left = this.heap[leftIndex],
				right = this.heap[rightIndex];

			if (right == null) {
				childIndex = leftIndex;
			} else {
				childIndex = left != null && right != null && this.comparator(left, right) > 0 ? leftIndex : rightIndex;
			}

			const
				child = this.heap[childIndex];

			if (value != null && child != null && this.comparator(value, child) >= 0) {
				break;
			}

			this.heap[cursor] = child;
			cursor = childIndex;

			leftIndex = this.left(cursor);
			rightIndex = this.right(cursor);
		}

		this.heap[cursor] = value;
	}

  parent = (i: number) => Math.floor((i - 1) / 2);
  left = (parent: number) => 2 * parent + 1;
  right = (parent: number) => 2 * parent + 2;
}

const min = (a: number, b: number) => b - a;
const max = (a: number, b: number) => a - b;
const queue = new OrderedQueue<number>(max);

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
