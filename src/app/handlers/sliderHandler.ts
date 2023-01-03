import { routerSlicer } from "../../frameworks/exporter";

export function controlFromInput(
  fromSlider: HTMLInputElement,
  fromInput: HTMLInputElement,
  toInput: HTMLInputElement,
  controlSlider: HTMLInputElement
) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "#C6C6C6", "#25daa5", controlSlider);
  if (from > to) {
    fromSlider.value = String(to);
    fromInput.value = String(to);
  } else {
    fromSlider.value = String(from);
  }
}

export function controlToInput(
  toSlider: HTMLInputElement,
  fromInput: HTMLInputElement,
  toInput: HTMLInputElement,
  controlSlider: HTMLInputElement
) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "#C6C6C6", "#25daa5", controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
    toSlider.value = String(to);
    toInput.value = String(to);
  } else {
    toInput.value = String(from);
  }
}

export function controlFromSlider(
  fromSlider: HTMLInputElement,
  toSlider: HTMLInputElement,
  fromInput: HTMLInputElement
) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#25daa5", toSlider);
  if (from > to) {
    fromSlider.value = String(to);
    fromInput.value = String(to);
  } else {
    fromInput.value = String(from);
  }
  console.log("contrFromSlider", from, to);
  const test = routerSlicer.routerAdd("price", `${String(from)}↕${String(to)}`);
  window.location.hash = routerSlicer.getURI(test);
}

export function controlToSlider(
  fromSlider: HTMLInputElement,
  toSlider: HTMLInputElement,
  toInput: HTMLInputElement
) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#25daa5", toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = String(to);
    toInput.value = String(to);
  } else {
    toInput.value = String(from);
    toSlider.value = String(from);
  }
  const test = routerSlicer.routerAdd("price", `${String(from)}↕${String(to)}`);
  window.location.hash = routerSlicer.getURI(test);
}

export function getParsed(
  currentFrom: HTMLInputElement,
  currentTo: HTMLInputElement
) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

export function fillSlider(
  from: HTMLInputElement,
  to: HTMLInputElement,
  sliderColor: string,
  rangeColor: string,
  controlSlider: HTMLInputElement
) {
  const rangeDistance = Number(to.max) - Number(to.min);
  const fromPosition = Number(from.value) - Number(to.min);
  const toPosition = Number(to.value) - Number(to.min);
  controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}

export function setToggleAccessible(currentTarget: HTMLInputElement) {
  const toSlider = document.querySelector("#toSlider") as HTMLElement;
  if (Number(currentTarget.value) <= 0) {
    toSlider.style.zIndex = String(2);
  } else {
    toSlider.style.zIndex = String(0);
  }
}

export function dualSlider(
  fromSliderId: string,
  toSliderId: string,
  fromInputId: string,
  toInputId: string
) {
  const fromSlider = document.querySelector(fromSliderId) as HTMLInputElement;
  const toSlider = document.querySelector(toSliderId) as HTMLInputElement;
  const fromInput = document.querySelector(fromInputId) as HTMLInputElement;
  const toInput = document.querySelector(toInputId) as HTMLInputElement;
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#25daa5", toSlider);
  setToggleAccessible(toSlider);

  fromSlider.oninput = () => {
    console.log("onSl");
    controlFromSlider(fromSlider, toSlider, fromInput);
  };
  toSlider.oninput = () => {
    console.log("toSl");
    controlToSlider(fromSlider, toSlider, toInput);
  };
  fromInput.oninput = () => {
    console.log("onInp");
    controlFromInput(fromSlider, fromInput, toInput, toSlider);
  };
  toInput.oninput = () => {
    console.log("toInp");
    controlToInput(toSlider, fromInput, toInput, toSlider);
  };
}
