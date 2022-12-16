import { Component } from "../frameworks/root/component";

class AppComponent extends Component {
  constructor(config) {
    super(config)
  }
}

export const appComponent = new AppComponent({
  selector: "polimorph",
  template: `
    <router-placeholder></router-placeholder>
    <div>App component works</div>
  `
})