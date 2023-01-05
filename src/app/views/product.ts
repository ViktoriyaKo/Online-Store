import { Component } from "../../frameworks/root/component";
import { routerSlicer } from "../../frameworks/tools/routerSlicer";
import books from "../../books-content/books.json";
import { tools } from "../../frameworks/exporter";
import {
  EventsManager,
  EventTypes,
  IConfigComponent,
  ProductWithCount,
  Settings,
} from "../../types";
import { Validation } from "../../app/modal";

class Product extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
  public afterInit(): void {
    const url = routerSlicer.getRoute();
    const idNumber = +url.split("/")[1] - 1;
    const img = document.querySelector(".img-main-set") as HTMLImageElement,
      imgSmall1 = document.querySelectorAll(".set-img")[0] as HTMLImageElement,
      imgSmall2 = document.querySelectorAll(".set-img")[1] as HTMLImageElement,
      title = document.querySelector(".title-book") as Element,
      author = document.querySelector(".author-book") as Element,
      stock = document.querySelector(".stock-book") as Element,
      description = document.querySelector(".description-book") as Element,
      pages = document.querySelector(".pages-book span") as Element,
      year = document.querySelector(".year-book span") as Element,
      terms = document.querySelector(".terms-book span") as Element,
      termsName = document.querySelector(".terms-name") as Element,
      priceCross = document.querySelector(".product-price-book") as Element,
      price = document.querySelector(".price-book-size") as Element,
      btnAddBucket = document.querySelector(".add-item") as Element;

    img.src = books[idNumber].image[0];
    imgSmall1.src = books[idNumber].image[0];
    imgSmall2.src = books[idNumber].image[1];
    title.innerHTML = books[idNumber].title;
    author.innerHTML = books[idNumber].author;
    stock.innerHTML = `${books[idNumber].stock}`;
    description.innerHTML = books[idNumber].description;
    pages.innerHTML = `${books[idNumber].pages}`;
    year.innerHTML = `${books[idNumber].year}`;
    terms.innerHTML = books[idNumber].terms;
    termsName.innerHTML = books[idNumber].terms;
    priceCross.innerHTML = `${books[idNumber].price}<i class="fas fa-light fa-ruble-sign"></i>`;
    price.innerHTML = `${Math.floor(
      books[idNumber].price * books[idNumber].sale
    )}<i class="fas fa-light fa-ruble-sign"></i>`;
    // add element to bucket:
    if (localStorage.getItem("cart")) {
      var cart = JSON.parse(
        localStorage.getItem("cart") || ""
      ); /* eslint no-var: 0 */
      const itemInBucket = cart.find(
        (item: ProductWithCount) => item.id === idNumber + 1
      );
      if (itemInBucket) {
        btnAddBucket.innerHTML = "Удалить из корзины";
      } else {
        btnAddBucket.innerHTML = "Добавить в корзину";
      }
    } else {
      localStorage.setItem("cart", "[]");
    }

    btnAddBucket.addEventListener("click", () => {
      cart = JSON.parse(localStorage.getItem("cart") || "");
      if (localStorage.getItem("cart")) {
        const itemInBucket = cart.find(
          (item: ProductWithCount) => item.id === idNumber + 1
        );
        if (itemInBucket) {
          btnAddBucket.innerHTML = "Добавить в корзину";
          cart = cart.filter(
            (item: ProductWithCount) => item.id !== idNumber + 1
          );
        } else {
          btnAddBucket.innerHTML = "Удалить из корзины";
          cart.push(books[idNumber]);
          cart[cart.length - 1].count = 1;
          cart.filter((item: ProductWithCount) => item.id !== idNumber + 1);
          // openModal:
          const settings: Settings = {
            minLengthName: 2,
            minSymbolName: 3,
            minLengthTel: 10,
            minLengthAddress: 3,
            minSymbolAddress: 5,
            cardNumberLength: 16,
            dateLength: 5,
            dateCardMonth: 12,
            cvvLength: 3,
          };
          window.location.href = "#bucket";
          tools.delay(0).then(() => {
            const startValidation: Validation = new Validation(settings);
            startValidation.openAutomatically();
          });
          //
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.updateHeader();
      }
    });
    this.updateHeader();
    //
  }

  public events(): EventsManager[] {
    return [
      {
        eventName: EventTypes.CLICK,
        target: ".set-img",
        event: this.onBtnClick,
      },
    ];
  }

  public onBtnClick(event: Event) {
    const target = event.currentTarget as HTMLImageElement;
    const img = document.querySelector(".img-main-set") as HTMLImageElement;
    if (target) {
      img.src = target.src;
    }
  }
}

