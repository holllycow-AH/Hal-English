import React, { useEffect, useRef, useState } from "react";
import "./EikenTraining.css";
import EikenBattle from "./EikenBattle.jsx";
import EikenMyPage from "./EikenMyPage.jsx";

import { ROOKIE_STAGES } from "./data/rookieStages.js";


const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"’“”\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const speakEnglish = (text) => {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  const speakWithSamantha = () => {
    const voices = synth.getVoices();

    const samantha = voices.find(
      (voice) => voice.name === "Samantha"
    );

    // Samanthaがまだ読み込まれていない場合
    if (!samantha) {
      setTimeout(speakWithSamantha, 120);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.voice = samantha;
    utterance.rate = 0.9;

    synth.speak(utterance);
  };

  speakWithSamantha();
};
// 判定するときだけ無視する文字
const normalizeForCheck = (text) => {
  return text
    .toLowerCase()
    .replace(/[\s.,!?'"’“”\-:;]/g, "");
};


// ミス音
const playWrongSound = () => {
  try {
    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 110;

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.09
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.09);
  } catch {
    // 音が使えない環境では何もしない
  }
};


function TypingLine({
  label,
  english,
  japanese,
  inputRef,
  onComplete,
  autoFocus = false,
}) {
  const [value, setValue] = useState("");
  const [completed, setCompleted] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showJapanese, setShowJapanese] = useState(false);

  useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);


  const handleChange = (e) => {
    if (completed) return;

    const nextValue = e.target.value;

    const typedCheck = normalizeForCheck(nextValue);
    const answerCheck = normalizeForCheck(english);

    // 入力した文字そのものは、そのまま表示する
    // 判定だけ、大文字小文字・スペース・句読点をゆるくする
    if (answerCheck.startsWith(typedCheck)) {
      setValue(nextValue);
      setWrong(false);

      if (
        typedCheck === answerCheck &&
        answerCheck.length > 0
      ) {
        setCompleted(true);

        // 完成した瞬間に日本語を表示
        setShowJapanese(true);

        // 同時に朗読
        speakEnglish(english);

        // 朗読終了を待たず次へ
const delay = label === "SENTENCE 2" ? 6000 : 1500;

setTimeout(() => {
  onComplete();
}, delay);
      }

      return;
    }

    // 本当に違う文字だけ拒否
    setWrong(true);
    playWrongSound();

    setTimeout(() => {
      setWrong(false);
    }, 120);
  };


  return (
    <div className="typing-block">
      <div className="typing-label">{label}</div>

      <div className="english-model">{english}</div>

      {!showJapanese && japanese && (
        <button
          type="button"
          className="show-japanese-button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowJapanese(true)}
        >
          日本語を見る
        </button>
      )}

      {showJapanese && japanese && (
        <div className="japanese japanese-reveal">
          {japanese}
        </div>
      )}

      <input
        ref={inputRef}
        className={`typing-input ${
          wrong ? "wrong" : ""
        } ${completed ? "completed" : ""}`}
        value={value}
        onChange={handleChange}
        spellCheck="false"
        autoComplete="off"
        placeholder="Type here..."
      />
    </div>
  );
}

export default function EikenTraining() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([false, false, false, false]);
  const [setFinished, setSetFinished] = useState(false);
const [lap, setLap] = useState(0);
const [resumeLoaded, setResumeLoaded] = useState(false);
const [showMyPage, setShowMyPage] = useState(true);

const [showBattle, setShowBattle] = useState(false);

useEffect(() => {
  
  if (selectedSet === null) {
    setLap(0);
    setResumeLoaded(false);
    return;
  }

const lapKey =
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}`;

const resumeKey =
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}-resume`;

  const savedLap = Number(
    localStorage.getItem(lapKey)
  );

  setLap(Number.isFinite(savedLap) ? savedLap : 0);

  const savedResume = Number(
    localStorage.getItem(resumeKey)
  );

  if (
    Number.isInteger(savedResume) &&
    savedResume >= 0 &&
    savedResume < 5
  ) {
    setCardIndex(savedResume);
  } else {
    setCardIndex(0);
  }

  setLineIndex(0);
  setCompletedLines([false, false, false, false]);
  setSetFinished(false);
  setResumeLoaded(true);
}, [selectedSet]);
const refs = [
  useRef(null),
  useRef(null),
  useRef(null),
  useRef(null),
];

