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

export default modal;
export { openModal, closeModal };
