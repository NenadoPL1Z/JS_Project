import tabs from "./modules/tabs";
import calculate from "./modules/calculate";
import form from "./modules/form";
import cards from "./modules/cards";
import modal, { openModal } from "./modules/modal";
import slider from "./modules/slider";
import timer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
  const setTimerId = setTimeout(() => openModal(".modal", setTimerId), 30000); // принудительно появление модального окна
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  calculate();
  form("form", setTimerId);
  cards();
  modal("[data-modal]", ".modal", setTimerId);
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    slider: ".offer__slide",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  timer(".timer", "2021-05-11");
});
