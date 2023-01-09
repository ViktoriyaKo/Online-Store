import {
  ComponentData,
  EventsManager,
  IConfigComponent,
  ProductWithCount,
} from "../../types";
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
    this.el.html(this.compiledTemplate(this.template, this.data) as string);
    this._mountEvent();
  }

  protected _mountEvent() {
    if (this.events() !== undefined) {
      const events = (this.events() as unknown) as EventsManager[];
      events.forEach((event) => {
        const elementForListener = this.el?.findAll(event.target);
        if (elementForListener)
          elementForListener.forEach((el) =>
            el.on(event.eventName, event.event.bind(this))
          );

        //const elementForListener = this.el?.find(event.target);
        //if (elementForListener)
        //  elementForListener.on(event.eventName, event.event.bind(this));
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
  public getTotal() {
    let total = 0;
    const cart = JSON.parse(localStorage.getItem("cart") || "");
    for (const key in cart) {
      total +=
        cart[key]["count"] * Math.floor(cart[key]["price"] * cart[key]["sale"]);
    }
    return total;
  }

  public addBucketCount() {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart") || "");
      if (cart.length !== 0) {
        return cart
          .map((item: ProductWithCount) => {
            if (item.count) {
              return +item.count;
            }
          })
          .reduce((acc: number, item: number) => acc + item);
      }
    }
  }
  public updateHeader() {
    const sumHeader = document.querySelector(".sum-card span") as HTMLElement;
    const numberHeader = document.querySelector(".number-book") as HTMLElement;
    if (
      localStorage.getItem("cart")?.toString() == "[]" ||
      localStorage.getItem("cart") == null
    ) {
      sumHeader.innerHTML = `0 <i class="fas fa-light fa-ruble-sign"></i>`;
      numberHeader.innerHTML = `0`;
    } else {
      sumHeader.innerHTML = `${this.getTotal()} <i class="fas fa-light fa-ruble-sign"></i>`;
      numberHeader.innerHTML = `${this.addBucketCount()}`;
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
