import React from "react";
import styled from "styled-components";

const ButtonOne = styled.button`
  background-color: cornflowerblue;
  padding: 10px;
  color: white;
`;

const ButtonTwo = styled(ButtonOne)`
  border: none;
  border-radius: 12px;
  color: black;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;

const Buttonfour = styled(ButtonOne)`
  border: none;
  border-radius: 1rem;
  background-color: lightgreen;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;

const App = () => {
  return (
    <>
      <ButtonOne>버튼1</ButtonOne>
      <ButtonTwo>버튼2</ButtonTwo>
      <Buttonfour>버튼4</Buttonfour>
    </>
  );
};

export default App;
