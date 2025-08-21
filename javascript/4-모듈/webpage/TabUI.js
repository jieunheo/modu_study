export class TabUI {
  constructor(menuTextArray, selector, currentIndex = 0, callback) {
    this.menuTextArray = menuTextArray;
    this.menuItemArray = [];
    this.currentIndex = currentIndex;
    this.container = document.querySelector(selector);
    this.callback = callback;

    this.init();
    if (typeof this.currentIndex === "number") {
      this.activateTab(this.currentIndex);
    }
  }

  init() {
    // ul 만들기
    const tabMenu = document.createElement("ul");
    tabMenu.classList.add("tab-menu");
    this.container.append(tabMenu);

    // li 만들기
    this.menuTextArray.forEach((text, i) => {
      const tabItem = document.createElement("li");
      tabItem.classList.add("tab-item");
      tabItem.dataset.index = i;
      tabItem.innerHTML = `
        <a href="#">
          <i>🌎</i>  
          ${text}
        </a>`;

      // ul에 추가
      tabMenu.append(tabItem);

      // li 관리 배열에 넣기
      this.menuItemArray.push(tabItem);
    });

    // 이벤트 리스너 추가
    tabMenu.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-item") === false) return;

      const index = +e.target.dataset.index;
      this.activateTab(index);
    });
  }

  activateTab(index) {
    if (typeof this.currentIndex === "number") {
      this.menuItemArray[this.currentIndex].classList.remove("active");
    }

    this.menuItemArray[index].classList.add("active");
    this.currentIndex = index; // 인덱스 업데이트

    if (this.callback) this.callback();
  }
}
