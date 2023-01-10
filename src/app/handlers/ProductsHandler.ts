// import { main } from "@popperjs/core";
import books from "../../books-content/books.json";
import { Product, ReduceReturnType, ParamProduct } from "../../types";

export class ProductsHandler {
  private params: ParamProduct;
  private products: Product[];
  private productsFiltSort: Product[];
  public staticParams: {
    price: {
      min: number;
      max: number;
    };
    stock: {
      min: number;
      max: number;
    };
  };
  public dynamicParams: {
    price: {
      min: number;
      max: number;
    };
    stock: {
      min: number;
      max: number;
    };
  };
  constructor() {
    this.products = books as Product[];
    this.staticParams = {
      price: {
        min: Math.min(
          ...this.products.map((el) => Math.floor(el.price * el.sale))
        ),
        max: Math.max(
          ...this.products.map((el) => Math.floor(el.price * el.sale))
        ),
      },
      stock: {
        min: Math.min(...this.products.map((el) => el.stock)),
        max: Math.max(...this.products.map((el) => el.stock)),
      },
    };
    this.dynamicParams = JSON.parse(JSON.stringify(this.staticParams));
    this.params = {
      genres: [],
      authors: [],
      sort: "",
      ...JSON.parse(JSON.stringify(this.staticParams)),
      search: "",
    };
    this.productsFiltSort = this.products;
  }
  public resetSettings() {
    this.params = {
      genres: [],
      authors: [],
      sort: "",
      ...JSON.parse(JSON.stringify(this.staticParams)),
      search: "",
    };
    this.dynamicParams = JSON.parse(JSON.stringify(this.staticParams));
  }
  public applySettings(param: ReduceReturnType): void {
    if (param["genres"] !== undefined)
      this.params["genres"] = param["genres"].split("↕");
    if (param["authors"] !== undefined)
      this.params["authors"] = param["authors"].split("↕");
    if (param["sort"] !== undefined) this.params["sort"] = param["sort"];
    if (param["search"] !== undefined)
      this.params["search"] = param["search"].toLowerCase();
    if (param["price"] !== undefined) {
      [this.params["price"].min, this.params["price"].max] = param["price"]
        .split("↕")
        .map(Number);
    }
    if (param["stock"] !== undefined) {
      [this.params["stock"].min, this.params["stock"].max] = param["stock"]
        .split("↕")
        .map(Number);
    }
  }
  public getFilteredSorted(): Product[] {
    this.params["genres"] = this.params["genres"].filter((el) => el !== "");
    this.params["authors"] = this.params["authors"].filter((el) => el !== "");
    const result = this.sortingType(
      this.products
        .filter((prod) => {
          if (
            this.params["genres"].length === 0 &&
            this.params["authors"].length === 0
          )
            return true;
          else if (this.params["authors"].length === 0)
            return this.params["genres"].includes(prod.terms);
          else if (this.params["genres"].length === 0)
            return this.params["authors"].includes(prod.author);
          return (
            this.params["genres"].includes(prod.terms) &&
            this.params["authors"].includes(prod.author)
          );
        })
        .filter((prod) => {
          return this.params["search"].length === 0
            ? true
            : prod.author.toLowerCase().includes(this.params["search"]) ||
                String(prod.price)
                  .toLowerCase()
                  .includes(this.params["search"]) ||
                String(Math.floor(prod.price * prod.sale))
                  .toLowerCase()
                  .includes(this.params["search"]) ||
                String(prod.stock).includes(this.params["search"]) ||
                prod.description
                  .toLowerCase()
                  .includes(this.params["search"]) ||
                prod.terms.toLowerCase().includes(this.params["search"]) ||
                prod.title.toLowerCase().includes(this.params["search"]) ||
                String(prod.year).includes(this.params["search"]);
        })
        .filter((prod) => {
          return (
            Math.floor(prod.price * prod.sale) >= this.params.price.min &&
            Math.floor(prod.price * prod.sale) <= this.params.price.max
          );
        })
        .filter((prod) => {
          return (
            Math.floor(prod.stock) >= this.params.stock.min &&
            Math.floor(prod.stock) <= this.params.stock.max
          );
        })
    );

    this.dynamicParams = {
      price: {
        min: Math.min(...result.map((el) => Math.floor(el.price * el.sale))),
        max: Math.max(...result.map((el) => Math.floor(el.price * el.sale))),
      },
      stock: {
        min: Math.min(...result.map((el) => el.stock)),
        max: Math.max(...result.map((el) => el.stock)),
      },
    };
    return result;
  }

  private sortingType(clearedProducts: Product[]): Product[] {
    if (this.params["sort"] === "priceASC")
      return clearedProducts.sort(
        (bookL, bookR) => +bookL.price - +bookR.price
      );
    if (this.params["sort"] === "priceDESC")
      return clearedProducts.sort(
        (bookL, bookR) => +bookR.price - +bookL.price
      );
    if (this.params["sort"] === "yearASC")
      return clearedProducts.sort((bookL, bookR) => +bookL.year - +bookR.year);
    if (this.params["sort"] === "yearDESC")
      return clearedProducts.sort((bookL, bookR) => +bookR.year - +bookL.year);
    return clearedProducts.sort((bookL, bookR) => +bookL.price - +bookR.pages);
  }
  public getFilteredParams(): Product[] {
    this.params["genres"] = this.params["genres"].filter((el) => el !== "");
    this.params["authors"] = this.params["authors"].filter((el) => el !== "");
    return this.products.filter((prod) => {
      if (
        this.params["genres"].length === 0 &&
        this.params["authors"].length === 0
      )
        return true;
      // else if (this.params["authors"].length === 0)
      //   return this.params["genres"].includes(prod.terms);
      else if (this.params["genres"].length !== 0) {
        return this.params["genres"].includes(prod.terms);
      }
      return true; //this.params["genres"].includes(prod.terms);
    });
  }
  public recalculateSliders(): void {
    this.params["price"] = {
      max: Math.min(
        ...this.productsFiltSort.map((el) => Math.floor(el.price * el.sale))
      ),
      min: Math.max(
        ...this.productsFiltSort.map((el) => Math.floor(el.price * el.sale))
      ),
    };
  }
  public getSorting(): string {
    return this.params["sort"]
      ? `
    Сорт: ${this.params["sort"]
      .replace("price", "цена ")
      .replace("year", "год ")}
    `
      : "Сортировать";
  }
  public getGenres(): string[] {
    return [...new Set(this.productsFiltSort.map((book) => book.terms))].sort();
  }
  public getAuthor(): string[] {
    return [
      ...new Set(this.getFilteredParams().map((book) => book.author)),
    ].sort();
  }
}
