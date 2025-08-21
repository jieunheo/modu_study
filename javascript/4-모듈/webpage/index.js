import { TabUI } from "./TabUI.js";

const tabPanel = document.querySelectorAll(".tab-panel");

new TabUI(["소개", "식사부", "요리부"], ".global-header", 0, function () {
  console.log(`${this.currentIndex}번 메뉴 클릭`);
  const panel = document.querySelector(".tab-panel.active");
  if (panel) panel.classList.remove("active");
  tabPanel[this.currentIndex].classList.add("active");

  switch (this.currentIndex) {
    case 0:
      document.title = "소개";
      console.log("소개 페이지");
      break;
    case 1:
      document.title = "식사부";
      console.log("식사부 페이지");
      break;
    case 2:
      document.title = "요리부";
      console.log("요리부 페이지");
      break;
  }
});
