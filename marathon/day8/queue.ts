type MaybeLinkedListNode<T> = LinkedListNode<T> | null;

class LinkedListNode<T> {
  value: T;
  prev: MaybeLinkedListNode<T> = null;
  next: MaybeLinkedListNode<T> = null;

  constructor(
    value: T,
    { prev, next }: { prev?: MaybeLinkedListNode<T>; next?: MaybeLinkedListNode<T> }
  ) {
    this.value = value;

    if (prev != null) {
      this.prev = prev;
      prev.next = this;
    }

    if (next != null) {
      this.next = next;
      next.prev = this;
    }
  }
}

class LinkedList<T> {
  first: MaybeLinkedListNode<T> = null;
  last: MaybeLinkedListNode<T> = null;

  pushLeft(value: T) {
    this.first = new LinkedListNode(value, { next: this.first });

    if (this.last == null) {
      this.last = this.first;
    }
  }

  popLeft(): MaybeLinkedListNode<T> {
    const head = this.first;

    if (head == null) {
      return null;
    }

    this.first = head.next;

    if (this.first != null) {
      this.first.prev = null;
    } else {
      this.last = null;
    }

    return head;
  }

  pushRight(value: T) {
    this.last = new LinkedListNode(value, { prev: this.last });

    if (this.first == null) {
      this.first = this.last;
    }
  }

  popRight(): MaybeLinkedListNode<T> {
    const head = this.last;

    if (head == null) {
      return null;
    }

    this.last = head.prev;

    if (this.last != null) {
      this.last.next = null;
    } else {
      this.first = null;
    }

    return head;
  }
}

class QueueAlt<T> {
  private linkedList = new LinkedList<T>();

  push(value: T) {
    this.linkedList.pushRight(value);
  }

  pop(): T | undefined {
    return this.linkedList.popLeft()?.value;
  }

  peek(): T | undefined {
    return this.linkedList.first?.value;
  }
}

class Queue<T> {
  private storage: Record<string, T | undefined> = {};
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

  peek(): T | undefined {
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
        };
      },
    };
  }
}

const queue = new QueueAlt<number>();

queue.push(1);
queue.push(2);
queue.push(3);

// for (const el of queue) {
//   console.log(el);
// }

console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
console.log(queue.pop()); // 3
console.log(queue.pop()); // undefined
