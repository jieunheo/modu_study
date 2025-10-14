import styled, { css } from "styled-components";

const Color = css`
  color: red;
`;

const Border = css`
  border: 1px solid black;
`;
const Container = styled.div`
  ${Color}
  ${Border}
`;
const App = () => {
  return <Container>Hello</Container>;
};

export default App;
