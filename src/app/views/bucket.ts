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
  <div class="container wrapper-none">
  <div class="row justify-content-center">
    <div class="col-lg-6 col-sm-10 set-modal p-2 rounded-3 modal-shadow">
      <button class="btn btn-close bg-white d-block ms-auto"></button>
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
      <div class="text-danger"></div>

      <label for="phone" class="form-label">Номер телефона</label>
      <input
        type="number"
        class="form-control"
        id="phone"
        placeholder="+7"
        value=""
        required
      />
      <div class="text-danger"></div>

      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="you@example.com"
      />
      <div class="text-danger"></div>

      <label for="address" class="form-label">Адрес доставки</label>
      <input
        type="text"
        class="form-control"
        id="address"
        placeholder=""
        required
      />
      <div class="text-danger"></div>
      <div
        class="wrapper-card bg-info rounded-3 m-auto col-lg-8 col-sm-12 p-3 my-3"
      >
        <h3>Оплата</h3>
        <div class="d-flex gap-3 flex-wrap align-items-center">
          <img src="./assets/visa.png" class="d-block set-card" alt="" />
          <input
            type="number"
            class="form-control set-form-width"
            id="cc-number"
            placeholder="номер карты"
            required
          />
          <div class="text-danger"></div>
        </div>
        <div class="d-flex gap-3">
          <div class="col-md-4">
            <label for="cc-expiration" class="form-label">Дата:</label>
            <input
              type="number"
              class="form-control"
              id="cc-expiration"
              placeholder=""
              required
            />
            <div class="text-danger"></div>
          </div>
          <div class="col-md-4">
            <label for="cc-cvv" class="form-label">CVV:</label>
            <input
              type="number"
              class="form-control"
              id="cc-cvv"
              placeholder=""
              required
            />
            <div class="text-danger"></div>
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
