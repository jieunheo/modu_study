import BankAccount from "./BankAccount.js"; // BankAccount 클래스를 가져옵니다.

const bankAccount = new BankAccount(loadBalance());

// DOM 세팅
const amountInput = document.getElementById("amount-input");
const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const balance = document.getElementById("balance");
const balanceValue = document.getElementById("balance-value");
const log = document.getElementById("log");

// 초기 잔액 보여주기
updateBalance();

// // 입금
// depositBtn.addEventListener("click", () => {
//   const amount = +amountInput.value;
//   bankAccount.deposit(amount);

//   // 잔액 업데이트
//   updateBalance();

//   // 입출금 내역 추가
//   addLog(`입금: ${amount.toLocaleString()}원`);

//   amountInput.value = ""; // 입력 필드 초기화
// });

// // 출금
// withdrawBtn.addEventListener("click", () => {
//   const amount = +amountInput.value;
//   bankAccount.withdraw(amount);

//   // 잔액 업데이트
//   updateBalance();

//   // 입출금 내역 추가
//   addLog(`출금: ${amount.toLocaleString()}원`);

//   amountInput.value = ""; // 입력 필드 초기화
// });

// 중복 코드 하나로 묶기
function handleTransaction(type) {
  const amount = +amountInput.value;

  if (type === "deposit") {
    bankAccount.deposit(amount);
    addLog(`입금: ${amount.toLocaleString()}원`);
  } else {
    bankAccount.withdraw(amount);
    addLog(`출금: ${amount.toLocaleString()}원`);
  }

  // 잔액 업데이트
  updateBalance();

  amountInput.value = ""; // 입력 필드 초기화
}
depositBtn.addEventListener("click", () => handleTransaction("deposit"));
withdrawBtn.addEventListener("click", () => handleTransaction("withdraw"));

// 잔액 업데이트
function updateBalance() {
  const amount = bankAccount.getBalance();
  balanceValue.textContent = amount.toLocaleString();

  saveBalance(amount);
}

// 잔액 조회
function loadBalance() {
  return +localStorage.getItem("myBalence");
}

// 입출금 내역
function addLog(text) {
  const li = document.createElement("li");
  const time = new Date().toLocaleTimeString();
  li.textContent = `[${time}] ${text}`;
  log.append(li);
}

// 로컬 스토리지에 저장
function saveBalance(amount) {
  localStorage.setItem("myBalence", amount);
}
