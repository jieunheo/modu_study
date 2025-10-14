import { useEffect, useRef, useState } from "react";

export default function useObserver() {
  const [isBottom, setIsBottom] = useState(false);
  const bottomLineRef = useRef();

  useEffect(() => {
    // 가상요소 생성
    const bottomLine = document.createElement("div");
    bottomLine.style.height = "10px";
    document.body.append(bottomLine);
    bottomLineRef.current = bottomLine;

    // 옵저버 생성
    const observer = new IntersectionObserver(
      (entry) => {
        console.log(entry[0]);
        setIsBottom(entry[0].isIntersecting);
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    // 옵저버 연결
    observer.observe(bottomLine);

    // 클린업
    return () => {
      observer.unobserve(bottomLine); // 옵저버 삭제
      document.body.removeChild(bottomLineRef.current); // 가상요소 삭제
    };
  }, []);

  return isBottom;
}
