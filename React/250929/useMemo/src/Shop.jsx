import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Shop.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [isSortByRating, setIsSortByRating] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const getData = async () => {
      try {
        // const res = await fetch("./data/data.json");
        const res = await fetch("http://localhost:5173/products.json");
        if (!res.ok) throw new Error("products 가져오는데 문제 발생");
        const json = await res.json();

        setProducts(json.products);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);

  // 카테고리 선택
  const filteredByCategory = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }

    // category가 동일한 값만 filter (참인 값만 필터)
    return [...products].filter((item) => item.category === selectedCategory);
  }, [selectedCategory, products]);

  // 정렬 선택
  const sortedProducts = useMemo(() => {
    const productToSort = [...filteredByCategory]; // 함수가 아닌 값을 가져옴

    if (!isSortByRating) return productToSort;

    return [...productToSort].sort((a, b) => {
      return b.rating - a.rating;
    });
  }, [isSortByRating, filteredByCategory]);

  return (
    <section className="product-container">
      <h1>상품목록</h1>
      <div className="product-controls">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          className="product-select"
        >
          <option value="all">전체 카테고리</option>
          <option value="전자기기">전자기기</option>
          <option value="의류">의류</option>
          <option value="식품">식품</option>
          <option value="도서">도서</option>
        </select>
        <label className="rating-toggle">
          <input
            onChange={(e) => setIsSortByRating(e.target.checked)}
            type="checkbox"
            checked={isSortByRating}
          />
          평점순 정렬
        </label>
      </div>
      <ul className="product-list">
        {sortedProducts.map((item) => (
          <li key={item.id} className="product-item">
            <div className="product-info">
              <h3>{item.name}</h3>
              <p>
                <span>{item.category}</span>
              </p>
            </div>
            <div className="product-price">
              <p>
                <strong>{item.price.toLocaleString()}원</strong>
              </p>
              <em className="product-rating">★ {item.rating}</em>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
