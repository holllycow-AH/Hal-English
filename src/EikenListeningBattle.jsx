import { QUESTIONS } from "./data/battle/listening/stage1Listening";
import { STAGE2_QUESTIONS } from "./data/battle/listening/stage2Listening";

import React, { useState } from "react";




export default function EikenListeningBattle({ onBack, stage = 1 }) {
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

const activeQuestions = stage === 2 ? STAGE2_QUESTIONS : QUESTIONS;
const question = activeQuestions[questionIndex];
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
      activeQuestions.length - 1
    ) {
     const finalCorrectCount = correctCount;

const finalScore = Math.round(
  (finalCorrectCount / activeQuestions.length) * 100
);

      const today =
        new Date().toLocaleDateString(
          "en-CA"
        );

      localStorage.setItem(
        `eiken-pre2-rookie-stage${stage}-listening-lastCompletedDate`,
        today
      );

      if (finalScore >= 80) {
        localStorage.setItem(
          `eiken-pre2-rookie-stage${stage}-listening-cleared`,
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
  stage,
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
    (correctCount / activeQuestions.length) *
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
            {activeQuestions.length}
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
            STAGE {stage}　QUESTION{" "}
            {questionIndex + 1} /{" "}
            {activeQuestions.length}
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
                activeQuestions.length - 1
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