import { ComponentData, EventsManager, IConfigComponent } from "../../types";

export class Component {
  protected data?: ComponentData;
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
    //fixthis!
    this.el.innerHTML = this.compiledTemplate(
      this.template,
      this.data
    ) as string;
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

  private compiledTemplate(template: string, data?: ComponentData) {
    if (typeof data === "undefined") return template;
    const regex = /\{{(.*?)}}/g;
    template = template.replace(regex, (str, d) => {
      const key = d.trim();
      return data[key];
    });
    return template;
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
