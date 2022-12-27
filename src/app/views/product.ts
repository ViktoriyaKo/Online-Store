import { Component } from "../../frameworks/root/component";
import { routerSlicer } from "../../frameworks/tools/routerSlicer";
import books from "../../books-content/books.json";
import { EventsManager, EventTypes, IConfigComponent } from "../../types";

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
      price = document.querySelector(".price-book-size") as Element;

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
              <button class="btn btn-secondary">Добавить в корзину</button>
              <button class="btn btn-secondary">Купить сейчас</button>
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
<footer class="footer col-12 bg-secondary bg-gradient rounded-top">
      <a href="#" class="text-decoration-none text-center d-block py-3 nav-link"
        >Online Store 2022</a
      >      
</footer>`,
});
