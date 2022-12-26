import { Module } from "../frameworks/exporter";
import { appComponent } from "./appComponent";
import { header } from "./base/header";
import { routes } from "./routes";
import { IConfig } from "../types";

export class App extends Module {
  constructor(config: IConfig) {
    super(config);
    console.log("call new APP");
  }
}

export const app: App = new App({
  components: [appComponent, header],
  routes,
});
