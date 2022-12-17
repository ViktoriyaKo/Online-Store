import { Module } from "../frameworks/exporter";
import { appComponent } from "./appComponent";
import { header } from "./base/header";
import { routes } from "./routes";
import { IConfig } from "../types";

export class App extends Module {
  constructor(config: IConfig) {
    super(config);
  }
}

export const app: App = new App({
  components: [appComponent, header],
  routes,
});
