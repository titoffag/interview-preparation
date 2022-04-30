export class Component {
  constructor(root, { listeners, className, tag = 'div' }) {
    this.root = root;
    this.el = null;
    this.listeners = listeners;
    this.events = [];
    this.className = className;
    this.tag = tag;
  }

  // Init DOM elements and all listeners
  init() {
    this.el = document.createElement(this.tag);
    this.el.classList.add(this.className);
    this.events = this.listeners.map(type => {
      const event = this._toEventName(type);
      const handler = this[event];
      if (!handler) {
        throw Error(`handler ${type} is not implemented`);
      }
      this.el.addEventListener(type, handler);
      return { type, handler };
    })
  }

  _toEventName(type) {
    return type ? `on${type[0].toUpperCase()}${type.slice(1)}` : '';
  }

  // Hook which is called after render
  afterRender() {}

  // Clean up the DOM and then render component HTML
  render() {
    if (this.el) this.destroy();
    this.init();
    this.el.innerHTML = this.toHTML();
    this.root.appendChild(this.el);
    this.afterRender();
  }

  // Return component template
  toHTML() {
    return '';
  }

  // Clean up all events and dom elements
  destroy() {
    this.events.forEach(({ type, handler }) => {
      this.el.removeEventListener(type, handler);
    });
    this.events = [];
    this.el.remove();
  }
}