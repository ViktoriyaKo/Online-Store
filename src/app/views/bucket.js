import { Component } from "../../frameworks/root/component";

class Bucket extends Component {
  constructor(config) {
    super(config);
  }
}

export const bucket = new Bucket({
  selector: "polimorph",
  template: `
  <div>Bucket content</div>
  `
})