export class Component {
  constructor(config) {
    this.template = config.template
    this.selector = config.selector
    this.el = null
  }
  render() {
    this.el = document.querySelector(this.selector)
    if(!this.el) throw new Error(`component ${this.template} not found!`)
    this.el.innerHTML = this.template
  }
}