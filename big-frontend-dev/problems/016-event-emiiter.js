class EventEmitter {
  constructor() {
    this.#listeners = new Map();
  }

  subscribe(eventName, callback) {
    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, []);
    }

    const callbacks = this.#listeners.get(eventName);
    callbacks.push(callback);

    return {
      release: () => {
        if (!this.#listeners.has(eventName)) {
          return;
        }

        const callbacks = this.#listeners.get(eventName);
        const indexToRemove = callbacks.indexOf(callback);
        if (indexToRemove < 0) {
          return;
        }

        callbacks.splice(indexToRemove, 1);
        if (callbacks.length === 0) {
          this.#listeners.delete(eventName);
        }
      },
    }
  }

  emit(eventName, ...args) {
    const callbacks = this.#listeners.get(eventName);
    if (callbacks?.length === 0) {
      return;
    }

    for (const callback of callbacks) {
      callback(...args);
    }
  }
}

const emitter = new EventEmitter()

const sub1 = emitter.subscribe('event1', callback1)
const sub2 = emitter.subscribe('event2', callback2)

// same callback could subscribe 
// on same event multiple times
const sub3 = emitter.subscribe('event1', callback1)

emitter.emit('event1', 1, 2);
// callback1 will be called twice

sub1.release()
sub3.release()
// now even if we emit 'event1' again,
// callback1 is not called anymore
