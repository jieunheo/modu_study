import { useContext, createContext, useState } from "react";

const LanguagesContext = createContext({
  en: {
    title: "Multi-language App",
    greeting: "Hello, welcome to our app!",
    description: "This app supports multiple languages.",
    languageSelector: "Select Language:",
  },
  ko: {
    title: "다국어 앱",
    greeting: "안녕하세요, 우리 앱에 오신 것을 환영합니다!",
    description: "이 앱은 여러 언어를 지원합니다.",
    languageSelector: "언어 선택:",
  },
  ja: {
    title: "多言語アプリ",
    greeting: "こんにちは、私たちのアプリへようこそ！",
    description: "このアプリは複数の言語をサポートしています。",
    languageSelector: "言語を選択：",
  },
});

const SelectLanguage = createContext();
const SelectLanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ko");

  return (
    <SelectLanguage.Provider value={{ language, setLanguage }}>
      {children}
    </SelectLanguage.Provider>
  );
};

const Body = () => {
  const { language } = useContext(SelectLanguage);
  const langCon = useContext(LanguagesContext);

  return (
    <div>
      <h2>{langCon[language].title}</h2>
      <p>{langCon[language].greeting}</p>
      <p>{langCon[language].description}</p>
    </div>
  );
};

const Header = () => {
  const { language, setLanguage } = useContext(SelectLanguage);
  const langCon = useContext(LanguagesContext);

  return (
    <>
      <h1>{langCon[language].languageSelector}</h1>
      <div>
        <button disabled={language === "en"} onClick={() => setLanguage("en")}>
          English
        </button>
        <button disabled={language === "ko"} onClick={() => setLanguage("ko")}>
          한국어
        </button>
        <button disabled={language === "ja"} onClick={() => setLanguage("ja")}>
          日本語
        </button>
      </div>
    </>
  );
};

const App = () => {
  return (
    <SelectLanguageProvider>
      <Header />
      <Body />
    </SelectLanguageProvider>
  );
};

export default App;
