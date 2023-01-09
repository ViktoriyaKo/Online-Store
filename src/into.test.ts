import { tools } from "./frameworks/tools/utils";
import { loader } from "./frameworks/root/loader";
import { app } from "./app/app";
import { Header } from "./app/base/header";
import { Promo } from "./app/goods/promo";

// Tools

describe("Checking util tools", () => {
  test("Method tools should be defined", () => {
    expect(tools).toBeDefined();
  });

  test("Method tools should catch error", () => {
    return tools.delay().catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});

// Header

describe("Checking methods class Header", () => {
  beforeEach(() => {
    tools.delay(700).then(() => {
      loader(app);
    });
  });

  const header = new Header({ selector: "test", template: "test" });
  jest.spyOn(Storage.prototype, "setItem");
  const books = [
    {
      price: 309,
      count: 5,
    },
    {
      price: 309,
      count: 2,
    },
  ];
  localStorage.setItem("cart", JSON.stringify(books));

  //updateTotalSum

  test("Method updateTotalSum should return correct values", () => {
    expect(header.updateTotalSum()).toEqual(618);
  });

  //addBucketCount

  test("Method addBucketCount should return correct values", () => {
    expect(header.addBucketCount()).toEqual(7);
  });
});

//Promo

describe("Checking methods from class Promo", () => {
  beforeEach(() => {
    document.body.innerHTML = `<input
    type="text"
    class="form-control input-promo"
    placeholder="Введите промокод"
  /> 
      <div class="promo"></div>
      <div class="block-new-price"></div>
      <div class="set-total-amount">
          Общая сумма:
          <span class="total-amount">100
          <i class="fa fa-light fa-ruble-sign"></i>
          </span>
      </div>`;
  });
  jest.spyOn(Storage.prototype, "setItem");

  //getTotal

  test("Method getTotal should be defined", () => {
    const promo = new Promo();
    expect(promo.getTotal()).toBeDefined();
  });

  test("Method getTotal should return correct values", () => {
    const promo = new Promo();
    const books = [
      {
        sale: 0.8,
        price: 100,
        count: 1,
      },
      {
        sale: 0.8,
        price: 200,
        count: 2,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(books));
    expect(promo.getTotal()).toEqual(400);
  });

  //newTotalAmount

  test("Method newTotalAmount should return correct values", () => {
    const promo = new Promo();
    const codes = [
      {
        namePromo: "RS",
        sale: 10,
      },
      {
        namePromo: "EPM",
        sale: 10,
      },
    ];
    localStorage.setItem("promo", JSON.stringify(codes));
    expect(promo.newTotalAmount()).toEqual(320);
  });

  //renderTextSale

  test("Method renderTextSale should has correct text content", () => {
    new Promo();
    expect(document.querySelector(".block-new-price")?.textContent).toBe(
      "Общая сумма: 320 "
    );
  });

  test("Method renderTextSale should not return value", () => {
    const promo = new Promo();
    expect(promo.renderTextSale()).toBeUndefined();
  });
});
