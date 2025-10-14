import { useRef } from "react";
import { useState } from "react";

export default function Stopwatch() {
  const [secondsPassed, setSecondsPassed] = useState(0);

  const startTime = useRef(0); // 시작한 시간
  const intervalId = useRef(null); // 인터벌함수의 id

  function handleStart() {
    handleStop();

    startTime.current = Date.now() - secondsPassed;

    intervalId.current = setInterval(() => {
      setSecondsPassed(new Date() - startTime.current);
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalId.current);
  }

  function handleReset() {
    handleStop();

    startTime.current = 0;
    setSecondsPassed(0);
  }

  return (
    <>
      <h1>
        Time passed:{(secondsPassed / 1000).toFixed(3) /* 소수점 세자리 숫자 */}
      </h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
