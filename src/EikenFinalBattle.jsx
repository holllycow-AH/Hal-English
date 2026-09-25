import React, { useEffect, useState } from "react";

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
const WORD_POOL = [
  {
    id: "word-enough-1",
    type: "WORD",
    skill: "enough",
    prompt:
      "We have _____ chairs for everyone, so we don't need any more.",
    choices: [
      "enough",
      "still",
      "mean",
      "change",
    ],
    answer: "enough",
    translation:
      "全員分の椅子が十分にあるので、これ以上必要ありません。",
  },
  {
    id: "word-still-1",
    type: "WORD",
    skill: "still",
    prompt:
      "Ken started his homework an hour ago, and he is _____ working on it.",
    choices: [
      "still",
      "enough",
      "possible",
      "away",
    ],
    answer: "still",
    translation:
      "ケンは1時間前に宿題を始め、今もまだ取り組んでいます。",
  },
  {
    id: "word-take-1",
    type: "WORD",
    skill: "take",
    prompt:
      "It will _____ about thirty minutes to get to the station.",
    choices: [
      "take",
      "give",
      "mean",
      "find",
    ],
    answer: "take",
    translation:
      "駅に着くまで約30分かかります。",
  },
  {
    id: "word-change-1",
    type: "WORD",
    skill: "change",
    prompt:
      "Our plans may _____ if it rains tomorrow.",
    choices: [
      "change",
      "leave",
      "work",
      "call",
    ],
    answer: "change",
    translation:
      "明日雨が降れば、私たちの予定は変わるかもしれません。",
  },
];

// PHRASE
const PHRASE_POOL = [
  {
    id: "phrase-make-sure-1",
    type: "PHRASE",
    skill: "make sure",
    prompt:
      "Before you go to bed, _____ that the front door is locked.",
    choices: [
      "make sure",
      "call it a day",
      "give it a try",
      "change your mind",
    ],
    answer: "make sure",
    translation:
      "寝る前に、玄関のドアに鍵がかかっていることを確認してください。",
  },
  {
    id: "phrase-give-try-1",
    type: "PHRASE",
    skill: "give it a try",
    prompt:
      "This game looks difficult, but why don't you _____?",
    choices: [
      "give it a try",
      "put it away",
      "call me back",
      "turn it off",
    ],
    answer: "give it a try",
    translation:
      "このゲームは難しそうだけど、やってみたらどう？",
  },
  {
    id: "phrase-change-mind-1",
    type: "PHRASE",
    skill: "change your mind",
    prompt:
      "You can _____ later if you decide that you want to come with us.",
    choices: [
      "change your mind",
      "give me a hand",
      "call it a day",
      "get home",
    ],
    answer: "change your mind",
    translation:
      "あとで一緒に行きたいと思ったら、考えを変えてもいいですよ。",
  },
  {
    id: "phrase-call-day-1",
    type: "PHRASE",
    skill: "call it a day",
    prompt:
      "We've finished most of the work. Let's _____ and continue tomorrow.",
    choices: [
      "call it a day",
      "turn into a problem",
      "give it a try",
      "put it away",
    ],
    answer: "call it a day",
    translation:
      "仕事のほとんどが終わりました。今日はここまでにして、明日続きをしましょう。",
  },
];

