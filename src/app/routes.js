import { bucket } from "./views/bucket";
import { shop } from "./views/shop";
import { home } from "./views/home";
import { notExists } from "./base/notExists";

export const routes = [
  {path: '', components: home},
  {path: 'bucket', components: bucket},
  {path: 'shop', components: shop},
  {path: 'error', components: notExists}
]
