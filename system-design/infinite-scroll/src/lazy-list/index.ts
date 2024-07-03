import { Component } from "../utils/component";
import { intersectionObserver } from '../utils/observer.utils';

interface Props<T> {
  pageSize: number;
  load: (start: number, limit: number) => Promise<T[]>;
  templateFn: (item: T) => string;
}

interface State {
  end: number;
}

export class ListComponent<T> extends Component<Props<T>, State> {
  state = {
    end: 0,
  };

  init(): void {
    intersectionObserver(this.root, async ([entry]) => {
      if (entry.intersectionRation > 0.1) {
        const { end } = this.state;
        const data = await this.props.load(end, this.props.pageSize);
        this.update(data);
      }
    });
  }

  _genList(items: T[]) {
    return items.map(this.props.templateFn).join("");
  }

  update(items: T[]) {
    this.state.end += this.props.pageSize;
    const content = this._genList(items);
    this.element.insertAdjacentHTML("beforeend", content);
  }

  getComponentId() {
    return "feed";
  }
}
