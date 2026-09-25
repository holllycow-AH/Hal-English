import React, { useState } from "react";

const QUESTIONS = [
  {
    parts: [
      "every day",
      "Your English",
      "if you practice",
      "will get better",
    ],

    answer: [
      "Your English",
      "will get better",
      "if you practice",
      "every day",
    ],

    answers: [
      [
        "Your English",
        "will get better",
        "if you practice",
        "every day",
      ],
      [
        "if you practice",
        "every day",
        "Your English",
        "will get better",
      ],
    ],

    translation:
      "毎日練習すれば、あなたの英語は上達するでしょう。",
  },

  {
    parts: [
      "before you leave",
      "Make sure",
      "the door is locked",
    ],

    answer: [
      "Make sure",
      "the door is locked",
      "before you leave",
    ],

    answers: [
      [
        "Make sure",
        "the door is locked",
        "before you leave",
      ],
      [
        "before you leave",
        "Make sure",
        "the door is locked",
      ],
    ],

    translation:
      "出かける前に、ドアに鍵がかかっていることを必ず確認してください。",
  },

  {
    parts: [
      "yesterday",
      "but I forgot",
      "I meant",
      "to call you",
    ],

    answer: [
      "I meant",
      "to call you",
      "yesterday",
      "but I forgot",
    ],

    translation:
      "昨日あなたに電話するつもりでしたが、忘れてしまいました。",
  },

  {
    parts: [
      "when you finish",
      "everything away",
      "Please put",
    ],

    answer: [
      "Please put",
      "everything away",
      "when you finish",
    ],

    answers: [
      [
        "Please put",
        "everything away",
        "when you finish",
      ],
      [
        "when you finish",
        "Please put",
        "everything away",
      ],
    ],

    translation:
      "終わったら、すべて片づけてください。",
  },

  {
parts: [
  "Give it",
  "a try",
  "before you",
  "decide",
],

answer: [
  "Give it",
  "a try",
  "before you",
  "decide",
],

answers: [
  [
    "Give it",
    "a try",
    "before you",
    "decide",
  ],
  [
    "before you",
    "decide",
    "Give it",
    "a try",
  ],
],

    translation:
      "決める前に、やってみてください。",
  },

  {
    parts: [
      "can turn into",
      "A small mistake",
      "a big problem",
    ],

    answer: [
      "A small mistake",
      "can turn into",
      "a big problem",
    ],

    translation:
      "小さなミスが大きな問題になることがあります。",
  },

  {
    parts: [
      "if you find",
      "change your mind",
      "You can",
      "a better idea",
    ],

    answer: [
      "You can",
      "change your mind",
      "if you find",
      "a better idea",
    ],

    answers: [
      [
        "You can",
        "change your mind",
        "if you find",
        "a better idea",
      ],
      [
        "if you find",
        "a better idea",
        "You can",
        "change your mind",
      ],
    ],

    translation:
      "もっと良い考えが見つかったら、考えを変えてもかまいません。",
  },

  {
    parts: [
      "for twenty people",
      "The room",
      "is large enough",
    ],

    answer: [
      "The room",
      "is large enough",
      "for twenty people",
    ],

    translation:
      "その部屋は20人が入るのに十分な広さです。",
  },

  {
    parts: [
      "with this bag",
      "give me a hand",
      "Can you",
    ],

    answer: [
      "Can you",
      "give me a hand",
      "with this bag",
    ],

    translation:
      "このバッグを運ぶのを手伝ってもらえますか。",
  },

  {
    parts: [
      "so",
      "enough work",
      "let's call it a day",
      "We finished",
    ],

    answer: [
      "We finished",
      "enough work",
      "so",
      "let's call it a day",
    ],

    translation:
      "十分仕事をしたので、今日はここまでにしましょう。",
  },
];

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
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
    oscillator.stop(
      ctx.currentTime + startTime + duration
    );
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

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.voice = samantha;
    utterance.rate = 0.9;

    synth.speak(utterance);
  };

  speakWithSamantha();
};

