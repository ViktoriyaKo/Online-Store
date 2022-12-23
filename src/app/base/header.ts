import { Component } from "../../frameworks/root/component";
import { IConfigComponent } from "../../types";

export class Header extends Component {
  constructor(config: IConfigComponent) {
    super(config);
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
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link position-relative d-block" href="#bucket"
              ><div class="circle"><div class="number-book">0</div></div>

              <i class="fas fa-shopping-cart"></i
            ></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fas fa-search"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `,
});
