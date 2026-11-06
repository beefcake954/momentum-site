import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Motion (LazyMotion + domAnimation, loaded synchronously) lives in the
// below-the-fold chunk; the hero entrance is CSS-only.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
