import { bucket } from "./views/bucket";
import { shop } from "../app/views/shop";
import { home } from "./views/home";
import { product } from "./views/product";
import { notExists } from "./base/notExists";
import { IRoutes } from "../types";

export const routes: Array<IRoutes> = [
  { path: "", components: home },
  { path: "bucket", components: bucket },
  { path: "shop", components: shop },
  { path: `product`, components: product },
  { path: "error", components: notExists },
];
