import { tools } from "./frameworks/tools/utils";
import { loader } from "./frameworks/root/loader";
import { app } from "./app/app";
// import { Promo } from "./app/goods/promo";
import { Header } from "./app/base/header";

// #1 Tools
describe("Checking util tools", () => {
  test("Method tools should be defined", () => {
    expect(tools).toBeDefined();
  });

  test("Should catch error", () => {
    return tools.delay().catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});

// #2 Header
describe("Checking class Header", () => {
  beforeEach(() => {
    tools.delay(700).then(() => {
      loader(app);
    });
  });

  const header = new Header({ selector: "test", template: "test" });
  jest.spyOn(Storage.prototype, "setItem");
  const books = [
    {
      id: 1,
      price: 309,
      count: 5,
    },
    {
      id: 2,
      price: 309,
      count: 2,
    },
  ];
  localStorage.setItem("cart", JSON.stringify(books));

  test("Methods updateTotalSum and addBucketCount should return correct values", () => {
    expect(header.addBucketCount()).toBe(7);
    expect(header.updateTotalSum()).toBe(618);
  });
});

// #3?
// describe("Checking class Header", () => {
//   beforeEach(() => {
//     tools.delay(700).then(() => {
//       loader(app);
//     });
//   });

//   const header = new Header({ selector: "test", template: "test" });

//   test("Methods should return undefined because of empty localStorage", () => {
//     expect(header.updateTotalSum()).not.toBeDefined();
//     expect(header.addBucketCount()).not.toBeDefined();
//   });
// });

// #3 Promo

// describe("Checking Promo", () => {
//   beforeEach(() => {
//     tools.delay(700).then(() => {
//       loader(app);
//     });
//   });
//   const promo = new Promo();
//   test("Method getPromo should work", () => {});
// });
