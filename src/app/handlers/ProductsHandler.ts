import books from "../../books-content/books.json";
import { Product } from "../../types";

export class ProductsHandler {
  private products: Product[];
  private productsFiltSort: Product[];
  constructor() {
    this.products = books as Product[];
    this.productsFiltSort = this.products;
  }

  public getFilteredSorted(): Product[] {
    return this.productsFiltSort;
  }
  public getGenres(): string[] {
    return [...new Set(this.productsFiltSort.map((book) => book.terms))];
  }
}
