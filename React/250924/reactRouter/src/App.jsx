// import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return (
    <>
      <h1>Error</h1>
      <details>
        <summary>에러정보</summary>
        {error.message}
        {error.stack}
      </details>
      <Link to="/">홈으로 돌아가기</Link>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Link to="/"> home </Link>
        <Link to="/one"> one </Link>
        <Link to="/two"> two </Link>
        <Link
          to={{
            pathname: "/three",
            search: "?category=electronics&sort=price",
            hash: "#contect",
          }}
        >
          three
        </Link>
        <Link
          to={{
            pathname: "/productlist",
            search: "?category=electronics&sort=price",
          }}
          state={{
            productId: 123,
            fromPage: "list",
            lastScrollPosition: 1500,
          }}
        >
          productlist
        </Link>
        {/* 라우트를 감싸줍니다. */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/one" element={<One name="licat" />} />
          <Route path="/two" element={<Two />} />
          <Route path="/three" element={<Three />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="*" element={<NotPound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

function NotPound() {
  return (
    <>
      <h3>요청하신 페이지를 찾을 수 없습니다.</h3>
      <Link to="/">홈으로 돌아가기</Link>
    </>
  );
}

function Index() {
  return <h1>hello world0</h1>;
}

function One({ name }) {
  return <h1>{name} world1</h1>;
}

function Two() {
  throw new Error("Two로 이동하는 과정에 문제 발생");

  return <h1>hello world2</h1>;
}

function Three() {
  return (
    <div>
      <h1>hello world3</h1>
      <div style={{ background: "green", height: "100vh" }}></div>
      <p id="contect">hash 테스트</p>
    </div>
  );
}

function ProductList() {
  // const location = useLocation();
  // // URLSearchParams는 URL의 문자열을 대상으로 작업할 수 있는 유틸리티 메서드를 제공합니다.
  // const searchParams = new URLSearchParams(location.search);
  // const category = searchParams.get("category");
  // const sort = searchParams.get("sort");

  const location = useLocation();
  const { productId, fromPage, lastScrollPosition } = location.state || {};

  return (
    <div>
      {/* {category}, {sort} */}
      {productId}, {fromPage}, {lastScrollPosition}
    </div>
  );
}

export default App;
