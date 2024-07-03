import { Component } from '../utils/component';

interface Props<T> {
  load: () => Promise<T[]>;
  templateFn: (item: T) => string;
}

export class ListComponent<T> extends Component<Props<T>> {
  _genList(items: T[]) {
    return items.map(this.props.templateFn).join("");
  }

  update(items: T[]) {
    const content = this._genList(items);
    this.element.insertAdjacentHTML("beforeend", content);
  }

  effect() {
    this.props.load().then(this.update);
  }

  getComponentId() {
    return "feed";
  }
}
