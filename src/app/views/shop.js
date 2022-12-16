import { Component } from "../../frameworks/root/component";

class Shop extends Component {
  constructor(config) {
    super(config);
  }
}

export const shop = new Shop({
  selector: "polimorph",
  template: `
  <div>Shop content</div>
  `
})