import { IConfigComponent } from "../../types";

export class Component {
  public template: string;
  public selector: string;
  public el: null | Element;

  constructor(config: IConfigComponent) {
    this.template = config.template;
    this.selector = config.selector;
    this.el = null;
    //config:    {все selector: 'header', все template: '<router-placeholder> и т.д'}
  }
  render(): void {
    // отрисовка component
    this.el = document.querySelector(this.selector);
    if (!this.el) throw new Error(`component ${this.template} not found!`);
    this.el.innerHTML = this.template;

    //this.el: <polimorph><div>Shop content</div></polimorph> и <header>
  }
}
