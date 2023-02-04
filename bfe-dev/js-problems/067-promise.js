const STATE = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
}

class MyPromise {
  _state;
  _result;
  _onFulfilled;
  _onRejected;
  _thenPromiseResolve;
  _thenPromiseReject;

  constructor(executor) {
    this._state = STATE.pending;

    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch(error) {
      this._reject(error);
    }
  }

  _resolve(value) {
    if (this._state !== STATE.pending) return;

    this._state = STATE.fulfilled;
    this._result = value;

    queueMicrotask(() => {
      if (
        !this._onFulfilled ||
        !this._thenPromiseResolve ||
        !this._thenPromiseReject
      ) {
        return;
      }

      try {
        const returnedValue = this._onFulfilled(this._result);

        if (returnedValue instanceof MyPromise) {
          returnedValue.then(this._thenPromiseResolve, this._thenPromiseReject);
        } else {
          this._thenPromiseResolve(returnedValue);
        }
      } catch (error) {
        this._thenPromiseReject(error);
      }
    });
  }

  _reject(reason) {
    if (this._state !== STATE.pending) return;

    this._state = STATE.rejected;
    this._result = reason;

    queueMicrotask(() => {
      if (
        !this._onRejected ||
        !this._thenPromiseResolve ||
        !this._thenPromiseReject
      ) {
        return;
      }

      try {
        const returnedValue = this._onRejected(this._result);

        if (returnedValue instanceof MyPromise) {
          returnedValue.then(this._thenPromiseResolve, this._thenPromiseReject);
        } else {
          this._thenPromiseResolve(returnedValue);
        }
      } catch (error) {
        this._thenPromiseReject(error);
      }
    });
  }
  
  then(onFulfilled, onRejected) {
    this._onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    this._onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };

    return new MyPromise((resolve, reject) => {
      this._thenPromiseResolve = resolve;
      this._thenPromiseReject = reject;
    });
  }
  
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  
  static resolve(value) {
    if (value instanceof MyPromise) return value;

    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }
}
