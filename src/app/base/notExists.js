import { Component } from "../../frameworks/root/component";

class NotExists extends Component {
  constructor(config){
    super(config)
  }
}

export const notExists = new NotExists({
  selector: "error",
  template: `
    <div>PAGE NOT EXISTS 404</div>
  `
})