const activeStageData =
  ROOKIE_STAGES[selectedStage] ?? ROOKIE_STAGES[1];

const currentSetData =
  selectedSet === null
    ? []
    : activeStageData.slice(
        selectedSet * 5,
        selectedSet * 5 + 5
      );

const card =
  selectedSet === null
  ? activeStageData[0]
    : currentSetData[cardIndex];

  const items = [

    {
      label: "PHRASE 1",
      english: card.phrases[0].en,
      japanese: card.phrases[0].ja,
    },
    {
      label: "PHRASE 2",
      english: card.phrases[1].en,
      japanese: card.phrases[1].ja,
    },
    {
      label: "SENTENCE 1",
      english: card.sentences[0].en,
      japanese: card.sentences[0].ja,
    },
    {
      label: "SENTENCE 2",
      english: card.sentences[1].en,
      japanese: card.sentences[1].ja,
    },
  ];
const completeLine = (index) => {
  // すでに完了している欄なら何もしない
  if (completedLines[index]) return;

  const nextCompleted = [...completedLines];
  nextCompleted[index] = true;

  // まず状態を更新
  setCompletedLines(nextCompleted);

  // ─────────────────────
  // まだ未完了の欄がある
  // ─────────────────────
  if (!nextCompleted.every(Boolean)) {
    let nextIndex = -1;

    for (let i = 1; i <= nextCompleted.length; i++) {
      const candidate =
        (index + i) % nextCompleted.length;

      if (!nextCompleted[candidate]) {
        nextIndex = candidate;
        break;
      }
    }

    if (nextIndex !== -1) {
      setLineIndex(nextIndex);

      requestAnimationFrame(() => {
        refs[nextIndex]?.current?.focus();
      });
    }

    return;
  }

  // ─────────────────────
  // 4つ全部完成
  // ─────────────────────

  // まだSET内に次のWORDがある
  if (cardIndex < currentSetData.length - 1) {
    const nextCardIndex = cardIndex + 1;

  localStorage.setItem(
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}-resume`,
  String(nextCardIndex)
);

    setTimeout(() => {
      setCardIndex(nextCardIndex);
      setLineIndex(0);
      setCompletedLines([
        false,
        false,
        false,
        false,
      ]);

      requestAnimationFrame(() => {
        refs[0]?.current?.focus();
      });
    }, 250);

    return;
  }

  // ─────────────────────
  // SET最後のWORDまで全部完成
  // ─────────────────────

 localStorage.removeItem(
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}-resume`
);

  const nextLap = Math.min(lap + 1, 5);
  setLap(nextLap);

 localStorage.setItem(
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}`,
  String(nextLap)
);

  // TRAINING履歴を保存
  const playerName =
    localStorage.getItem("playerName") || "";

  const oldHistory = JSON.parse(
    localStorage.getItem("eikenTrainingHistory") || "[]"
  );

  const newRecord = {
    id: `${Date.now()}-${Math.random()}`,
    playerName,
    date: new Date().toISOString(),
    rank: "ROOKIE",
  stage: selectedStage,
    set: selectedSet + 1,
    lap: nextLap,
  };

  localStorage.setItem(
    "eikenTrainingHistory",
    JSON.stringify([...oldHistory, newRecord])
  );

  setSetFinished(true);
};

  useEffect(() => {
    if (!setFinished) {
      requestAnimationFrame(() => {
        refs[0]?.current?.focus();
      });
    }
  }, [cardIndex, setFinished]);

const restartSet = () => {
  setCardIndex(0);
  setLineIndex(0);
  setCompletedLines([false, false, false, false]);
  setSetFinished(false);
};
if (showBattle) {
  return (
<EikenBattle
  stage={selectedStage}
  onBack={() => setShowBattle(false)}
/>
  );
}
if (showMyPage) {
  return (
    <EikenMyPage
      onBack={() => setShowMyPage(false)}
    />
  );
}

const GRADE_LABEL = "準2級";
const RANK_LABEL = "ROOKIE";
const getStageLaps = (stageNumber) => {
  return Array.from({ length: 5 }, (_, index) => {
    return (
      Number(
        localStorage.getItem(
          `eiken-pre2-rookie-stage${stageNumber}-set${index + 1}`
        )
      ) || 0
    );
  });
};
if (selectedSet === null) {

const setCount = Math.ceil(activeStageData.length / 5);

 const stage1Laps = getStageLaps(1);
const stage2Laps = getStageLaps(2);
const stage3Laps = getStageLaps(3);
const stage4Laps = getStageLaps(4);
const stage5Laps = getStageLaps(5);

const isBattleUnlocked = (stageLaps) =>
  stageLaps.every((laps) => laps >= 5);

const battleUnlocked = isBattleUnlocked(stage1Laps);
const stage2BattleUnlocked = isBattleUnlocked(stage2Laps);
const stage3BattleUnlocked = isBattleUnlocked(stage3Laps);
const stage4BattleUnlocked = isBattleUnlocked(stage4Laps);
const stage5BattleUnlocked = isBattleUnlocked(stage5Laps);
const battleUnlockedByStage = [
  false,
  battleUnlocked,
  stage2BattleUnlocked,
  stage3BattleUnlocked,
  stage4BattleUnlocked,
  stage5BattleUnlocked,
];
const isStageUnlocked = (stageNumber) =>
  stageNumber === 1 || battleUnlockedByStage[stageNumber - 1];
  return (
    <div className="eiken-app">
<div className="rookie-map-title">
  🗡️ {RANK_LABEL} TRAINING 🏋️
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
   backgroundColor: "#ffffff",
color: "#222222",
    padding: "9px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "800",
    whiteSpace: "nowrap",
    color: "#222",
    appearance: "none",
WebkitAppearance: "none",
  }}
>
MY PAGE 
</button>

      <div className="progress-screen">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* STAGE 1 */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "800",
                whiteSpace: "nowrap",
                width: "130px",
              }}
            >
              STAGE 1
            </div>

            {Array.from({ length: setCount }, (_, index) => {
              const savedLap = stage1Laps[index] || 0;

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  <button
                    className="next-run-button"
                    onClick={() => {
                          setSelectedStage(1);
                      setSelectedSet(index);
                      setCardIndex(0);
                      setLineIndex(0);
                      setCompletedLines([false, false, false, false]);
                      setSetFinished(false);
                    }}
                  >
                    SET {index + 1}
                  </button>

                  <div
                    style={{
                      fontSize: "20px",
                      letterSpacing: "2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {[0, 1, 2, 3, 4].map((i) =>
                      i < savedLap ? "★" : "☆"
                    )}
                  </div>
                </div>
              );
            })}

            {/* BATTLE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <button
                type="button"
                className="next-run-button"
                disabled={!battleUnlocked}
                onClick={() => {
                  if (battleUnlocked) {
                    setShowBattle(true);
                  }
                }}
                style={{
                  opacity: battleUnlocked ? 1 : 0.35,
                  cursor: battleUnlocked ? "pointer" : "not-allowed",
                }}
              >
                ⚔ BATTLE
              </button>

              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  opacity: battleUnlocked ? 1 : 0.35,
                  whiteSpace: "nowrap",
                }}
              >
                {battleUnlocked ? "READY!" : "🔒 LOCKED"}
              </div>
            </div>
          </div>

          {/* STAGE 2〜5 */}
          {[2, 3, 4, 5].map((stageNumber) => (
            <div
              key={stageNumber}
              style={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                  width: "130px",
                }}
              >
                STAGE {stageNumber}
              </div>

              {[1, 2, 3, 4, 5].map((setNumber) => (
                <div
                  key={setNumber}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                 <button
  type="button"
  className="next-run-button"
disabled={!isStageUnlocked(stageNumber)}
onClick={() => {
  if (isStageUnlocked(stageNumber)) {
    setSelectedStage(stageNumber);
    setSelectedSet(setNumber - 1);
  }
}}
style={{
  opacity:
    (stageNumber === 1 ||
      (stageNumber === 2 && battleUnlocked) ||
      (stageNumber === 3 && stage2BattleUnlocked) ||
      (stageNumber === 4 && stage3BattleUnlocked) ||
      (stageNumber === 5 && stage4BattleUnlocked))
      ? 1
      : 0.35,
  cursor:
    (stageNumber === 1 ||
      (stageNumber === 2 && battleUnlocked) ||
      (stageNumber === 3 && stage2BattleUnlocked) ||
      (stageNumber === 4 && stage3BattleUnlocked) ||
      (stageNumber === 5 && stage4BattleUnlocked))
      ? "pointer"
      : "not-allowed",
}}
>
  SET {setNumber}
</button>

<div
  style={{
    fontSize: "20px",
    letterSpacing: "2px",
    whiteSpace: "nowrap",
opacity: stageNumber <= 5 ? 1 : 0.35,
  }}
>
  {[0, 1, 2, 3, 4].map((i) => {
  const laps =
    Number(
      localStorage.getItem(
        `eiken-pre2-rookie-stage${stageNumber}-set${setNumber}`
      )
    ) || 0;

  return i < laps ? "★" : "☆";
})}
</div>

                </div>
                      ))}

        {/* BATTLE */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
  }}
>
  <button
    type="button"
    className="next-run-button"
disabled={!battleUnlockedByStage[stageNumber]}
onClick={() => {
if (battleUnlockedByStage[stageNumber]) {
    setSelectedStage(stageNumber);
    setShowBattle(true);
  }
}}
style={{
opacity: battleUnlockedByStage[stageNumber] ? 1 : 0.35,
cursor: battleUnlockedByStage[stageNumber] ? "pointer" : "not-allowed",
}}
  >
    ⚔
    <br />
    BATTLE
  </button>

  <div
    style={{
      fontSize: "14px",
      fontWeight: "700",
opacity: battleUnlockedByStage[stageNumber] ? 1 : 0.35,
      whiteSpace: "nowrap",
    }}
  >
{battleUnlockedByStage[stageNumber] ? "READY!" : "🔒 LOCKED"}
  </div>
</div>

      </div>
    ))}
        </div>
      </div>
    </div>
  );
}

if (setFinished) {
return (
    <div className="eiken-app">
<div className="rookie-map-title">🗡️ {RANK_LABEL} TRAINING 🏋️</div>
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
    backgroundColor: "#ffffff",
    color: "#222222",
    padding: "9px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "800",
    whiteSpace: "nowrap",
    appearance: "none",
    WebkitAppearance: "none",
  }}
>
  MY PAGE
</button>
      <div className="progress-screen">
      <h1
  style={{
    fontSize: "24px",
    fontWeight: "700",
    paddingTop: "15px",
  }}
>
  SET {selectedSet + 1} COMPLETE
</h1>

        <div className="progress-location">
{GRADE_LABEL} / {RANK_LABEL} / STAGE {selectedStage} / SET {selectedSet + 1}
        </div>

        <div className="stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i}>{i < lap ? "★" : "☆"}</span>
          ))}
        </div>

        <div className="lap-text">{lap} / 5 周</div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(lap / 5) * 100}%` }}
          />
        </div>

        <p className="progress-note">
          {lap < 5
            ? "このSETはあとでまた挑戦できます。"
            : "このSETは5周完了しました！"}
        </p>

        <button
          type="button"
          className="next-run-button"
          onClick={() => {
            setSelectedSet(null);
            setCardIndex(0);
            setLineIndex(0);
            setCompletedLines([false, false, false, false]);
            setSetFinished(false);
          }}
        >
          ← SET選択へ戻る
        </button>


      </div>
    </div>
  );
  }


