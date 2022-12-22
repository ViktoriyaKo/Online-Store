import { EventsManager, IConfigComponent } from "../../types";

export class Component {
  public template: string;
  public selector: string;
  public el: null | Element;

  constructor(config: IConfigComponent) {
    this.template = config.template;
    this.selector = config.selector;
    this.el = null;
  }
  render(): void {
    this.el = document.querySelector(this.selector);
    if (!this.el) throw new Error(`component ${this.template} not found!`);
    this.el.innerHTML = this.template;
    this._mountEvent();
  }

  protected _mountEvent() {
    //probably we call function 2 times, not shure how to resolve it
    if (this.events() !== undefined) {
      const events = (this.events() as unknown) as EventsManager;
      const elementForListener = this.el?.querySelector(events.target);
      if (elementForListener)
        elementForListener.addEventListener(
          events.eventName,
          events.event.bind(this)
        );
    }
  }
  events() {
    return;
  }
  onInit() {
    return;
  }
  afterInit() {
    return;
  }
}
