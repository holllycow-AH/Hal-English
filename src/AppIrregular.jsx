import { useEffect, useRef, useState } from "react";

export const verbs = [
  // ========================================
  // プリント① 規則動詞 1〜40
  // ========================================

  // 1〜10
  { sheet: 1, number: 1, japanese: "到着する", base: "arrive", past: "arrived", participle: "arrived" },
  { sheet: 1, number: 2, japanese: "たずねる", base: "ask", past: "asked", participle: "asked" },
  { sheet: 1, number: 3, japanese: "～を焼く", base: "bake", past: "baked", participle: "baked" },
  { sheet: 1, number: 4, japanese: "電話をかける", base: "call", past: "called", participle: "called" },
  { sheet: 1, number: 5, japanese: "掃除する", base: "clean", past: "cleaned", participle: "cleaned" },
  { sheet: 1, number: 6, japanese: "登る", base: "climb", past: "climbed", participle: "climbed" },
  { sheet: 1, number: 7, japanese: "料理する", base: "cook", past: "cooked", participle: "cooked" },
  { sheet: 1, number: 8, japanese: "泣く", base: "cry", past: "cried", participle: "cried" },
  { sheet: 1, number: 9, japanese: "踊る", base: "dance", past: "danced", participle: "danced" },
  { sheet: 1, number: 10, japanese: "楽しむ", base: "enjoy", past: "enjoyed", participle: "enjoyed" },

  // 11〜20
  { sheet: 1, number: 11, japanese: "満たす", base: "fill", past: "filled", participle: "filled" },
  { sheet: 1, number: 12, japanese: "終える", base: "finish", past: "finished", participle: "finished" },
  { sheet: 1, number: 13, japanese: "手伝う", base: "help", past: "helped", participle: "helped" },
  { sheet: 1, number: 14, japanese: "笑う", base: "laugh", past: "laughed", participle: "laughed" },
  { sheet: 1, number: 15, japanese: "学ぶ", base: "learn", past: "learned", participle: "learned" },
  { sheet: 1, number: 16, japanese: "好む", base: "like", past: "liked", participle: "liked" },
  { sheet: 1, number: 17, japanese: "聞く", base: "listen", past: "listened", participle: "listened" },
  { sheet: 1, number: 18, japanese: "住む", base: "live", past: "lived", participle: "lived" },
  { sheet: 1, number: 19, japanese: "見る", base: "look", past: "looked", participle: "looked" },
  { sheet: 1, number: 20, japanese: "愛する", base: "love", past: "loved", participle: "loved" },

  // 21〜30
  { sheet: 1, number: 21, japanese: "引っ越す", base: "move", past: "moved", participle: "moved" },
  { sheet: 1, number: 22, japanese: "必要とする", base: "need", past: "needed", participle: "needed" },
  { sheet: 1, number: 23, japanese: "開ける", base: "open", past: "opened", participle: "opened" },
  { sheet: 1, number: 24, japanese: "遊ぶ", base: "play", past: "played", participle: "played" },
  { sheet: 1, number: 25, japanese: "練習する", base: "practice", past: "practiced", participle: "practiced" },
  { sheet: 1, number: 26, japanese: "救う", base: "save", past: "saved", participle: "saved" },
  { sheet: 1, number: 27, japanese: "始める", base: "start", past: "started", participle: "started" },
  { sheet: 1, number: 28, japanese: "滞在する", base: "stay", past: "stayed", participle: "stayed" },
  { sheet: 1, number: 29, japanese: "止まる", base: "stop", past: "stopped", participle: "stopped" },
  { sheet: 1, number: 30, japanese: "勉強する", base: "study", past: "studied", participle: "studied" },

  // 31〜40
  { sheet: 1, number: 31, japanese: "話す", base: "talk", past: "talked", participle: "talked" },
  { sheet: 1, number: 32, japanese: "旅行する", base: "travel", past: "traveled", participle: "traveled" },
  { sheet: 1, number: 33, japanese: "試す", base: "try", past: "tried", participle: "tried" },
  { sheet: 1, number: 34, japanese: "使う", base: "use", past: "used", participle: "used" },
  { sheet: 1, number: 35, japanese: "訪れる", base: "visit", past: "visited", participle: "visited" },
  { sheet: 1, number: 36, japanese: "歩く", base: "walk", past: "walked", participle: "walked" },
  { sheet: 1, number: 37, japanese: "欲する", base: "want", past: "wanted", participle: "wanted" },
  { sheet: 1, number: 38, japanese: "洗う", base: "wash", past: "washed", participle: "washed" },
  { sheet: 1, number: 39, japanese: "見る", base: "watch", past: "watched", participle: "watched" },
  { sheet: 1, number: 40, japanese: "働く", base: "work", past: "worked", participle: "worked" },

  // ========================================
  // プリント② 不規則動詞 1〜48
  // ========================================

  // 1〜10
  { sheet: 2, number: 1, japanese: "～になる", base: "become", past: "became", participle: "become" },
  { sheet: 2, number: 2, japanese: "始める", base: "begin", past: "began", participle: "begun" },
  { sheet: 2, number: 3, japanese: "持ってくる", base: "bring", past: "brought", participle: "brought" },
  { sheet: 2, number: 4, japanese: "買う", base: "buy", past: "bought", participle: "bought" },
  { sheet: 2, number: 5, japanese: "捕まえる", base: "catch", past: "caught", participle: "caught" },
  { sheet: 2, number: 6, japanese: "来る", base: "come", past: "came", participle: "come" },
  { sheet: 2, number: 7, japanese: "切る", base: "cut", past: "cut", participle: "cut" },
  { sheet: 2, number: 8, japanese: "描く", base: "draw", past: "drew", participle: "drawn" },
  { sheet: 2, number: 9, japanese: "飲む", base: "drink", past: "drank", participle: "drunk" },
  { sheet: 2, number: 10, japanese: "食べる", base: "eat", past: "ate", participle: "eaten" },

  // 11〜20
  { sheet: 2, number: 11, japanese: "落ちる", base: "fall", past: "fell", participle: "fallen" },
  { sheet: 2, number: 12, japanese: "感じる", base: "feel", past: "felt", participle: "felt" },
  { sheet: 2, number: 13, japanese: "見つける", base: "find", past: "found", participle: "found" },
  { sheet: 2, number: 14, japanese: "飛ぶ", base: "fly", past: "flew", participle: "flown" },
  { sheet: 2, number: 15, japanese: "忘れる", base: "forget", past: "forgot", participle: "forgotten" },
  { sheet: 2, number: 16, japanese: "得る", base: "get", past: "got", participle: "gotten" },
  { sheet: 2, number: 17, japanese: "与える", base: "give", past: "gave", participle: "given" },
  { sheet: 2, number: 18, japanese: "行く", base: "go", past: "went", participle: "gone" },
  { sheet: 2, number: 19, japanese: "育つ・育てる", base: "grow", past: "grew", participle: "grown" },
  { sheet: 2, number: 20, japanese: "聞こえる・聞く", base: "hear", past: "heard", participle: "heard" },

  // 21〜30
  { sheet: 2, number: 21, japanese: "保つ", base: "keep", past: "kept", participle: "kept" },
  { sheet: 2, number: 22, japanese: "知っている", base: "know", past: "knew", participle: "known" },
  { sheet: 2, number: 23, japanese: "去る・残す", base: "leave", past: "left", participle: "left" },
  { sheet: 2, number: 24, japanese: "失う", base: "lose", past: "lost", participle: "lost" },
  { sheet: 2, number: 25, japanese: "作る", base: "make", past: "made", participle: "made" },
  { sheet: 2, number: 26, japanese: "会う", base: "meet", past: "met", participle: "met" },
  { sheet: 2, number: 27, japanese: "置く", base: "put", past: "put", participle: "put" },
  { sheet: 2, number: 28, japanese: "読む", base: "read", past: "read", participle: "read" },
  { sheet: 2, number: 29, japanese: "走る", base: "run", past: "ran", participle: "run" },
  { sheet: 2, number: 30, japanese: "言う", base: "say", past: "said", participle: "said" },

  // 31〜40
  { sheet: 2, number: 31, japanese: "見る", base: "see", past: "saw", participle: "seen" },
  { sheet: 2, number: 32, japanese: "送る", base: "send", past: "sent", participle: "sent" },
  { sheet: 2, number: 33, japanese: "見せる", base: "show", past: "showed", participle: "shown" },
  { sheet: 2, number: 34, japanese: "歌う", base: "sing", past: "sang", participle: "sung" },
  { sheet: 2, number: 35, japanese: "座る", base: "sit", past: "sat", participle: "sat" },
  { sheet: 2, number: 36, japanese: "眠る", base: "sleep", past: "slept", participle: "slept" },
  { sheet: 2, number: 37, japanese: "話す", base: "speak", past: "spoke", participle: "spoken" },
  { sheet: 2, number: 38, japanese: "費やす", base: "spend", past: "spent", participle: "spent" },
  { sheet: 2, number: 39, japanese: "立つ", base: "stand", past: "stood", participle: "stood" },
  { sheet: 2, number: 40, japanese: "泳ぐ", base: "swim", past: "swam", participle: "swum" },

  // 41〜48
  { sheet: 2, number: 41, japanese: "取る", base: "take", past: "took", participle: "taken" },
  { sheet: 2, number: 42, japanese: "教える", base: "teach", past: "taught", participle: "taught" },
  { sheet: 2, number: 43, japanese: "伝える・話す", base: "tell", past: "told", participle: "told" },
  { sheet: 2, number: 44, japanese: "考える", base: "think", past: "thought", participle: "thought" },
  { sheet: 2, number: 45, japanese: "目を覚ます", base: "wake", past: "woke", participle: "woken" },
  { sheet: 2, number: 46, japanese: "身につけている", base: "wear", past: "wore", participle: "worn" },
  { sheet: 2, number: 47, japanese: "勝つ", base: "win", past: "won", participle: "won" },
  { sheet: 2, number: 48, japanese: "書く", base: "write", past: "wrote", participle: "written" },
];

