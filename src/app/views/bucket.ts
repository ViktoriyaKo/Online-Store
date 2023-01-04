import { Component } from "../../frameworks/root/component";
import { IConfigComponent } from "../../types";
import books from "../../books-content/books.json";

class Bucket extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
  public afterInit(): void {
    this.updateHeader();
  }
}

export const bucket: Bucket = new Bucket({
  selector: "polimorph",
  template: `
  <main>  
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
            type="number"
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
              type="number"
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
  
  <section class="content-bucket py-5">
  <div class="container">
  <div class="row">
  <h2 class="set-text-bucket mt-5 d-none">Ваша корзина пуста</h2>
  <div class="col-lg-9">
          <div class="wrapper-products rounded-3 mb-2 d-none">
            <div
              class="products-line d-flex justify-content-evenly align-items-center p-1"
            >
              <div class="text-products-line">Список товаров</div>
              <div>
                Количество:
                <input type="number" class="form-control set-input-item" value="2"/>
              </div>
              <div class="block-page-counter">
                Страница:
                <button class="btn btn-secondary p-0">
                  <i class="fas fa-solid fa-arrow-left p-2"></i>
                </button>
                <span class="counter-page">1</span>
                <button class="btn btn-secondary p-0">
                  <i class="fas fa-solid fa-arrow-right p-2"></i>
                </button>
              </div>
            </div>
            <div class="products-item">


            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="rounded-3 set-border d-none">
            <div class="products-line p-2">Итого:</div>
            <div class="wrapper-right-bucket gap-3 p-2">
              <div>
                Количество товаров: <span class="total-goods">1</span>
              </div>
              <div class="set-total-amount">
                Общая сумма:
                <span class="total-amount"
                  >100<i class="fa fa-light fa-ruble-sign"></i
                ></span>
              </div>
              <div class="block-new-price"></div>
              <input
                type="text"
                class="form-control input-promo"
                placeholder="Введите промокод"
              />              
              <div class="text-secondary">Promo for test: 'RS', 'EPM'</div>
              <div class="promo"></div>
              <button class="btn btn-secondary btn-pay">Перейти к оплате</button>
            </div>
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
</footer>
  `,
});
