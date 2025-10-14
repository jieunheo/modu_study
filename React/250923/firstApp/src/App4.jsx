import React from "react";
import Question from "./Components/Question";
// import "./App4.css";
import styles from "./App4.module.css";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
span {
  color: red;
  font-size: 12px;
}
`;

const name = "이호준";
const age = 10;

function 인사(문구, 이름, 나이) {
  // console.log(문구)
  console.log(문구, 이름, 나이);
  return `${문구[0]}${이름}${문구[1]}${나이 + 나이}${문구[2]}`;
}

const 인사문구 = 인사`이름은 ${name}이고 나이는 ${age + age}입니다.`;

console.log(인사문구);

const App = () => {
  return (
    <>
      <GlobalStyle /> {/* 글로벌 함수 적용 */}
      <nav className={styles.box}>
        <ul>
          <li id="detail" className="text">
            상세정보
          </li>
          <li id="qa" className="text">
            Q&A
          </li>
          <li id="review" className="text">
            Review
          </li>
        </ul>
      </nav>
      <span>Hello</span>
      <Question />
    </>
  );
};

export default App;
