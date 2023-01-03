import { Component } from "../../frameworks/root/component";
import {
  EventsManager,
  EventTypes,
  IConfigComponent,
  Product,
  ReduceReturnType,
} from "../../types";
import { ProductsHandler } from "../handlers/ProductsHandler";
import { routerSlicer, $ } from "../../frameworks/exporter";
import { Instance } from "@popperjs/core";
import books from "../../books-content/books.json";
import {
  controlFromInput,
  controlFromSlider,
  controlToInput,
  controlToSlider,
  dualSlider,
  fillSlider,
  setToggleAccessible,
} from "../handlers/sliderHandler";

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
    <div class="row">
      ` +
        this.productsHandler
          .getFilteredSorted()
          .map(
            (book) => `
    <div class="product-card col-md-${3} col-sm-4">
      <div class="product-thumb">
        <a class="open-product" href="#product/${book.id}"
          ><img
            class="image-book"
            src="./books-content/img-books/${book.id}.jpeg"
            alt=""
        /></a>
      </div>

      <div class="product-details">
        <h4 class="title-book text-black set-fs">${book.title}</h4>
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
            <div id="${book.id}" class="icon-bucket"></div>
            
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
      authorMenu: this.productsHandler
        .getAuthor()
        .map(
          (author, index) =>
            `
      <div class="item-checkbox">
        <input class="clickEventAuthor" type="checkbox" id="scales${index}" name="${author}" />
        <label for="author${index}">${author}</label>
      </div>
      `
        )
        .join("\n"),
      priceSlider: `
      <div class="range_container">
      <div class="sliders_control">
          <input id="fromSlider" type="range" value="10" min="0" max="100"/>
          <input id="toSlider" type="range" value="40" min="0" max="100"/>
      </div>
      <div class="form_control">
          <div class="form_control_container">
              <div class="form_control_container__time">Min</div>
              <input class="form_control_container__time__input" type="number" id="fromInput" value="10" min="0" max="100"/>
          </div>
          <div class="form_control_container">
              <div class="form_control_container__time">Max</div>
              <input class="form_control_container__time__input" type="number" id="toInput" value="40" min="0" max="100"/>
          </div>
      </div>
      </div>
      `,
    };
  }

  private prepareMenu(params: ReduceReturnType | undefined) {
    const genres = params && params["genres"] && params["genres"].split("↕");
    //this.setGenres(genres === "" ? undefined : genres);
  }

  public events(): EventsManager[] {
    return [
      {
        eventName: EventTypes.CLICK,
        target: ".clickEventGenres",
        event: this.onBtnClickGenres,
      },
      {
        eventName: EventTypes.CLICK,
        target: ".clickEventAuthor",
        event: this.onBtnClickAuthors,
      },
      {
        eventName: EventTypes.CLICK,
        target: ".btn-sort",
        event: this.onBtnSort,
      },
      {
        eventName: EventTypes.CLICK,
        target: ".dropdown_sort",
        event: this.onClickDropDownSort,
      },
      {
        eventName: EventTypes.CLICK,
        target: ".main",
        event: this.closeSortButton,
      },
      {
        eventName: EventTypes.CLICK,
        target: ".btn-reset",
        event: this.buttonResetHandler,
      },
      {
        eventName: EventTypes.CLICK,
        target: ".btn-copy-clipBoard",
        event: this.buttonCopyClipBoard,
      },
      {
        eventName: EventTypes.INPUT,
        target: ".input-search",
        event: this.searchHandler,
      },
    ];
  }

  public closeSortButton(event: Event) {
    const target = event.target as Element;
    const dropDownMenu = document.querySelector(
      ".dropdown-menu"
    ) as HTMLElement;
    const btnSort = document.querySelector(".btn-sort") as HTMLButtonElement;
    if (!target.closest(".dropdown-menu") && target !== btnSort) {
      dropDownMenu.classList.remove("show");
    }
  }
  public searchHandler(event: Event) {
    console.log(event);
    const inputEl = document.querySelector(".input-search") as HTMLInputElement;
    console.log(inputEl.value);
    const test = routerSlicer.routerAdd("search", inputEl.value);
    window.location.hash = routerSlicer.getURI(test);
  }
  public buttonCopyClipBoard(event: Event) {
    console.log(window.location.href);
    const text = window.location.href;
    navigator.clipboard.writeText(text);
  }
  public buttonResetHandler(event: Event) {
    this.productsHandler.resetSettings();
    window.location.hash = routerSlicer.getBaseURI();
  }
  public onClickDropDownSort(event: Event) {
    console.log("click");
    if (event.target instanceof Element) {
      const label = $(event?.target);
      if (event?.target) {
        // window.location.hash = `shop/?genres=${encodeURIComponent(
        //   event?.target.nextElementSibling?.innerHTML
        // )}`;
        console.log(event.target.getAttribute("id"));
        const test = routerSlicer.routerAdd(
          "sort",
          event.target.getAttribute("id") as string
        );
        window.location.hash = routerSlicer.getURI(test);
      }
    }
  }
  public onBtnSort(event: Event) {
    console.log("onBtnClickGenres");
    if (event.target instanceof Element) {
      event.target?.nextElementSibling?.classList.toggle("show");
    }
  }
  public onBtnClickGenres(event: Event) {
    console.log("onBtnClickGenres");
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
        window.location.hash = routerSlicer.getURI(test);
      }
    }
  }
  public onBtnClickAuthors(event: Event) {
    console.log("onBtnClickAuthors");
    if (event.target instanceof Element) {
      const label = $(event?.target);
      if (event?.target.nextElementSibling?.innerHTML) {
        // window.location.hash = `shop/?genres=${encodeURIComponent(
        //   event?.target.nextElementSibling?.innerHTML
        // )}`;
        const test = routerSlicer.routerAdd(
          "authors",
          event?.target.nextElementSibling?.innerHTML
        );
        window.location.hash = routerSlicer.getURI(test);
      }
    }
  }

  public onInit(): void {
    if (window.location.hash === "#" + routerSlicer.getBaseURI()) {
      console.log("@#$#$@#$check");
      this.productsHandler.resetSettings();
    }
    console.log(
      "@#$#$@#$check",
      window.location.hash,
      routerSlicer.getBaseURI()
    );
    const params = routerSlicer.routerParserProduct();
    if (params) this.productsHandler.applySettings(params);
    this.prepareMenu(params);
    routerSlicer.routerParserProduct();
    console.log("forYangTest:", this.productsHandler.getFilteredSorted());
    this.data = {
      contentProd:
        `<p class="found-book text-center py-3 text-uppercase">
      Найдено: <span>${this.productsHandler.getFilteredSorted().length}</span>
    </p>
    <div class="row">
      ` +
        this.productsHandler
          .getFilteredSorted()
          .map(
            (book) => `
    <div class="product-card col-md-${3} col-sm-4">
      <div class="product-thumb">
        <a class="open-product" href="#product/${book.id}" id="${book.id}"
          ><img
            class="image-book"
            src="./books-content/img-books/${book.id}.jpeg"
            alt=""
        /></a>
      </div>

      <div class="product-details">
        <h4 class="title-book text-black set-fs">${book.title}</h4>
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
            <div id="${book.id}" class="icon-bucket"></div>
           
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
      authorMenu: this.productsHandler
        .getAuthor()
        .map(
          (author, index) =>
            `
      <div class="item-checkbox">
        <input class="clickEventAuthor" type="checkbox" id="author${index}" name="${author}" />
        <label for="author${index}">${author}</label>
      </div>
      `
        )
        .join("\n"),
      priceSlider: `
        <div class="range_container">
        <div class="sliders_control">
            <input id="fromSlider" type="range" value="${
              params
                ? params["price"]?.split("↕")
                  ? params["price"]?.split("↕")[0]
                  : 0
                : 0
            }" min="0" max="100"/>
            <input id="toSlider" type="range" value="${
              params
                ? params["price"]?.split("↕")
                  ? params["price"]?.split("↕")[1]
                  : 100
                : 100
            }" min="0" max="100"/>
        </div>
        <div class="form_control">
            <div class="form_control_container">
                <div class="form_control_container__time">Min</div>
                <input class="form_control_container__time__input" type="number" id="fromInput" value="${
                  params
                    ? params["price"]?.split("↕")
                      ? params["price"]?.split("↕")[0]
                      : 0
                    : 0
                }" min="0" max="100"/>
            </div>
            <div class="form_control_container">
                <div class="form_control_container__time">Max</div>
                <input class="form_control_container__time__input" type="number" id="toInput" value="${
                  params
                    ? params["price"]?.split("↕")
                      ? params["price"]?.split("↕")[1]
                      : 100
                    : 100
                }" min="0" max="100"/>
            </div>
        </div>
        </div>
        `,
    };
  }

  public afterInit(): void {
    this.updateHeader();
    dualSlider("#fromSlider", "#toSlider", "#fromInput", "#toInput");
    dualSlider("#fromSlider2", "#toSlider2", "#fromInput2", "#toInput2");
    const params = routerSlicer.routerParserProduct();
    if (params) {
      if (params["genres"]) {
        const genresChecked = params["genres"].split("↕");
        const genres = document.querySelectorAll(".clickEventGenres");
        genres.forEach((el) => {
          if (genresChecked.includes(el.getAttribute("name") || ""))
            el.setAttribute("checked", "false");
        });
      }
      if (params["authors"]) {
        const genresChecked = params["authors"].split("↕");
        const genres = document.querySelectorAll(".clickEventAuthor");
        genres.forEach((el) => {
          if (genresChecked.includes(el.getAttribute("name") || ""))
            el.setAttribute("checked", "false");
        });
      }
      if (params["search"]) {
        const inputEl = document.querySelector(
          ".input-search"
        ) as HTMLInputElement;
        inputEl.value = params["search"];
      }
    }
    //bucket на стр shop!!!!

    const itemBucket = document.querySelectorAll(".icon-bucket");
    if (
      localStorage.getItem("cart")?.toString() == "[]" ||
      localStorage.getItem("cart") == null
    ) {
      var itemsToBucket: Product[] = []; /* eslint no-var: 0 */
    } else {
      itemsToBucket = JSON.parse(localStorage.getItem("cart") || "");
    }

    itemBucket.forEach((item) => {
      item.addEventListener("click", (event) => {
        const target = event.currentTarget as HTMLElement;
        if (!target.classList.contains("chosen")) {
          if (itemsToBucket.find((item) => item.id === +target.id)) {
            itemsToBucket = itemsToBucket.filter(
              (item) => item.id !== +target.id
            );
            target.classList.remove("chosen");
          } else {
            target.classList.add("chosen");
            itemsToBucket.push(books[+target.id - 1]);
            itemsToBucket[itemsToBucket.length - 1].count = 1;
          }
        } else {
          itemsToBucket = itemsToBucket.filter(
            (item) => item.id !== +target.id
          );
          target.classList.remove("chosen");
        }
        localStorage.setItem("cart", JSON.stringify(itemsToBucket));
        this.updateHeader();
      });
    });
    //save class chosen:
    const itemId = itemsToBucket.map((item) => `${item.id}`);
    const chosenItemId = Array.from(itemBucket).filter((item) => {
      return itemId.includes(item.id);
    });
    chosenItemId.forEach((item) => item.classList.add("chosen"));
  }

  //bucket!!!!
}
export const shop: Shop = new Shop({
  selector: "polimorph",
  template: `
  <!-- main -->
    <main>
      <section class="main my-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-4 col-md-9 col-sm-9 mx-auto mt-2">
              <aside class="left-aside rounded-2 py-2 px-3">
                <div class="d-flex justify-content-evenly gap-2 flex-wrap">
                  <button class="btn btn-secondary btn-reset">Сброс фильтров</button>
                  <button class="btn btn-secondary btn-copy-clipBoard">Копия поиска</button>
                </div>
                <!-- filter will add automatically-->
                <div
                  class="filter-section my-3 bg-secondary bg-gradient rounded-2 p-2"
                >
                  <fieldset class="filter-block">
                    <legend class="name-filter position-relative text-center">
                      Категория
                    </legend>
                    {{genresMenu}}
                  </fieldset>
                </div>

                <div
                class="filter-section my-3 bg-secondary bg-gradient rounded-2 p-2"
              >
                <fieldset class="filter-block">
                  <legend class="name-filter position-relative text-center">
                    Автор
                  </legend>

                  {{authorMenu}}
                </fieldset>
              </div>

                <div
                  class="filter-section my-3 bg-secondary bg-gradient rounded-2 p-2"
                >
                  <!-- будет 2 ползунка -->
                  
                  <fieldset class="filter-block">
                    <legend class="name-filter position-relative text-center">
                      Цена
                    </legend>
                    {{priceSlider}}
                  </fieldset>
                </div>
                <div
                  class="filter-section my-3 bg-secondary bg-gradient rounded-2 p-2"
                >
                  <!-- будет 2 ползунка -->
                  <fieldset class="filter-block">
                    <legend class="name-filter position-relative text-center">
                      Количество товаров на складе
                    </legend>
                    <div class="range_container">
                    <div class="sliders_control">
                        <input id="fromSlider2" type="range" value="10" min="0" max="100"/>
                        <input id="toSlider2" type="range" value="40" min="0" max="100"/>
                    </div>
                    <div class="form_control">
                        <div class="form_control_container">
                            <div class="form_control_container__time">Min</div>
                            <input class="form_control_container__time__input" type="number" id="fromInput2" value="10" min="0" max="100"/>
                        </div>
                        <div class="form_control_container">
                            <div class="form_control_container__time">Max</div>
                            <input class="form_control_container__time__input" type="number" id="toInput2" value="40" min="0" max="100"/>
                        </div>
                    </div>
                </div>
                  </fieldset>
                </div>
              </aside>
            </div>
            <div class="col-lg-8 col-sm-12">
              <div class="row justify-content-start align-items-center gap-2 position-relative">
                <!-- sort - add js -->
                <button
                  class="btn btn-secondary dropdown-toggle col-lg-2 btn-sort"
                  role="button"
                >
                  Сортировать
                </button>

                <ul class="dropdown-menu">
                  <li><div class="dropdown-item dropdown_sort" id="priceASC">Цене ASC</div></li>
                  <li><div class="dropdown-item dropdown_sort" id="priceDESC">Цене DESC</div></li>
                  <li><div class="dropdown-item dropdown_sort" id="yearASC">Году издания ASC</div></li>
                  <li><div class="dropdown-item dropdown_sort" id="yearDESC">Году издания DESC</div></li>
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
                    <img class="btn-set displ-3 rounded-2" src="./assets/icons3-3.png" alt="" />
                  </button>
                  <button class="btn">
                    <img class="btn-set displ-4 rounded-2" src="./assets/icons4-4.png" alt="" />
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
