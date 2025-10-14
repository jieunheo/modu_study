import { useEffect, useState } from "react";
import useScroll from "./hooks/useScroll";

function ScrollList() {
  const [imgs, setImgs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isBottom = useScroll();

  useEffect(() => {
    if (!isLoading && (currentPage === 1 || isBottom)) {
      fetchData();
      setCurrentPage(currentPage + 1);
    }
  }, [isBottom]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${currentPage}&limit=10`
      );
      if (!res.ok) throw new Error("이미지를 가져오는 중 오류 발생");

      const json = await res.json();

      // if (currentPage === 1) setImgs([...json]);
      // else setImgs((prev) => [...prev, ...json]);
      setImgs((prev) => {
        if (currentPage === 1) return [...json];
        else return [...prev, ...json];
      });

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
    </>
  );
}

export default ScrollList;
