import { useEffect, useState } from "react";
// import useScroll from "./hooks/useScroll";
import useObserver from "./hooks/useObserver";
import Loading from "./Loading";

function ScrollList() {
  const [imgs, setImgs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isBottom = useObserver();

  useEffect(() => {
    if (!isLoading && (currentPage === 1 || isBottom)) {
      fetchData();
    }
  }, [isBottom]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${currentPage}&limit=5`
      );
      if (!res.ok) throw new Error("이미지를 가져오는 중 오류 발생");

      const json = await res.json();

      setImgs((prev) => {
        if (currentPage === 1) return [...json];
        // 스트릭트 모드 관련해서 한 번 더 확인해보고 알려주신다 함
        else return [...prev, ...json];
      });
      // setImgs((prev) => [...prev, ...json]);
      setCurrentPage((prev) => prev + 1);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>picsum images!</h1>
      <p>hello images</p>
      <ul>
        {imgs.map((img) => {
          return (
            <li key={img.id}>
              <img width={300} src={img.download_url} alt={img.author} />
            </li>
          );
        })}
      </ul>
      {isLoading && <Loading />}
    </>
  );
}

export default ScrollList;
