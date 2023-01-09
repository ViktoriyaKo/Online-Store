import { tools } from "./frameworks/tools/utils";
import { loader } from "./frameworks/root/loader";
import { app } from "./app/app";
import { Header } from "./app/base/header";
import { Promo } from "./app/goods/promo";
import { routerSlicer } from "./frameworks/exporter";

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

describe("Checking RouterSlicer.getRoute(): ", () => {
  // beforeEach(() => {
  // });
  const testCases = [
    {
      hash: "#shop",
      baseUri: "shop",
      negativeTest: false,
    },
    {
      hash: "#home",
      baseUri: "home",
      negativeTest: false,
    },
    {
      hash: "#home",
      baseUri: "home123",
      negativeTest: true,
    },
  ];
  testCases.forEach((el) => {
    test(`Checking routerSlicer.getRoute() with hash : ${el.hash} `, () => {
      window.location.hash = el.hash;
      el.negativeTest
        ? expect(routerSlicer.getRoute()).not.toMatch(el.baseUri)
        : expect(routerSlicer.getRoute()).toMatch(el.baseUri);
    });
  });
});

describe("Checking RouterSlicer.routerParserProduct(): ", () => {
  // beforeEach(() => {
  // });
  const testCases = [
    {
      hash: "#shop/?genres=Графические%20романы&price=636↕787&sort=priceDESC",
      outObj: {
        genres: "Графические романы",
        price: "636↕787",
        sort: "priceDESC",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал&price=636↕787&sort=priceDESC&authors=Кристи%20Агата",
      outObj: {
        genres: "Графические романы↕Боевик и криминал",
        price: "636↕787",
        sort: "priceDESC",
        authors: "Кристи Агата",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза↕Биографии.%20Мемуары&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      outObj: {
        genres:
          "Графические романы↕Боевик и криминал↕Классическая зарубежная проза↕Биографии. Мемуары",
        price: "82↕1156",
        sort: "priceDESC",
        authors: "",
        stock: "2↕45",
        search: "Гэм",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза↕Биографии.%20Мемуары&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=",
      outObj: {
        genres:
          "Графические романы↕Боевик и криминал↕Классическая зарубежная проза↕Биографии. Мемуары",
        price: "82↕1156",
        sort: "priceDESC",
        authors: "",
        stock: "2↕45",
        search: "",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза↕Биографии.%20Мемуары&price=0↕1156&sort=priceDESC&authors=&stock=2↕45&search=",
      outObj: {
        genres:
          "Графические романы↕Боевик и криминал↕Классическая зарубежная проза↕Биографии. Мемуары",
        price: "0↕1156",
        sort: "priceDESC",
        authors: "",
        stock: "2↕45",
        search: "",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза↕Биографии.%20Мемуары&price=82↕1156&sort=priceASC&authors=&stock=2↕45&search=",
      outObj: {
        genres:
          "Графические романы↕Боевик и криминал↕Классическая зарубежная проза↕Биографии. Мемуары",
        price: "82↕1156",
        sort: "priceASC",
        authors: "",
        stock: "2↕45",
        search: "",
      },
    },
    {
      hash:
        "#shop/?genres=&price=0↕1156&sort=priceDESC&authors=&stock=2↕45&search=",
      outObj: {
        genres: "",
        price: "0↕1156",
        sort: "priceDESC",
        authors: "",
        stock: "2↕45",
        search: "",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза↕Биографии.%20Мемуары&price=82↕1156&sort=&authors=&stock=2↕45&search=",
      outObj: {
        genres:
          "Графические романы↕Боевик и криминал↕Классическая зарубежная проза↕Биографии. Мемуары",
        price: "82↕1156",
        sort: "",
        authors: "",
        stock: "2↕45",
        search: "",
      },
    },
  ];
  testCases.forEach((el) => {
    test(`Checking routerSlicer.routerParserProduct() with hash : ${el.hash} `, () => {
      window.location.hash = el.hash;
      expect(JSON.stringify(routerSlicer.routerParserProduct())).toMatch(
        JSON.stringify(el.outObj)
      );
    });
  });
});
describe("Checking RouterSlicer.routerAdd(): ", () => {
  // beforeEach(() => {
  // });
  const defaultObj = {
    genres:
      "Графические романы↕Боевик и криминал↕Классическая зарубежная проза",
    price: "82↕1156",
    sort: "priceDESC",
    authors: "",
    stock: "2↕45",
    search: "Гэм",
  };
  const testCases = [
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      key: "genres",
      value: "Биографии. Мемуары",
      outObj: {
        ...defaultObj,
        genres:
          "Графические романы↕Боевик и криминал↕Классическая зарубежная проза↕Биографии. Мемуары",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      key: "sort",
      value: "priceASC",
      outObj: {
        ...defaultObj,
        sort: "priceASC",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      key: "price",
      value: "82↕1155",
      outObj: {
        ...defaultObj,
        price: "82↕1155",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      key: "search",
      value: "Лего",
      outObj: {
        ...defaultObj,
        search: "Лего",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      key: "search",
      value: "",
      outObj: {
        ...defaultObj,
        search: "",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      key: "search",
      value: "123",
      outObj: {
        ...defaultObj,
        search: "123",
      },
    },
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      key: "authors",
      value: "Айн Рэнд",
      outObj: {
        ...defaultObj,
        authors: "Айн Рэнд",
      },
    },
  ];
  testCases.forEach((el) => {
    test(`Checking routerSlicer.routerParserProduct() with hash : ${el.hash} `, () => {
      window.location.hash = el.hash;
      expect(JSON.stringify(routerSlicer.routerAdd(el.key, el.value))).toMatch(
        JSON.stringify(el.outObj)
      );
    });
  });
});

describe("Checking RouterSlicer.getBaseURI(): ", () => {
  test("Checking routerSlicer.getBaseURI()", () => {
    expect(routerSlicer.getBaseURI()).toMatch("shop");
  });
});

describe("Checking RouterSlicer.validationHash(): ", () => {
  const testCases = [
    {
      hash:
        "#shop/?genres=Графические%20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      out: true,
    },
    {
      hash: "#shop/?genres=Графические%20романы↕Боевик",
      out: true,
    },
    {
      hash:
        "shop/genres=Графические%/20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      out: false,
    },
    {
      hash:
        "#shop/?genres=Графические%/?20романы↕Боевик%20и%20криминал↕Классическая%20зарубежная%20проза&price=82↕1156&sort=priceDESC&authors=&stock=2↕45&search=Гэм",
      out: false,
    },
  ];
  testCases.forEach((el) => {
    test(`Checking routerSlicer.validationHash() with hash : ${el.hash} `, () => {
      window.location.hash = el.hash;
      expect(routerSlicer.validationHash(el.hash)).toEqual(el.out);
    });
  });
});
