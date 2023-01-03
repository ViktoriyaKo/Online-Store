import books from "../../books-content/books.json";
import { Product, ReduceReturnType, ParamProduct } from "../../types";

export class ProductsHandler {
  private params: ParamProduct;
  private products: Product[];
  private productsFiltSort: Product[];
  constructor() {
    this.params = {
      genres: [],
      authors: [],
      sort: "",
      price: "",
      stock: "",
      search: "",
    };
    this.products = books as Product[];
    this.productsFiltSort = this.products;
  }
  public resetSettings() {
    this.params = {
      genres: [],
      authors: [],
      sort: "",
      price: "",
      stock: "",
      search: "",
    };
  }
  public applySettings(param: ReduceReturnType): void {
    console.log("applySettings", param);
    console.log("before_applySettings", this.params);
    if (param["genres"] !== undefined)
      this.params["genres"] = param["genres"].split("↕");
    if (param["authors"] !== undefined)
      this.params["authors"] = param["authors"].split("↕");
    if (param["sort"] !== undefined) this.params["sort"] = param["sort"];
    if (param["search"] !== undefined)
      this.params["search"] = param["search"].toLowerCase();
    if (param["price"] !== undefined) this.params["price"] = param["price"];
    if (param["stock"] !== undefined) this.params["stock"] = param["stock"];
    console.log("after_applySettings", this.params);
  }
  public getFilteredSorted(): Product[] {
    console.log("getFilteredSorted", this.params);
    this.params["genres"] = this.params["genres"].filter((el) => el !== "");
    this.params["authors"] = this.params["authors"].filter((el) => el !== "");
    return this.sortingType(
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
                prod.title.toLowerCase().includes(this.params["search"]);
        })
    );
  }
  private sortingType(clearedProducts: Product[]): Product[] {
    console.log(
      "forever yang",
      this.params["sort"],
      this.params["sort"] === "priceASC"
    );
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
    console.log("getFilteredSorted", this.params);
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
      else if (this.params["genres"].length !== 0)
        return this.params["genres"].includes(prod.terms);
      return true; //this.params["genres"].includes(prod.terms);
    });
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
