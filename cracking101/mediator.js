class Mediator {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
    return this;
  }

  off(event, listener) {
    if (listener && this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    } else {
      this.listeners[event] = [];
      console.info(`Deleted all listeners for "${event}"`);
    }

    return this;
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(l => l(data));
    } else {
      this.listeners[event] = [];
      console.warn(`Not registered listeners for "${event}"`);
    }

    return this;
  }
}

const mediator = new Mediator();
