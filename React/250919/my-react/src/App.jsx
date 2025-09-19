import "./App.css";
import AreaList from "./AreaList.jsx";

function App() {
  const today = new Date();

  return (
    <>
      <h1>안녕, 라이캣 1호</h1>
      <h1>안녕, 라이캣 2호!</h1>
      <input
        type="text"
        className="hello"
        style={{ backgroundColor: "black" }}
      />
      <div style={{ color: "white", backgroundColor: "black" }}>
        <h2 style={{ color: "red" }}>년 : {today.getFullYear()}</h2>
        <h2>
          월/일 : {today.getMonth() + 1}/{today.getDay()}
        </h2>
        <h2>
          시간 : {today.getHours()}시 {today.getMinutes()}분{" "}
          {today.getSeconds()}초
        </h2>
      </div>
      <AreaList />
    </>
  );
}

export default App;
