import styled from "styled-components";

const ContCardDiv = styled.div`
  padding: 20px;
`;

const ContCard = (props) => {
  return <ContCardDiv>{props.children}</ContCardDiv>;
};

const ProductImage = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

const ProductTitle = (props) => {
  return <h2>{props.children}</h2>;
};

const ProductSubTitle = (props) => {
  return <h3>{props.children}</h3>;
};

const ProductDescription = (props) => {
  return <p>{props.children}</p>;
};

const currencyConfig = {
  USD: { locale: "en-US", currency: "USD", symbol: "$" },
  EUR: { locale: "de-DE", currency: "EUR", symbol: "€" },
  GBP: { locale: "en-GB", currency: "GBP", symbol: "£" },
  JPY: { locale: "ja-JP", currency: "JPY", symbol: "¥" },
  KRW: { locale: "ko-KR", currency: "KRW", symbol: "₩" },
  CNY: { locale: "zh-CN", currency: "CNY", symbol: "¥" },
};

const PriceFormatter = ({ price, currencyCode }) => {
  const formattedPrice = formatPrice(price, currencyCode);

  return <data value="price">{formattedPrice}</data>;
};

const formatPrice = (price, currencyCode) => {
  const config = currencyConfig[currencyCode];

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const ProductPrice = ({ price, currencyCode }) => {
  return <PriceFormatter price={price} currencyCode={currencyCode} />;

  // const num = 1000;
  // // 무조건 소수점 2번째까지 표시하도록 (반올림)
  // const numText = num.toLocaleString(undefined, {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });

  // return (
  //   <>
  //     <br />
  //     <span>${numText}</span>
  //   </>
  // );
};

function App() {
  return (
    <>
      <ContCard>
        <ProductImage
          src={"https://picsum.photos/id/237/200/300"}
          alt={"검은강아지"}
        />
        <ProductTitle>검은 강아지를 입양하세요</ProductTitle>
        <ProductSubTitle>엄청 얌전하답니다</ProductSubTitle>
        <ProductDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          distinctio sed molestias saepe reiciendis fugit illum enim et
          inventore, aliquam esse non nam consectetur minima atque consequuntur
          voluptates, eum quia.
        </ProductDescription>
        사료, 집 일괄 판매합니다:{" "}
        <ProductPrice price={1000} currencyCode="EUR" />
      </ContCard>
    </>
  );
}

export default App;
