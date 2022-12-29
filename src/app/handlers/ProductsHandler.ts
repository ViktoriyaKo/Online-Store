import books from "../../books-content/books.json";
import { Product } from "../../types";

export class ProductsHandler {
  private params: {
    genres: string[];
  };
  private products: Product[];
  private productsFiltSort: Product[];
  constructor() {
    this.params = {
      genres: [],
    };
    this.products = books as Product[];
    this.productsFiltSort = this.products;
  }
  public applySettings(settings: string[]): void {
    this.params["genres"] = settings;
    console.log("this.params:", this.params);
  }
  public getFilteredSorted(): Product[] {
    console.log("fetfilter", this.products);
    console.log("fetfilter", this.params["genres"]);
    this.params["genres"] = this.params["genres"].filter((el) => el !== "");
    return this.products.filter((prod) => {
      console.log(this.params["genres"].includes(prod.terms));
      if (this.params["genres"].length === 0) return true;
      return this.params["genres"].includes(prod.terms);
    });
  }
  public getGenres(): string[] {
    return [...new Set(this.productsFiltSort.map((book) => book.terms))];
  }
}
