import { Settings, ObjectModal } from "../types";
import { loader } from "../frameworks/root/loader";
import { app } from "../app/app";
import { tools } from "../frameworks/exporter";

export class Validation {
  firstName = document.getElementById("firstName") as HTMLInputElement;
  phone = document.getElementById("phone") as HTMLInputElement;
  email = document.getElementById("email") as HTMLInputElement;
  address = document.getElementById("address") as HTMLInputElement;
  ccNumber = document.getElementById("cc-number") as HTMLInputElement;
  ccCvv = document.getElementById("cc-cvv") as HTMLInputElement;
  ccExpiration = document.getElementById("cc-expiration") as HTMLInputElement;
  btnSubmit = document.querySelector(".btn-submit") as HTMLButtonElement;
  btnClose = document.querySelector(".btn-close") as HTMLButtonElement;
  wrapperModal = document.querySelector(".wrapper-modal") as HTMLButtonElement;
  btnPay = document.querySelector(".btn-pay") as HTMLButtonElement;
  setModal = document.querySelector(".set-modal") as HTMLButtonElement;
  setCardImg = document.querySelector(".set-card") as HTMLImageElement;
  messageError = document.querySelectorAll(".text-danger");
  EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  obj: ObjectModal = {};
  public options: Settings;

  constructor(options: Settings) {
    this.options = options;
    this.getObject();
    this.closeModal();
    this.openModal();
    this.eventKeypress();
    this.eventChangeCard();
  }

  private closeModal() {
    this.btnClose.addEventListener("click", () => {
      this.wrapperModal.classList.add("modal-none");
      this.setModal.classList.remove("modal-shadow");
    });
  }

  public openModal() {
    this.btnPay.addEventListener("click", () => {
      this.wrapperModal.classList.remove("modal-none");
      this.setModal.classList.add("modal-shadow");
    });
  }

  private eventChangeCard() {
    this.ccNumber.addEventListener("keyup", () => {
      if (this.ccNumber.value.startsWith("3")) {
        this.setCardImg.src = "./assets/мир.png";
      } else if (this.ccNumber.value.startsWith("5")) {
        this.setCardImg.src = "./assets/master-card.png";
      } else {
        this.setCardImg.src = "./assets/visa.png";
      }
    });
  }

  private eventKeypress() {
    this.phone.addEventListener("keypress", (event) => {
      if (isNaN(+event.key) && event.key !== "+") {
        event.preventDefault();
      }
    });

    this.ccNumber.addEventListener("keypress", (event) => {
      if (isNaN(+event.key)) {
        event.preventDefault();
      }
      if (this.ccNumber.value.length >= this.options.cardNumberLength) {
        event.preventDefault();
      }
    });

    this.ccExpiration.addEventListener("keypress", (event) => {
      if (this.ccExpiration.value.length === 2) {
        this.ccExpiration.value += "/";
      }
      if (this.ccExpiration.value.length >= 5) {
        event.preventDefault();
      }
      if (isNaN(+event.key) && event.key !== "+") {
        event.preventDefault();
      }
    });
    this.ccCvv.addEventListener("keypress", (event) => {
      if (isNaN(+event.key)) {
        event.preventDefault();
      }
      if (this.ccCvv.value.length >= 3) {
        event.preventDefault();
      }
    });
  }

  private getObject(): void {
    this.btnSubmit.addEventListener("click", () => {
      this.obj.name = this.firstName.value;
      this.obj.number = this.phone.value;
      this.obj.email = this.email.value;
      this.obj.delivery = this.address.value;
      this.obj.cardNumber = this.ccNumber.value;
      this.obj.date = this.ccExpiration.value;
      this.obj.cvv = this.ccCvv.value;
      this.validateName();
      this.validationTel();
      this.validationEmail();
      this.validationCardNumber();
      this.validationDateCard();
      this.validationCvv();
      this.validationAddress();
      this.confirmValidation();
    });
  }

  public validateName(): void {
    if (this.obj.name) {
      const valueName = this.obj.name.split(" ");
      const lengthEveryName = valueName.find(
        (item) => item.length < this.options.minSymbolName
      );
      if (valueName.length < this.options.minLengthName) {
        this.createError(this.firstName);
      } else if (lengthEveryName) {
        this.createError(this.firstName);
      } else {
        this.successValidation(this.firstName);
      }
    } else {
      this.createError(this.firstName);
    }
  }

  private validationTel(): void {
    if (this.obj.number) {
      if (!this.obj.number.toString().startsWith("+")) {
        this.createError(this.phone);
      } else if (this.obj.number.length < this.options.minLengthTel) {
        this.createError(this.phone);
      } else {
        this.successValidation(this.phone);
      }
    } else {
      this.createError(this.phone);
    }
  }

  private validationEmail(): void {
    if (this.obj.email) {
      if (!this.EMAIL_REGEXP.test(this.obj.email)) {
        this.createError(this.email);
      } else {
        this.successValidation(this.email);
      }
    } else {
      this.createError(this.email);
    }
  }

  private validationAddress(): void {
    if (this.obj.delivery) {
      const valueAddress = this.obj.delivery.split(" ");
      const lengthEveryAddress = valueAddress.find(
        (item) => item.length < this.options.minSymbolAddress
      );
      if (valueAddress.length < this.options.minLengthAddress) {
        this.createError(this.address);
      } else if (lengthEveryAddress) {
        this.createError(this.address);
      } else {
        this.successValidation(this.address);
      }
    } else {
      this.createError(this.address);
    }
  }

  private validationCardNumber(): void {
    if (this.obj.cardNumber) {
      if (this.obj.cardNumber.length !== this.options.cardNumberLength) {
        this.createError(this.ccNumber);
      } else {
        this.successValidation(this.ccNumber);
      }
    } else {
      this.createError(this.ccNumber);
    }
  }

  private validationDateCard(): void {
    if (this.obj.date) {
      const cardMonth = this.obj.date.split("/")[0];
      if (
        +cardMonth > this.options.dateCardMonth ||
        this.obj.date.length !== this.options.dateLength
      ) {
        this.createError(this.ccExpiration);
      } else {
        this.successValidation(this.ccExpiration);
      }
    } else {
      this.createError(this.ccExpiration);
    }
  }

  private validationCvv(): void {
    if (this.obj.cvv) {
      if (this.obj.cvv.length !== this.options.cvvLength) {
        this.createError(this.ccCvv);
      } else {
        this.successValidation(this.ccCvv);
      }
    } else {
      this.createError(this.ccCvv);
    }
  }

  private createError(el: HTMLElement): void {
    const messageError = el.nextElementSibling;
    if (messageError) {
      el.style.border = "2px solid red";
      messageError.innerHTML = "ERROR";
    }
  }
  private successValidation(el: HTMLElement): void {
    const messageError = el.nextElementSibling;
    if (messageError) {
      messageError.innerHTML = "";
      el.style.border = "none";
    }
  }

  private confirmValidation() {
    const checkError = Array.from(this.messageError).some(
      (item) => item.textContent === "ERROR"
    );
    if (!checkError) {
      this.setModal.innerHTML = `<h2 class="fs-1 p-5 text-center">Ваш заказ успешно оформлен, спасибо!</h2>`;
      tools.delay(2000).then(() => {
        localStorage.setItem("cart", "[]");
        loader(app);
        window.location.href = "#";
      });
    }
  }

  public openAutomatically() {
    this.wrapperModal.classList.remove("modal-none");
    this.setModal.classList.add("modal-shadow");
  }
}
