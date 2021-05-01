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

export default slider;
