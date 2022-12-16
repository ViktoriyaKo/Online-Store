import { routerSlicer } from "../tools/routerSlicer";
import { queryElement } from "../../types";
import { Component } from "../root/component";
import { Routes, IComponents, IConfig } from "../../types";

export class Module {
  public components: Array<IComponents>;
  public routes: Array<Routes>;

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
      //component: [AppComponent, Header]
      console.log("comp to render: ", component);
      this.renderComponent(component); //отрисовка компонентов AppComponent и header
      console.log(component);
    }
    if (this.routes) {
      window.addEventListener("hashchange", this.renderRoute.bind(this));
      this.renderRoute();
      //this: App{components: Array(2), routes: Array(4)}
    }
  }

  renderRoute() {
    const url = routerSlicer.getRoute();
    //url: bucket
    let route = this.routes.find((route) => route.path === url);
    //route: {path: 'bucket', components: Bucket}
    if (!route) {
      route = this.routes.find((route) => route.path === "error");
    }
    if (route) {
      queryElement(document, Element, "polimorph").innerHTML = `
    <${route.components.selector}></${route.components.selector}>
    `;
      this.renderComponent(route.components); //отрисовка bucket
    }
  }

  renderComponent(component: Component) {
    component.render(); //отрисовка компонентов AppComponent и header
    //component:template <div>Bucket content Selector
  }
}
