import { EventTypes } from "../../types";

class DomHandler {
  private el: Element;
  private isDOmHandlerEl: boolean;
  constructor(el: Element) {
    this.el = el;
    this.isDOmHandlerEl = true;
  }
  public on(
    eventName: EventTypes,
    cb: (a: Event) => void,
    context: string | null = null
  ) {
    cb.bind(context);
    this.el.addEventListener(eventName, cb);
    return this;
  }
  public off(eventName: EventTypes, cb: (a: Event) => void) {
    this.el.removeEventListener(eventName, cb);
    return this;
  }
  public addClass(className: string) {
    this.el.classList.add(className);
    return this;
  }
  public removeClass(className: string) {
    this.el.classList.remove(className);
    return this;
  }
  public hasClass(className: string) {
    this.el.classList.contains(className);
    return this;
  }
  public html(html: string | DomHandler) {
    if (html instanceof DomHandler) html = html.el.innerHTML;
    this.el.innerHTML = html;
    return this;
  }
  public append(el: string | DomHandler) {
    if (el instanceof DomHandler) el = el.el.innerHTML;
    this.el.innerHTML = el;
    return this;
  }
}

export function $(el: Element) {
  return new DomHandler(el);
}
