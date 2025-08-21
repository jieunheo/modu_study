// 입출금만 관리
export default class BankAccount {
  #balance; // private field
  #maxWidthdraw = 10000000;

  constructor(initialBalance = 0) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#maxWidthdraw) {
      Swal.fire({
        title: "Error!",
        text: `1회 한도 (${this.#maxWidthdraw.toLocaleString()}}원) 초과`,
        icon: "error",
        confirmButtonText: "확인",
      });
      throw new Error(
        `1회 한도 (${this.#maxWidthdraw.toLocaleString()}}원) 초과`
      );
    }

    if (amount > this.#balance) {
      Swal.fire({
        title: "Error!",
        text: `잔액이 부족합니다.`,
        icon: "error",
        confirmButtonText: "확인",
      });
      throw new Error("잔액이 부족합니다.");
    }

    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}
