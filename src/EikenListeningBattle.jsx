import React, { useState } from "react";

const QUESTIONS = [
  // =========================
  // PART 1
  // =========================
  {
    part: 1,
    type: "response",
    title: "PART 1 — RESPONSE",
    audio:
      "Girl: I'm thinking about joining the school tennis club. Boy: Why don't you give it a try? Girl:",
    choices: [
      "That's a good idea. I think I will.",
      "No, I didn't see him yesterday.",
      "It takes about twenty minutes.",
    ],
    answer: 0,
    translation:
      "女子：学校のテニス部に入ろうかと思っているの。男子：やってみたら？ 女子：",
  },
  {
    part: 1,
    type: "response",
    title: "PART 1 — RESPONSE",
    audio:
      "Boy: I can't find my English notebook. Girl: Did you leave it in the classroom? Boy:",
    choices: [
      "Yes, English is my favorite subject.",
      "Maybe. I'll go and check.",
      "No, the classroom is very large.",
    ],
    answer: 1,
    translation:
      "男子：英語のノートが見つからないんだ。女子：教室に置いてきたんじゃない？ 男子：",
  },
  {
    part: 1,
    type: "response",
    title: "PART 1 — RESPONSE",
    audio:
      "Girl: We've been working for almost two hours. Boy: You're right. Let's call it a day. Girl:",
    choices: [
      "Sure. We can finish the rest tomorrow.",
      "I called him yesterday.",
      "The weather will change soon.",
    ],
    answer: 0,
    translation:
      "女子：もう2時間近く作業しているね。男子：そうだね。今日はここまでにしよう。女子：",
  },

  // =========================
  // PART 2
  // =========================
  {
    part: 2,
    type: "conversation",
    title: "PART 2 — CONVERSATION",
    audio:
      "Girl: Are you ready to leave for the movie? Boy: Almost. I need to find my jacket. Girl: Make sure you take an umbrella, too. It's raining outside. Boy: Thanks. I didn't know that.",
    question:
      "What does the girl tell the boy to take?",
    choices: [
      "A camera.",
      "An umbrella.",
      "A notebook.",
      "A ticket.",
    ],
    answer: 1,
    translation:
      "女子：映画に出かける準備できた？ 男子：もう少し。上着を探さないと。女子：傘も忘れずに持っていってね。外は雨だよ。男子：ありがとう。知らなかったよ。",
  },
  {
    part: 2,
    type: "conversation",
    title: "PART 2 — CONVERSATION",
    audio:
      "Boy: Do we have enough time to eat lunch before the train comes? Girl: Yes. Our train leaves at one thirty, and it's only twelve fifteen now. Boy: Great. Let's eat at the cafe across the street.",
    question:
      "Why does the boy decide to eat lunch?",
    choices: [
      "The train has already left.",
      "The cafe is inside the station.",
      "They have enough time before the train.",
      "The girl wants to change their tickets.",
    ],
    answer: 2,
    translation:
      "男子：電車が来る前に昼ごはんを食べる時間は十分あるかな？ 女子：あるよ。電車は1時30分発で、まだ12時15分だから。男子：よかった。通りの向こうのカフェで食べよう。",
  },
  {
    part: 2,
    type: "conversation",
    title: "PART 2 — CONVERSATION",
    audio:
      "Girl: How is your grandfather doing? Boy: He's getting better. He came home from the hospital yesterday. Girl: That's good to hear. Boy: Yes. I'm going to visit him this weekend.",
    question:
      "What happened to the boy's grandfather?",
    choices: [
      "He went back to work.",
      "He came home from the hospital.",
      "He is going on a trip.",
      "He moved to another town.",
    ],
    answer: 1,
    translation:
      "女子：おじいさんの具合はどう？ 男子：よくなってきているよ。昨日、病院から家に帰ってきたんだ。女子：それはよかったね。男子：うん。今週末に会いに行くよ。",
  },

  // =========================
  // PART 3
  // =========================
  {
    part: 3,
    type: "passage",
    title: "PART 3 — SHORT PASSAGE",
    audio:
      "Mika wanted to grow vegetables on her balcony. At first, she thought there was not enough space. Then she found some small containers at a garden store. She decided to give it a try and planted tomatoes in them. Two months later, she was able to eat her first tomato.",
    question:
      "What did Mika do after finding the small containers?",
    choices: [
      "She planted tomatoes in them.",
      "She gave them to a friend.",
      "She returned them to the store.",
      "She put them inside her house.",
    ],
    answer: 0,
    translation:
      "ミカはベランダで野菜を育てたいと思っていました。最初は十分な場所がないと思っていました。その後、園芸店で小さな容器を見つけました。試してみることにして、そこにトマトを植えました。2か月後、初めてできたトマトを食べることができました。",
  },
  {
    part: 3,
    type: "passage",
    title: "PART 3 — SHORT PASSAGE",
    audio:
      "A small restaurant near David's house used to close at six in the evening. Many people in the neighborhood asked the owner to stay open longer. Last month, the owner changed the closing time to eight. Now more people can eat there after work.",
    question:
      "Why did the restaurant change its closing time?",
    choices: [
      "The owner wanted to serve breakfast.",
      "Many people wanted it to stay open longer.",
      "There were not enough workers.",
      "Another restaurant closed nearby.",
    ],
    answer: 1,
    translation:
      "デイビッドの家の近くにある小さなレストランは、以前は夕方6時に閉店していました。近所の多くの人が、もっと遅くまで営業してほしいと店主に頼みました。先月、店主は閉店時間を8時に変更しました。今では、より多くの人が仕事のあとにそこで食事をすることができます。",
  },
  {
    part: 3,
    type: "passage",
    title: "PART 3 — SHORT PASSAGE",
    audio:
      "Emma takes the bus to school every morning. Yesterday, she left home later than usual and missed her bus. She thought she would be late for school, but her father gave her a ride. She arrived five minutes before her first class started.",
    question:
      "How did Emma get to school yesterday?",
    choices: [
      "She walked.",
      "She took her usual bus.",
      "Her father drove her.",
      "She rode her bicycle.",
    ],
    answer: 2,
    translation:
      "エマは毎朝バスで学校へ行きます。昨日はいつもより遅く家を出て、バスに乗り遅れました。学校に遅刻すると思いましたが、父親が車で送ってくれました。最初の授業が始まる5分前に到着しました。",
  },
];

