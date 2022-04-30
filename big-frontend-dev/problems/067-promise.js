class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(value) {
    if (this.state != 'pending') return;

    this.state = 'fulfilled';
    this.result = value;
    queueMicrotask(() => {
      this.onFulfilled(this.result);
    });
  }

  _reject(value) {
    if (this.state != 'pending') return;

    this.state = 'rejected';
    this.result = value;
  }

  then(onFulfilled, onRejected) {
    const isOnFulfilledFunction = typeof onFulfilled == 'function';
    this.onFulfilled = isOnFulfilledFunction ? onFulfilled : (value) => value;

    return new Promise((resolve, reject) => { });
  }

  catch(onRejected) {
    // your code here
  }

  static resolve(value) {
    // your code here
  }

  static reject(value) {
    // your code here
  }
}

const p = new MyPromise((resolve) => {
  resolve(10)
}).then((result) => console.log(result));
