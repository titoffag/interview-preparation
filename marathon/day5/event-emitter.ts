type TEvent = string;
type Listener = Function;

class EventEmitter {
  private listeners = new Map<TEvent, Set<Listener>>(); 

  once(event: TEvent, cb: Listener): Listener {
    const onceFn = (...args: unknown[]) => {
      try {
        cb(...args);
      } finally {
        this.off(event, onceFn);
      }
    };

    return this.on(event, onceFn);
  }

  on(event: TEvent, cb: Listener): Listener {
    const listeners = this.getListeners(event);
    listeners.add(cb);
    return cb;
  }

  emit(event: TEvent, ...payload: unknown[]) {
    const listeners = this.getListeners(event);
    for (const cb of listeners) {
      try {
        cb(...payload);
      } catch (err) {
        console.error(err);
      }
    }
  }

  off(event?: TEvent, cb?: Listener): boolean {
    if (event == null) {
      this.listeners.clear();
      return true;
    }

    const listeners = this.getListeners(event);
    if (cb == null) {
      listeners.clear();
      return true;
    }

    return listeners.delete(cb);
  }

  private getListeners(event: TEvent): Set<Listener> {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set<Listener>());
    }

    return this.listeners.get(event)!;
  }
}

const ee = new EventEmitter();

ee.once('foo', console.log); // Сработает только один раз

ee.emit('foo', 1);
ee.emit('foo', 2);

ee.off('foo', console.log); // Отмена конкретного обработчика события по ссылке
ee.off('foo');              // Отмена всех обработчиков этого события
