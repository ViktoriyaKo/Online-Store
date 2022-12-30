import { Product } from "../../types";

// const cart = JSON.parse(localStorage.getItem("cart") || "");

// items из local
export class Cart {
  public items: Product[];
  constructor(items: Product[]) {
    this.items = items;
    this.renderCart();
  }

  goodsPlus(index: number) {
    this.items[index]["count"]++;
  }

  goodsMinus(index) {
    if (this.items[index]["count"] - 1 == 0) {
      this.goodsDelete(index);
    } else {
      this.items[index]["count"]--;
    }
  }
  goodsDelete(index) {
    delete this.items[index];
  }

  getTotal() {
    let total = 0;
    for (let key in this.items) {
      total += this.items[key]["count"] * this.items[key]["price"];
    }
    return total;
  }

  renderCart() {
    const totalAmount = document.querySelector(".total-amount") as HTMLElement;
    const productsItem = document.querySelector(
      ".products-item"
    ) as HTMLElement;
    totalAmount.innerHTML = `${this.getTotal()} <i class="fa fa-light fa-ruble-sign"></i
    >`;
    this.items.forEach((item) => {
      //   const totalGoods = document.querySelector(".total-goods") as HTMLElement;
      //   totalGoods.innerHTML = `${item["count"]}`; //change!
      const newItem = document.createElement("div");
      newItem.classList.add("set-card-bucket");
      newItem.innerHTML = `
        <span class="d-block order-number">1</span>
        <img
          class="img-thumbnail set-img-bucket d-block"
          src=${item.image[0]}
          alt="book-img"
        />
        <div class="book-info-bucket p-3">
          <h3 class="title-book-bucket pb-1">${item.title}</h3>
          <h4 class="author-book-bucket">${item.author}</h4>
        </div>
        <div class="d-block"></div>
        <div class="stock-info">
          <span class="text-success">
            <span class="stock-book"></span> На складе: ${item.stock}</span
          >
          <div>
            <button class="btn rounded-circle btn-success">
              <i class="fas fa-solid fa-minus"></i>
            </button>
            <span class="counter-items">${item["count"]}</span>
            <button class="btn rounded-circle btn-success">
              <i class="fas fa-solid fa-plus"></i>
            </button>
          </div>
          <span class="d-block total-amount"
            >${item.price}<i class="fa fa-light fa-ruble-sign"></i
          ></span>
        </div>
      `;
      productsItem.append(newItem);
    });
  }
}
