import { routerSlicer } from "../tools/routerSlicer";
import { IConfigComponent, queryElement } from "../../types";
import { Component } from "../root/component";
import { IRoutes, IConfig } from "../../types";

export class Module {
  public components: Array<IConfigComponent>;
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
      if (component instanceof Component) {
        console.log("comp to render: ", component);
        this.renderComponent(component);
      }
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
    //probably we call function 2 times, not shure how to resolve it
    if (component.onInit() !== undefined) component.onInit();
    component.render();
    //probably we call function 2 times, not shure how to resolve it
    if (component.afterInit() !== undefined) component.afterInit();
  }
}
