import React, { useEffect, useState } from "react";

import {
  WORD_POOL,
  PHRASE_POOL,
  SENTENCE_POOL,
  LISTENING_POOL,
  READING_POOL,
} from "./data/final/stage1Final";

import {
  STAGE2_WORD_POOL,
  STAGE2_PHRASE_POOL,
  STAGE2_SENTENCE_POOL,
  STAGE2_LISTENING_POOL,
  STAGE2_READING_POOL,
} from "./data/final/stage2Final";


// ========================================
// SOUND
// ========================================

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

// ========================================
// SPEECH
// ========================================

function speakEnglish(text, rate = 0.7) {
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

    // FINAL LISTENINGもROOKIE速度
  utterance.rate = rate;

    synth.speak(utterance);
  };

  speakWithSamantha();
}

// ========================================
// HELPERS
// ========================================

function shuffleArray(array) {
  const copied = [...array];

  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [copied[i], copied[j]] = [
      copied[j],
      copied[i],
    ];
  }

  return copied;
}

function pickRandom(array, count) {
  return shuffleArray(array).slice(0, count);
}

// ========================================
// QUESTION POOLS
// ========================================

// WORD


// ========================================
// STAGE 2 FINAL — ORIGINAL WORD
// ========================================



// PHRASE


// ========================================
// STAGE 2 FINAL — ORIGINAL PHRASE
// ========================================



// SENTENCE


// ========================================
// STAGE 2 FINAL — ORIGINAL SENTENCE
// ========================================



// LISTENING


// ========================================
// STAGE 2 FINAL — ORIGINAL LISTENING
// ========================================



// READING

// ========================================
// CREATE ONE FINAL
// ========================================

// ========================================
// STAGE 2 READING
// ========================================


// ========================================
// STAGE 2 FINAL — ORIGINAL READING
// ========================================




function createFinalQuestions(stage) {
  const wordPool =
    stage === 2 ? STAGE2_WORD_POOL : WORD_POOL;

  const phrasePool =
    stage === 2 ? STAGE2_PHRASE_POOL : PHRASE_POOL;

  const sentencePool =
    stage === 2 ? STAGE2_SENTENCE_POOL : SENTENCE_POOL;

  const listeningPool =
    stage === 2 ? STAGE2_LISTENING_POOL : LISTENING_POOL;

  const readingPool =
    stage === 2 ? STAGE2_READING_POOL : READING_POOL;

  
  // 正解の単語はそのままに、選択肢の表示順だけをランダムにする
  const shuffleChoices = (questions) =>
    questions.map((q) => ({
      ...q,
      choices: Array.isArray(q.choices)
        ? shuffleArray([...q.choices])
        : q.choices,
    }));

  const wordQuestions = shuffleChoices(pickRandom(wordPool, 2));
  const phraseQuestions = shuffleChoices(pickRandom(phrasePool, 2));
  const sentenceQuestions = shuffleChoices(pickRandom(sentencePool, 2));
  const listeningQuestions = shuffleChoices(pickRandom(listeningPool, 2));
  const reading = pickRandom(readingPool, 1)[0];


  return [
    ...shuffleArray([
      ...wordQuestions,
      ...phraseQuestions,
      ...sentenceQuestions,
      ...listeningQuestions,
    ]),
    reading,
  ];
}


// ========================================
// COMPONENT
// ========================================

