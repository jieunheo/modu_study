// const car = new Car("우리차");

const controls = document.querySelector(".controls");
const inputCarName = document.querySelector(".input-car-name");

controls.addEventListener("click", (e) => {
  // if (e.target.classList.contains("btn-create-car") === false) return;
  const type = e.target.dataset.type;
  if (!type) return;

  const carName = inputCarName.value || "우리차";

  switch (type) {
    case "car":
      new Car(carName);
      break;
    case "police-car":
      new PoliceCar(carName);
      break;
  }
});

inputCarName.addEventListener("focus", (e) => {
  e.target.select(); // 입력 필드에 포커스가 가면 자동으로 텍스트를 선택
});
