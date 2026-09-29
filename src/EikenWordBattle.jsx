import { QUESTIONS } from "./data/battle/word/stage1Word";
import { STAGE2_QUESTIONS } from "./data/battle/word/stage2Word";
import { useState } from "react";
import "./EikenTraining.css";


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
}

const speakEnglish = (text) => {
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

export default function EikenWordBattle({ onBack, stage = 1 }) {
  const activeQuestions =
    stage === 2 ? STAGE2_QUESTIONS : QUESTIONS;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

const today = new Date().toLocaleDateString("en-CA");

const lastCompletedDate = localStorage.getItem(
  `eiken-pre2-rookie-stage${stage}-word-lastCompletedDate`
);

const [battleStarted, setBattleStarted] = useState(false);

const alreadyPlayedToday =
  lastCompletedDate === today && !battleStarted;


  const question = activeQuestions[questionIndex];
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.answer;


function handleAnswer(choice) {
  if (answered) return;

  setBattleStarted(true);

  if (questionIndex === 0) {
    localStorage.setItem(
      `eiken-pre2-rookie-stage${stage}-word-lastCompletedDate`,
      today
    );
  }

  setSelectedAnswer(choice);


  const correct = choice === question.answer;

  const correctEnglish = question.sentence.replace(
    "_____",
    question.answer
  );

  if (correct) {
    setCorrectCount((count) => count + 1);
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
if (questionIndex === activeQuestions.length - 1) {
  const finalCorrectCount = correctCount;

  const finalScore = Math.round(
    (finalCorrectCount / activeQuestions.length) * 100
  );

    // 最後まで完走した日を保存
    const today = new Date().toLocaleDateString("en-CA");

    localStorage.setItem(
    `eiken-pre2-rookie-stage${stage}-word-lastCompletedDate`,
      today
    );

    // 80%以上なら一度クリアした証を永久保存
if (finalScore >= 80) {
  localStorage.setItem(
`eiken-pre2-rookie-stage${stage}-word-cleared`,
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
stage: stage,
  battleType: "WORD",
  score: finalScore,
};

localStorage.setItem(
  "eikenBattleHistory",
  JSON.stringify([...oldHistory, newRecord])
);

setFinished(true);
    return;
  }

  setQuestionIndex((index) => index + 1);
  setSelectedAnswer(null);
}


if (alreadyPlayedToday) {
  return (
    <div
      className="eiken-app"
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <h1>🔤 WORD BATTLE</h1>

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "40px 20px",
          background: "white",
          borderRadius: "22px",
        }}
      >
        <h2>本日の挑戦は終了！</h2>
        <p>今日はすでに挑戦済みです。</p>
        <p>明日また挑戦しよう！</p>

        <button type="button" onClick={onBack}>
          ← BATTLE MAP
        </button>
      </div>
    </div>
  );
}
if (finished) {
  const score = Math.round(
    (correctCount / activeQuestions.length) * 100
  );

    return (
      <div
        className="eiken-app"
        style={{
          minHeight: "100vh",
          paddingTop: "60px",
          textAlign: "center",
        }}
      >
        <div className="rookie-map-title">
          🔤 WORD BATTLE
        </div>

        <div
          style={{
            width: "520px",
            maxWidth: "calc(100% - 40px)",
            margin: "40px auto",
            padding: "45px",
            background: "white",
            borderRadius: "22px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: "900",
              marginBottom: "20px",
            }}
          >
            BATTLE COMPLETE
          </div>

          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              marginBottom: "10px",
            }}
          >
           {correctCount} / {activeQuestions.length}
          </div>

          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
              marginBottom: "30px",
            }}
          >
            {score}%
          </div>

          <button
            type="button"
            onClick={onBack}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "999px",
              background: "#222",
              color: "white",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            ← BATTLE MAP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="eiken-app"
      style={{
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <div className="rookie-map-title">
        🔤 WORD BATTLE
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "12px",
          fontSize: "13px",
          fontWeight: "700",
          color: "#777",
        }}
      >
    STAGE {stage} QUESTION {questionIndex + 1} / {activeQuestions.length}
      </div>

      <div
        style={{
          width: "820px",
          maxWidth: "calc(100% - 40px)",
          margin: "30px auto",
          padding: "48px",
          boxSizing: "border-box",
          background: "white",
          borderRadius: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            fontSize: "26px",
            fontWeight: "800",
            lineHeight: "1.7",
            marginBottom: "28px",
          }}
        >
          {question.sentence}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {question.choices.map((choice) => {
            let background = "#f4f4f4";
            let color = "#222";

            if (answered && choice === question.answer) {
              background = "#e7f6ea";
            }

            if (
              answered &&
              choice === selectedAnswer &&
              choice !== question.answer
            ) {
              background = "#fde8e8";
            }

            return (
              <button
                key={choice}
                type="button"
                disabled={answered}
                onClick={() => handleAnswer(choice)}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  background,
                  color,
                  fontSize: "24px",
                  fontWeight: "800",
                  cursor: answered ? "default" : "pointer",
                }}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            style={{
              marginTop: "28px",
              paddingTop: "24px",
              borderTop: "1px solid #ddd",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                fontWeight: "900",
                marginBottom: "15px",
              }}
            >
              {isCorrect ? "⭕ CORRECT!" : "❌ WRONG"}
            </div>

            {!isCorrect && (
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  marginBottom: "14px",
                }}
              >
                ANSWER: {question.answer}
              </div>
            )}

            <div
              style={{
                fontSize: "25px",
                fontWeight: "700",
                lineHeight: "1.7",
                marginBottom: "10px",
              }}
            >
              {question.sentence.replace(
                "_____",
                question.answer
              )}
            </div>

            <div
              style={{
                fontSize: "21px",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "24px",
              }}
            >
              {question.translation}
            </div>

            <button
              type="button"
              onClick={goNext}
              style={{
                display: "block",
                marginLeft: "auto",
                padding: "11px 24px",
                border: "none",
                borderRadius: "999px",
                background: "#222",
                color: "white",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
           {questionIndex === activeQuestions.length - 1
                ? "RESULT →"
                : "NEXT →"}
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        style={{
          display: "block",
          margin: "20px auto",
          border: "none",
          background: "transparent",
          color: "#777",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        ← BATTLE MAP
      </button>
    </div>
  );
}