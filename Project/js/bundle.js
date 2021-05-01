/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculate() {
  const result = document.querySelector(".calculating__result span");

  let sex, height, weidthCalc, age, ration;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
    let edit = document.querySelectorAll("#gender div");
    edit.forEach((item) => {
      item.classList.remove("calculating__choose-item_active");
    });
    document
      .querySelector(`#${sex}`)
      .classList.add("calculating__choose-item_active");
  } else {
    sex = "female";
    localStorage.setItem("sex", sex);
  }

  if (localStorage.getItem("activity")) {
    ration = localStorage.getItem("activity");
    let edit = document.querySelectorAll(".calculating__choose_big div");
    edit.forEach((item) => {
      item.classList.remove("calculating__choose-item_active");
    });
    let arr = ["1.2", "1.375", "1.55", "1.725"];
    arr.forEach((item, index) => {
      if (item == ration) {
        console.log(index);
        document
          .querySelectorAll(`[data-ration]`)
          [index].classList.add("calculating__choose-item_active");
      }
    });
  } else {
    ration = 1.375;
    localStorage.setItem("activity", ration);
  }

  function calcTotal() {
    if (!sex || !height || !weidthCalc || !age || !ration) {
      // * Проверка пользователя на заполнение всех полей
      result.textContent = "____";
      return;
    }

    if (sex == "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weidthCalc + 3.1 * height - 4.3 * age) * ration
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weidthCalc + 4.8 * height - 5.7 * age) * ration
      );
    }
  }
  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-ration")) {
          ration = +event.target.getAttribute("data-ration");
          localStorage.setItem(
            "activity",
            +event.target.getAttribute("data-ration")
          );
        } else {
          sex = event.target.getAttribute("id");
          localStorage.setItem("sex", event.target.getAttribute("id"));
        }

        elements.forEach((item) => {
          item.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

  function getDinamicInf(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weidth":
          weidthCalc = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDinamicInf("#height");
  getDinamicInf("#weidth");
  getDinamicInf("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculate);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class Cards {
    constructor(
      title,
      subtitle,
      price,
      img,
      altimg,
      parentSelector,
      ...classes
    ) {
      this.title = `Меню "${title}"`;
      this.subtitle = subtitle;
      this.price = price;
      this.img = img;
      this.alt = altimg;
      this.transfer = 27;
      this.changeToUAH();
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
    }
    changeToUAH() {
      this.price = Math.round(this.price * this.transfer);
    }
    pasteAppend() {
      let element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.subtitle}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element); // можно использвать append
    }
  }

  // getResurses("http://localhost:3000/menu")
  // .then(data => {
  //     data.forEach(({title, subtitle, price, img, altimg}) => {
  //         new Cards(title, subtitle, price, img, altimg, ".menu .container").pasteAppend();
  //     })
  // })

  // ? Подключенная библиотека axios
  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ title, subtitle, price, img, altimg }) => {
      new Cards(
        title,
        subtitle,
        price,
        img,
        altimg,
        ".menu .container"
      ).pasteAppend();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function form(formSelector, modalTimerId) {
  const form = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  form.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    //? submit - срабатывае когда мы отправляем энтер!
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const statusMeassage = document.createElement("img");
      statusMeassage.src = message.loading;
      statusMeassage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMeassage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMeassage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);

    const thankModal = document.createElement("div");
    thankModal.classList.add("modal__dialog");
    thankModal.innerHTML = `<div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
            </div>`;
    document.querySelector(".modal").append(thankModal);
    setTimeout(() => {
      thankModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  document.body.style.overflow = "hidden"; // делаем так, что при появлении модального окна небыло возможности скролить

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  } // если пользоваетль сам открыл модальное окно, то принудительно открывание не нужно делать
}

function closeModal(modalSelector) {
  const modalWindow = document.querySelector(".modal");
  modalWindow.classList.remove("show");
  modalWindow.classList.add("hide");
  document.body.style.overflow = ""; // возврощаем возможность скрола страницы
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalOpen = document.querySelectorAll(triggerSelector),
    modalClose = document.querySelector("[data-close]"),
    modalWindow = document.querySelector(modalSelector);

  modalOpen.forEach((item) => {
    item.addEventListener("click", () =>
      openModal(modalSelector, modalTimerId)
    );
  });

  modalClose.addEventListener("click", closeModal);

  modalWindow.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("show")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    // событие которое отслеживает нажатие клавиш
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal();
    }
  });

  function showMoadlByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      // если домотаем до конца покажем модальное окно!;
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showMoadlByScroll);
    }
  }

  window.addEventListener("scroll", showMoadlByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  container,
  slider,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slide = document.querySelectorAll(slider),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width; // ? Получаем стили этого объекта
  let slideIndex = 1;
  let offset = 0;

  //! Навигация для слайдера!
  const fullSlider = document.querySelector(container);

  fullSlider.style.position = "relative";

  const indicators = document.createElement("ol");
  indicators.classList.add("carousel-indicators");
  fullSlider.append(indicators);

  for (let i = 0; i < slide.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    indicators.append(dot);
  }

  let arrDot = document.querySelectorAll("[data-slide-to]");
  arrDot[0].classList.add("dot-active");

  function addActiveDot(n = 0) {
    arrDot.forEach((item) => {
      item.classList.remove("dot-active");
    });
    arrDot[slideIndex - n].classList.add("dot-active");
  }

  function onlyNumber(str) {
    return +str.replace(/\D/g, "");
  }

  for (let x = 0; x < arrDot.length; x++) {
    arrDot[x].addEventListener("click", () => {
      offset = onlyNumber(width) * x;
      arrDot.forEach((item) => {
        item.classList.remove("dot-active");
      });
      arrDot[x].classList.add("dot-active");
      slideIndex = x + 1;
      slidesField.style.transform = `translateX(-${offset}px)`;
      current.textContent = `0${slideIndex}`;
    });
  }

  //! (СЛОЖНЫЙ)
  if (slide.length < 10) {
    total.textContent = `0${slide.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slide.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slide.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all linear";

  slidesWrapper.style.overflow = "hidden";

  slide.forEach((item) => {
    item.style.width = width; // ? Говорим, что каждая карточка будет занимать 650 px;
  });

  next.addEventListener("click", () => {
    if (offset == onlyNumber(width) * (slide.length - 1)) {
      offset = 0;
    } else {
      offset += onlyNumber(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slide.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    addActiveDot(1);
    console.log(slideIndex);
    if (slide.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = onlyNumber(width) * (slide.length - 1);
    } else {
      offset -= onlyNumber(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slide.length;
    } else {
      slideIndex--;
    }
    addActiveDot(1);
    if (slide.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
  tabsSelector,
  tabsContentSelector,
  TabsParentSelector,
  activeClass
) {
  let tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(TabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, index) => {
        if (target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  // конечная дата

  function getTimeRemaning(endtime) {
    // аргумент может принимать любую дату нчала
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(((t / 1000) * 60 * 60) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerInderval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaning(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timerInderval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResurses": () => (/* binding */ getResurses)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  return await res.json();
};

const getResurses = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Coul not fetch ${url} status ${res.status}`);
  }

  return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calculate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener("DOMContentLoaded", () => {
  const setTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)(".modal", setTimerId), 30000); // принудительно появление модального окна
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  (0,_modules_calculate__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__.default)("form", setTimerId);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)("[data-modal]", ".modal", setTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    slider: ".offer__slide",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)(".timer", "2021-05-11");
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map