export const product: Product = new Product({
  selector: "polimorph",
  template: ` <main class="main-page">
  <div class="container wrapper-modal modal-none">
  <div class="row justify-content-center">
    <div class="col-lg-6 col-sm-10 set-modal p-2 rounded-3">
      <button class="btn btn-close bg-white set-btn-close"></button>
      <h2 class="fs-5">Оформление покупки</h2>

      <label for="firstName" class="form-label"
        >Введите Имя и Фамилию</label
      >
      <input
        type="text"
        class="form-control"
        id="firstName"
        placeholder=""
        value=""
        required
      />
      <span class="text-danger"></span>

      <label for="phone" class="form-label">Номер телефона</label>
      <input
        type="tel"
        class="form-control"
        id="phone"
        placeholder="+7"
        value=""
        required
      />
      <span class="text-danger"></span>

      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="you@example.com"
      />
      <span class="text-danger"></span>

      <label for="address" class="form-label">Адрес доставки</label>
      <input
        type="text"
        class="form-control"
        id="address"
        placeholder=""
        required
      />
      <span class="text-danger"></span>
      <div
        class="wrapper-card bg-info rounded-3 m-auto col-lg-8 col-sm-9 p-3 my-2"
      >
        <h3 class="fs-5">Оплата</h3>
        <div class="d-flex flex-wrap align-items-center">
          <img src="./assets/visa.png" class="d-block set-card me-3" alt="card" />
          <input
            type="text"
            class="form-control set-form-width"
            id="cc-number"
            placeholder="номер карты"
            required
          />
          <span class="text-danger"></span>
        </div>
        <div class="d-flex gap-3">
          <div class="col-md-4">
            <label for="cc-expiration" class="form-label">Дата:</label>
            <input
              type="text"
              class="form-control"
              id="cc-expiration"
              placeholder=""
              required
            />
            <span class="text-danger"></span>
          </div>
          <div class="col-md-4">
            <label for="cc-cvv" class="form-label">CVV:</label>
            <input
              type="text"
              class="form-control"
              id="cc-cvv"
              placeholder=""
              required
            />
            <span class="text-danger"></span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-secondary d-block m-auto btn-submit"
      >
        Оплатить
      </button>
    </div>
  </div>
</div>

  <section class="card-info">
    <div class="container">
      <div class="row">
        <div
          class="col-md-12 text-light d-flex text-uppercase justify-content-around rounded-3 py-3 align-items-center gap-2 flex-wrap"
          >
          <a href="#" class="nav-link">Главная</a>
          <i class="fas fa-solid fa-chevron-right"></i>
          <a href="#shop" class="nav-link">Каталог</a>
          <i class="fas fa-solid fa-chevron-right"></i>
          <div class="terms-name text-center"></div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="wrapper-img-main mb-3">
            <img
              class="img-thumbnail img-main-set image-book"
              src=""
              alt="book"
            />
          </div>
          <div class="wrapper-img d-flex mb-1">
            <img
              class="img-thumbnail border-secondary set-img"
              src=""
              alt="book"
            />
            <img
              class="img-thumbnail border-secondary set-img"
              src=""
              alt="author"
            />
          </div>
        </div>
        <div class="col-lg-5 col-sm-6">
          <div class="wrapper-about rounded-4 p-3 bg-set mb-3">
            <h3 class="title-book"></h3>
            <h4 class="author-book product-author-book"></h4>
            <p>
              На складе:
              <span class="text-success stock-book"></span>
            </p>
            <h3 class="description fs-5 text-secondary">
              <i class="fa fa-duotone fa-quote-left"></i> Аннотация
            </h3>
            <p class="description-book"></p>
            <div class="pages-book text-secondary">
              Количество страниц: <span></span>
            </div>
            <div class="year-book text-secondary">
              Дата первой публикации: <span></span>
            </div>
            <div class="terms-book text-secondary">
              Жанр: <span></span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12">
          <div class="wrapper-right-side rounded-4 p-3 bg-set mb-3">
            <div class="text-center">
              <span class="product-price-book"></span>
              <span class="price-book-size"></span>
            </div>
            <div
              class="wrapper-buttons d-flex justify-content-between mb-2 gap-4"
            >
              <button class="btn btn-secondary add-item">Добавить в корзину</button>
              <button class="btn btn-secondary btn-pay">Купить сейчас</button>
            </div>
            <span class="d-block"
              >В наличии <i class="fas fa-solid fa-check text-success"></i
            ></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
<footer class="footer col-12 bg-secondary bg-gradient rounded-top py-2">
<div class="container d-flex justify-content-between align-items-center">
  <a href="https://rs.school/" class="d-block" target="_blank"
    ><img
      src="./assets/logo_rs_text.svg"
      alt="rs_website"
      class="logo-rs"
  /></a>

  <a href="#" class="text-decoration-none d-block nav-link">
    Online Store 2022</a
  >
  <div class="d-flex gap-2">
    <a
      href="https://github.com/ViktoriyaKo"
      class="d-block"
      target="_blank"
      ><img src="./assets/github.svg" alt="logo-git" class="git-img1"
    /></a>
    <a href="https://github.com/scalette" class="d-block" target="_blank"
      ><img src="./assets/github.svg" class="git-img2" alt="logo-git"
    /></a>
  </div>
</div>
</footer>`,
});
