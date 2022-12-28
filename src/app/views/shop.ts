import { Component } from "../../frameworks/root/component";
import {
  EventsManager,
  EventTypes,
  IConfigComponent,
  Product,
  ReduceReturnType,
} from "../../types";
import books from "../../books-content/books.json";
import { ProductsHandler } from "../handlers/ProductsHandler";
import { routerSlicer, $ } from "../../frameworks/exporter";

class Shop extends Component {
  private productsHandler: ProductsHandler;
  constructor(config: IConfigComponent) {
    super(config);
    this.productsHandler = new ProductsHandler();
    this.data = {
      contentProd:
        `<p class="found-book text-center py-3 text-uppercase">
      Найдено: <span>${this.productsHandler.getFilteredSorted().length}</span>
    </p>
    <div class="d-flex flex-wrap gap-5 justify-content-around">
      ` +
        this.productsHandler
          .getFilteredSorted()
          .map(
            (book) => `
    <div class="product-card">
      <div class="product-thumb">
        <a class="open-product" href="#product/${book.id}" id="${book.id}"
          ><img
            class="image-book"
            src="./books-content/img-books/${book.id}.jpeg"
            alt=""
        /></a>
      </div>

      <div class="product-details">
        <h4>
          <a href="#product" class="title-book text-black set-fs">${
            book.title
          }</a>
        </h4>
        <p class="author-book">${book.author}</p>
        <div
          class="product-bottom-details d-flex justify-content-between"
        >
          <div class="price-book">
            <span
              >${book.price}<i class="fas fa-light fa-ruble-sign"></i></span
            >${Math.floor(
              book.price * book.sale
            )} <i class="fas fa-light fa-ruble-sign"></i>
          </div>
          <div class="product-links">
            <a href="#bucket"><i class="fas fa-shopping-cart"></i></a>
            <a href="#"><i class="far fa-heart"></i></a>
          </div>
        </div>
      </div>
    </div>`
          )
          .join("\n"),
      genresMenu: this.productsHandler
        .getGenres()
        .map(
          (genre, index) => `
        <div class="item-checkbox">
        <input class=" clickEventGenres" type="checkbox" id="scales${index}" name="scales${index}" />
        <label for="scales${index}">${genre}</label>
        </div>
        `
        )
        .join("\n"),
    };
  }

  private prepareMenu(params: ReduceReturnType | undefined) {
    const genres = params && params["genres"] && params["genres"].split("↕");
    //this.setGenres(genres === "" ? undefined : genres);
  }

  private setGenres(genresChecked: string[] | undefined) {
    this.template = this.template.replace(
      "{{genresMenu}}",
      this.productsHandler
        .getGenres()
        .map(
          (genre, index) => `
        <div class="item-checkbox">
        <input class=" clickEventGenres" type="checkbox" id="scales${index}" name="scales${index}" />
        <label for="scales${index}">${genre}</label>
        </div>
        `
        )
        .join("\n")
    );
  }
  public events(): EventsManager[] {
    return [
      {
        eventName: EventTypes.CLICK,
        target: ".clickEventGenres",
        event: this.onBtnClick,
      },
    ];
  }

  public onBtnClick(event: Event) {
    if (event.target instanceof Element) {
      const label = $(event?.target);
      if (event?.target.nextElementSibling?.innerHTML) {
        // window.location.hash = `shop/?genres=${encodeURIComponent(
        //   event?.target.nextElementSibling?.innerHTML
        // )}`;
        const test = routerSlicer.routerAdd(
          "genres",
          event?.target.nextElementSibling?.innerHTML
        );
        window.location.hash = routerSlicer.routerGetURIProduct(test);
      }
    }
  }

  private setAuthors() {
    this.template = this.template.replace(
      "{{authorsMenu}}",
      this.productsHandler
        .getGenres()
        .map(
          (genre, index) => `
        INDEX AUTHOR
        `
        )
        .join("\n")
    );
  }
  public onInit(): void {
    const params = routerSlicer.routerParserProduct();
    console.log("params", params);
    if (params) this.productsHandler.applySettings(params["genres"].split("↕"));
    this.prepareMenu(params);
    routerSlicer.routerParserProduct();

    this.data = {
      contentProd:
        `<p class="found-book text-center py-3 text-uppercase">
      Найдено: <span>${this.productsHandler.getFilteredSorted().length}</span>
    </p>
    <div class="d-flex flex-wrap gap-5 justify-content-around">
      ` +
        this.productsHandler
          .getFilteredSorted()
          .map(
            (book) => `
    <div class="product-card">
      <div class="product-thumb">
        <a class="open-product" href="#product/${book.id}" id="${book.id}"
          ><img
            class="image-book"
            src="./books-content/img-books/${book.id}.jpeg"
            alt=""
        /></a>
      </div>

      <div class="product-details">
        <h4>
          <a href="#product" class="title-book text-black set-fs">${
            book.title
          }</a>
        </h4>
        <p class="author-book">${book.author}</p>
        <div
          class="product-bottom-details d-flex justify-content-between"
        >
          <div class="price-book">
            <span
              >${book.price}<i class="fas fa-light fa-ruble-sign"></i></span
            >${Math.floor(
              book.price * book.sale
            )} <i class="fas fa-light fa-ruble-sign"></i>
          </div>
          <div class="product-links">
            <a href="#bucket"><i class="fas fa-shopping-cart"></i></a>
            <a href="#"><i class="far fa-heart"></i></a>
          </div>
        </div>
      </div>
    </div>`
          )
          .join("\n"),
      genresMenu: this.productsHandler
        .getGenres()
        .map(
          (genre, index) => `
        <div class="item-checkbox">
        <input class=" clickEventGenres" type="checkbox" id=scales${index} name="${genre}" />
        <label for="scales${index}">${genre}</label>
        </div>
        `
        )
        .join("\n"),
    };
  }

