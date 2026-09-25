import { useState } from "react";
import AppWords from "./AppWords";
import AppNewCrown from "./AppNewCrown";
import AppIrregular from "./AppIrregular";
import AppVerbGame from "./AppVerbGame";
import AppMyPage from "./AppMyPage";
import "./App.css";

export default function App() {
const [tab, setTab] = useState("");

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
          👑NewCrown
        </button>

        <button onClick={() => setTab("words")}>
          🔤 単語250
        </button>
        <button onClick={() => setTab("irregular")}>
  🔁 動詞活用
</button>

<button onClick={() => setTab("mypage")}>
  👤 MY PAGE
</button>
      </div>
      {tab === "irregular" && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
      margin: "10px 0 18px",
      fontSize: "18px",
    }}
  >
    <span style={{ fontWeight: "700" }}>
      😎🎧 音声ダウンロード
    </span>

    <a href="/audio/verbs/verbs_print1.mp3" download>
      📘 プリント①
    </a>

    <a href="/audio/verbs/verbs_print2.mp3" download>
      📗 プリント②
    </a>

    <a href="/audio/verbs/verbs_all.mp3" download>
      📚 ALL
    </a>

    <a href="/audio/verbs/verbs_all_rhythm.mp3" download>
      🥁 RHYTHM
    </a>

    <a href="/audio/verbs/verbs_all_reggae.mp3" download>
      🌴🎧 REGGAE
    </a>
  </div>
)}
{tab === "newcrown" && <AppNewCrown />}
{tab === "words" && <AppWords />}
{tab === "irregular" && <AppIrregular onStartGame={() => setTab("verbGame")} />}
{tab === "verbGame" && <AppVerbGame onBack={() => setTab("irregular")} /
  >}
  {tab === "mypage" && <AppMyPage onBack={() => setTab("")} />}
      
    </div>
  );
}