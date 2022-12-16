import { home } from "./app/views/home";
import { Header } from "./app/base/header";
import { AppComponent } from "./app/appComponent";
export interface IComponents extends IConfigComponent {
  appComponent: AppComponent;
  header: Header;
}
export interface IConfig {
  components: Array<IComponents>;
  routes: Array<IRoutes>;
}
export interface IRoutes {
  path: string;
  components: typeof home;
}
export interface IConfigComponent {
  template: string;
  selector: string;
  el?: null;
  render?(): void;
}

//function for checking HTML-items:
function checkedQuerySelector(
  parent: Element | Document | DocumentFragment,
  selector: string
): Element {
  const el = parent.querySelector(selector);
  if (!el) {
    throw new Error(`Selector ${selector} didn't match any elements.`);
  }
  return el;
}

export function queryElement<T extends typeof Element>(
  container: Document | Element | DocumentFragment,
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

// export interface Templates {
//   [keys: string]: TemplateFunc;
// }
// export interface Routes {
//   [keys: string]: TemplateFunc;
// }
// export type TemplateFunc = () => void;
