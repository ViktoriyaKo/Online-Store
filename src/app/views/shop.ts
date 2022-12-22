import { Component } from "../../frameworks/root/component/component";
import { IConfigComponent } from "../../types";

class Shop extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const shop: Shop = new Shop({
  selector: "polimorph",
  template: `
  <div>Shop content</div>
  `,
});
