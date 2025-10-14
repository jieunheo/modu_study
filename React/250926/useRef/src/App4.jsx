//  useMemo로 총 사용 횟수, 평균 측정 시간, 최장 기록 등 계산 (재계산 최적화) --- 완료
// useRef로 세션별 기록 배열 저장 (리렌더링 없이 데이터 누적)  - 완료
// 통계 섹션 스크롤 시 useRef로 위치 저장 <= 패스

/**
1. 시간 포맷팅 & 단위 변환

useMemo로 밀리초 → 시:분:초:밀리초 변환 결과 캐싱
분/초 단위 자동 전환 로직 메모이제이션
useRef로 사용자가 선택한 표시 형식 기억

2. 성능 모니터링 시스템

useRef로 렌더링 횟수 카운트 (디버깅용)
useMemo로 무거운 계산(예: 그래프 데이터 포인트 생성) 최적화
useEffect + useRef로 컴포넌트 생명주기별 성능 로그 수집

 */

import { useEffect, useMemo, useRef, useState } from "react";

export default function Stopwatch() {
  const [secondsPassed, setSecondsPassed] = useState(0);

  const startTime = useRef(0); // 시작한 시간
  const intervalId = useRef(null); // 인터벌함수의 id

  const inputRef = useRef(null); // input DOM
  const isRun = useRef(null); // 실행중인지 확인 변수

  // const [timeArray, setTimeArray] = useState([]); // 시간 기록 배열
  const timeArray = useRef([]); // 시간 기록 배열

  function handleStart() {
    if (isRun.current) return; // start 상태에서 또 start를 누르면 오류가 생겨서 넣음
    isRun.current = true;

    startTime.current = Date.now() - secondsPassed;
    console.log("handleStart secondsPassed ", secondsPassed);

    intervalId.current = setInterval(() => {
      setSecondsPassed(new Date() - startTime.current);
    }, 10);
  }

  function handleStop() {
    // 클리어 시키기전에 시간 초를 어딘가저장해놓는다. 그리고 다시 handlestart할때 쓴다.
    console.log("handleStop secondsPassed ", secondsPassed);

    clearInterval(intervalId.current);
    isRun.current = false;
  }

  function handleReset() {
    handleStop();

    startTime.current = 0;
    setSecondsPassed(0);

    if (secondsPassed) {
      // setTimeArray((prev) => [...prev, secondsPassed]);
      timeArray.current = [...timeArray.current, secondsPassed];
    }
  }

  const TimeData = useMemo(() => {
    // 객체 안에 있는 값 수정
    // 초기값 만들어서
    let allTime = 0;
    let longestTime = 0;
    timeArray.current.map((item) => {
      allTime += item;

      if (longestTime < item) longestTime = item;
    });

    const data = {
      count: timeArray.current.length,
      averageCheckTime: allTime && allTime / timeArray.current.length,
      longestTime: longestTime,
    };
    return data;
  }, [timeArray.current]);

  // 오류때문에 추가헀는데... 없어도 잘 굴러감... => onChange 대신 readOnly 추가해서 해결
  // function handleChangeInput(e) {
  //   inputRef.current.value = (secondsPassed / 1000).toFixed(3);
  // }

  // 자동 포커스
  useEffect(() => {
    inputRef.current.focus();

    // => 3. 키보드 조작 시 start 리셋 되는 것 확인 => onKeyDown으로 연결 시 해결
    // inputRef.current.addEventListener("keydown", (e) => {
    //   if (e.code === "Space") {
    //     console.log("space 눌렸다.");
    //     // console.log(intervalId);
    //     console.log("isrun 상태:", isRun.current);

    //     // 스탑워치가 동작중이면

    //     if (isRun.current) {
    //       console.log("스페이스로 시계 멈춤");
    //       handleStop();
    //     }

    //     // 스탑워치가 멈추어있을 때.
    //     else if (!isRun.current) {
    //       console.log("스페이스로 시계 다시 동작");
    //       handleStart();
    //     }
    //   } else if (e.code === "KeyR") {
    //     console.log("r 눌렸다.");
    //     handleReset();
    //   }
    // });

    function handleKeybord(e) {
      if (e.code === "Space") {
        console.log("space 눌렸다.");
        // console.log(intervalId);
        console.log(isRun.current);
        if (isRun.current) handleStop();
        else handleStart();
      } else if (e.code === "KeyR") {
        console.log("r 눌렸다.");
        handleReset();
      }
    }

    inputRef.current.addEventListener("keydown", handleKeybord); // 등록

    return () => {
      inputRef.current.removeEventListener("keydown", handleKeybord); // 해제
    };
  }, [secondsPassed]);

  // function handleKeybord(e) {
  //   if (e.code === "Space") {
  //     console.log("space 눌렸다.");
  //     // console.log(intervalId);
  //     console.log(isRun.current);
  //     if (isRun.current) handleStop();
  //     else handleStart();
  //   } else if (e.code === "KeyR") {
  //     console.log("r 눌렸다.");
  //     handleReset();
  //   }
  // }

  return (
    <>
      <h1>
        Time passed:
        <input
          type="text"
          ref={inputRef}
          // onChange={handleChangeInput}
          value={(secondsPassed / 1000).toFixed(3)}
          readOnly
          // onKeyDown={(e) => {
          //   handleKeybord(e);
          // }}
        />
      </h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>

      <div>
        <p>count: {TimeData.count}</p>
        <p>averageCheckTime: {(TimeData.averageCheckTime / 1000).toFixed(3)}</p>
        <p>longestTime: {(TimeData.longestTime / 1000).toFixed(3)}</p>
      </div>
      <ul>
        {timeArray.current.map((i, d) => (
          <li key={d}>{i}</li>
        ))}
      </ul>
    </>
  );
}