export default function EikenListeningBattle({ onBack }) {
  const [questionIndex, setQuestionIndex] =
    useState(0);
  const [selectedAnswer, setSelectedAnswer] =
    useState(null);
  const [answered, setAnswered] =
    useState(false);
  const [correctCount, setCorrectCount] =
    useState(0);
  const [finished, setFinished] =
    useState(false);
  const [hasPlayed, setHasPlayed] =
    useState(false);

  const question = QUESTIONS[questionIndex];
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

  gain.gain.setValueAtTime(
    0.18,
    ctx.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.45
  );

  oscillator.start(ctx.currentTime);
  oscillator.stop(
    ctx.currentTime + 0.45
  );
}
  function speakEnglish(text) {
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

    synth.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.voice = samantha;
    utterance.rate = 0.70;

    synth.speak(utterance);
  };

  speakWithSamantha();
}

  function playQuestion() {
    if (hasPlayed && !answered) return;

    let text = question.audio;

    if (
      question.type !== "response" &&
      question.question
    ) {
      text += " " + question.question;
    }

    speakEnglish(text);
    setHasPlayed(true);
  }

  function chooseAnswer(choiceIndex) {
    if (!hasPlayed || answered) return;

    setSelectedAnswer(choiceIndex);
  }

  function checkAnswer() {
  if (
    selectedAnswer === null ||
    answered
  ) {
    return;
  }

  const correct =
    selectedAnswer === question.answer;

  if (correct) {
    setCorrectCount((prev) => prev + 1);
    playCorrectSound();
  } else {
    playWrongSound();
  }

  setAnswered(true);
}

  function goNext() {
    if (
      questionIndex ===
      QUESTIONS.length - 1
    ) {
     const finalCorrectCount = correctCount;

const finalScore = Math.round(
  (finalCorrectCount / QUESTIONS.length) * 100
);

      const today =
        new Date().toLocaleDateString(
          "en-CA"
        );

      localStorage.setItem(
        "eiken-pre2-rookie-stage1-listening-lastCompletedDate",
        today
      );

      if (finalScore >= 80) {
        localStorage.setItem(
          "eiken-pre2-rookie-stage1-listening-cleared",
          "true"
        );
      }
const oldHistory = JSON.parse(
  localStorage.getItem("eikenBattleHistory") || "[]"
);

const playerName =
  localStorage.getItem("playerName") || "";

const newRecord = {
  id: `${Date.now()}-${Math.random()}`,
  playerName,
  date: new Date().toISOString(),
  rank: "ROOKIE",
  stage: 1,
  battleType: "LISTENING",
  score: Math.round(finalScore),
};

localStorage.setItem(
  "eikenBattleHistory",
  JSON.stringify([...oldHistory, newRecord])
);
      setFinished(true);
      return;
    }

    setQuestionIndex(
      (prev) => prev + 1
    );
    setSelectedAnswer(null);
    setAnswered(false);
    setHasPlayed(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const score = Math.round(
    (correctCount / QUESTIONS.length) *
      100
  );

  if (finished) {
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
          <h1>🎧 LISTENING BATTLE</h1>

          <h2>BATTLE COMPLETE</h2>

          <div
            style={{
              fontSize: "46px",
              fontWeight: "900",
              margin: "25px 0 10px",
            }}
          >
            {correctCount} /{" "}
            {QUESTIONS.length}
          </div>

          <div
            style={{
              fontSize: "26px",
              fontWeight: "800",
              marginBottom: "12px",
            }}
          >
            SCORE {score}%
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: "900",
              marginBottom: "30px",
            }}
          >
            {score >= 80
              ? "🏆 WIN!"
              : "💥 LOSE"}
          </div>

          <button
            type="button"
            onClick={onBack}
          >
            ← BATTLE MAP
          </button>
        </div>
      </div>
    );
  }

  const isCorrect =
    selectedAnswer === question.answer;

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
            🎧 LISTENING BATTLE
          </h1>

          <div
            style={{
              fontWeight: "700",
            }}
          >
            STAGE 1　QUESTION{" "}
            {questionIndex + 1} /{" "}
            {QUESTIONS.length}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: "15px",
            fontWeight: "900",
            letterSpacing: "0.08em",
            marginBottom: "24px",
            opacity: 0.6,
          }}
        >
          {question.title}
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <button
            type="button"
            onClick={playQuestion}
            disabled={
              hasPlayed && !answered
            }
            style={{
              fontSize: "20px",
              padding: "14px 30px",
              opacity:
                hasPlayed && !answered
                  ? 0.45
                  : 1,
            }}
          >
            🔊{" "}
            {!hasPlayed
              ? "PLAY"
              : answered
              ? "LISTEN AGAIN"
              : "PLAYED"}
          </button>

          {!hasPlayed && (
            <div
              style={{
                marginTop: "10px",
                fontSize: "13px",
                opacity: 0.55,
              }}
            >
              You can listen only once
              before answering.
            </div>
          )}
        </div>

        {question.type !== "response" &&
          question.question && (
            <div
              style={{
                fontSize: "20px",
                fontWeight: "800",
                lineHeight: "1.6",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              {question.question}
            </div>
          )}

        <div
          style={{
            display: "grid",
            gap: "12px",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >
          {question.choices.map(
            (choice, index) => {
              const chosen =
                selectedAnswer === index;

              return (
                <button
                  key={index}
                  type="button"
                  disabled={
                    !hasPlayed || answered
                  }
                  onClick={() =>
                    chooseAnswer(index)
                  }
                  style={{
                    textAlign: "left",
                    padding: "14px 18px",
                    fontSize: "17px",
                    background: chosen
                      ? "#dbeafe"
                      : "#f3f4f6",
                    color: "#111",
                    border: chosen
                      ? "2px solid #2563eb"
                      : "2px solid transparent",
                    borderRadius: "12px",
                  }}
                >
                  {String.fromCharCode(
                    65 + index
                  )}
                  . {choice}
                </button>
              );
            }
          )}
        </div>

        {!answered ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "28px",
            }}
          >
            <button
              type="button"
              onClick={checkAnswer}
              disabled={
                selectedAnswer === null
              }
              style={{
                padding: "12px 30px",
                fontSize: "18px",
                opacity:
                  selectedAnswer === null
                    ? 0.4
                    : 1,
              }}
            >
              CHECK
            </button>
          </div>
        ) : (
          <div
            style={{
              maxWidth: "700px",
              margin: "28px auto 0",
              padding: "22px",
              borderRadius: "16px",
              background: "#f5f5f5",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "900",
                marginBottom: "16px",
              }}
            >
              {isCorrect
                ? "⭕ CORRECT!"
                : "❌ WRONG"}
            </div>

            <div
              style={{
                fontSize: "17px",
                fontWeight: "800",
                marginBottom: "18px",
              }}
            >
              CORRECT ANSWER:{" "}
              {String.fromCharCode(
                65 + question.answer
              )}
              .{" "}
              {
                question.choices[
                  question.answer
                ]
              }
            </div>

            <div
              style={{
                marginBottom: "18px",
                lineHeight: "1.8",
              }}
            >
              <strong>SCRIPT</strong>
              <br />
              {question.audio}

              {question.type !==
                "response" &&
                question.question && (
                  <>
                    <br />
                    <strong>
                      Question:
                    </strong>{" "}
                    {question.question}
                  </>
                )}
            </div>

            <div
              style={{
                padding: "16px",
                background: "white",
                borderRadius: "12px",
                lineHeight: "1.8",
                marginBottom: "20px",
              }}
            >
              {question.translation}
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={playQuestion}
              >
                🔊 LISTEN AGAIN
              </button>

              <button
                type="button"
                onClick={goNext}
              >
                {questionIndex ===
                QUESTIONS.length - 1
                  ? "RESULT"
                  : "NEXT"}
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <button
            type="button"
            onClick={onBack}
          >
            ← BATTLE MAP
          </button>
        </div>
      </div>
    </div>
  );
}