export default function EikenFinalBattle({
  onBack,
  stage = 1,
}) {
  const [questions] =
    useState(() => createFinalQuestions(stage));

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
    

  const [sentenceParts, setSentenceParts] =
    useState([]);

  const [sentenceChoices, setSentenceChoices] =
    useState([]);

  const [hasPlayed, setHasPlayed] =
    useState(false);

  const [readingAnswers, setReadingAnswers] =
    useState([null, null]);

  const [showTranslation, setShowTranslation] =
    useState(false);

  const question = questions[questionIndex];
  useEffect(() => {
  prepareSentence(question);
}, []);

  // 9 cards, but READING has 2 questions
  const TOTAL_POINTS = 10;

  function prepareSentence(currentQuestion) {
    if (currentQuestion.type !== "SENTENCE") {
      setSentenceParts([]);
      setSentenceChoices([]);
      return;
    }

    setSentenceParts([]);
    setSentenceChoices(
      shuffleArray(currentQuestion.parts)
    );
  }

  function chooseSentencePart(part) {
    if (answered) return;

    setSentenceParts((prev) => [
      ...prev,
      part,
    ]);

    setSentenceChoices((prev) => {
      const index = prev.indexOf(part);

      if (index === -1) return prev;

      return prev.filter(
        (_, i) => i !== index
      );
    });
  }

  function removeSentencePart(part, index) {
    if (answered) return;

    setSentenceParts((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setSentenceChoices((prev) => [
      ...prev,
      part,
    ]);
  }

  function playListening() {
    if (
      question.type !== "LISTENING"
    ) {
      return;
    }

    if (hasPlayed && !answered) return;

    speakEnglish(
      `${question.audio} ${question.question}`
    );

    setHasPlayed(true);
  }

  function checkAnswer() {
    if (answered) return;

    if (question.type === "SENTENCE") {
  if (sentenceParts.length === 0) return;

  const normalizePart = (text) =>
    text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .trim();

  const validAnswers =
    question.answers || [question.answer];

  const correct = validAnswers.some(
    (answerPattern) =>
      sentenceParts.length ===
        answerPattern.length &&
      sentenceParts.every(
        (part, index) =>
          normalizePart(part) ===
          normalizePart(answerPattern[index])
      )
  );

if (correct) {
  setCorrectCount((prev) => prev + 1);
  playCorrectSound();
} else {
  playWrongSound();
}

const spokenEnglish = correct
  ? sentenceParts.join(" ") + "."
  : question.answer.join(" ") + ".";

setTimeout(() => {
  speakEnglish(spokenEnglish, 1.0);
}, 500);

setAnswered(true);
return;
}

    if (question.type === "READING") {
      if (
        readingAnswers.some(
          (answer) => answer === null
        )
      ) {
        return;
      }

      let readingCorrect = 0;

      question.questions.forEach(
        (readingQuestion, index) => {
          if (
            readingAnswers[index] ===
            readingQuestion.answer
          ) {
            readingCorrect += 1;
          }
        }
      );

      setCorrectCount(
        (prev) => prev + readingCorrect
      );

      if (
        readingCorrect ===
        question.questions.length
      ) {
        playCorrectSound();
      } else {
        playWrongSound();
      }

      setAnswered(true);
      return;
    }

    if (selectedAnswer === null) return;

const correct =
  selectedAnswer === question.answer;

if (correct) {
  setCorrectCount((prev) => prev + 1);
  playCorrectSound();
} else {
  playWrongSound();
}

if (
  question.type === "WORD" ||
  question.type === "PHRASE"
) {
  const fullSentence =
    question.prompt.replace(
      "_____",
      question.answer
    );

setTimeout(() => {
  speakEnglish(fullSentence, 1.0);
}, 500);
}

setAnswered(true);
}
function goNext() {
  if (
    questionIndex ===
    questions.length - 1
  ) {
    const finalScore = Math.round(
      (correctCount / TOTAL_POINTS) * 100
    );

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
      battleType: "FINAL",
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
    const nextQuestion =
      questions[nextIndex];

    setQuestionIndex(nextIndex);
    setSelectedAnswer(null);
    setAnswered(false);
    setHasPlayed(false);
    setReadingAnswers([null, null]);
    setShowTranslation(false);

    prepareSentence(nextQuestion);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const score = Math.round(
    (correctCount / TOTAL_POINTS) * 100
  );

  // ========================================
  // RESULT
  // ========================================

  if (finished) {
    const win = score >= 80;

    if (win) {
      localStorage.setItem(
       `eiken-pre2-rookie-stage${stage}-final-cleared`,
        "true"
      );
    }

    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h1>🏆 STAGE {stage} FINAL</h1>

          <h2>BATTLE COMPLETE</h2>

          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              margin: "28px 0 8px",
            }}
          >
            {correctCount} / {TOTAL_POINTS}
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "900",
              marginBottom: "12px",
            }}
          >
            SCORE {score}%
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: "900",
              marginBottom: "30px",
            }}
          >
            {win
              ? "🏆 FINAL CLEARED!"
              : "💥 TRY AGAIN"}
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

  // ========================================
  // COMMON ANSWER
  // ========================================

  const normalCorrect =
    question.type !== "READING" &&
    question.type !== "SENTENCE"
      ? selectedAnswer === question.answer
      : false;
      const sentenceCorrect =
  question.type === "SENTENCE"
    ? (question.answers || [question.answer]).some(
        (answerPattern) =>
          sentenceParts.length ===
            answerPattern.length &&
          sentenceParts.every(
            (part, index) =>
              part
                .toLowerCase()
                .replace(/[.,!?]/g, "")
                .trim() ===
              answerPattern[index]
                .toLowerCase()
                .replace(/[.,!?]/g, "")
                .trim()
          )
      )
    : false;

  // ========================================
  // SCREEN
  // ========================================

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "26px",
          }}
        >
          <h1
            style={{
              marginBottom: "8px",
            }}
          >
            🏆 STAGE {stage} FINAL
          </h1>

          <div
            style={{
              fontWeight: "800",
            }}
          >
            FINAL BATTLE　{" "}
            {questionIndex + 1} /{" "}
            {questions.length}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "900",
            letterSpacing: "0.12em",
            opacity: 0.55,
            marginBottom: "24px",
          }}
        >
          {question.type}
        </div>

        {/* WORD / PHRASE */}
        {(question.type === "WORD" ||
          question.type === "PHRASE") && (
          <>
            <div style={promptStyle}>
              {question.prompt}
            </div>

            <ChoiceButtons
              choices={question.choices}
              selectedAnswer={selectedAnswer}
              answered={answered}
              onChoose={setSelectedAnswer}
            />
          </>
        )}

        {/* SENTENCE */}
        {question.type === "SENTENCE" && (
          <>
            <div style={promptStyle}>
              {question.translation}
            </div>

            <div style={sentenceBoxStyle}>
              {sentenceParts.length === 0 ? (
                <span
                  style={{
                    opacity: 0.35,
                  }}
                >
                  Build the sentence
                </span>
              ) : (
                sentenceParts.map(
                  (part, index) => (
                    <button
                      key={`${part}-${index}`}
                      type="button"
                      disabled={answered}
                      onClick={() =>
                        removeSentencePart(
                          part,
                          index
                        )
                      }
                    >
                      {part}
                    </button>
                  )
                )
              )}
            </div>

            <div style={choiceWrapStyle}>
              {sentenceChoices.map(
                (part, index) => (
                  <button
                    key={`${part}-${index}`}
                    type="button"
                    disabled={answered}
                    onClick={() =>
                      chooseSentencePart(part)
                    }
                  >
                    {part}
                  </button>
                )
              )}
            </div>
          </>
        )}

        {/* LISTENING */}
        {question.type === "LISTENING" && (
          <>
            <div
              style={{
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              <button
                type="button"
                onClick={playListening}
                disabled={
                  hasPlayed && !answered
                }
                style={{
                  fontSize: "19px",
                  padding: "13px 28px",
                }}
              >
                🔊{" "}
                {!hasPlayed
                  ? "PLAY"
                  : answered
                  ? "LISTEN AGAIN"
                  : "PLAYED"}
              </button>
            </div>

            <div style={promptStyle}>
              {question.question}
            </div>

            <ChoiceButtons
              choices={question.choices}
              selectedAnswer={selectedAnswer}
              answered={answered}
              disabled={!hasPlayed}
              onChoose={setSelectedAnswer}
            />
          </>
        )}

        {/* READING */}
        {question.type === "READING" && (
          <>
            <h2
              style={{
                textAlign: "center",
              }}
            >
              {question.title}
            </h2>

            <div
              style={{
                fontSize: "18px",
                lineHeight: "1.9",
                margin: "22px 0 30px",
                padding: "22px",
                background: "#f8fafc",
                borderRadius: "14px",
              }}
            >
              {question.passage}
            </div>

            {question.questions.map(
              (readingQuestion, qIndex) => (
                <div
                  key={qIndex}
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                      marginBottom: "12px",
                    }}
                  >
                    {qIndex + 1}.{" "}
                    {
                      readingQuestion.question
                    }
                  </div>

                  <ChoiceButtons
                    choices={
                      readingQuestion.choices
                    }
                    selectedAnswer={
                      readingAnswers[qIndex]
                    }
                    answered={answered}
                    onChoose={(choice) => {
                      setReadingAnswers(
                        (prev) => {
                          const next = [...prev];
                          next[qIndex] = choice;
                          return next;
                        }
                      );
                    }}
                  />

                  {answered && (
                    <div
                      style={{
                        marginTop: "10px",
                        fontWeight: "800",
                      }}
                    >
                      {readingAnswers[
                        qIndex
                      ] ===
                      readingQuestion.answer
                        ? "⭕ CORRECT"
                        : `❌ WRONG　ANSWER: ${readingQuestion.answer}`}
                    </div>
                  )}
                </div>
              )
            )}
          </>
        )}

        {/* CHECK */}
        {!answered && (
          <div
            style={{
              textAlign: "center",
              marginTop: "28px",
            }}
          >
            <button
              type="button"
              onClick={checkAnswer}
              style={{
                padding: "12px 30px",
                fontSize: "18px",
              }}
            >
              CHECK
            </button>
          </div>
        )}

        {/* FEEDBACK */}
        {answered &&
          question.type !== "READING" && (
            <div style={feedbackStyle}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  marginBottom: "14px",
                }}
              >
{question.type === "SENTENCE"
  ? sentenceCorrect
    ? "⭕ CORRECT!"
    : "❌ WRONG"
  : normalCorrect
  ? "⭕ CORRECT!"
  : "❌ WRONG"}
              </div>

              {question.type ===
                "SENTENCE" ? (
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: "800",
                    marginBottom: "12px",
                  }}
                >
                  ANSWER:{" "}
                  {question.answer.join(" ")}.
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: "800",
                    marginBottom: "12px",
                  }}
                >
                  ANSWER: {question.answer}
                </div>
              )}

              {question.type ===
                "LISTENING" && (
                <>
                  <div
                    style={{
                      textAlign: "left",
                      lineHeight: "1.7",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>SCRIPT</strong>
                    <br />
                    {question.audio}
                  </div>

                  <button
                    type="button"
                    onClick={playListening}
                    style={{
                      marginBottom: "16px",
                    }}
                  >
                    🔊 LISTEN AGAIN
                  </button>
                </>
              )}

              <div
                style={{
                  lineHeight: "1.7",
                  marginBottom: "18px",
                }}
              >
                {question.translation}
              </div>
            </div>
          )}

        {/* READING TRANSLATION */}
        {answered &&
          question.type === "READING" && (
            <div style={feedbackStyle}>
              <button
                type="button"
                onClick={() =>
                  setShowTranslation(
                    (prev) => !prev
                  )
                }
                style={{
                  marginBottom: "16px",
                }}
              >
                {showTranslation
                  ? "和訳を閉じる"
                  : "和訳を見る"}
              </button>

              {showTranslation && (
                <div
                  style={{
                    lineHeight: "1.8",
                    textAlign: "left",
                  }}
                >
                  {question.translation}
                </div>
              )}
            </div>
          )}

        {/* NEXT */}
        {answered && (
          <div
            style={{
              textAlign: "center",
              marginTop: "22px",
            }}
          >
            <button
              type="button"
              onClick={goNext}
              style={{
                padding: "12px 28px",
                fontSize: "18px",
              }}
            >
              {questionIndex ===
              questions.length - 1
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

// ========================================
// SMALL COMPONENT
// ========================================

function ChoiceButtons({
  choices,
  selectedAnswer,
  answered,
  disabled = false,
  onChoose,
}) {
  return (
    <div style={choiceListStyle}>
      {choices.map((choice, index) => {
        const selected =
          selectedAnswer === choice;

        return (
          <button
            key={`${choice}-${index}`}
            type="button"
            disabled={
              answered || disabled
            }
            onClick={() =>
              onChoose(choice)
            }
            style={{
              textAlign: "left",
              padding: "14px 18px",
              fontSize: "17px",
              background: selected
                ? "#dbeafe"
                : "#f3f4f6",
              color: "#111",
              border: selected
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
      })}
    </div>
  );
}

// ========================================
// STYLES
// ========================================

const pageStyle = {
  minHeight: "100vh",
  padding: "32px 20px",
  background: "#f3f4f6",
};

const cardStyle = {
  maxWidth: "820px",
  margin: "0 auto",
  background: "white",
  padding: "34px",
  borderRadius: "22px",
};

const promptStyle = {
  fontSize: "21px",
  fontWeight: "800",
  lineHeight: "1.7",
  textAlign: "center",
  marginBottom: "24px",
};

const choiceListStyle = {
  display: "grid",
  gap: "12px",
  maxWidth: "680px",
  margin: "0 auto",
};

const choiceWrapStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "12px",
  marginBottom: "20px",
};

const sentenceBoxStyle = {
  minHeight: "75px",
  border: "2px solid #d1d5db",
  borderRadius: "14px",
  padding: "14px",
  marginBottom: "22px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

const feedbackStyle = {
  marginTop: "28px",
  padding: "22px",
  borderRadius: "16px",
  background: "#f5f5f5",
  textAlign: "center",
};