import { Component } from "../../frameworks/root/component";
import { EventsManager, EventTypes, IConfigComponent } from "../../types";
import books from "../../books-content/books.json";

class Shop extends Component {
  constructor(config: IConfigComponent) {
    super(config);
    this.prepareBooks();
  }
  public events(): EventsManager {
    return {
      eventName: EventTypes.CLICK,
      target: ".btn_test",
      event: this.onBtnClick,
    };
  }

  private onBtnClick(event: Event) {
    console.log(this.el?.querySelector(".products"));
  }

  private prepareBooks() {
    console.log(this.template);
    console.log(books);
    this.template = this.template.replace(
      "Shop content",
      books.map((book) => "<div>" + book.title + "</div>").join("\n")
    );
  }
}
export const shop: Shop = new Shop({
  selector: "polimorph",
  template: `
  <button class='btn_test'></button>
  <div class='products'>
  <div>Shop content</div></div>
  `,
});