export default function AppIrregular({ onStartGame }) {
  const [currentIndex, setCurrentIndex] = useState(0);
const [selectedSheet, setSelectedSheet] = useState(1);
const [rangeStart, setRangeStart] = useState(1);
const [rangeEnd, setRangeEnd] = useState(10);
  const [base, setBase] = useState("");
  const [past, setPast] = useState("");
  const [participle, setParticiple] = useState("");

  const [completedCount, setCompletedCount] = useState(0);
const [helpField, setHelpField] = useState(null);
const [wrongCount, setWrongCount] = useState(0);
const [helpLevel, setHelpLevel] = useState(0);
const baseRef = useRef(null);
const pastRef = useRef(null);
const participleRef = useRef(null);
const isAdvancingRef = useRef(false);
const activeVerbs = verbs.filter(
  (verb) =>
    verb.sheet === selectedSheet &&
    verb.number >= rangeStart &&
    verb.number <= rangeEnd
);

const current = activeVerbs[currentIndex];
const playFireSound = (level) => {
  console.log("🔥 playFireSound called:", level);

  const audio = new Audio(
    "/sounds/mixkit-arrow-whoosh-1491.wav"
  );

  audio.volume = 1;

  audio.play()
    .then(() => {
      console.log("🔊 SOUND PLAY SUCCESS");
    })
    .catch((error) => {
      console.error("❌ FIRE SOUND ERROR:", error);
    });
};

const speakForms = (baseWord, pastWord, participleWord) => {
  const voices = speechSynthesis.getVoices();

  const voice =
    voices.find((v) => v.name === "Samantha" && v.lang === "en-US") ||
    voices.find((v) => v.lang === "en-US");

  const text = `${baseWord}, ${pastWord}, ${participleWord}`;

  const utterance = new SpeechSynthesisUtterance(text);

  if (voice) {
    utterance.voice = voice;
  }

  utterance.lang = "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};

const speakWord = (word) => {
  const voices = speechSynthesis.getVoices();

  const voice =
    voices.find((v) => v.name === "Samantha" && v.lang === "en-US") ||
    voices.find((v) => v.lang === "en-US");

  const utterance = new SpeechSynthesisUtterance(word);

  if (voice) {
    utterance.voice = voice;
  }

  utterance.lang = "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};
const getCorrectPrefixLength = (typed, answer) => {
  let i = 0;

  while (
    i < typed.length &&
    i < answer.length &&
    typed[i].toLowerCase() === answer[i].toLowerCase()
  ) {
    i++;
  }

  return i;
};
  useEffect(() => {
    baseRef.current?.focus();
  }, [currentIndex]);

const nextQuestion = () => {
  // すでに次の問題へ進む予約があるなら、追加予約しない
  if (isAdvancingRef.current) return;

  isAdvancingRef.current = true;

  setTimeout(() => {
    setBase("");
    setPast("");
    setParticiple("");
    setCompletedCount(0);
    setHelpField(null);
    setHelpLevel(0);

    setCurrentIndex((prev) => {
      if (prev === activeVerbs.length - 1) {
        return 0;
      }

      return prev + 1;
    });

    // 次の問題に移ったのでロック解除
    isAdvancingRef.current = false;
  }, 400);
};
const handleZeroHelp = (event, field, word) => {
  if (event.key !== "0") return;

  event.preventDefault();

  const nextLevel =
    helpField === field ? helpLevel + 1 : 1;

  setHelpField(field);
  setHelpLevel(nextLevel);

  // ① ② ③すべて発音する
  speakWord(word);

  // ③ 完全HELP
  if (nextLevel >= 3) {
    if (field === "base") {
      setBase(word);
      setCompletedCount(1);
      playFireSound(1);

      setTimeout(() => {
        setHelpField(null);
        setHelpLevel(0);
        pastRef.current?.focus();
      }, 700);
    }

    if (field === "past") {
      setPast(word);
      setCompletedCount(2);
      playFireSound(2);

      setTimeout(() => {
        setHelpField(null);
        setHelpLevel(0);
        participleRef.current?.focus();
      }, 700);
    }

    if (field === "participle") {
      setParticiple(word);
      setCompletedCount(3);
      playFireSound(3);

      setTimeout(() => {
        speakForms(
          current.base,
          current.past,
          current.participle
        );
      }, 700);

      nextQuestion();
    }
  }
};

  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      
{/* GAME MODE */}
<div style={{ margin: "6px 0 22px" }}>
  <button
   onClick={onStartGame}
    style={{
      padding: "12px 32px",
      fontSize: "20px",
      fontWeight: "700",
      borderRadius: "12px",
      border: "2px solid #222",
      background: "#fff",
      color: "#222",
      cursor: "pointer",
    }}
  >
   🎮 GAME 15
  </button>
</div>

<div
  style={{
    margin: "24px auto 10px",
    padding: "18px",
    maxWidth: "850px",
    border: "2px solid #ddd",
    borderRadius: "16px",
  }}
>
<div
  style={{
    display: "inline-flex",
    fontWeight: "700",
    marginRight: "6px",
    marginLeft: "18px",
  }}
>
    📘 プリント①
  </div>

  <div
style={{
  display: "inline-flex",
  gap: "4px",
  alignItems: "center",
  flexWrap: "nowrap",
    marginRight: "18px",
  }}
>
    {[
      [1, 10],
      [11, 20],
      [21, 30],
      [31, 40],
    ].map(([start, end]) => (
      <button
        key={`1-${start}`}
        
        style={{
  padding: "3px 6px",
  fontSize: "12px",
  minWidth: "44px",
}}
        onClick={() => {
          setSelectedSheet(1);
          setRangeStart(start);
          setRangeEnd(end);
          setCurrentIndex(0);
        }}
      >
        {start}〜{end}
      </button>
    ))}
  </div>

<div style={{ display: "inline-flex", fontWeight: "700", marginRight: "6px" }}>
    📗 プリント②
  </div>

  <div
style={{
  display: "inline-flex",
  gap: "4px",
  alignItems: "center",
  flexWrap: "nowrap",
}}
  >
    {[
      [1, 10],
      [11, 20],
      [21, 30],
      [31, 40],
      [41, 48],
    ].map(([start, end]) => (
<button
  key={`2-${start}`}
  style={{
    padding: "3px 6px",
    fontSize: "12px",
    minWidth: "44px",
  }}
  onClick={() => {
          setSelectedSheet(2);
          setRangeStart(start);
          setRangeEnd(end);
          setCurrentIndex(0);
        }}
      >
        {start}〜{end}
      </button>
    ))}
  </div>
</div>

      {/* 現在地 + HELP */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    margin: "46px auto 34px",
    maxWidth: "850px",
    whiteSpace: "nowrap",
  }}
>
  {/* 現在地 */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "4px",
    }}
  >
    <span
      style={{
        fontSize: "16px",
        fontWeight: "700",
      }}
    >
      {selectedSheet === 1 ? "📘 プリント①" : "📗 プリント②"}
    </span>

    <span
      style={{
        background: "#111827",
        color: "white",
        padding: "3px 6px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "700",
        minWidth: "44px",
        textAlign: "center",
      }}
    >
      {rangeStart}〜{rangeEnd}
    </span>

    <span
      style={{
        fontSize: "16px",
        fontWeight: "700",
        color: "#777",
        marginLeft: "5px",
      }}
    >
      {currentIndex + 1} / {rangeEnd - rangeStart + 1}
    </span>
  </div>

  {/* HELP */}
  <div
    style={{
      fontSize: "13px",
      lineHeight: "1.4",
      color: "#777",
      textAlign: "right",
    }}
  >
    <strong>help! 数字の0ボタン</strong>
    　   0️⃣ 発音👄 → 0️⃣ スペル✏️ → 0️⃣ 入力⌨️
  </div>
</div>

{/* 🔥 / ○ */}
<div
  style={{
    fontSize: "64px",
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    margin: "0 0 34px",
  }}
>
  {[0, 1, 2].map((index) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        transform:
          completedCount > index
            ? "scale(1.15)"
            : "scale(1)",
        transition: "all 0.15s ease",
      }}
    >
      {completedCount > index ? "🔥" : "○"}
    </span>
  ))}
