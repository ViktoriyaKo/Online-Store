import { Component } from "../../frameworks/exporter";
import { IConfigComponent } from "../../types";

export class Header extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const header: Header = new Header({
  selector: "header",
  template: `
    <ul class="nav nav-pills">
      <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Main</a></li>
      <li class="nav-item"><a href="#shop" class="nav-link">Shop</a></li>
      <li class="nav-item"><a href="#bucket" class="nav-link">Bucket</a></li>
    </ul>
  `,
});
