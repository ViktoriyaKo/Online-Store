import { ReduceReturnType } from "../../types";

export const routerSlicer = {
  getRoute() {
    return window.location.hash.slice(1);
  },
  routerParserProduct(): ReduceReturnType | undefined {
    const typeDelimiter = "&";
    const subTypeDelimiter = "↕";
    if (this.validationHash(window.location.hash.slice(1))) {
      const query = window.location.hash.split("/?")[1];
      return query.split("&").reduce<ReduceReturnType>((params, param) => {
        const [key, value] = param.split("=");
        params[key] = value ? decodeURIComponent(value) : "";
        return params;
      }, {});
    }
    return undefined;
  },
  routerAdd(key: string, value: string) {
    let currentURIObject = this.routerParserProduct();
    if (!currentURIObject) {
      currentURIObject = { [key]: value };
      console.log("INIT:", currentURIObject);
    } else if (
      currentURIObject[key] &&
      key !== "sort" &&
      key != "price" &&
      key != "stock" &&
      key != "search" &&
      key != "view" &&
      key != "page" &&
      key != "limit"
    ) {
      const keys = currentURIObject[key].split("↕");
      if (keys.includes(value)) {
        currentURIObject[key] = keys.filter((el) => el !== value).join("↕");
        console.log("afterDel:", currentURIObject);
      } else {
        currentURIObject[key] += `↕${value}`;
        console.log("afterAdd:", currentURIObject);
      }
    } else {
      currentURIObject[key] = value;
      console.log("afterAddNew:", currentURIObject);
    }
    return currentURIObject;
  },
  getURI(objectURI: ReduceReturnType) {
    const partsURI = this.routerGetURIProduct(objectURI);
    return "shop/?" + partsURI;
  },
  getBaseURI() {
    return "shop";
  },
  routerGetURIProduct(objectURI: ReduceReturnType) {
    const uri = [];
    for (const key in objectURI) {
      uri.push(`${key}=${encodeURIComponent(objectURI[key])}`);
    }
    return uri.join("&");
  },
  validationHash(hash: string): boolean {
    if (hash.indexOf("/?") === -1) return false;
    if (hash.split("/?").length !== 2) return false;
    return true;
  },

  getURIBucket(objectURI: ReduceReturnType) {
    const partsURI = this.routerGetURIProduct(objectURI);
    return "bucket/?" + partsURI;
  },
};