// SENTENCE
const SENTENCE_POOL = [
  {
    id: "sentence-mean-1",
    type: "SENTENCE",
    skill: "mean to",
    translation:
      "昨日あなたに電話するつもりでしたが、忘れてしまいました。",
    parts: [
      "I meant",
      "to call you",
      "yesterday",
      "but I forgot",
    ],
    answer: [
      "I meant",
      "to call you",
      "yesterday",
      "but I forgot",
    ],
  },
  {
  id: "sentence-better-1",
  type: "SENTENCE",
  skill: "get better",
  translation:
    "毎日練習すれば、あなたの英語はもっと上達します。",
  parts: [
    "Your English",
    "will get better",
    "if you practice",
    "every day",
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
},
  {
    id: "sentence-put-away-1",
    type: "SENTENCE",
    skill: "put away",
    translation:
      "使い終わったら、本を片付けてください。",
    parts: [
      "Please put",
      "the books away",
      "when you",
      "finish using them",
    ],
    answer: [
      "Please put",
      "the books away",
      "when you",
      "finish using them",
    ],
    answers: [
  [
    "Please put",
    "the books away",
    "when you",
    "finish using them",
  ],
  [
    "when you",
    "finish using them",
    "Please put",
    "the books away",
  ],
],
  },
  {
    id: "sentence-turn-problem-1",
    type: "SENTENCE",
    skill: "turn into",
    translation:
      "小さな問題でも、無視すると大きな問題になることがあります。",
    parts: [
      "A small problem",
      "can turn into",
      "a bigger one",
      "if you ignore it",
    ],
    answer: [
      "A small problem",
      "can turn into",
      "a bigger one",
      "if you ignore it",
  ],
},
];

// LISTENING
const LISTENING_POOL = [
  {
    id: "listening-enough-1",
    type: "LISTENING",
    skill: "enough",
    audio:
      "Lisa wants to buy a new notebook. She has five dollars, and the notebook costs three dollars. She has enough money to buy it.",
    question:
      "Why can Lisa buy the notebook?",
    choices: [
      "She has enough money.",
      "Her friend will buy it.",
      "The notebook is free.",
      "She already has the notebook.",
    ],
    answer: "She has enough money.",
    translation:
      "リサは新しいノートを買いたいと思っています。5ドル持っていて、そのノートは3ドルです。彼女にはそれを買う十分なお金があります。",
  },
  {
    id: "listening-get-better-1",
    type: "LISTENING",
    skill: "get better",
    audio:
      "Tom was sick last week, so he stayed home from school. He is getting better now and plans to return to school tomorrow.",
    question:
      "What does Tom plan to do tomorrow?",
    choices: [
      "Return to school.",
      "Visit a doctor.",
      "Stay in bed.",
      "Go shopping.",
    ],
    answer: "Return to school.",
    translation:
      "トムは先週病気だったので学校を休みました。今はよくなってきていて、明日は学校に戻る予定です。",
  },
  {
    id: "listening-change-1",
    type: "LISTENING",
    skill: "change",
    audio:
      "Maya planned to go to the park on Saturday. However, the weather report says it will rain. She decided to change her plan and visit a museum instead.",
    question:
      "Why did Maya change her plan?",
    choices: [
      "Because it will rain.",
      "Because the museum is closed.",
      "Because she has to work.",
      "Because her friend is sick.",
    ],
    answer: "Because it will rain.",
    translation:
      "マヤは土曜日に公園へ行く予定でした。しかし天気予報では雨になると言っています。そこで予定を変え、代わりに博物館へ行くことにしました。",
  },
  {
    id: "listening-give-try-1",
    type: "LISTENING",
    skill: "give it a try",
    audio:
      "Ben has never cooked dinner for his family before. His sister tells him that making pasta is easy and says he should give it a try. Ben decides to cook pasta tonight.",
    question:
      "What will Ben do tonight?",
    choices: [
      "Cook pasta.",
      "Eat at a restaurant.",
      "Visit his sister.",
      "Buy a new pan.",
    ],
    answer: "Cook pasta.",
    translation:
      "ベンはこれまで家族の夕食を作ったことがありません。姉はパスタなら簡単だからやってみたらと言います。ベンは今夜パスタを作ることにしました。",
  },
];

// READING
const READING_POOL = [
  {
    id: "reading-library-1",
    type: "READING",
    skills: [
      "enough",
      "give it a try",
      "change",
    ],
    title: "A Different Place to Study",
    passage:
      "Ryan usually studied at home after school, but he often found it difficult to concentrate there. His younger brother watched television in the same room, and there was sometimes too much noise. One day, Ryan's teacher told him about a small study room at the local library. Ryan decided to give it a try. The room was quiet, and there were enough desks for students. After studying there for a week, Ryan changed his usual routine. Now he goes to the library three days a week and studies at home on the other days.",
    translation:
      "ライアンは普段、放課後に家で勉強していましたが、家では集中するのが難しいことがよくありました。弟が同じ部屋でテレビを見ていて、時々とても騒がしかったからです。ある日、先生が地域の図書館にある小さな自習室について教えてくれました。ライアンは試してみることにしました。その部屋は静かで、生徒が使える机も十分にありました。そこで1週間勉強したあと、ライアンは普段の生活を変えました。今では週3日は図書館へ行き、残りの日は家で勉強しています。",
    questions: [
      {
        question:
          "Why was it sometimes difficult for Ryan to study at home?",
        choices: [
          "There was too much noise.",
          "He did not have enough books.",
          "His teacher gave him too much homework.",
          "The library closed early.",
        ],
        answer:
          "There was too much noise.",
      },
      {
        question:
          "What did Ryan do after trying the library study room?",
        choices: [
          "He began using the library regularly.",
          "He stopped studying after school.",
          "He asked his brother to leave home.",
          "He decided to study only on weekends.",
        ],
        answer:
          "He began using the library regularly.",
      },
    ],
  },
  {
    id: "reading-club-1",
    type: "READING",
    skills: [
      "give it a try",
      "get better",
      "still",
    ],
    title: "Trying Something New",
    passage:
      "Emily had always enjoyed taking pictures with her phone, but she had never joined a photography club. When her school started a new club, her friend asked her to join. Emily was not sure at first because she did not know much about cameras. Her friend told her to give it a try. During the first meeting, an older student showed Emily how to take better pictures. Emily still has a lot to learn, but she now enjoys taking photos even more than before.",
    translation:
      "エミリーは以前からスマートフォンで写真を撮るのが好きでしたが、写真部に入ったことはありませんでした。学校に新しい写真部ができたとき、友達が彼女を誘いました。エミリーはカメラについてあまり知らなかったため、最初は迷っていました。友達はやってみたらと勧めました。最初の活動では、上級生がより良い写真の撮り方を教えてくれました。エミリーにはまだ学ぶことがたくさんありますが、今では以前よりさらに写真を撮ることを楽しんでいます。",
    questions: [
      {
        question:
          "Why was Emily unsure about joining the club?",
        choices: [
          "She did not know much about cameras.",
          "She did not like taking pictures.",
          "Her friend did not want to join.",
          "The club met too early.",
        ],
        answer:
          "She did not know much about cameras.",
      },
      {
        question:
          "What happened at the first club meeting?",
        choices: [
          "An older student taught Emily about taking pictures.",
          "Emily bought a new phone.",
          "The club went on a trip.",
          "Emily decided to leave the club.",
        ],
        answer:
          "An older student taught Emily about taking pictures.",
      },
    ],
  },
];

// ========================================
// CREATE ONE FINAL
// ========================================

function createFinalQuestions() {
  const wordQuestions =
    pickRandom(WORD_POOL, 2);

  const phraseQuestions =
    pickRandom(PHRASE_POOL, 2);

  const sentenceQuestions =
    pickRandom(SENTENCE_POOL, 2);

  const listeningQuestions =
    pickRandom(LISTENING_POOL, 2);

  // READING 1 passage = 2 questions
  const reading =
    pickRandom(READING_POOL, 1)[0];

  return shuffleArray([
    ...wordQuestions,
    ...phraseQuestions,
    ...sentenceQuestions,
    ...listeningQuestions,
    reading,
  ]);
}

// ========================================
// COMPONENT
// ========================================

export default function EikenFinalBattle({
  onBack,
}) {
  const [questions] =
    useState(() => createFinalQuestions());

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
      stage: 1,
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
        "eiken-pre2-rookie-stage1-final-cleared",
        "true"
      );
    }

    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h1>🏆 STAGE 1 FINAL</h1>

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
            🏆 STAGE 1 FINAL
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