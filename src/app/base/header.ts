import { Component } from "../../frameworks/root/component";
import {
  IConfigComponent,
  ProductWithCount,
  EventTypes,
  EventsManager,
} from "../../types";

export class Header extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }

  public addBucketCount() {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart") || "");
      return cart
        .map((item: ProductWithCount) => {
          if (item.count) {
            return +item.count;
          }
        })
        .reduce((acc: number, item: number) => acc + item);
    }
  }

  public updateTotalSum() {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart") || "");
      return cart
        .map((item: ProductWithCount) => +item.price)
        .reduce((acc: number, item: number) => acc + item);
    }
  }
  public events(): EventsManager[] {
    return [
      {
        eventName: EventTypes.CLICK,
        target: ".navbar-toggler",
        event: this.onBtnClick,
      },
    ];
  }
  onBtnClick(event: Event) {
    if (event.target instanceof Element) {
      if (event.target.closest(".navbar-toggler")) {
        document.querySelector(".collapse")?.classList.toggle("show");
      }
    }
  }
}

export const header: Header = new Header({
  selector: "header",
  template: `  
  <nav
    class="navbar navbar-expand-lg bg-secondary bg-gradient rounded-bottom"
  >
    <div class="container-fluid align-items-baseline">
      <a class="navbar-brand" href="#">Online-Store</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav top-menu">
          <li class="nav-item">
            <a class="nav-link" href="#">Главная</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#shop">Каталог</a>
          </li>
        </ul>

        <p class="sum-card text-uppercase mb-lg-0">
          Общая сумма заказа:
          <span>0 <i class="fas fa-light fa-ruble-sign"></i></span>
        </p>
        <ul class="navbar-nav text-end">
          <li class="nav-item">
            <a class="nav-link position-relative d-block" href="#bucket"
              ><div class="circle"><div class="number-book">0</div></div>

              <i class="fas fa-shopping-cart"></i
            ></a>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
  `,
});
