import { Component } from "../../frameworks/root/component";
import { IConfigComponent } from "../../types";

class Home extends Component {
  constructor(config: IConfigComponent) {
    super(config);
  }
}

export const home: Home = new Home({
  selector: "polimorph",
  template: `
  <main>
  <section class="main-content pt-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 m-auto text-center col-md-8">
          <h1 class="banner-title text-center bg-dark bg-gradient mb-3">
            Книжный интернет-магазин
          </h1>
          <p class="text-content text-center fs-4 mb-5">
            Рады приветствовать Вас в книжном интернет-магазине
            "Online-Store!
          </p>
          <div class="d-grid gap-2">
            <button class="btn btn-dark text-uppercase mb-5" type="button">
              Перейти к покупкам
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="info-books">
    <div class="container">
      <img class="capture-books" src="./assets/text.png" alt="" />
    </div>
  </section>
  <section class="structure py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 mx-auto">
          <h2 class="text-header mb-sm-5 mb-3 text-light">Структура</h2>
          <p class="text-set text-center mb-5 text-light">
            Предлагаем читателям ознакомиться с литературными жанрами,
            представленными в нашем интернет-каталоге:
          </p>
          <div class="row gap-lg-0 gap-3">
            <div class="col-lg-4">
              <div class="card">
                <img
                  class="icon-structure"
                  src="./assets/icons1.png"
                  alt=""
                />
                <div class="card-body card-set">
                  <h5 class="card-title text-center">
                    Художественная литература
                  </h5>
                  <p class="card-text text-center">
                    Читателю представлен широкий выбор художественной
                    литературы: современная проза, остросюжетная литература,
                    фантастика, зарубежная проза и многое другое.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card">
                <img
                  class="icon-structure"
                  src="./assets/icons2.png"
                  alt=""
                />
                <div class="card-body card-set">
                  <h5 class="card-title text-center">
                    Non-fiction литература
                  </h5>
                  <p class="card-text text-center">
                    Редакция научно-популярной и прикладной литературы,
                    путеводители и кулинарные книги, книги по воспитанию,
                    здоровью, саду и огороду, бизнесу и саморазвитию
                    представлены в каталоге.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card">
                <img
                  class="icon-structure"
                  src="./assets/icons3.png"
                  alt=""
                />
                <div class="card-body card-set">
                  <h5 class="card-title text-center">
                    Детская и подростковая литература
                  </h5>
                  <p class="card-text text-center">
                    Команда экспертов занимается подбором литературы для
                    детей: от развивающих изданий для родителей и самых
                    маленьких до современной художественной литературы
                    сегмента Young Adult.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- footer -->

  <footer class="footer col-12 bg-secondary bg-gradient rounded-top">
    <a
      href="#"
      class="text-decoration-none text-center d-block py-3 nav-link"
      >Online Store 2022</a
    >
    <div class="container"></div>
  </footer>
</main>
  `,
});
