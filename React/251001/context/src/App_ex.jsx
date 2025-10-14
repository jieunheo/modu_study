import { useContext, createContext, useState } from "react";

const Products = createContext({
  products: [
    { id: 1, name: "노트북", price: 1000 },
    { id: 2, name: "스마트폰", price: 500 },
    { id: 3, name: "태블릿", price: 300 },
  ],
});

const App = () => {
  const [cart, setCart] = useState([]);
  return (
    <>
      <h1>쇼핑몰</h1>
      <p>카트에 있는 상품 개수: 0</p>

      <ProductList cart={cart} btnClickEvent={setCart} />
      <CartList cart={cart} btnClickEvent={setCart} />
    </>
  );
};

function ProductList({ cart, btnClickEvent }) {
  const { products } = useContext(Products);

  function handleClick(name) {
    let alladyId = null;
    cart.map((item, i) => {
      if (item.name === name) alladyId = i;
    });

    if (alladyId === null)
      btnClickEvent((prev) => [
        ...prev,
        {
          id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
          name,
          count: 1,
        },
      ]);
    else
      return btnClickEvent((prev) => {
        console.log(prev);
        prev[alladyId].count++;

        return [...prev];
      });
  }

  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((item) => (
          <ProductItem
            key={item.id}
            name={item.name}
            price={item.price}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </div>
  );
}

function ProductItem({ name, price, handleClick }) {
  return (
    <li>
      <p>
        {name} - ₩{price}
        <button onClick={() => handleClick(name)}>카트에 추가</button>
      </p>
    </li>
  );
}

function CartList({ cart, btnClickEvent }) {
  const { products } = useContext(Products);

  function handleClick(id) {
    let delId = null;
    cart.map((item) => {
      if (item.id === id) delId = item.id;
    });

    btnClickEvent((prev) => {
      return prev.filter((item) => item.id !== delId);
    });
  }

  return (
    <div>
      <h2>장바구니</h2>
      <ul>
        {cart.length ? (
          cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              count={item.count}
              name={item.name}
              handleClick={handleClick}
            />
          ))
        ) : (
          <li>장바구니가 비어있습니다.</li>
        )}
      </ul>
    </div>
  );
}

function CartItem({ id, name, count, handleClick }) {
  return (
    <li>
      <p>
        {name} - 수량: {count}
        <button onClick={() => handleClick(id)}>제거</button>
      </p>
    </li>
  );
}

export default App;
