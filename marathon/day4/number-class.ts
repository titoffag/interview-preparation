class MyNumber {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  add(num: number): MyNumber {
    return new MyNumber(this.value + num);
  }

  sub(num: number): MyNumber {
    return new MyNumber(this.value - num);
  }

  mult(num: number): MyNumber {
    return new MyNumber(this.value * num);
  }

  div(num: number): MyNumber {
    return new MyNumber(this.value / num);
  }

  // toString(): string {
  //   return String(this.value);
  // }

  // valueOf(): number {
  //   return this.value;
  // }

  [Symbol.toPrimitive]() {
    return this.value;
  }
}

const num = new MyNumber(10);

// @ts-ignore
console.log(num.add(2).mult(2).sub(1) - 5); // 18
