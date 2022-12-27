import { Settings, ObjectModal } from "../types";

const firstName = document.getElementById("firstName") as HTMLInputElement;
const phone = document.getElementById("phone") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const address = document.getElementById("address") as HTMLInputElement;
const ccNumber = document.getElementById("cc-number") as HTMLInputElement;
const ccCvv = document.getElementById("cc-cvv") as HTMLInputElement;
const ccExpiration = document.getElementById(
  "cc-expiration"
) as HTMLInputElement;
const btnSubmit = document.querySelector(".btn-submit") as HTMLButtonElement;

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export class Validation {
  obj: ObjectModal = {};
  public options: Settings;

  constructor(options: Settings) {
    this.options = options;
    this.getObject();
  }

  getObject(): void {
    btnSubmit.addEventListener("click", () => {
      this.obj.name = firstName.value;
      this.obj.number = phone.value;
      this.obj.email = email.value;
      this.obj.delivery = address.value;
      this.obj.cardNumber = ccNumber.value;
      this.obj.date = ccExpiration.value;
      this.obj.cvv = ccCvv.value;
      this.validateName();
      this.validationTel();
      this.validationEmail();
      this.validationCardNumber();
      this.validationDateCard();
      this.validationCvv();
      this.validationAddress();
    });
  }

  validateName(): void {
    if (this.obj.name) {
      const valueName = this.obj.name.split(" ");
      const lengthEveryName = valueName.find(
        (item) => item.length < this.options.minSymbolName
      );
      if (valueName.length < this.options.minLengthName) {
        this.createError(firstName);
      } else if (lengthEveryName) {
        this.createError(firstName);
      } else {
        console.log(valueName);
        this.successValidation(firstName);
      }
    } else {
      this.createError(firstName);
    }
  }

  validationTel(): void {
    if (this.obj.number) {
      if (
        !this.obj.number.startsWith("+") ||
        this.obj.number.length < this.options.minLengthTel
      ) {
        this.createError(phone);
      } else {
        this.successValidation(phone);
      }
    } else {
      this.createError(phone);
    }
  }

  validationEmail(): void {
    if (this.obj.email) {
      if (!EMAIL_REGEXP.test(this.obj.email)) {
        this.createError(email);
      } else {
        this.successValidation(email);
      }
    } else {
      this.createError(email);
    }
  }

  validationAddress(): void {
    if (this.obj.delivery) {
      const valueAddress = this.obj.delivery.split(" ");
      const lengthEveryAddress = valueAddress.find(
        (item) => item.length < this.options.minSymbolAddress
      );
      if (valueAddress.length < this.options.minLengthAddress) {
        this.createError(address);
      } else if (lengthEveryAddress) {
        this.createError(address);
      } else {
        this.successValidation(address);
      }
    } else {
      this.createError(address);
    }
  }

  validationCardNumber(): void {
    if (this.obj.cardNumber) {
      if (this.obj.cardNumber.length !== this.options.cardNumberLength) {
        this.createError(ccNumber);
      } else {
        this.successValidation(ccNumber);
      }
    } else {
      this.createError(ccNumber);
    }
  }

  validationDateCard(): void {
    if (this.obj.date) {
      const cardMonth = this.obj.date.split("/")[1];
      if (
        +cardMonth > this.options.dateCardMonth ||
        this.obj.date.length !== this.options.dateLength
      ) {
        console.log(cardMonth);
        this.createError(ccExpiration);
      } else {
        this.successValidation(ccExpiration);
      }
    } else {
      this.createError(ccExpiration);
    }
  }

  validationCvv(): void {
    if (this.obj.cvv) {
      if (this.obj.cvv.length !== this.options.cvvLength) {
        this.createError(ccCvv);
      } else {
        this.successValidation(ccCvv);
      }
    } else {
      this.successValidation(ccCvv);
    }
  }

  createError(el: HTMLElement): void {
    const messageError = el.nextElementSibling;
    if (messageError) {
      messageError.innerHTML = "ERROR";
    }
  }
  successValidation(el: HTMLElement): void {
    const messageError = el.nextElementSibling;
    if (messageError) {
      messageError.innerHTML = "";
      el.style.border = "none";
    }
  }
}
//перенесла это в module!!

// const settings: Settings = {
//   minLengthName: 2,
//   minSymbolName: 3,
//   minLengthTel: 9,
//   minLengthAddress: 3,
//   minSymbolAddress: 5,
//   cardNumberLength: 16,
//   dateLength: 5,
//   dateCardMonth: 12,
//   cvvLength: 3,
// };

// const startValidation: Validation = new Validation(settings);
