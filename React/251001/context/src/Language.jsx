import { useContext, createContext, useState } from "react";
import Content from "./components/Content";
import LangSelector from "./components/LangSelector";
import { LanguageProvider } from "./LanguageProvider";

const Language = () => {
  return (
    <LanguageProvider>
      <LangSelector />
      <Content />
    </LanguageProvider>
  );
};

export default Language;
