import { Component } from "../../frameworks/root/component";
import { IConfigComponent } from "../../types";

class Home extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const home: Home = new Home({
  selector: "polimorph",
  template: `
  <div>Home content</div>
  `,
});
