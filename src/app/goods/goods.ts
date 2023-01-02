import { ProductWithCount } from "../../types";

// items из local
export class Cart {
  public items: ProductWithCount[];
  constructor(items: ProductWithCount[]) {
    this.items = items;
    this.renderCart();
    this.changeQty();
    this.checkEmpty();
  }

  totalAmount = document.querySelector(".total-amount") as HTMLElement;
  totalGoods = document.querySelector(".total-goods") as HTMLElement;
  productsItem = document.querySelector(".products-item") as HTMLElement;
  clickArea = document.querySelector(".wrapper-products") as HTMLElement;
  setBorder = document.querySelector(".set-border") as HTMLElement;
  setTextBucket = document.querySelector(".set-text-bucket") as HTMLElement;
  sumHeader = document.querySelector(".sum-card span") as HTMLElement;
  numberHeader = document.querySelector(".number-book") as HTMLElement;

  public addBucketCount() {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart") || "");
      if (cart.length !== 0) {
        return cart
          .map((item: ProductWithCount) => {
            if (item.count) {
              return +item.count;
            }
          })
          .reduce((acc: number, item: number) => acc + item);
      }
    }
  }

  checkEmpty() {
    if (localStorage.getItem("cart")) {
      if (localStorage.getItem("cart")?.toString() == "[]") {
        this.clickArea.classList.add("d-none");
        this.setBorder.classList.add("d-none");
        this.setTextBucket.classList.remove("d-none");
      } else {
        this.clickArea.classList.remove("d-none");
        this.setBorder.classList.remove("d-none");
        this.setTextBucket.classList.add("d-none");
      }
    }
  }

  public changeQty() {
    this.clickArea.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const area = this.items.filter((item) => item.id === +target.id);
      if (target.closest(".plus")) {
        let a = area[0].count;
        a++;
        area[0].count = a;
        localStorage.setItem("cart", JSON.stringify(this.items));
        if (target.parentElement) {
          target.parentElement.children[1].innerHTML = `${a}`;
        }
      } else if (target.closest(".minus")) {
        let a = area[0].count;
        if (a - 1 === 0) {
          // delete el;
          target.parentElement!.parentElement!.parentElement!.remove();
          this.items = this.items.filter((item) => item.id !== +target.id);
        } else {
          a--;
          area[0].count = a;
        }
        localStorage.setItem("cart", JSON.stringify(this.items));
        if (target.parentElement) {
          target.parentElement.children[1].innerHTML = `${a}`;
        }
      }

      this.checkEmpty();
      this.totalAmount.innerHTML = `${this.getTotal()} <i class="fa fa-light fa-ruble-sign"></i
      >`;
      this.totalGoods.innerHTML = `${this.addBucketCount()}`;
      if (
        localStorage.getItem("cart")?.toString() == "[]" ||
        localStorage.getItem("cart") == null
      ) {
        this.sumHeader.innerHTML = `0 <i class="fas fa-light fa-ruble-sign"></i>`;
        this.numberHeader.innerHTML = `0`;
      } else {
        this.sumHeader.innerHTML = `${this.getTotal()} <i class="fas fa-light fa-ruble-sign"></i>`;
        this.numberHeader.innerHTML = `${this.addBucketCount()}`;
      }
    });
  }

  getTotal() {
    let total = 0;
    for (const key in this.items) {
      total +=
        this.items[key]["count"] *
        Math.floor(this.items[key]["price"] * this.items[key]["sale"]);
    }
    return total;
  }

  renderCart() {
    this.totalAmount.innerHTML = `${this.getTotal()} <i class="fa fa-light fa-ruble-sign"></i
    >`;
    this.totalGoods.innerHTML = `${this.addBucketCount()}`;
    this.totalGoods.innerHTML = `${this.addBucketCount()}`;

    this.items.forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.classList.add("p-3");
      newItem.classList.add("row");
      newItem.innerHTML = `
        <span class="col-sm-1 order-number">${index + 1}</span>
        <img
          class="img-thumbnail set-img-bucket d-block col-sm-2"
          src=${item.image[0]}
          alt="book-img"
        />
        <div class="book-info-bucket p-3 col-sm-5">
          <h3 class="title-book-bucket pb-1">${item.title}</h3>
          <h4 class="author-book-bucket">${item.author}</h4>
        </div>        
        <div class="stock-info col-sm-4">
          <span class="text-success">
            <span class="stock-book"></span> На складе: ${item.stock}</span
          >
          <div>
            <button class="btn btn-success minus" id="${item.id}">-</button>
            <span class="counter-items">${item["count"]}</span>
            <button class="btn btn-success plus" id="${item.id}">+</button>
          </div>
          <span class="d-block total-amount"
            >Цена за ед: ${Math.floor(
              item.price * item.sale
            )} <i class="fa fa-light fa-ruble-sign"></i
          ></span>
        </div>
      `;
      this.productsItem.append(newItem);
    });
  }
}
