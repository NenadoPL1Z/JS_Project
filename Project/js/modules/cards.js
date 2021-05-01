import { getResurses } from "../services/services";

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

export default cards;
