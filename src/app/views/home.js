import { Component } from "../../frameworks/root/component";

class Home extends Component {
  constructor(config) {
    super(config);
  }
}

export const home = new Home({
  selector: "polimorph",
  template: `
  <div>Home content</div>
  `
})