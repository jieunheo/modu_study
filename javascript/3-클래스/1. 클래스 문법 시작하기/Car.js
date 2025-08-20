const road = document.querySelector(".road");
let carY = 0;

class Car {
  constructor(name, type = "🚗") {
    this.name = name;
    this.type = type;
    this.carX = 0;
    this.carY = carY;
    carY += 20; // 다음 차는 아래에 위치하도록 Y 좌표 증가
    // console.log(this.name, this.type);

    this.init();
  }

  // 초기화 메서드
  init() {
    const element = document.createElement("span");
    element.classList.add("car");
    element.innerHTML = `
      ${this.type}
        <small class="car-name">${this.name}</small>
    `;
    element.style.top = `${this.carY}px`;

    road.append(element);

    element.addEventListener("click", this.drive.bind(this)); // 클릭 시 drive 메서드 호출

    this.element = element; // 인스턴스 변수로 저장하여 나중에 사용할 수 있도록 함
  }

  drive() {
    this.carX += 20;
    this.element.style.transform = `translateX(-${this.carX}vw)`;
  }
}

class PoliceCar extends Car {
  constructor(name, type = "🚓") {
    super(name, type); // 부모 클래스의 생성자를 호출하여 타입을 경찰차로 설정

    this.element.addEventListener("dblclick", () => this.chase());
  }

  chase() {
    this.carX += 100;
    this.element.style.transform = `translateX(-${this.carX}vw)`;
  }
}