</div>

{/* 問題 */}
<h2
  style={{
    fontSize: "48px",
    fontWeight: "700",
    margin: "0 0 70px",
    textAlign: "center",
  }}
>
  {current.japanese}
</h2>

      

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "nowrap",
        }}
      >
<div>
  <p style={labelStyle}>① 原形</p>

  <div
    style={{
      position: "relative",
      width: "260px",
    }}
  >
    {helpField === "base" && helpLevel >= 2 && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#111" }}>
          {current.base.slice(
            0,
            getCorrectPrefixLength(base, current.base)
          )}
        </span>

        <span style={{ color: "#b8b8b8" }}>
          {current.base.slice(
            getCorrectPrefixLength(base, current.base)
          )}
        </span>
      </div>
    )}

    <input
      ref={baseRef}
      value={base}
      style={{
        ...inputStyle,
        position: "relative",
        boxSizing: "border-box",
        width: "260px",
        color:
          helpField === "base" && helpLevel >= 2
            ? "transparent"
            : "#111",
        caretColor: "#111",
        background: "transparent",
        zIndex: 3,
      }}
      onKeyDown={(e) =>
        handleZeroHelp(e, "base", current.base)
      }
      onChange={(e) => {
        let value = e.target.value.replaceAll("0", "");

        if (helpField === "base" && helpLevel >= 2) {
          const correctLength = getCorrectPrefixLength(
            value,
            current.base
          );

          value = current.base.slice(0, correctLength);
        }

        setBase(value);

        if (
          value.trim().toLowerCase() ===
          current.base.toLowerCase()
        ) {
          setCompletedCount(1);
          playFireSound(1);
          setHelpField(null);
          setHelpLevel(0);
          pastRef.current?.focus();
        }
      }}
    />
  </div>
