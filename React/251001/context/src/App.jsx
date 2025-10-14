import { useContext, createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log(cart);

  // cart 상품 추가
  const addToCart = (product) => {
    setCart((prev) => {
      // 이미 있는 제품인지 확인
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }

      // 처음 추가하는 제품
      return [...prev, { ...product, count: 1 }];
    });
  };

  // cart 상품 삭제
  const removeFromCart = (productId) => {
    // 삭제
    setCart((prev) => [...prev.filter((item) => item.id !== productId)]);
  };

  // cart 총 상품 갯수
  const getTotal = () => {
    // let total = 0;
    // cart.map((item) => {
    //   total += item.count;
    // });

    const value = 0; // 초기값
    const total = cart.reduce((t, item) => t + item.count, value); // t - 누산기, item - array의 item

    return total;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// useContext를 한 번만 사용하고 가져다 쓰기 => 커스텀 훅
const useCart = () => useContext(CartContext);

const ProductList = () => {
  // const { addToCart } = useContext(CartContext);
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "노트북", price: 1000 },
    { id: 2, name: "스마트폰", price: 500 },
    { id: 3, name: "태블릿", price: 300 },
  ];

  return (
    <div>
      <h2>상품목록</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ₩{product.price}
            <button onClick={() => addToCart(product)}>카트에 추가</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>장바구니</h2>
      {!cart.length ? (
        <p>장바구니가 비었습니다.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - 수량: {item.count}
              <button onClick={() => removeFromCart(item.id)}>제거</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Header = () => {
  const { getTotal } = useContext(CartContext);
  return (
    <>
      <h1>쇼핑몰</h1>
      <p>카트에 있는 상품 개수: {getTotal()}</p>
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <Cart />
    </CartProvider>
  );
};

export default App;
