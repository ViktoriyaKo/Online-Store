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
    console.log("fetfilter");
    console.log(this.products);
    return this.products.filter((prod) => {
      console.log(this.params["genres"].includes(prod.terms));
      return this.params["genres"].includes(prod.terms);
    });
  }
  public getGenres(): string[] {
    return [...new Set(this.productsFiltSort.map((book) => book.terms))];
  }
}