return (
  <div className="eiken-app">

<button
  type="button"
  onClick={() => {
    setSelectedSet(null);
    setSetFinished(false);
  }}
  style={{
    alignSelf: "flex-start",
    marginBottom: "12px",
    padding: "8px 16px",
    border: "1px solid #bbb",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#333333",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    width: "auto",
  }}
>
  ← SET選択へ戻る
</button>

    <header className="eiken-header">
        <div>
         <div className="rank-name">{RANK_LABEL}</div>
          <div className="location-line">
{GRADE_LABEL}　/　STAGE {selectedStage}　/　SET {selectedSet + 1}
          </div>
        </div>

      <div className="card-counter">
  {(cardIndex % 5) + 1} / 5
</div>
      </header>

      <div className="top-progress">
        <div
          className="top-progress-fill"
          style={{
          width: `${((cardIndex + lineIndex / 4) / currentSetData.length) * 100}%`,
          }}
        />
      </div>

      <main className="word-card">
        <div className="word-number">
          WORD {cardIndex + 1}
        </div>

        <h1 className="main-word">{card.word}</h1>
        <div className="main-meaning">{card.meaning}</div>

        <div className="training-list">
  {items.map((item, index) => (
  <TypingLine
    key={`${cardIndex}-${index}`}
    label={item.label}
    english={item.english}
    japanese={item.japanese}
    inputRef={refs[index]}
    autoFocus={index === 0}
    onComplete={() => completeLine(index)}
  />
))}
        </div>
      </main>
    </div>
  );
}
