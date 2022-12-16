//import App from "./components/app/app";
import "./global.scss";

import { loader } from "./frameworks/root/loader";
import { app } from "./app/app";
import { tools } from "./frameworks/exporter";

tools.delay(700).then(() => {
  loader(app);
});
