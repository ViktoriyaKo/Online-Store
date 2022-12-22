import { Component } from "../frameworks/exporter";
import { IConfigComponent } from "../types";

export class AppComponent extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const appComponent: AppComponent = new AppComponent({
  selector: "polimorph",
  template: `
    <router-placeholder></router-placeholder>
    <div>App component works</div>
  `,
});
