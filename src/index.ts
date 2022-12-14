//import App from "./components/app/app";
import "./global.scss";
import { Templates, Routes, TemplateFunc } from "./types";

const routes: Routes = {};
const templates: Templates = {};

const app_div = document.getElementById("app") as HTMLElement;

function home() {
  const div = document.createElement("div");
  const link = document.createElement("a");
  link.href = "#/about";
  link.innerText = "About";

  div.innerHTML = "<h1>Home</h1>";
  div.appendChild(link);

  app_div.appendChild(div);
}
function route(path: string, template: TemplateFunc | string) {
  if (typeof template === "function") {
    return (routes[path] = template);
  } else if (typeof template === "string") {
    return (routes[path] = templates[template]);
  } else {
    return;
  }
}

function template(name: string, templateFunction: TemplateFunc) {
  return (templates[name] = templateFunction);
}

function resolveRoute(route: string) {
  try {
    return routes[route];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}

function router() {
  const url = window.location.hash.slice(1) || "/";
  console.log("resolveRoute ", url, window.location.hash);
  const route = resolveRoute(url);

  route();
}

template("home", function () {
  home();
});

template("about", function () {
  about();
});

route("/", "home");
route("/about", "about");

function about() {
  const div = document.createElement("div");
  const link = document.createElement("a");
  link.href = "#/";
  link.innerText = "Home";

  div.innerHTML = "<h1>About</h1>";
  div.appendChild(link);

  app_div.appendChild(div);
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
