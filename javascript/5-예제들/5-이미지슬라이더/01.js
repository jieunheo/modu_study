const data = [
  {
    id: "aa15040",
    title: "이미지 A0",
    src: "images/a0.png",
  },
  {
    id: "bb24321",
    title: "이미지 A1",
    src: "images/a1.png",
  },
  {
    id: "cc46232",
    title: "이미지 A2",
    src: "images/a2.png",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("temp");

  // DOM 구성
  const slideContainer = document.createElement("div");
  const slide = document.createElement("div");
  const slideWrapper = document.createElement("div");
  const slidePagenation = document.createElement("div");
  const slidePagenationWapper = document.createElement("ul");
  const slidePagenationItemArray = [];

  slideContainer.classList.add("slide-container");
  slide.classList.add("slide");
  slideWrapper.classList.add("slide-wrapper");
  slidePagenation.classList.add("slide-pagenation");

  slide.append(slideWrapper);
  slideContainer.append(slide, slidePagenation);
  section.append(slideContainer);
  slidePagenation.append(slidePagenationWapper);

  // data의 정보를 이용해서 조합
  data.forEach((info, index) => {
    const slidItem = document.createElement("figure");
    slidItem.classList.add("slide-item");
    slidItem.innerHTML = `<img src="${info.src}" alt="${info.title}" />`;
    slideWrapper.append(slidItem);

    const slidePagenationItem = document.createElement("li");
    const slidePagenationButton = document.createElement("button");
    slidePagenationItem.classList.add("slide-pagenation-item");
    slidePagenationItem.dataset.id = info.id;
    slidePagenationItem.dataset.index = index;

    slidePagenationItem.append(slidePagenationButton);
    slidePagenationWapper.append(slidePagenationItem);

    slidePagenationItemArray.push(slidePagenationItem);
  });

  // 이벤트
  let currentIndex = 0;
  slideContainer.addEventListener("click", (e) => {
    const el = e.target.closest("[data-index]");
    if (!el) return;

    activate(+el.dataset.index);
  });

  slideContainer.addEventListener("mouseenter", stopAutoPlay);
  slideContainer.addEventListener("mouseleave", startAutoPlay);

  let timerId;
  function startAutoPlay() {
    timerId = setInterval(() => {
      let nextIndex = +currentIndex + 1;
      if (nextIndex >= slidePagenationItemArray.length) {
        nextIndex = 0;
      }

      activate(nextIndex);
    }, 2000);
  }

  function stopAutoPlay() {
    clearInterval(timerId);
  }

  // setTimeout(() => {
  //   clearInterval(timerId);
  // }, 3000);

  function activate(index) {
    // console.log(index);

    // %로 적용
    // slideWrapper.style.transform = `translateX(-${index * 100}%)`;

    // 지금 슬라이드의 너비 가져와서 적용
    const unitSize = document.querySelector(".slide-item").clientWidth;
    slideWrapper.style.transform = `translateX(${-unitSize * index}px)`;

    // pagenation
    slidePagenationItemArray[currentIndex].classList.remove("active");
    slidePagenationItemArray[index].classList.add("active");
    currentIndex = index;
  }

  activate(currentIndex);
  startAutoPlay();

  // 뷰 사이즈 수정 시 슬라이드에 width값 적용
  window.addEventListener("resize", () => {
    const unitSize = document.querySelector(".slide-item").clientWidth;
    slideWrapper.style.transform = `translateX(${currentIndex * -unitSize}px)`;
  });

  // 다른 페이지를 보는 중에는 슬라이드 멈추기
  window.addEventListener("visibilitycnange", () => {
    document.hidden ? stopAutoPlay() : startAutoPlay();
  });
});
