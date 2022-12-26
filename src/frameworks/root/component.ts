import { ComponentData, EventsManager, IConfigComponent } from "../../types";
import { $, DomHandler } from "../exporter";

export class Component {
  protected data?: ComponentData;
  public template: string;
  public selector: string;
  public el: null | DomHandler;

  constructor(config: IConfigComponent) {
    this.template = config.template;
    this.selector = config.selector;
    this.el = null;
  }
  render(): void {
    this.el = $(document.querySelector(this.selector) as Element);
    if (!this.el) throw new Error(`component ${this.template} not found!`);
    //fixthis!
    this.el.html(this.compiledTemplate(this.template, this.data) as string);
    this._mountEvent();
  }

  protected _mountEvent() {
    //probably we call function 2 times, not shure how to resolve it
    if (this.events() !== undefined) {
      const events = (this.events() as unknown) as EventsManager[];
      events.forEach((event) => {
        const elementForListener = this.el?.find(event.target);
        if (elementForListener)
          elementForListener.on(event.eventName, event.event.bind(this));
      });
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
