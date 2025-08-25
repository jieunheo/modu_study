export default class MiniSlider {
  constructor(containerSelector, data, interval = 2000) {
    this.container = document.querySelector(`${containerSelector}`);
    if (!this.container) throw new Error("컨테이너 누락");
  }
}
