import { bucket } from "./views/bucket";
import { shop } from "./views/shop";
import { home } from "./views/home";
import { notExists } from "./base/notExists";
import { Routes } from "../types";

export const routes: Array<Routes> = [
  { path: "", components: home },
  { path: "bucket", components: bucket },
  { path: "shop", components: shop },
  { path: "error", components: notExists },
];
