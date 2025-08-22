export default class MiniAlert {
  // new로 생성했을 때 실행
  constructor({ title, message, useBackdropClose = true, onClose }) {
    // 제목, 메세지
    this.title = title;
    this.message = message;
    this.useBackdropClose = useBackdropClose;
    this.onClose = onClose;

    // DOM 구성
    const modifier = "mini-alert";
    this.backdrop = document.createElement("div");
    this.backdrop.classList.add(`${modifier}-backdrop`);

    const modal = document.createElement("div");
    modal.classList.add(modifier);
    modal.innerHTML = `
    <div class="${modifier}-content">
      <h2 class="${modifier}-title">${this.title}</h2>
      <p class="${modifier}-message">${this.message}</p>
      <button class="${modifier}-close-btn">확인</button>
    </div>
    `;
    this.backdrop.append(modal);
    document.body.append(this.backdrop);

    // 이벤트
    const closeBtn = modal.querySelector(`.${modifier}-close-btn`);
    closeBtn.addEventListener("click", () => {
      // backdarop.remove();
      // if (typeof onClose === "function") onClose();
      close();
    });

    this.backdrop.addEventListener("click", () => {
      if (useBackdropClose) {
        // backdrop.remove();
        // if (typeof onClose === "function") onClose();
        close(this.backdrop);
      }
    });

    modal.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    function close(target) {
      this.backdrop.remove();
      if (target !== this.backdrop && typeof this.onClose === "function")
        this.onClose();
    }
  }

  // close(target) {
  //   this.backdrop.remove();
  //   if (target !== this.backdrop && typeof this.onClose === "function")
  //     this.onClose();
  // }
}
