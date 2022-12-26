import { Component } from "../../frameworks/root/component";
import { IConfigComponent } from "../../types";

class Product extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const product: Product = new Product({
  selector: "polimorph",
  template: ` <main class="main-page">
  <section class="card-info">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <div class="wrapper-img-main mb-3">
            <img
              class="img-thumbnail img-main-set image-book"
              src="./books-content/img-books/16.jpeg"
              alt="book"
            />
          </div>
          <div class="wrapper-img d-flex mb-3">
            <img
              class="img-thumbnail border-secondary set-img"
              src="./books-content/img-books/16.jpeg"
              alt="book"
            />
            <img
              class="img-thumbnail border-secondary set-img"
              src="./books-content/img-books/16_author.jpeg"
              alt="author"
            />
          </div>
        </div>
        <div class="col-lg-5 col-sm-6">
          <div class="wrapper-about rounded-4 p-3 bg-set mb-3">
            <h3 class="title-book">Цветы для Элджернона</h3>
            <h4 class="author-book product-author-book">Дэниел Киз</h4>
            <p>
              На складе:
              <span class="text-success stock-book">20</span>
            </p>
            <h3 class="description fs-5 text-secondary">
              <i class="fa fa-duotone fa-quote-left"></i> Аннотация
            </h3>
            <p class="description-book">
             ...
            </p>
            <div class="pages-book text-secondary">
              Количество страниц: <span>320</span>
            </div>
            <div class="year-book text-secondary">
              Дата первой публикации: <span>1949</span>
            </div>
            <div class="terms-book text-secondary">
              Жанр: <span>Фантастика, фэнтези, мистика</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12">
          <div class="wrapper-right-side rounded-4 p-3 bg-set mb-3">
            <div class="price-book product-price-book text-center">
              <span>230<i class="fas fa-light fa-ruble-sign"></i></span>
              99<i class="fas fa-light fa-ruble-sign"></i>
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
</main>`,
});
