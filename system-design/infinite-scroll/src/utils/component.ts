export abstract class Component<P extends {}, S extends object = {}> {
  protected state: S;
  protected props: P;
  protected element: HTMLElement;

  /**
   * @param root - Element where the component will be rendered
   * @param props - Any incoming props required for init phase
   */
  constructor(protected root: HTMLElement, props: P) {
    this.element = document.createElement(this.getComponentTag());
    this.element.id = this.getComponentId();

    this.props = props;
    this.init();
  }

  /**
   * Provide any init logic that's called in
   * constructor phase
   */
  init(): void {}

  /**
   * Kind of React.setState() to update the component when data is changed
   * @param args
   */
  protected update(...args: any): void {}

  /**
   * Render component into DOM
   */
  render(): void {
    if (this.exist()) {
      throw Error("Component already exists");
    }
    this.root.insertAdjacentElement("afterbegin", this.element);
    this.effect();
  }

  protected exist(): boolean {
    return this.element.offsetParent !== null;
  }

  /**
   * Allows to define the component tag
   * @returns html tag for creating component's html element 
   */
  protected getComponentTag(): string {
    return "div";
  }

  /**
   * Defines component element id
   */
  abstract getComponentId(): string;

  /**
   * Schedule any side-effects
   */
  effect() {}
}