</div>
<div>

  <p style={labelStyle}>② 過去形</p>

  <div
    style={{
      position: "relative",
      width: "260px",
    }}
  >
    {helpField === "past" && helpLevel >= 2 && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#111" }}>
          {current.past.slice(
            0,
            getCorrectPrefixLength(past, current.past)
          )}
        </span>

        <span style={{ color: "#b8b8b8" }}>
          {current.past.slice(
            getCorrectPrefixLength(past, current.past)
          )}
        </span>
      </div>
    )}

    <input
      ref={pastRef}
      value={past}
      style={{
        ...inputStyle,
        position: "relative",
        boxSizing: "border-box",
        width: "260px",
        color:
          helpField === "past" && helpLevel >= 2
            ? "transparent"
            : "#111",
        caretColor: "#111",
        background: "transparent",
        zIndex: 3,
      }}
      onKeyDown={(e) =>
        handleZeroHelp(e, "past", current.past)
      }
      onChange={(e) => {
        let value = e.target.value.replaceAll("0", "");

        if (helpField === "past" && helpLevel >= 2) {
          const correctLength = getCorrectPrefixLength(
            value,
            current.past
          );

          value = current.past.slice(0, correctLength);
        }

        setPast(value);

        if (
          value.trim().toLowerCase() ===
          current.past.toLowerCase()
        ) {
          setCompletedCount(2);
          playFireSound(2);
          setHelpField(null);
          setHelpLevel(0);
          participleRef.current?.focus();
        }
      }}
    />
  </div>
