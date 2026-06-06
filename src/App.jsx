import { useState } from "react";
import AppWords from "./AppWords";
import AppNewCrown from "./AppNewCrown";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("newcrown");

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setTab("newcrown")}>
          📚 NewCrown
        </button>

        <button onClick={() => setTab("words")}>
          🔤 単語250
        </button>
      </div>

      {tab === "newcrown" ? <AppNewCrown /> : <AppWords />}
    </div>
  );
}