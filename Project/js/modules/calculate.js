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

export default calculate;
