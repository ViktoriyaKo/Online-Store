import { Header } from "./app/base/header";
import { AppComponent } from "./app/appComponent";
import { bucket } from "./app/views/bucket";
import { DomHandler } from "./frameworks/exporter";
export interface IComponents extends IConfigComponent {
  appComponent: AppComponent;
  header: Header;
}
export interface ReduceReturnType {
  [index: string]: string;
}
export interface ParamProduct {
  genres: string[];
  authors: string[];
  sort: string;
}
export interface Product {
  id: number;
  title: string;
  author: string;
  image: string[];
  description: string;
  pages: number;
  year: number;
  terms: string;
  stock: number;
  price: number;
  sale: number;
  count?: number;
}
export interface IConfig {
  components: Array<IConfigComponent>;
  routes: Array<IRoutes>;
}
export interface IRoutes {
  path: string;
  components: typeof bucket;
  onBtnClick?: (arg: Event) => void;
}
export interface IConfigComponent {
  template: string;
  selector: string;
  el?: null | DomHandler;
  render?(): void;
}

//function for checking HTML-items:
function checkedQuerySelector(
  parent: Element | Document | DocumentFragment | HTMLImageElement,
  selector: string
): Element {
  const el = parent.querySelector(selector);
  if (!el) {
    throw new Error(`Selector ${selector} didn't match any elements.`);
  }
  return el;
}

export function queryElement<T extends typeof Element>(
  container: Document | Element | DocumentFragment | HTMLImageElement,
  type: T,
  selector: string
): InstanceType<T> {
  const el = checkedQuerySelector(container, selector);
  if (!(el instanceof type)) {
    throw new Error(
      `Selector ${selector} matched ${el} which is not an ${type}`
    );
  }
  return el as InstanceType<T>;
}

export enum EventTypes {
  CLICK = "click",
}

export interface EventsManager {
  eventName: EventTypes;
  target: string;
  event: (arg: Event) => void;
}

export interface ComponentData {
  [index: string]: string;
}

export interface Settings {
  minLengthName: number;
  minSymbolName: number;
  minLengthTel: number;
  minLengthAddress: number;
  minSymbolAddress: number;
  cardNumberLength: number;
  dateLength: number;
  dateCardMonth: number;
  cvvLength: number;
}
export interface ObjectModal {
  name?: string;
  number?: string;
  email?: string;
  delivery?: string;
  cardNumber?: string;
  date?: string;
  cvv?: string;
}

// export interface Templates {
//   [keys: string]: TemplateFunc;
// }
// export interface Routes {
//   [keys: string]: TemplateFunc;
// }
// export type TemplateFunc = () => void;
