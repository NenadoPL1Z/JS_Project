import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";
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

      postData("http://localhost:3000/requests", json)
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
    openModal(".modal", modalTimerId);

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
      closeModal(".modal");
    }, 4000);
  }
}

export default form;
