import { Component } from "../../frameworks/root/component";
import { IConfigComponent } from "../../types";

class Bucket extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const bucket: Bucket = new Bucket({
  selector: "polimorph",
  template: `
  <main>
  <section class="content-bucket py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <div class="wrapper-products rounded-3 mb-2">
            <div
              class="products-line d-flex justify-content-evenly align-items-center p-1"
            >
              <div class="text-products-line">Список товаров</div>
              <div class="">
                Количество:
                <input type="text" class="form-control set-input-item" />
              </div>
              <div>
                Страница:
                <button class="btn btn-secondary">
                  <i class="fas fa-solid fa-arrow-left"></i>
                </button>
                <span class="counter-page">1</span>
                <button class="btn btn-secondary">
                  <i class="fas fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <div class="products-item p-3 d-flex">
              <span class="d-block order-number">1</span>
              <img
                class="img-thumbnail set-img-bucket d-block"
                src="./books-content/img-books/16.jpeg"
                alt=""
              />
              <div class="book-info-bucket p-3">
                <h3 class="title-book-bucket pb-1">Цветы для Элджернона</h3>
                <h4 class="author-book-bucket">Дэниел Киз</h4>
              </div>
              <div class="d-block"></div>
              <div class="stock-info">
                <span class="text-success">
                  <span class="stock-book"></span> На складе: 20</span
                >
                <div>
                  <button class="btn rounded-circle btn-success">
                    <i class="fas fa-solid fa-minus"></i>
                  </button>
                  <span class="counter-page">1</span>
                  <button class="btn rounded-circle btn-success">
                    <i class="fas fa-solid fa-plus"></i>
                  </button>
                </div>
                <span class="d-block total-amount"
                  >100<i class="fa fa-light fa-ruble-sign"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="rounded-3 set-border">
            <div class="products-line p-2">Итого:</div>
            <div class="wrapper-right-bucket gap-3 p-2">
              <div>
                Количество товаров: <span class="total-goods">1</span>
              </div>
              <div>
                Общая сумма:
                <span class="total-amount"
                  >100<i class="fa fa-light fa-ruble-sign"></i
                ></span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Введите промокод"
              />
              <button class="btn btn-secondary">Перейти к оплате</button>
            </div>
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
      <div class="container"></div>
    </footer>
  `,
});
