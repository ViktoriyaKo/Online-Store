import { ProductWithCount } from "../../types";
import { Cart } from "../goods/goods";

export class Pagination extends Cart {
  constructor(items: ProductWithCount[]) {
    super(items);
    this.renderPagination();
  }

  renderPagination() {
    const setInput = document.querySelector(
      ".set-input-item"
    ) as HTMLInputElement;
    if (setInput !== null) {
      const currentPage = 1; //fix!!!брать из query
      const rows = this.paginationItemsPerPage(); //количество items на странице!!
      const data = this.paginationGetData(this.items, rows, currentPage);
      this.renderCart(data);
      this.changeQty();
      this.checkEmpty();
      this.displayCountPage();
      this.updateShowItems();
    }
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
    console.log("1");
    return +setInput.value;
  }

  public updateShowItems() {
    const setInput = document.querySelector(
      ".set-input-item"
    ) as HTMLInputElement;
    setInput.addEventListener("input", () => {
      const currentPage = 1; //fix! брать из query!!!
      const rows = this.paginationItemsPerPage(); //количество items на странице!!
      const data = this.paginationGetData(this.items, rows, currentPage);
      this.renderCart(data);
    });
    console.log("2");
  }

  public updateNumberItem(currentPage: number, row: number) {
    const orderNumber = document.querySelectorAll(".order-number");
    orderNumber.forEach(
      (item, index) =>
        (item.innerHTML = `${row * (currentPage - 1) + index + 1}`)
    );
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
      console.log("3");
      const rows = this.paginationItemsPerPage(); //количество items на странице!!
      const pagesCount = Math.ceil(this.items.length / rows); //количество страниц total!!
      const target = event.target as HTMLElement;
      if (target.closest(".right")) {
        count++;
        if (count <= pagesCount) {
          this.counterPage.innerHTML = `${count}`;
        } else {
          count = pagesCount;
          this.counterPage.innerHTML = `${count}`;
        }
        const data = this.paginationGetData(this.items, rows, count);
        this.renderCart(data);
        this.updateNumberItem(count, rows);
      } else if (target.closest(".left")) {
        count--;
        if (count > 0) {
          this.counterPage.innerHTML = `${count}`;
        } else {
          count = 1;
          this.counterPage.innerHTML = `${count}`;
        }
        const data = this.paginationGetData(this.items, rows, count);
        this.renderCart(data);
        this.updateNumberItem(count, rows);
      }
    });
  }
}
