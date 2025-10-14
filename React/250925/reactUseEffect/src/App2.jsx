import { useState, useEffect } from "react";

const countries = [
  {
    title: "France",
    population: "200",
    id: "1",
    loc: "europe",
  },
  {
    title: "Italy",
    population: "300",
    id: "2",
    loc: "europe",
  },
  {
    title: "England",
    population: "400",
    id: "3",
    loc: "europe",
  },
  {
    title: "America",
    population: "500",
    id: "4",
    loc: "north-america",
  },
  {
    title: "Korea",
    population: "600",
    id: "5",
    loc: "asia",
  },
];

function CountryItem({ item }) {
  return (
    <li
      key={item.id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "2px 2px 6px 0 rgba(0, 0, 0, 0.2)",
        padding: "8px",
      }}
    >
      <p style={{ fontWeight: "bold" }}>{item.title}</p>
      <p>{item.population}</p>
    </li>
  );
}

function CountryList() {
  return (
    <>
      <h1>나라 목록</h1>
      <ul
        style={{
          listStyle: "none",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {countries.map((item) => (
          <CountryItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

function CountryButton() {
  return (
    <div style={{ margin: "6px 0", textAlign: "right" }}>
      <button
        style={{
          backgroundColor: "white",
          border: "1px solid #aaa",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        전체 목록
      </button>
      <button
        style={{
          backgroundColor: "white",
          border: "1px solid #aaa",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        유럽 목록
      </button>
    </div>
  );
}

function App() {
  return (
    <div>
      <CountryList />
      <CountryButton />
    </div>
  );
}

export default App;
