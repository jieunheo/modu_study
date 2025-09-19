import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import Fragment from "./Fragment.jsx";
// import GlossaryFragment from "./Glossary.jsx";
// import Componemt from "./Componemt.jsx";
// import App from "./App2.jsx";
// import App from "./App3.jsx";
import UseState from "./UseState";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UseState />
  </StrictMode>
);
