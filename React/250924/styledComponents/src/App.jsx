import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: ${({ size }) => (size === "large" ? "1.5rem" : "1rem")};
  transition: all 0.3s ease;

  ${({ $fullWidth }) => $fullWidth && "width: 100%"};
  color: white;
  background-color: ${({ color }) => {
    switch (color) {
      case "danger":
        return "red";
      case "success":
        return "green";
      default:
        return "gray";
    }
  }};

  &:hover {
    transform: ${(props) =>
      props.size === "large" ? "scale(1.5)" : "scale(1)"};
  }
`;

const Btn = styled.button`
  color: ${(props) => props.$color};
  ${({ $fullWidth }) => $fullWidth && "width: 100%"};
`;

function App() {
  return (
    <>
      <StyledButton color="danger" size="large" $fullWidth>
        hello
      </StyledButton>
      <StyledButton size="large" $fullWidth>
        hello
      </StyledButton>
      <StyledButton $fullWidth>hello</StyledButton>
      <StyledButton color="danger">hello</StyledButton>
      <Btn $color="red" $fullWidth={true} />
    </>
  );
}

export default App;
