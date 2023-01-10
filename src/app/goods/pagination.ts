import { ProductWithCount } from "../../types";
import { Cart } from "../goods/goods";
import { routerSlicer } from "../../frameworks/exporter";

export class Pagination extends Cart {
  constructor(items: ProductWithCount[]) {
    super(items);
    this.renderPagination();
  }

  renderPagination() {
    const params = routerSlicer.routerParserProduct();
    const setInput = document.querySelector(
      ".set-input-item"
    ) as HTMLInputElement;
    if (setInput !== null) {
      const currentPage = params
        ? params["page"]?.split("?")
          ? +params["page"]?.split("?")[0]
          : 1
        : 1;
      const rows = params
        ? +params["limit"]?.split("?")
          ? +params["limit"]?.split("?")[0]
          : 3
        : 3;

      const data = this.paginationGetData(this.items, rows, currentPage);
      this.renderCart(data);
      this.changeQty();
      this.checkEmpty();
      this.displayCountPage();
      this.paginationItemsPerPage();
      this.updateShowItems();
    }
  }

  blockCounterPage = document.querySelector(
    ".block-page-counter"
  ) as HTMLElement;
  counterPage = document.querySelector(".counter-page") as HTMLElement;

  public addQueryLimit(pageNumber: string) {
    const test = routerSlicer.routerAdd("limit", pageNumber);
    window.location.hash = routerSlicer.getURIBucket(test);
  }
  public addQueryPage(pageNumber: string) {
    const test = routerSlicer.routerAdd("page", pageNumber);
    window.location.hash = routerSlicer.getURIBucket(test);
  }

  public paginationItemsPerPage() {
    //limit
    const setInput = document.querySelector(
      ".set-input-item"
    ) as HTMLInputElement;
    setInput.addEventListener("input", () => {
      const value = +setInput.value;
      const min = 1;
      const max = this.items.length;
      if (value > max) {
        setInput.value = String(max);
      } else if (value < min) {
        setInput.value = String(min);
      }
    });
    return +setInput.value;
  }

  public updateShowItems() {
    const params = routerSlicer.routerParserProduct();
    const setInput = document.querySelector(
      ".set-input-item"
    ) as HTMLInputElement;
    setInput.addEventListener("input", () => {
      this.addQueryLimit(String(this.paginationItemsPerPage()));
      const currentPage = params ? (params["page"] ? +params["page"] : 1) : 1;

      const rows = params
        ? params["limit"]
          ? +params["limit"]
          : this.paginationItemsPerPage()
        : this.paginationItemsPerPage();

      const data = this.paginationGetData(this.items, rows, currentPage);
      this.renderCart(data);
    });
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
    const params = routerSlicer.routerParserProduct();
    let count = params ? (params["page"] ? +params["page"] : 1) : 1;
    this.blockCounterPage.addEventListener("click", (event) => {
      const rows = this.paginationItemsPerPage();
      const pagesCount = Math.ceil(this.items.length / rows);
      const target = event.target as HTMLElement;
      if (target.closest(".right")) {
        count++;
        if (count >= pagesCount) {
          count = pagesCount;
        }
      } else if (target.closest(".left")) {
        count--;
        if (count <= 0) {
          count = 1;
        }
      }
      this.counterPage.innerHTML = `${count}`;
      // this.addQueryPage(String(count));
      const data = this.paginationGetData(this.items, rows, count);
      this.renderCart(data);
      this.updateNumberItem(count, rows);
    });
  }
}
