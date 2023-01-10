import { Component } from "../../frameworks/root/component";
import { IConfigComponent } from "../../types";

class NotExists extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const notExists: NotExists = new NotExists({
  selector: "error",
  template: `
  <div class="container text-center">  
    <p class="text-danger fs-2">404</p>
    <p class="fs-2 text-secondary">Page not found</p>
  </div>
  `,
});
