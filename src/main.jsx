import { StrictMode } from "react";
import { LazyMotion } from "motion/react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
const loadFeatures = () => import("./lib/motion-features.js").then((m) => m.default);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LazyMotion features={loadFeatures} strict>
      <App />
    </LazyMotion>
  </StrictMode>
);
