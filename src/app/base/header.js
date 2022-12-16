import { Component } from "../../frameworks/root/component";

class Header extends Component {
  constructor(config){
    super(config)
  }
}

export const header = new Header({
  selector: "header",
  template: `
    <ul class="nav nav-pills">
      <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Main</a></li>
      <li class="nav-item"><a href="#shop" class="nav-link">Shop</a></li>
      <li class="nav-item"><a href="#bucket" class="nav-link">Bucket</a></li>
    </ul>
  `
})