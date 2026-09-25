import React, { useState } from "react";

const QUESTIONS = [
  {
    type: "japanese",
    prompt: "やってみる",
    parts: ["give", "try", "a", "it", "take"],
    answer: ["give", "it", "a", "try"],
    translation: "やってみる",
  },
  {
    type: "context",
    prompt: "Please ________ that the door is locked before you leave.",
    parts: ["make", "take", "sure", "still"],
    answer: ["make", "sure"],
    completed:
      "Please make sure that the door is locked before you leave.",
    translation: "出かける前に、ドアに鍵がかかっていることを必ず確認してください。",
  },
  {
    type: "japanese",
    prompt: "手を貸す",
    parts: ["give", "me", "a", "hand", "try"],
    answer: ["give", "me", "a", "hand"],
    translation: "手を貸す",
  },
  {
    type: "context",
    prompt: "Your English will ________ if you practice every day.",
    parts: ["get", "home", "better", "enough"],
    answer: ["get", "better"],
    completed:
      "Your English will get better if you practice every day.",
    translation: "毎日練習すれば、あなたの英語は上達するでしょう。",
  },
  {
    type: "japanese",
    prompt: "気が変わる",
    parts: ["change", "your", "mind", "time", "turn"],
    answer: ["change", "your", "mind"],
    translation: "気が変わる",
  },
  {
    type: "context",
    prompt: "We have done enough work. Let's ________.",
    parts: ["call", "it", "a", "day", "work"],
    answer: ["call", "it", "a", "day"],
    completed:
      "We have done enough work. Let's call it a day.",
    translation: "十分仕事をしたので、今日はここまでにしましょう。",
  },
  {
    type: "japanese",
    prompt: "それを片づける",
    parts: ["put", "it", "away", "on", "leave"],
    answer: ["put", "it", "away"],
    translation: "それを片づける",
  },
  {
    type: "context",
    prompt: "A small mistake can ________ if you ignore it.",
    parts: ["turn", "into", "a", "problem", "change"],
    answer: ["turn", "into", "a", "problem"],
    completed:
      "A small mistake can turn into a problem if you ignore it.",
    translation: "小さなミスも、放っておくと問題になることがあります。",
  },
  {
    type: "japanese",
    prompt: "十分によい",
    parts: ["good", "enough", "still", "better"],
    answer: ["good", "enough"],
    translation: "十分によい",
  },
  {
    type: "context",
    prompt: "I didn't ________ you. I was only trying to help.",
    parts: ["mean", "to", "hurt", "give", "take"],
    answer: ["mean", "to", "hurt"],
    completed:
      "I didn't mean to hurt you. I was only trying to help.",
    translation: "あなたを傷つけるつもりはありませんでした。ただ助けようとしただけです。",
  },
];

function shuffleArray(array) {
  const shuffled = [...array];

  function playCorrectSound() {
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

  const playTone = (frequency, start, duration) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(0.18, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + start + duration
    );

    oscillator.start(ctx.currentTime + start);
    oscillator.stop(ctx.currentTime + start + duration);
  };

  playTone(660, 0, 0.18);
  playTone(880, 0.18, 0.28);
}

function playWrongSound() {
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.frequency.value = 180;
  oscillator.type = "sawtooth";

  gain.gain.setValueAtTime(0.13, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.35
  );

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.35);
}

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

async function playCorrectSound() {
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  const ctx = new AudioContext();

  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  const playTone = (frequency, startTime, duration) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(
      0.25,
      ctx.currentTime + startTime
    );
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + startTime + duration
    );

    oscillator.start(ctx.currentTime + startTime);
    oscillator.stop(ctx.currentTime + startTime + duration);
  };

  playTone(660, 0, 0.18);
  playTone(880, 0.2, 0.35);
}

