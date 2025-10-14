import { useState, useEffect, useLayoutEffect } from "react";

function App() {
  const [value, setValue] = useState(100);

  useEffect(() => {
    // 그려지고 나서 set 함수 실행하니 다시 렌더링
    if (value >= 1000) {
      setValue(300);
    }
  }, [value]);

  useLayoutEffect(() => {
    // 그려지기 전에 set 함수 실행하니 다시 렌더링 X
    if (value >= 1000) {
      setValue(300);
    }
  }, [value]);

  return (
    <div>
      <div
        style={{
          width: value,
          height: value,
          backgroundColor: "blue",
          // transition: "1s all",
        }}
      ></div>
      <button
        onClick={() => {
          setValue(1000);
        }}
      >
        커져랏!
      </button>
      <button
        onClick={() => {
          setValue(200);
        }}
      >
        작아져랏!
      </button>
    </div>
  );
}

export default App;
