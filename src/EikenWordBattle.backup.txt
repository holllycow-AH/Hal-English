import { useState } from "react";
import "./EikenTraining.css";

const QUESTIONS = [
{
  sentence: "It was raining this morning, and it is _____ raining now.",
  choices: ["still", "enough", "mean", "change"],
  answer: "still",
  translation:
    "今朝は雨が降っていて、今もまだ降っています。",
},
  {
    sentence:
      "We don't have _____ time to visit both museums today.",
    choices: ["work", "enough", "leave", "still"],
    answer: "enough",
    translation:
      "今日は両方の博物館を訪れるだけの十分な時間がありません。",
  },
  {
    sentence:
      "Please _____ sure that all the windows are closed before you leave.",
    choices: ["take", "get", "make", "give"],
    answer: "make",
    translation:
      "出かける前に、すべての窓が閉まっていることを必ず確認してください。",
  },
  {
    sentence:
      "My father usually _____ home around seven in the evening.",
    choices: ["gets", "puts", "turns", "calls"],
    answer: "gets",
    translation:
      "父はたいてい夕方7時ごろ家に帰ります。",
  },
  {
    sentence:
      "I didn't _____ to hurt your feelings. I'm sorry.",
    choices: ["find", "mean", "keep", "work"],
    answer: "mean",
    translation:
      "あなたを傷つけるつもりはありませんでした。ごめんなさい。",
  },
  {
    sentence:
      "Could you _____ me a hand with these boxes?",
    choices: ["give", "take", "put", "change"],
    answer: "give",
    translation:
      "この箱を運ぶのを手伝ってくれませんか。",
  },
  {
    sentence:
      "Don't _____ your homework at home tomorrow.",
    choices: ["call", "find", "leave", "turn"],
    answer: "leave",
    translation:
      "明日は宿題を家に置いてこないでください。",
  },
  {
    sentence:
      "Please _____ your shoes away when you come inside.",
    choices: ["put", "make", "work", "take"],
    answer: "put",
    translation:
      "中に入ったら、靴を片づけてください。",
  },
  {
    sentence:
      "It may _____ some time to learn how to use this program.",
    choices: ["give", "take", "call", "mean"],
    answer: "take",
    translation:
      "このプログラムの使い方を覚えるには、少し時間がかかるかもしれません。",
  },
  {
    sentence:
      "People's ideas can _____ as they learn new things.",
    choices: ["change", "keep", "leave", "put"],
    answer: "change",
    translation:
      "人は新しいことを学ぶにつれて、考え方が変わることがあります。",
  },
];

const STAGE2_QUESTIONS = [
  {
    sentence: "I'm looking _____ my keys. Have you seen them?",
    choices: ["at", "for", "like", "after"],
    answer: "for",
    translation: "鍵を探しているんだ。見なかった？",
  },
  {
    sentence: "I hope your dream comes _____.",
    choices: ["back", "out", "true", "over"],
    answer: "true",
    translation: "あなたの夢が実現するといいね。",
  },
  {
    sentence: "Something went _____ with my computer.",
    choices: ["wrong", "free", "kind", "right"],
    answer: "wrong",
    translation: "パソコンに何か問題が起きました。",
  },
  {
    sentence: "My father will pick me _____ after school.",
    choices: ["on", "up", "out", "off"],
    answer: "up",
    translation: "父が放課後に迎えに来てくれます。",
  },
  {
    sentence: "Please hold _____ a minute.",
    choices: ["up", "out", "on", "over"],
    answer: "on",
    translation: "少し待ってください。",
  },
  {
    sentence: "Keep trying until you _____ your goal.",
    choices: ["reach", "pass", "hold", "break"],
    answer: "reach",
    translation: "目標を達成するまで挑戦し続けてください。",
  },
  {
    sentence: "Feel _____ to ask me any questions.",
    choices: ["right", "free", "kind", "possible"],
    answer: "free",
    translation: "遠慮なく何でも質問してください。",
  },
  {
    sentence: "It doesn't _____ if you make a mistake.",
    choices: ["mind", "mean", "matter", "seem"],
    answer: "matter",
    translation: "間違えても問題ありません。",
  },
  {
    sentence: "We stayed home _____ of going out.",
    choices: ["since", "while", "instead", "during"],
    answer: "instead",
    translation: "外出する代わりに家にいました。",
  },
  {
    sentence: "It took longer than I _____.",
    choices: ["allowed", "expected", "continued", "improved"],
    answer: "expected",
    translation: "思っていたより時間がかかりました。",
  },
];
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

  const question = activeQuestions[questionIndex];
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.answer;

  function handleAnswer(choice) {
  if (answered) return;

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
if (questionIndex === QUESTIONS.length - 1) {
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
            {correctCount} / {QUESTIONS.length}
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