import { useEffect, useState } from "react";

export default function useMouseLocation(initVal) {
  const [mouseLocation, setMouseLocation] = useState(
    initVal || { x: null, y: null }
  );

  useEffect(() => {
    // 마우스 위치 추적 - 마우스가 움직였을 때
    window.addEventListener("mousemove", (e) => {
      // console.log("x ", e.x, ", Y ", e.y);
      setMouseLocation({ x: e.x, y: e.y });
    });
  }, []);

  return mouseLocation;
}
