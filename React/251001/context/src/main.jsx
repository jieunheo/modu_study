import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import App from "./App2.jsx";
import Language from "./Language.jsx";
import LifeCycle from "./LifeCycle.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