  public afterInit(): void {
    const params = routerSlicer.routerParserProduct();
    if (params) {
      const genresChecked = params["genres"].split("↕");
      const genres = document.querySelectorAll(".clickEventGenres");
      console.log(".clickEventGenres", genres);
      genres.forEach((el) => {
        if (genresChecked.includes(el.getAttribute("name") || ""))
          el.setAttribute("checked", "false");
      });
    }

    console.log("after init");
  }
}
export const shop: Shop = new Shop({
  selector: "polimorph",
  template: `
  <!-- main -->
    <main>
      <section class="main my-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-4 col-md-5 mt-2">
              <aside class="left-aside rounded-2 py-2 px-3">
                <div class="d-flex justify-content-evenly gap-2 flex-wrap">
                  <button class="btn btn-secondary">Сброс фильтров</button>
                  <button class="btn btn-secondary">Копия поиска</button>
                </div>
                <!-- filter will add automatically-->
                <div
                  class="filter-section my-3 bg-secondary bg-gradient rounded-2"
                >
                  <fieldset class="filter-block p-2">
                    <legend class="name-filter position-relative text-center">
                      Категория
                    </legend>
                    {{genresMenu}}
                  </fieldset>
                </div>

                <div
                class="filter-section my-3 bg-secondary bg-gradient rounded-2"
              >
                <fieldset class="filter-block p-3">
                  <legend class="name-filter position-relative text-center">
                    Автор
                  </legend>

                  <div class="item-checkbox">
                    <input type="checkbox" id="scales" name="scales" />
                    <label for="scales">пример1</label>
                  </div>

                  <div class="item-checkbox">
                    <input type="checkbox" id="horns" name="horns" />
                    <label for="horns">пример2</label>
                  </div>
                </fieldset>
              </div>

                <div
                  class="filter-section my-3 bg-secondary bg-gradient rounded-2"
                >
                  <!-- будет 2 ползунка -->
                  <fieldset class="filter-block p-2">
                    <legend class="name-filter position-relative text-center">
                      Цена
                    </legend>
                    <div class="">
                      <label
                        for="customRange2"
                        class="form-label text-center w-100"
                        ><span class="min-price"
                          >0 <i class="fas fa-light fa-ruble-sign"></i
                        ></span>
                        -
                        <span class="max-price"
                          >1000 <i class="fas fa-light fa-ruble-sign"></i
                        ></span>
                      </label>
                      <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="5"
                        step="0.5"
                        id="customRange2"
                      />
                    </div>
                  </fieldset>
                </div>
                <div
                  class="filter-section my-3 bg-secondary bg-gradient rounded-2"
                >
                  <!-- будет 2 ползунка -->
                  <fieldset class="filter-block p-3">
                    <legend class="name-filter position-relative text-center">
                      Количество товаров на складе
                    </legend>
                    <div>
                      <label
                        for="customRange2"
                        class="form-label text-center w-100"
                        ><span class="min-price">0</span>
                        -
                        <span class="max-price">40</span>
                      </label>
                      <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="5"
                        step="0.5"
                        id="customRange2"
                      />
                    </div>
                  </fieldset>
                </div>
              </aside>
            </div>
            <div class="col-lg-8 col-md-7">
              <div class="row justify-content-start align-items-center gap-2">
                <!-- sort - add js -->
                <button
                  class="btn btn-secondary dropdown-toggle col-lg-2 btn-sort"
                  role="button"
                >
                  Сортировать
                </button>

                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Цене</a></li>
                  <li><a class="dropdown-item" href="#">Году издания</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Количеству на складе</a>
                  </li>
                </ul>
                <!-- searh -->
                <form
                  action="#"
                  role="search"
                  class="d-flex align-items-center col-lg-6"
                >
                  <input
                    type="search"
                    class="form-control input-search"
                    placeholder="Найти книгу..."
                  />
                  <button type="submit" class="btn">
                    <i class="fas fa-search"></i>
                  </button>
                </form>
                <!-- view window -->
                <div class="view-book d-flex col-lg-2">
                  <button class="btn">
                    <img class="btn-set" src="./assets/icons3-3.png" alt="" />
                  </button>
                  <button class="btn">
                    <img class="btn-set" src="./assets/icons4-4.png" alt="" />
                  </button>
                </div>
              </div>

              {{contentProd}}
              </div>
              <!-- card -->
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
  </footer>
  `,
});
