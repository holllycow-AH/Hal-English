import React, { useState } from "react";
import "./EikenTraining.css";
import EikenWordBattle from "./EikenWordBattle.jsx";
import EikenPhraseBattle from "./EikenPhraseBattle.jsx";
import EikenSentenceBattle from "./EikenSentenceBattle.jsx";
import EikenReadingBattle from "./EikenReadingBattle.jsx";
import EikenListeningBattle from "./EikenListeningBattle.jsx";
import EikenFinalBattle from "./EikenFinalBattle.jsx";
import EikenMyPage from "./EikenMyPage.jsx";


const BATTLE_TYPES = [
  { id: 1, icon: "🔤", title: "WORD" },
  { id: 2, icon: "🧩", title: "PHRASE" },
  { id: 3, icon: "🔀", title: "SENTENCE" },
  { id: 4, icon: "📖", title: "READING" },
  { id: 5, icon: "🎧", title: "LISTENING" },
];

export default function EikenBattle({ onBack, stage = 1 }) {
const [activeBattle, setActiveBattle] = useState(null);
const [activeStage, setActiveStage] = useState(stage);
const [showMyPage, setShowMyPage] = useState(false);
if (activeBattle === "WORD") {
  return (
    <EikenWordBattle
      stage={activeStage}
      onBack={() => setActiveBattle(null)}
    />
  );
}
  if (activeBattle === "SENTENCE") {
  return (
    <EikenSentenceBattle
    stage={activeStage}
      onBack={() => setActiveBattle(null)}
    />
  );
}
if (activeBattle === "READING") {
  return (
    <EikenReadingBattle
    stage={activeStage}
      onBack={() => setActiveBattle(null)}
    />
  );
}
if (activeBattle === "LISTENING") {
  return (
    <EikenListeningBattle
    stage={activeStage}
      onBack={() => setActiveBattle(null)}
    />
  );
}
if (activeBattle === "FINAL") {
  return (
<EikenFinalBattle
  stage={activeStage}
  onBack={() => setActiveBattle(null)}
/>
  );
}
  if (activeBattle === "PHRASE") {
  return (
    <EikenPhraseBattle
      stage={activeStage}
      onBack={() => setActiveBattle(null)}
    />
  );
}
  if (showMyPage) {
  return <EikenMyPage onBack={() => setShowMyPage(false)} />;
}

  // 今は STAGE 1 だけ解放
  // 後で Training の進行状況と連動させる
const unlockedStage = 2;
const getBattleCleared = (stageNumber, battleType) =>
  localStorage.getItem(
    `eiken-pre2-rookie-stage${stageNumber}-${battleType.toLowerCase()}-cleared`
  ) === "true";

const isFinalUnlocked = (stageNumber) =>
  BATTLE_TYPES.every((battle) =>
    getBattleCleared(stageNumber, battle.title)
  );

const isFinalCleared = (stageNumber) =>
  localStorage.getItem(
    `eiken-pre2-rookie-stage${stageNumber}-final-cleared`
  ) === "true";
  return (
    <div
      className="eiken-app"
      style={{
        minHeight: "100vh",
        paddingTop: "32px",
      }}
    >
      {/* TITLE */}
 <div
  className="rookie-map-title"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "18px",
  }}
>
  <span>⚔️ ROOKIE BATTLE ⚔️</span>

  <span
    style={{
      fontSize: "16px",
      fontWeight: "800",
      letterSpacing: "0.08em",
      background: "#e5e5e5",
      padding: "7px 14px",
      borderRadius: "999px",
    }}
  >
    STAGE 1
  </span>
</div>
      <button
  type="button"
  onClick={() => setShowMyPage(true)}
  title="MY PAGE"
  style={{
    position: "absolute",
    top: "26px",
    right: "34px",
    border: "1px solid #ccc",
    borderRadius: "999px",
    background: "white",
    color: "#222",
    padding: "7px 18px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
  }}
>
  MY PAGE
