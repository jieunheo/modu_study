import { useRef, useState } from "react";

export default function Stopwatch() {
  // 시작한 시간
  const [startTime, setStartTime] = useState(null);
  const startValue = useRef(null);
  // 현재 시간
  const [now, setNow] = useState(null);
  const nowValue = useRef(null);
  // 인터벌함수의 id
  const [intervalId, setIntervalId] = useState(null);
  const intervalIdValue = useRef(null);
  // 지나간 시간 저장
  const saveValue = useRef(0);

  function handleReset() {
    handleStop();

    startValue.current = Date.now();
    setNow(Date.now());
    saveValue.current = 0;
  }

  function handleStart() {
    handleStop();

    // setStartTime(Date.now());
    startValue.current = Date.now();
    setNow(Date.now());

    intervalIdValue.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalIdValue.current);
    saveValue.current = secondsPassed;
  }

  let secondsPassed = 0;
  if (startValue.current !== null && now !== null) {
    if (saveValue.current) secondsPassed = saveValue.current;
    secondsPassed += (now - startValue.current) / 1000; // 기본 단위가 밀리세컨드이기 때문에 초단위로 표현하기 위해서 1000을 나눕니다.
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
