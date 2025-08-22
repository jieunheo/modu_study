export default class MiniAlert {
  static fire({ title, message, useBackdropClose = true, onClose }) {
    // 제목, 메세지
    this.title = title;
    this.message = message;
    this.useBackdropClose = useBackdropClose;
    this.onClose = onClose;

    // 스타일
    const modifier = "mini-alert";
    if (!document.getElementById(`${modifier}-style`)) {
      var style = document.createElement("style");
      style.id = `${modifier}-style`;
      document.head.append(style); // Append it to the document's head
      style.textContent = `
    .mini-alert-backdrop {
      position: fixed;
      z-index: 900;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mini-alert {
      min-width: 200px;
      max-width: 500px;
      padding: 2rem;
      border-radius: 8px;

      background-color: #fff;
      box-shadow: 15px 15px 0 0 rgba(0, 0, 0, 0.2);
    }

    .mini-alert-content {
      text-align: center;
    }

    .mini-alert-title {
      margin: 0;
    }
    .mini-alert-message {
      margin: 2rem;
    }
    .mini-alert--close-btn {
    }
    `;
    }

    // DOM 구성
    this.backdrop = document.createElement("div");
    const backdrop = this.backdrop;
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
    backdrop.append(modal);
    document.body.append(backdrop);

    // 이벤트
    const closeBtn = modal.querySelector(`.${modifier}-close-btn`);
    closeBtn.addEventListener("click", () => {
      // backdarop.remove();
      // if (typeof onClose === "function") onClose();
      close();
    });

    backdrop.addEventListener("click", () => {
      if (useBackdropClose) {
        // backdrop.remove();
        // if (typeof onClose === "function") onClose();
        close(backdrop);
      }
    });

    modal.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    function close(target) {
      backdrop.remove();
      if (target !== backdrop && typeof onClose === "function") onClose();
    }
  }
}

window.MiniAlert = MiniAlert; // 전체 공간에 공개
