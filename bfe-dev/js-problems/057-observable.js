class Observable {
  constructor(setup) {
    this._setup = setup
  }

  subscribe(subscriber) {
    // a wrapper function/object 
    // is used to share the closure of outer function and modify the logics
    const subscriberWrapper = {
      unsubscribed: false,
      next(value) {
        if (this.unsubscribed) return
        //function as Observer should be treated as next
        if (subscriber instanceof Function) return subscriber(value);
        return subscriber.next ? subscriber.next(value) : null
      },
      error(value) {
        if (this.unsubscribed) return
        this.unsubscribe();
        return subscriber.error ? subscriber.error(value) : null;
      },
      complete() {
        if (this.unsubscribed) return;
        this.unsubscribe();
        return subscriber.complete ? subscriber.complete() : null
      },
      unsubscribe() {
        this.unsubscribed = true;
      }
    }
    this._setup(subscriberWrapper);
    return subscriberWrapper
  }
}

class ObservableAlt {
  constructor(setup) {
    this.setup = setup;
  }

  subscribe(subscriber) {
    const sub = new Subscriber(subscriber);
    this.setup(sub);
    return {
      unsubscribe() {
        sub.unsubscribe();
      }
    }
  }
}

class Subscriber {
  constructor(subscriber) {
    if (typeof subscriber === 'function') {
      this.subscriber = { next: subscriber };
    } else {
      this.subscriber = subscriber;
    }
    this.isUnsubscribed = false;
  }

  next(value) {
    if (this.isUnsubscribed) return;
    if (this.subscriber.next) {
      try {
        this.subscriber.next(value);
      } catch (err) {
        this.error(err);
      }
    }
  }

  error(err) {
    if (this.isUnsubscribed) return;
    if (this.subscriber.error) {
      this.subscriber.error(err);
    }
    this.unsubscribe();
  }

  complete() {
    if (this.isUnsubscribed) return;
    if (this.subscriber.complete) {
      this.subscriber.complete();
    }
    this.unsubscribe();
  }

  unsubscribe() {
    this.isUnsubscribed = true;
  }
}
