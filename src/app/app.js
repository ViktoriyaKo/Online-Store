import { Module } from "../frameworks/exporter";
import { appComponent } from "./appComponent";
import { header } from "./base/header";
import { routes } from "./routes";

class App extends Module {
  constructor(config){
    super(config)
  }
}

export const app = new App({
  components: [
    appComponent,
    header
  ],
  routes
})