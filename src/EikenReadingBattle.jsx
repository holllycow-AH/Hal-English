import { PASSAGES } from "./data/battle/reading/stage1Reading";
import { STAGE2_PASSAGES } from "./data/battle/reading/stage2Reading";

import React, { useState } from "react";


export default function EikenReadingBattle({ onBack, stage = 1 }) {
    const activePassages =
    stage === 2 ? STAGE2_PASSAGES : PASSAGES;
  const [passageIndex, setPassageIndex] = useState(0);
  const [answers, setAnswers] = useState([null, null, null]);
  const [checked, setChecked] = useState(false);
  const [showJapanese, setShowJapanese] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const today = new Date().toLocaleDateString("en-CA");

const lastCompletedDate = localStorage.getItem(
  `eiken-pre2-rookie-stage${stage}-reading-lastCompletedDate`
);

const [battleStarted, setBattleStarted] = useState(false);

const alreadyPlayedToday =
  lastCompletedDate === today && !battleStarted;

  const passage = activePassages[passageIndex];

  function chooseAnswer(questionIndex, choiceIndex) {
    if (checked) return;

    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = choiceIndex;
      return next;
    });
  }

  const allAnswered = answers.every(
    (answer) => answer !== null
  );

  function checkAnswers() {
    if (!allAnswered || checked) return;
setBattleStarted(true);

if (passageIndex === 0) {
  localStorage.setItem(
    `eiken-pre2-rookie-stage${stage}-reading-lastCompletedDate`,
    today
  );
}
    const passageCorrect = passage.questions.reduce(
      (total, question, index) =>
        total +
        (answers[index] === question.answer ? 1 : 0),
      0
    );

    setCorrectCount(
      (prev) => prev + passageCorrect
    );
    setChecked(true);
  }

  function goNext() {
    if (passageIndex === activePassages.length - 1) {
      const totalQuestions = activePassages.reduce(
        (total, item) =>
          total + item.questions.length,
        0
      );

      const score =
        (correctCount / totalQuestions) * 100;

      const today =
        new Date().toLocaleDateString("en-CA");

      localStorage.setItem(
       `eiken-pre2-rookie-stage${stage}-reading-lastCompletedDate`,
        today
      );

      if (score >= 80) {
  localStorage.setItem(
   `eiken-pre2-rookie-stage${stage}-reading-cleared`,
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
  stage,
  battleType: "READING",
  score: score,
};

localStorage.setItem(
  "eikenBattleHistory",
  JSON.stringify([...oldHistory, newRecord])
);

setFinished(true);
      return;
    }

    setPassageIndex((prev) => prev + 1);
    setAnswers([null, null, null]);
    setChecked(false);
    setShowJapanese(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const totalQuestions = activePassages.reduce(
    (total, item) =>
      total + item.questions.length,
    0
  );

  const score = Math.round(
    (correctCount / totalQuestions) * 100
  );
if (alreadyPlayedToday) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        textAlign: "center",
        background: "#f3f4f6",
      }}
    >
      <h1>📖 READING BATTLE</h1>

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
          <h1>📖 READING BATTLE</h1>

          <h2>BATTLE COMPLETE</h2>

          <div
            style={{
              fontSize: "46px",
              fontWeight: "900",
              margin: "25px 0 10px",
            }}
          >
            {correctCount} / {totalQuestions}
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
            {score >= 80 ? "🏆 WIN!" : "💥 LOSE"}
          </div>

          <button type="button" onClick={onBack}>
            ← BATTLE MAP
          </button>
        </div>
      </div>
    );
  }

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
          maxWidth: "900px",
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
            📖 READING BATTLE
          </h1>

          <div style={{ fontWeight: "700" }}>
            STAGE {stage}　PASSAGE{" "}
            {passageIndex + 1} / {activePassages.length}
          </div>
        </div>

        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto 34px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "22px",
            }}
          >
            {passage.title}
          </h2>

          <div
            style={{
              fontSize: "18px",
              lineHeight: "1.9",
              whiteSpace: "pre-line",
              textAlign: "left",
            }}
          >
            {passage.text}
          </div>

          {checked && (
            <div
              style={{
                textAlign: "center",
                marginTop: "24px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setShowJapanese((prev) => !prev)
                }
                style={{
                  padding: "8px 18px",
                  fontSize: "14px",
                }}
              >
                {showJapanese
                  ? "日本語を閉じる"
                  : "日本語を見る"}
              </button>
            </div>
          )}

          {checked && showJapanese && (
            <div
              style={{
                marginTop: "20px",
                padding: "22px",
                background: "#f7f7f7",
                borderRadius: "14px",
                fontSize: "16px",
                lineHeight: "1.9",
                whiteSpace: "pre-line",
                textAlign: "left",
              }}
            >
              {passage.translation}
            </div>
          )}
        </div>

        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          {passage.questions.map(
            (question, questionIndex) => {
              const selected =
                answers[questionIndex];

              const isCorrect =
                selected === question.answer;

              return (
                <div
                  key={questionIndex}
                  style={{
                    marginBottom: "34px",
                    paddingTop:
                      questionIndex === 0
                        ? "0"
                        : "26px",
                    borderTop:
                      questionIndex === 0
                        ? "none"
                        : "1px solid #ddd",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                      marginBottom: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    QUESTION {questionIndex + 1}
                    <br />
                    {question.question}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: "10px",
                    }}
                  >
                    {question.choices.map(
                      (choice, choiceIndex) => {
                        const chosen =
                          selected === choiceIndex;

                        return (
                          <button
                            key={choiceIndex}
                            type="button"
                            disabled={checked}
                            onClick={() =>
                              chooseAnswer(
                                questionIndex,
                                choiceIndex
                              )
                            }
                            style={{
                              textAlign: "left",
                              padding: "13px 16px",
                              fontSize: "16px",
                              background: chosen
                                ? "#dbeafe"
                                : "#f3f4f6",
                              color: "#111",
                              border: chosen
                                ? "2px solid #2563eb"
                                : "2px solid transparent",
                              borderRadius: "12px",
                              cursor: checked
                                ? "default"
                                : "pointer",
                            }}
                          >
                            {String.fromCharCode(
                              65 + choiceIndex
                            )}
                            . {choice}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {checked && (
                    <div
                      style={{
                        marginTop: "16px",
                        padding: "18px",
                        background: "#f5f5f5",
                        borderRadius: "14px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "21px",
                          fontWeight: "900",
                          marginBottom: "10px",
                        }}
                      >
                        {isCorrect
                          ? "⭕ CORRECT"
                          : "❌ WRONG"}
                      </div>

                      <div
                        style={{
                          fontSize: "17px",
                          fontWeight: "800",
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

                      {!isCorrect && (
                        <div
                          style={{
                            marginTop: "14px",
                            lineHeight: "1.7",
                          }}
                        >
                          <strong>
                            🔎 EVIDENCE
                          </strong>
                          <br />
                          {question.evidence}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}

          {!checked ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "12px",
              }}
            >
              <button
                type="button"
                onClick={checkAnswers}
                disabled={!allAnswered}
                style={{
                  padding: "13px 28px",
                  fontSize: "18px",
                  opacity: allAnswered ? 1 : 0.4,
                }}
              >
                CHECK ANSWERS
              </button>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                onClick={goNext}
                style={{
                  padding: "13px 28px",
                  fontSize: "18px",
                }}
              >
                {passageIndex ===
                activePassages.length - 1
                  ? "RESULT"
                  : "NEXT PASSAGE"}
              </button>
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
    </div>
  );
}