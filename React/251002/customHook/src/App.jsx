import InputComponent from "./components/InputComponent";
import SomethingComponent from "./components/SomethingComponent";
import useMouseLocation from "./hooks/useMouseLocation";
// import useScroll from "./hooks/useScroll";
import ScrollList from "./ScrollList";
import InfiniteImg from "./InfiniteImg";
import TestComponent from "./TestComponent";

function App() {
  // const isBottom = useScroll();

  return (
    <>
      {/* <TestComponent /> */}
      {/* <div style={{ height: 3000, backgroundColor: "tomato" }}></div> */}
      {/* <ScrollList /> */}
      <InfiniteImg />
    </>
  );
}

export default App;
