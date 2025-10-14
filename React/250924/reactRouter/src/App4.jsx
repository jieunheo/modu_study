import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Link to="/"> Home </Link>
      <Link to="/products/1"> one </Link>
      <Link to="/products/2"> two </Link>
      <Link to="/cart"> cart </Link>
      <Link to="/users"> users </Link>
      {/* 라우트를 감싸줍니다. */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products/:id" element={<Products />}>
          <Route index element={<ProductItem />} />
          <Route path="notice" element={<ProductNotice />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/users" element={<UserIndex />}>
          <Route index element={null} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="question" element={<Question />} />
          <Route path="notice" element={<UserNotice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Index() {
  return <h1>hello</h1>;
}

function Products() {
  const location = useLocation();
  const [, , path, notice] = location.pathname.split("/");

  return (
    <>
      <h1>Products {path}</h1>
      <Link to={`/products/${path}/notice`}> notice </Link>
      {notice && (
        <div>
          <Outlet />
        </div>
      )}
    </>
  );
}
function ProductItem() {
  const location = useLocation();
  const [, , path, notice] = location.pathname.split("/");

  return (
    <>
      <h1>Products {path}</h1>
    </>
  );
}

function ProductNotice() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  return <h2>Notice {path}</h2>;
}

function Cart() {
  return <h2>Cart</h2>;
}

function UserIndex() {
  return (
    <>
      <h1>UserIndex</h1>
      <div>
        <Link to="/users/coupon"> coupon </Link>
        <Link to="/users/question"> question </Link>
        <Link to="/users/notice"> notice </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

function Coupon() {
  return <h2>Coupon</h2>;
}

function Question() {
  return <h2>Question</h2>;
}

function UserNotice() {
  return <h2>UserNotice</h2>;
}

export default App;
