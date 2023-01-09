import { App } from "../../app/app";

export function loader(module: App): void {
  module.start();
}
