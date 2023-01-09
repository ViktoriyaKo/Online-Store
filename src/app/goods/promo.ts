import promocodes from "./promocodes.json";
import { IPromoCodes } from "../../types";
export class Promo {
  constructor() {
    this.getPromo();
  }
  inputPromo = document.querySelector(".input-promo") as HTMLInputElement;
  promo = document.querySelector(".promo") as HTMLDivElement;

  public getPromo() {
    if (
      localStorage.getItem("promo") &&
      localStorage.getItem("promo")?.toString() !== "[]"
    ) {
      const promoList = JSON.parse(localStorage.getItem("promo") || "[]");
      this.renderTextSale();
      promoList.forEach((item: IPromoCodes) => {
        this.renderSale(item);
      });
    }
    this.inputPromo.addEventListener("input", () => {
      if (this.inputPromo.value === "RS") {
        this.renderPromo(promocodes[0]);
      } else if (this.inputPromo.value === "EPM") {
        this.renderPromo(promocodes[1]);
      }
    });
  }

  public renderPromo(code: IPromoCodes) {
    const promoList = JSON.parse(localStorage.getItem("promo") || "[]");
    this.promo.innerHTML = `${code.title} - ${code.sale}% `;
    const filterPromo = promoList.filter(
      (item: IPromoCodes) => item.id === code.id
    );
    if (filterPromo.length == 0) {
      const newBtn = this.createBtn("+");
      this.promo.append(newBtn);
      newBtn.addEventListener("click", () => {
        promoList.push(code);
        localStorage.setItem("promo", JSON.stringify(promoList));
        console.log(code);
        this.renderSale(code);
        this.promo.innerHTML = "";
        this.renderTextSale();
      });
    }
  }

  public createBtn(symbol: string) {
    const newBtn = document.createElement("button");
    newBtn.classList.add("btn");
    newBtn.classList.add("btn-success");
    newBtn.textContent = symbol;
    return newBtn;
  }

  renderSale(code: IPromoCodes) {
    const newTextSale = document.createElement("div");
    newTextSale.classList.add("promo-active");
    newTextSale.innerHTML = `${code.title} - ${code.sale}% `;
    const newBtn = this.createBtn("-");
    newTextSale.append(newBtn);
    this.inputPromo.before(newTextSale);
    newBtn.addEventListener("click", () => {
      newTextSale.remove();
      let promoList = JSON.parse(localStorage.getItem("promo") || "[]");
      promoList = promoList.filter((item: IPromoCodes) => item.id !== code.id);
      localStorage.setItem("promo", JSON.stringify(promoList));
      console.log(promoList);
      this.renderTextSale();
    });
  }

  renderTextSale() {
    const setTotalAmount = document.querySelector(".set-total-amount");
    const blockNewPrice = document.querySelector(
      ".block-new-price"
    ) as HTMLDivElement;
    if (
      localStorage.getItem("promo") &&
      localStorage.getItem("promo")?.toString() !== "[]"
    ) {
      setTotalAmount?.classList.add("text-decoration-line-through");
      blockNewPrice.innerHTML = `Общая сумма: ${this.newTotalAmount()} <i class="fas fa-light fa-ruble-sign"></i>`;
    } else {
      setTotalAmount?.classList.remove("text-decoration-line-through");
      blockNewPrice.innerHTML = ``;
    }
  }

  newTotalAmount() {
    const promoList = JSON.parse(localStorage.getItem("promo") || "[]");
    const sumSale = promoList
      .map((item: IPromoCodes) => item.sale)
      .reduce((acc: number, item: number) => acc + item);
    const finalPrice = Math.round(this.getTotal() * (1 - sumSale / 100));
    return finalPrice;
  }

  public getTotal() {
    let total = 0;
    const cart = JSON.parse(localStorage.getItem("cart") || "");
    for (const key in cart) {
      total +=
        cart[key]["count"] * Math.floor(cart[key]["price"] * cart[key]["sale"]);
    }
    return total;
  }
}
