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
    console.log("currentURIObject", currentURIObject);
    if (!currentURIObject) {
      currentURIObject = { [key]: value };
    } else if (currentURIObject[key]) {
      const keys = currentURIObject[key].split("↕");
      if (keys.includes(value)) {
        currentURIObject[key] = keys.filter((el) => el !== value).join("↕");
      } else {
        currentURIObject[key] += `↕${value}`;
      }
    } else {
      currentURIObject[key] = value;
    }
    return currentURIObject;
  },
  routerGetURIProduct(objectURI: ReduceReturnType) {
    let uri = "shop/?";
    for (const key in objectURI) {
      uri += `${key}=${encodeURIComponent(objectURI[key])}`;
    }
    return uri;
  },
  validationHash(hash: string): boolean {
    if (hash.indexOf("/?") === -1) return false;
    if (hash.split("/?").length !== 2) return false;
    return true;
  },
};