export default function EikenSentenceBattle({ onBack }) {
  const [questionIndex, setQuestionIndex] = useState(0);

  const [selectedParts, setSelectedParts] =
    useState([]);

  const [shuffledParts, setShuffledParts] =
    useState(() =>
      shuffleArray(QUESTIONS[0].parts)
    );

  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[questionIndex];

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
      prev.filter(
        (_, index) => index !== selectedIndex
      )
    );
  }

 function checkAnswer() {
  if (
    answered ||
    selectedParts.length === 0
  ) {
    return;
  }

  const selectedWords =
    selectedParts.map((item) => item.part);

  // answers がある問題は複数正解、
 const normalizePart = (text) =>
  text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .trim();

const validAnswers =
  question.answers || [question.answer];

const correct = validAnswers.some(
  (answerPattern) =>
    selectedWords.length === answerPattern.length &&
    selectedWords.every(
      (part, index) =>
        normalizePart(part) ===
        normalizePart(answerPattern[index])
    )
);

  setIsCorrect(correct);
  setAnswered(true);

  // 正解なら本人が実際に作った英文を読む
  // 不正解なら基準解答を読む
  const spokenEnglish = correct
    ? selectedWords.join(" ") + "."
    : question.answer.join(" ") + ".";

  if (correct) {
    setCorrectCount((prev) => prev + 1);
    playCorrectSound();

    setTimeout(() => {
      speakEnglish(spokenEnglish);
    }, 600);
  } else {
    playWrongSound();

    setTimeout(() => {
      speakEnglish(spokenEnglish);
    }, 600);
  }
}

  function goNext() {
   if (
  questionIndex >=
  QUESTIONS.length - 1
) {
const finalCorrectCount = correctCount;
const finalScore = finalCorrectCount * 10;

  // 完走した日を保存
  const today = new Date().toLocaleDateString("en-CA");
  localStorage.setItem(
    "eiken-pre2-rookie-stage1-sentence-lastCompletedDate",
    today
  );

  // 80%以上ならクリアを永久保存
  if (finalScore >= 80) {
  localStorage.setItem(
    "eiken-pre2-rookie-stage1-sentence-cleared",
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
  battleType: "SENTENCE",
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

    setShuffledParts(
      shuffleArray(QUESTIONS[nextIndex].parts)
    );
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
          <h1>🔀 SENTENCE BATTLE</h1>

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

  const selectedIndexes =
    selectedParts.map((item) => item.index);

  const correctEnglish =
    question.answer.join(" ") + ".";

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
            🔀 SENTENCE BATTLE
          </h1>

          <div style={{ fontWeight: "700" }}>
            STAGE 1　QUESTION{" "}
            {questionIndex + 1} /{" "}
            {QUESTIONS.length}
          </div>
        </div>

        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            textAlign: "center",
            opacity: 0.55,
            marginBottom: "10px",
          }}
        >
          BUILD THE SENTENCE
        </div>

        <div
          style={{
            fontSize: "22px",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          {question.translation}
        </div>

        <div
          style={{
            minHeight: "75px",
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
              Tap the parts to build the sentence
            </span>
          ) : (
            selectedParts.map((item, index) => (
              <button
                key={`${item.index}-${index}`}
                type="button"
                onClick={() =>
                  removePart(index)
                }
                disabled={answered}
                style={{
                  fontSize: "18px",
                  padding: "9px 14px",
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
            const used =
              selectedIndexes.includes(index);

            return (
              <button
                key={`${part}-${index}`}
                type="button"
                disabled={used || answered}
                onClick={() =>
                  choosePart(part, index)
                }
                style={{
                  minWidth: "120px",
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
              disabled={
                selectedParts.length === 0
              }
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
              {isCorrect
                ? "⭕ CORRECT!"
                : "❌ WRONG"}
            </div>

            {!isCorrect && (
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  marginBottom: "12px",
                }}
              >
                ANSWER: {correctEnglish}
              </div>
            )}

            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {correctEnglish}
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
              {questionIndex ===
              QUESTIONS.length - 1
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