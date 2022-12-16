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
    <div>PAGE NOT EXISTS 404</div>
  `,
});