async function playWrongSound() {
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  const ctx = new AudioContext();

  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.type = "square";
  oscillator.frequency.value = 170;

  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.45
  );

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.45);
}const speakEnglish = (text) => {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  const speakWithSamantha = () => {
    const voices = synth.getVoices();

    const samantha = voices.find(
      (voice) => voice.name === "Samantha"
    );

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

export default function EikenPhraseBattle({ onBack }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedParts, setSelectedParts] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[questionIndex];
const [shuffledParts, setShuffledParts] = useState(() =>
  shuffleArray(QUESTIONS[0].parts)
);
  function choosePart(part, index) {
    if (answered) return;

    setSelectedParts((prev) => [
      ...prev,
      { part, index },
    ]);
  }

  function removePart(selectedIndex) {
    if (answered) return;

    setSelectedParts((prev) =>
      prev.filter((_, index) => index !== selectedIndex)
    );
  }

  function checkAnswer() {
    if (answered || selectedParts.length === 0) return;

    const selectedWords = selectedParts.map((item) => item.part);

    const correct =
      selectedWords.length === question.answer.length &&
      selectedWords.every(
        (word, index) => word === question.answer[index]
      );

    setIsCorrect(correct);
    setAnswered(true);

const correctEnglish =
  question.completed || question.answer.join(" ");

if (correct) {
  setCorrectCount((prev) => prev + 1);
  playCorrectSound();

  setTimeout(() => {
    speakEnglish(correctEnglish);
  }, 600);
} else {
  playWrongSound();

  setTimeout(() => {
    speakEnglish(correctEnglish);
  }, 600);
}
  }

 function goNext() {
  if (questionIndex === QUESTIONS.length - 1) {
const finalCorrectCount = correctCount;

const finalScore = Math.round(
  (finalCorrectCount / QUESTIONS.length) * 100
);

    // 最後まで完走した日を保存
    const today = new Date().toLocaleDateString("en-CA");

    localStorage.setItem(
      "eiken-pre2-rookie-stage1-phrase-lastCompletedDate",
      today
    );

    // 80%以上なら一度クリアした証を永久保存
    if (finalScore >= 80) {
  localStorage.setItem(
    "eiken-pre2-rookie-stage1-phrase-cleared",
    "true"
  );
}

// BATTLE履歴を保存
const playerName =
  localStorage.getItem("playerName") || "";

const oldHistory = JSON.parse(
  localStorage.getItem("eikenBattleHistory") || "[]"
);

const newRecord = {
  id: `${Date.now()}-${Math.random()}`,
  playerName,
  date: new Date().toISOString(),
  rank: "ROOKIE",
  stage: 1,
  battleType: "PHRASE",
  score: finalScore,
};

localStorage.setItem(
  "eikenBattleHistory",
  JSON.stringify([...oldHistory, newRecord])
);

setFinished(true);
    return;
  }

  const nextIndex = questionIndex + 1;

  setQuestionIndex(nextIndex);
  setSelectedParts([]);
  setAnswered(false);
  setIsCorrect(false);
  setShuffledParts(shuffleArray(QUESTIONS[nextIndex].parts));
}

  if (finished) {
    const score = Math.round(
      (correctCount / QUESTIONS.length) * 100
    );

    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px 20px",
          textAlign: "center",
          background: "#f3f4f6",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "white",
            padding: "40px",
            borderRadius: "22px",
          }}
        >
          <h1>🧩 PHRASE BATTLE</h1>

          <h2>BATTLE COMPLETE</h2>

          <div
            style={{
              fontSize: "46px",
              fontWeight: "900",
              margin: "25px 0 10px",
            }}
          >
            {correctCount} / {QUESTIONS.length}
          </div>

          <div
            style={{
              fontSize: "26px",
              fontWeight: "800",
              marginBottom: "30px",
            }}
          >
            SCORE {score}%
          </div>

          <button type="button" onClick={onBack}>
            ← BATTLE MAP
          </button>
        </div>
      </div>
    );
  }

  const selectedIndexes = selectedParts.map(
    (item) => item.index
  );

  const completedEnglish =
    question.completed || question.answer.join(" ");

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "32px",
          borderRadius: "22px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          <h1 style={{ marginBottom: "8px" }}>
            🧩 PHRASE BATTLE
          </h1>

          <div style={{ fontWeight: "700" }}>
            STAGE 1　QUESTION {questionIndex + 1} /{" "}
            {QUESTIONS.length}
          </div>
        </div>

        <div
          style={{
            fontSize:
              question.type === "japanese" ? "25px" : "23px",
            fontWeight: "800",
            textAlign: "center",
            margin: "30px 0",
            lineHeight: "1.6",
          }}
        >
          {question.type === "japanese" && (
            <div
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                opacity: 0.6,
              }}
            >
              BUILD THE PHRASE
            </div>
          )}

          {question.prompt}
        </div>

        <div
          style={{
            minHeight: "70px",
            border: "2px solid #d1d5db",
            borderRadius: "14px",
            padding: "14px",
            marginBottom: "24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedParts.length === 0 ? (
            <span style={{ opacity: 0.35 }}>
              Tap words to build the phrase
            </span>
          ) : (
            selectedParts.map((item, index) => (
              <button
                key={`${item.index}-${index}`}
                type="button"
                onClick={() => removePart(index)}
                disabled={answered}
                style={{
                  fontSize: "20px",
                  padding: "9px 15px",
                }}
              >
                {item.part}
              </button>
            ))
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "26px",
          }}
        >
        {shuffledParts.map((part, index) => {
            const used = selectedIndexes.includes(index);

            return (
              <button
                key={`${part}-${index}`}
                type="button"
                disabled={used || answered}
                onClick={() => choosePart(part, index)}
                style={{
                  minWidth: "100px",
                  opacity: used ? 0.25 : 1,
                  fontSize: "18px",
                }}
              >
                {part}
              </button>
            );
          })}
        </div>

        {!answered ? (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={checkAnswer}
              disabled={selectedParts.length === 0}
              style={{
                padding: "12px 30px",
                fontSize: "18px",
              }}
            >
              CHECK
            </button>
          </div>
        ) : (
          <div
            style={{
              marginTop: "22px",
              padding: "22px",
              borderRadius: "16px",
              background: "#f5f5f5",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "900",
                marginBottom: "14px",
              }}
            >
              {isCorrect ? "⭕ CORRECT!" : "❌ WRONG"}
            </div>

            {!isCorrect && (
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  marginBottom: "12px",
                }}
              >
                ANSWER: {question.answer.join(" ")}
              </div>
            )}

            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "10px",
                lineHeight: "1.6",
              }}
            >
              {completedEnglish}
            </div>

            <div
              style={{
                fontSize: "17px",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              {question.translation}
            </div>

            <button
              type="button"
              onClick={goNext}
              style={{
                padding: "12px 28px",
                fontSize: "18px",
              }}
            >
              {questionIndex === QUESTIONS.length - 1
                ? "RESULT"
                : "NEXT"}
            </button>
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <button type="button" onClick={onBack}>
            ← BATTLE MAP
          </button>
        </div>
      </div>
    </div>
  );
}