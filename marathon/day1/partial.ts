class Parent {
  foo() {
    console.log('It works!');
  }
}

class Example extends Parent {}

// @ts-ignore
function partial(klass, mixin) {
  Object.setPrototypeOf(mixin, Object.getPrototypeOf(klass.prototype));
  Object.defineProperties(klass.prototype, Object.getOwnPropertyDescriptors(mixin));
}

partial(Example, {
  foo() {
    super.foo();
    console.log('Yeaaah');
  },
  
  get bar() {
    return Math.random();
  }
});

const example = new Example();

example.foo(); // It works! Yeaaah

// @ts-ignore
console.log(example.bar); // Случайное число
// @ts-ignore
console.log(example.bar); // Случайное число
// @ts-ignore
console.log(example.bar); // Случайное число
