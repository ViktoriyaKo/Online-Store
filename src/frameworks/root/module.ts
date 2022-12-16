import { routerSlicer } from "../tools/routerSlicer";
import { queryElement } from "../../types";
import { Component } from "../root/component";
import { IRoutes, IComponents, IConfig } from "../../types";

export class Module {
  public components: Array<IComponents>;
  public routes: Array<IRoutes>;

  constructor(config: IConfig) {
    this.components = config.components;
    this.routes = config.routes;
    console.log(this.components);
  }

  start(): void {
    this.init();
  }
  init(): void {
    for (const component of this.components) {
      console.log("comp to render: ", component);
      this.renderComponent(component); // missed!! error
    }
    if (this.routes) {
      window.addEventListener("hashchange", this.renderRoute.bind(this));
      this.renderRoute();
    }
  }
  renderRoute() {
    const url = routerSlicer.getRoute();
    let route = this.routes.find((route) => route.path === url);

    if (!route) {
      route = this.routes.find((route) => route.path === "error");
    }
    if (route) {
      queryElement(document, Element, "polimorph").innerHTML = `
    <${route.components.selector}></${route.components.selector}>
    `;
      this.renderComponent(route.components);
    }
  }

  renderComponent(component: Component) {
    component.render();
  }
}