</div>

        <div>
  <p style={labelStyle}>③ 過去分詞</p>

  <div
    style={{
      position: "relative",
      width: "260px",
    }}
  >
    {helpField === "participle" && helpLevel >= 2 && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#111" }}>
          {current.participle.slice(
            0,
            getCorrectPrefixLength(
              participle,
              current.participle
            )
          )}
        </span>

        <span style={{ color: "#b8b8b8" }}>
          {current.participle.slice(
            getCorrectPrefixLength(
              participle,
              current.participle
            )
          )}
        </span>
      </div>
    )}

    <input
      ref={participleRef}
      value={participle}
      style={{
        ...inputStyle,
        position: "relative",
        boxSizing: "border-box",
        width: "260px",
        color:
          helpField === "participle" && helpLevel >= 2
            ? "transparent"
            : "#111",
        caretColor: "#111",
        background: "transparent",
        zIndex: 3,
      }}
      onKeyDown={(e) =>
        handleZeroHelp(
          e,
          "participle",
          current.participle
        )
      }
      onChange={(e) => {
        let value = e.target.value.replaceAll("0", "");

        if (
          helpField === "participle" &&
          helpLevel >= 2
        ) {
          const correctLength = getCorrectPrefixLength(
            value,
            current.participle
          );

          value = current.participle.slice(
            0,
            correctLength
          );
        }

        setParticiple(value);

       if (
  base.toLowerCase() === current.base.toLowerCase() &&
  past.toLowerCase() === current.past.toLowerCase() &&
  value.toLowerCase() === current.participle.toLowerCase()
) {
          setCompletedCount(3);
          playFireSound(3);
          setHelpField(null);
          setHelpLevel(0);


          nextQuestion();
        }
      }}
    />
  </div>
</div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: "32px",
  color: "#666",
  fontWeight: "700",
  whiteSpace: "nowrap",
  margin: "0 0 18px",
};

const inputStyle = {
  width: "220px",
  padding: "18px",
  fontSize: "26px",
  textAlign: "center",
  border: "2px solid #d1d5db",
  borderRadius: "12px",
  outline: "none",
};