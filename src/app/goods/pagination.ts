import { ProductWithCount } from "../../types";
import { Cart } from "../goods/goods";

export class Pagination extends Cart {
  constructor(items: ProductWithCount[]) {
    super(items);
    this.renderCart(items);
    this.changeQty();
    this.checkEmpty();
    this.displayCountPage();
    this.paginationItemsPerPage();
  }

  blockCounterPage = document.querySelector(
    ".block-page-counter"
  ) as HTMLElement;
  counterPage = document.querySelector(".counter-page") as HTMLElement;

  public paginationItemsPerPage() {
    //limit
    const setInput = document.querySelector(
      ".set-input-item"
    ) as HTMLInputElement;
    setInput.addEventListener("input", () => {
      if (+setInput.value > this.items.length) {
        setInput.value = `${this.items.length}`;
      } else if (+setInput.value <= 0) {
        setInput.value = "1";
      }
    });
    return +setInput.value;
  }

  public paginationGetData(
    arrData: ProductWithCount[],
    rowPerPage: number,
    page: number
  ) {
    page--;
    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);
    return paginatedData;
  }

  public displayCountPage() {
    let count = 1; //current page
    this.blockCounterPage.addEventListener("click", (event) => {
      const rows = this.paginationItemsPerPage(); //количество items на странице!!
      const pagesCount = Math.ceil(this.items.length / rows); //количество страниц total!!
      const target = event.target as HTMLElement;

      if (target.classList.contains("fa-arrow-right")) {
        count++;
        if (count <= pagesCount) {
          this.counterPage.innerHTML = `${count}`;
        } else {
          count = pagesCount;
          this.counterPage.innerHTML = `${count}`;
        }
        const data = this.paginationGetData(this.items, rows, count);
        this.renderCart(data);
        console.log("count", count);
        console.log("pagesCount", pagesCount);
      } else if (target.classList.contains("fa-arrow-left")) {
        count--;
        if (count > 0) {
          this.counterPage.innerHTML = `${count}`;
        } else {
          count = 1;
          this.counterPage.innerHTML = `${count}`;
        }
        const data = this.paginationGetData(this.items, rows, count);
        console.log("count", count);
        console.log("pagesCount", pagesCount);
        this.renderCart(data);
      }
    });
  }

  public changeQty() {
    this.clickArea.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const area = this.items.filter((item) => item.id === +target.id);
      if (target.classList.contains("plus")) {
        let a = area[0].count;
        a++;
        area[0].count = a;
        localStorage.setItem("cart", JSON.stringify(this.items));
        if (target.parentElement) {
          target.parentElement.children[1].innerHTML = `${a}`;
        }
      } else if (target.classList.contains("minus")) {
        let a = area[0].count;
        if (a - 1 === 0) {
          // delete el;
          this.items = this.items.filter((item) => item.id !== +target.id);
          this.renderCart(this.items); //с пагинацией не работает!
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
      this.renderTextSale();

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
}
