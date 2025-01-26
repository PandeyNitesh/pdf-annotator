import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { InputProvider } from "./provider/inputContext.jsx";

createRoot(document.getElementById("root")).render(
  <InputProvider>
    <App />
  </InputProvider>
);
