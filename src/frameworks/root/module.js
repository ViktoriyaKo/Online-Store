import {routerSlicer} from "../tools/routerSlicer"

export class Module {
  constructor(config) {
    this.components = config.components
    this.routes = config.routes
  }

  start() {
    this.init()
  }
  init() {
    for (const component of this.components) {
      console.log('comp to render: ', component)
      this.renderComponent(component)
    }
    if(this.routes){
      window.addEventListener('hashchange', this.renderRoute.bind(this))
      this.renderRoute()
    }
  }
  renderRoute() {
    let url = routerSlicer.getRoute()
    let route = this.routes.find(route => route.path === url)
    if (!route) {
      route = this.routes.find(route => route.path === 'error')
    }
    document.querySelector('polimorph').innerHTML = `
    <${route.components.selector}></${route.components.selector}>
    `
    this.renderComponent(route.components)
  }
  renderComponent(component) {component.render()
  }
}