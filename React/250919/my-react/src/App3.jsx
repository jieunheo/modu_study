import { Licat } from "./components/Licat";
import { Time } from "./components/Time";
import Resume from "./components/Resume";
import ColorText from "./components/ColorText";

function App() {
  return (
    <div>
      <Licat name="개리" />
      <Time />
      <Resume
        hello="안녕하세요"
        name="개리"
        hobby="게임"
        food="고기"
        color="blue"
      />

      <ColorText color="red" />
      <ColorText color="blue" />
      <ColorText color="yellow" />
    </div>
  );
}

export default App;
