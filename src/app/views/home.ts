import { Component } from "../../frameworks/root/component";
import { EventsManager, EventTypes, IConfigComponent } from "../../types";

class Home extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
  public events(): EventsManager {
    console.log("proper events");
    return {
      eventName: EventTypes.CLICK,
      target: ".btn_view-event",
      event: this.onBtnClick,
    };
  }
  public onInit(): void {
    console.log("init Page");
  }

  public afterInit(): void {
    console.log("after Page loaded");
  }
  private onBtnClick(event: Event) {
    console.log(event);
  }
}

export const home: Home = new Home({
  selector: "polimorph",
  template: `
  <div>Home content</div>
  <div class="container">
  <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

            <div class="card-body">
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary btn_view-event">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
        </div>
  `,
});
