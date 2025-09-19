import React from "react";

function MyComponent() {
  return (
    <React.Fragment className="my-fragment">
      <h1>리엑트프레그먼트</h1>
      <p>테스트입니다!</p>
    </React.Fragment>
  );
}

function Fragment() {
  return <MyComponent />;
}

export default Fragment;