</button>

      {/* BATTLE MAP */}
      <div
        style={{
        width: "1080px",
          maxWidth: "calc(100% - 40px)",
          margin: "36px auto 0",
          padding: "26px 30px",
          background: "#fff",
          borderRadius: "22px",
          boxSizing: "border-box",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        }}
      >
        {[1, 2, 3, 4, 5].map((stageNumber) => {
          const stageUnlocked = stageNumber <= unlockedStage;

          return (
            <div
              key={stageNumber}
              style={{
                display: "grid",
        gridTemplateColumns:
  "125px repeat(5, 125px) 125px",
gap: "16px",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "98px",
              }}
            >
              {/* STAGE */}
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "900",
                  whiteSpace: "nowrap",
                }}
              >
                STAGE {stageNumber}
              </div>

              {/* 5 BATTLES */}
              {BATTLE_TYPES.map((battle) => (
    <BattleButton
  key={battle.id}
  battle={battle}
  unlocked={stageUnlocked}
  stageNumber={stageNumber}
cleared={getBattleCleared(stageNumber, battle.title)}
onOpenBattle={(battleTitle) => {
  setActiveStage(stageNumber);
  setActiveBattle(battleTitle);
}}
/>
              ))}

              {/* FINAL */}
<FinalButton
  stageUnlocked={stageUnlocked}
  stageNumber={stageNumber}
finalUnlocked={isFinalUnlocked(stageNumber)}
finalCleared={isFinalCleared(stageNumber)}
onOpenFinal={() => {
  setActiveStage(stageNumber);
  setActiveBattle("FINAL");
}}
/>
            </div>
          );
        })}
      </div>

      {/* ONLY ONE NAVIGATION BUTTON */}
      <button
        type="button"
        onClick={onBack}
        style={{
          display: "block",
          margin: "24px auto 0",
          padding: "8px 18px",
          border: "none",
          background: "transparent",
          color: "#666",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "700",
        }}
      >
        ← TRAINING
      </button>
    </div>
  );
}

function BattleButton({
  battle,
  unlocked,
  stageNumber,
  cleared,
  onOpenBattle,
}) {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <button
        type="button"
        disabled={!unlocked}
     onClick={() => {
  onOpenBattle(battle.title);
}}
        style={{
     width: "125px",
height: "58px",
          border: "none",
          borderRadius: "999px",
          background: unlocked ? "#222" : "#bbb",
          color: "#fff",
          cursor: unlocked ? "pointer" : "not-allowed",
          opacity: unlocked ? 1 : 0.42,
  fontSize:
  battle.title === "LISTENING" ||
  battle.title === "SENTENCE"
    ? "14px"
    : "16px",
fontWeight: "900",
        }}
      >
        <div
          style={{
            fontSize: "15px",
            marginBottom: "2px",
          }}
        >
          {battle.icon}
        </div>

        {battle.title}
      </button>

      {/* 合格したBATTLEだけ表示 */}
      <div
        style={{
          height: "19px",
          fontSize: "11px",
          fontWeight: "800",
          color: "#555",
          whiteSpace: "nowrap",
        }}
      >
      {cleared ? "☑ DONE" : ""}
      </div>
    </div>
  );
}

function FinalButton({
  stageUnlocked,
  stageNumber,
  finalUnlocked,
  finalCleared,
  onOpenFinal,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <button
        type="button"
        disabled={!finalUnlocked}
        onClick={onOpenFinal}
        style={{
     width: "125px",
height: "58px",
          border: "none",
          borderRadius: "999px",
          background: finalUnlocked ? "#111827" : "#aaa",
          color: "#fff",
          cursor: finalUnlocked
            ? "pointer"
            : "not-allowed",
        opacity: finalUnlocked ? 1 : 0.3,
          fontSize: "12px",
          fontWeight: "900",
          lineHeight: "1.1",
        }}
      >
        <div
          style={{
     fontSize: "18px",
            marginBottom: "2px",
          }}
        >
          🏆
        </div>

        FINAL
      </button>
<div
  style={{
    height: "19px",
    fontSize: "11px",
    fontWeight: "800",
    color: finalCleared
      ? "#555"
      : finalUnlocked
      ? "#555"
      : "#999",
    whiteSpace: "nowrap",
    opacity: finalUnlocked ? 1 : 0.35,
  }}
>
  {finalCleared
    ? "☑ DONE"
    : finalUnlocked
    ? "⚔️ READY!"
    : "🔒 LOCKED"}
</div>
    </div>
  );
}