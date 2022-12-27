import { routerSlicer } from "../tools/routerSlicer";
import { IConfigComponent, queryElement } from "../../types";
import { Component } from "../root/component";
import { IRoutes, IConfig, Settings } from "../../types";
import { product } from "../../app/views/product";
import { Validation } from "../../app/modal";
import books from "../../books-content/books.json";

export class Module {
  public components: Array<IConfigComponent>;
  public routes: Array<IRoutes>;

  constructor(config: IConfig) {
    this.components = config.components;
    this.routes = config.routes;
    // components: [AppComponent, Header]
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
    if (
      !route &&
      url.split("/")[0] === "product" &&
      url.split("/").length === 2 &&
      +url.split("/")[1] > 0 &&
      +url.split("/")[1] <= books.length
    ) {
      route = { path: `product`, components: product };
    }
    if (!route) {
      route = this.routes.find((route) => route.path === "error");
    }
    if (route) {
      queryElement(document, Element, "polimorph").innerHTML = `
    <${route.components.selector}></${route.components.selector}>
    `;
      this.renderComponent(route.components);
      // if (url === "bucket") {
      //   const settings: Settings = {
      //     minLengthName: 2,
      //     minSymbolName: 3,
      //     minLengthTel: 9,
      //     minLengthAddress: 3,
      //     minSymbolAddress: 5,
      //     cardNumberLength: 16,
      //     dateLength: 5,
      //     dateCardMonth: 12,
      //     cvvLength: 3,
      //   };
      //   const startValidation: Validation = new Validation(settings);
      // }
    }
  }

  renderComponent(component: Component) {
    //probably we call function 2 times, not shure how to resolve it
    if (component.onInit !== undefined) component.onInit();
    component.render();
    //probably we call function 2 times, not shure how to resolve it
    if (component.afterInit !== undefined) component.afterInit();
  }
}
