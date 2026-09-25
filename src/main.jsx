import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import EikenTraining from "./EikenTraining.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
<EikenTraining />
  </StrictMode>
);