type TEvent = string;

class EventEmitter {
  private listeners = new Map<TEvent, Set<Function>>();

  private getHandlers(event: TEvent): Set<Function> | undefined {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    return this.listeners.get(event);
  }

  on(event: TEvent, cb: Function) {
    const handlers = this.getHandlers(event);
    handlers?.add(cb);
    return cb;
  }

  once(event: TEvent, cb: Function) {
    const handlers = this.getHandlers(event);
    const onceFn = (...args: unknown[]) => {
      try {
        cb(...args);
      } catch (error) {
        console.error(error);
      } finally {
        this.off(event, onceFn);
      }
    };
    handlers?.add(onceFn);
  }

  off(event?: TEvent, cb?: Function) {
    if (event == null) {
      return this.listeners.clear();
    }

    const handlers = this.getHandlers(event);
    if (cb == null) {
      return handlers?.clear();
    }

    handlers?.delete(cb);
  }

  emit(event: TEvent, ...args: unknown[]) {
    const handlers = this.getHandlers(event);
    if (handlers == null) {
      return;
    }

    for (const cb of handlers) {
      try {
        cb(...args);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

function stream(
  eventEmitter: EventEmitter,
  event: TEvent,
): AsyncIterableIterator<unknown> {
  const resolvers = new Set<Function>();
  const queue: unknown[] = [];
  eventEmitter.on(event, handler);

  return {
    [Symbol.asyncIterator](): AsyncIterableIterator<unknown> {
      return this;
    },

    next() {
      return new Promise((resolve) => {
        if (queue.length) {
          resolve({done: false, value: queue.shift()});
        }

        resolvers.add((value: unknown) => resolve({ done: false, value }));
      });
    },

    return() {
      eventEmitter.off(event, handler);
      return Promise.resolve({done: true, value: undefined});
    },
  };

  function handler(value: unknown) {
    if (resolvers.size) {
      try {
        resolvers.forEach((resolver) => resolver(value));
      } finally {
        resolvers.clear();
      }
    } else {
      queue.push(value);
    }
  }
}

const ee = new EventEmitter();

(async () => {
  for await (const e of stream(ee, "foo")) {
    console.log(e); // 1 2 3
    // break;
  }
})();

ee.emit("foo", 1, 2);
ee.emit("foo", 2, 3);
ee.emit("foo", 3, 4);
