import { useState, useEffect } from "react";
import styled from "styled-components";

// const nations = [
//   {
//     title: "France",
//     population: "200",
//     id: "1",
//     loc: "europe",
//   },
//   {
//     title: "Italy",
//     population: "300",
//     id: "2",
//     loc: "europe",
//   },
//   {
//     title: "England",
//     population: "400",
//     id: "3",
//     loc: "europe",
//   },
//   {
//     title: "America",
//     population: "500",
//     id: "4",
//     loc: "north-america",
//   },
//   {
//     title: "Korea",
//     population: "600",
//     id: "5",
//     loc: "asia",
//   },
// ];

async function fetchData() {
  const response = await fetch("http://localhost:3000/nations");
  const nations = await response.json();

  return nations;
}

const ItemList = styled.div`
  margin: 60px auto;

  ul {
    display: flow-root;
    padding: 10px;
  }

  li {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    list-style: none;
    margin: 20px 0;
  }

  .options {
    display: flow-root;
    padding: 10px;
  }
  button {
    float: right;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: #fff;
    cursor: pointer;
  }
  button:hover {
    background-color: #ddd;
  }
`;

function NationItem({ nation }) {
  return (
    <li
      key={nation.id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "2px 2px 6px 0 rgba(0, 0, 0, 0.2)",
        padding: "8px",
      }}
    >
      <h3 style={{ fontWeight: "bold" }}>{nation.title}</h3>
      <strong>{nation.population}</strong>
    </li>
  );
}

function NationList({ nations }) {
  return (
    <>
      <h2>나라 목록</h2>
      <ul>
        {nations.length > 0 ? (
          nations.map((nation) => (
            <NationItem key={nation.id} nation={nation} />
          ))
        ) : (
          <li>아직 값이 없습니다.</li>
        )}
      </ul>
    </>
  );
}

function CountryButton({ setUrl }) {
  return (
    <div className="options">
      <button
        onClick={() => setUrl("http://localhost:3000/nations?loc=europe")}
      >
        유럽 목록
      </button>
      <button onClick={() => setUrl("http://localhost:3000/nations")}>
        전체 목록
      </button>
    </div>
  );
}

function App() {
  // 1. useState 함수 초기화로 가져오기 => 공식적으로 불가능한 방법
  // const [nations, setNations] = useState(async () => {
  //   const nationArray = await fetchData();
  //   setNations([...nationArray]);
  // });

  // 1. useEffect으로 가져오기
  const [nations, setNations] = useState([]);
  const [url, setUrl] = useState("http://localhost:3000/nations");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(url + ": 데이터 가져오는 중 문제 발생");
        }

        const nations = await response.json();

        setNations(nations);
        // setNations([...nations]);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, [url]);

  return (
    <ItemList>
      <NationList nations={nations} />
      <CountryButton setUrl={setUrl} />
    </ItemList>
  );
}

export default App;
