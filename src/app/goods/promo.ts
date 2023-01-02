export class Promo {
  constructor() {
    this.getPromo();
  }
  inputPromo = document.querySelector(".input-promo") as HTMLInputElement;
  promo = document.querySelector(".promo") as HTMLInputElement;

  public getPromo() {
    this.inputPromo.addEventListener("input", () => {
      if (this.inputPromo.value === "RS") {
        this.renderPromo("Rolling Scopes School", 10);
      } else if (this.inputPromo.value === "EPM") {
        this.renderPromo("EPAM Systems", 10);
      }
    });
  }

  public renderPromo(namePromo: string, sale: number) {
    const promoList = JSON.parse(localStorage.getItem("promo") || "[]");

    this.promo.innerHTML = `${namePromo} - ${sale}% `;
    const newBtn = document.createElement("button");
    newBtn.classList.add("btn");
    newBtn.classList.add("btn-success");
    newBtn.textContent = "+";
    this.promo.append(newBtn);
    promoList.push({ namePromo: namePromo, sale: sale });

    console.log(promoList);
    newBtn.addEventListener("click", () => {
      localStorage.setItem("promo", JSON.stringify(promoList));
      this.renderSale(namePromo);
      this.promo.innerHTML = "";
    });
  }

  renderSale(namePromo: string) {
    const newTextSale = document.createElement("div");
    newTextSale.innerHTML = `${namePromo} - 10% `;
    const newBtn = document.createElement("button");
    newBtn.classList.add("btn");
    newBtn.classList.add("btn-success");
    newBtn.textContent = "-";
    newTextSale.append(newBtn);
    this.inputPromo.before(newTextSale);
    newBtn.addEventListener("click", () => {
      newTextSale.remove();
    });
  }
}
