import { Component } from "../../frameworks/root/component";
import { IConfigComponent } from "../../types";

class Bucket extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const bucket: Bucket = new Bucket({
  selector: "polimorph",
  template: `
  <div>Bucket content</div>
  `,
});
