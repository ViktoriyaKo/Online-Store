import { routerSlicer } from "../tools/routerSlicer";
import { IConfigComponent, queryElement } from "../../types";
import { Component } from "../root/component";
import { IRoutes, IConfig, Settings } from "../../types";
import { product } from "../../app/views/product";
import { Validation } from "../../app/modal";
import books from "../../books-content/books.json";
import { shop } from "../../app/views/shop";
import { Cart } from "../../app/goods/goods";
import { Promo } from "../../app/goods/promo";

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
    const settings: Settings = {
      minLengthName: 2,
      minSymbolName: 3,
      minLengthTel: 10,
      minLengthAddress: 3,
      minSymbolAddress: 5,
      cardNumberLength: 16,
      dateLength: 5,
      dateCardMonth: 12,
      cvvLength: 3,
    };
    let route = this.routes.find((route) => route.path === url);
    console.log(url.split("/")[0]);
    if (
      !route &&
      url.split("/")[0] === "product" &&
      url.split("/").length === 2 &&
      +url.split("/")[1] > 0 &&
      +url.split("/")[1] <= books.length
    ) {
      route = { path: `product`, components: product };
    }
    if (!route && url.split("/")[0] === "shop" && url.split("/").length === 2) {
      route = { path: `shop`, components: shop };
    }
    if (!route) {
      route = this.routes.find((route) => route.path === "error");
    }
    if (route) {
      queryElement(document, Element, "polimorph").innerHTML = `
    <${route.components.selector}></${route.components.selector}>
    `;
      this.renderComponent(route.components);
      if (url === "bucket" || url.split("/")[0] === "product") {
        const startValidation: Validation = new Validation(settings);
      }
      if (url === "bucket") {
        if (localStorage.getItem("cart")) {
          const cart = JSON.parse(localStorage.getItem("cart") || "");
          const dataCartCreate = new Cart(cart);
        } else {
          localStorage.setItem("cart", "[]");
          //перенести в другое место:
          const setTextBucket = document.querySelector(
            ".set-text-bucket"
          ) as HTMLElement;
          setTextBucket.classList.remove("d-none");
        }
      }
    }
  }

  renderComponent(component: Component) {
    if (component.onInit !== undefined) component.onInit();
    component.render();
    if (component.afterInit !== undefined) component.afterInit();
  }
}
