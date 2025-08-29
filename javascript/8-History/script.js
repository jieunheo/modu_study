const menu = document.querySelector(".menu");
const content = document.querySelector(".content");

window.addEventListener("load", () => {
  // console.log(window.location.pathname.slice(1));
  const page = window.location.pathname.slice(1);
  changePage(page);
});

menu.addEventListener("click", (e) => {
  if (e.target.nodeName !== "A") return;

  e.preventDefault();
  // console.log(e.target.dataset.id);
  changePage(e.target.dataset.id);
});

window.addEventListener("popstate", (e) => {
  // console.log(e.state);
  displayContent(e.state.page);
});

function changePage(page) {
  // 내용물 표시
  displayContent(page);

  // 방문 이력 남기기
  // console.log(history);
  history.pushState({ page }, `Title: ${page}`, `/${page}`);
}

function displayContent(page) {
  if (!page) {
    content.textContent = `홈`;
    return;
  }
  content.textContent = `현재 페이지: ${page}`;
}
