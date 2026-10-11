
import { useState } from "react";
const placeholderStyle = `
  .mywords-answer::placeholder {
    color: #c4c9d2;
  opacity: 0.80;
  }
`;
// 英単語・フレーズをSamanthaで読み上げる
const speakEnglish = (text) => {
  if (!text || !window.speechSynthesis) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const speak = () => {
    const voices = synth.getVoices();

    const samantha = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes("samantha") &&
        voice.lang.startsWith("en")
    );

    const englishVoice = voices.find(
      (voice) => voice.lang === "en-US"
    );

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.volume = 1;

    if (samantha) {
      utterance.voice = samantha;
    } else if (englishVoice) {
      utterance.voice = englishVoice;
    }

    synth.speak(utterance);
  };

  // 音声一覧がまだ読み込まれていない場合は少し待つ
  if (synth.getVoices().length === 0) {
    setTimeout(speak, 300);
  } else {
    speak();
  }
};
// 正解音：ピンポン♪
const playCorrectSound = () => {
  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  const audioCtx = new AudioContextClass();
  const now = audioCtx.currentTime;

  [784, 1046.5].forEach((frequency, index) => {
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const start = now + index * 0.16;

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start(start);
    oscillator.stop(start + 0.36);
  });

  setTimeout(() => audioCtx.close(), 800);
};
export default function EikenMyWords({ onBack }) {
  const [creating, setCreating] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [openBookId, setOpenBookId] = useState(null);
const [english, setEnglish] = useState("");
const [japanese, setJapanese] = useState("");
const [testMode, setTestMode] = useState(null);
const [testWords, setTestWords] = useState([]);
const [testIndex, setTestIndex] = useState(0);
const [testAnswer, setTestAnswer] = useState("");
const [practiceMode, setPracticeMode] = useState("test");
const [testResult, setTestResult] = useState(null);
const [correctCount, setCorrectCount] = useState(0);
const [testFinished, setTestFinished] = useState(false);
const [testRetry, setTestRetry] = useState(false);
const [showSpellingHint, setShowSpellingHint] = useState(false);
  const [books, setBooks] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("hal_my_words_books")) || [];
  } catch {
    return [];
  }
});
const openBook = books.find((book) => book.id === openBookId);
const playerName = localStorage.getItem("playerName") || "";
const [learningLogs, setLearningLogs] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("hal_my_words_logs") || "[]"
    );
  } catch {
    return [];
  }
});

const deleteBook = () => {
  if (!openBook) return;

  const ok = window.confirm(
    `「${openBook.title}」を削除しますか？\n登録された単語もすべて削除されます。`
  );

  if (!ok) return;

  const updatedBooks = books.filter(
    (book) => book.id !== openBookId
  );

  saveBooks(updatedBooks);
  setOpenBookId(null);
};

const startTest = (type, mode = "test") => {
  if (!openBook) return;

  const selectedWords =
    type === "pin"
      ? openBook.words.filter((word) => word.pinned)
      : openBook.words;

  if (selectedWords.length === 0) return;

  setTestWords([...selectedWords]);
  setTestIndex(0);
  setTestAnswer("");
  setPracticeMode(mode);
  setTestMode(type);
  setCorrectCount(0);
setTestFinished(false);
setTestRetry(false);
setShowSpellingHint(false);
};



const checkTestAnswer = () => {
  const correctAnswer = testWords[testIndex]?.english || "";

  const isCorrect =
    testAnswer.trim().toLowerCase() ===
    correctAnswer.trim().toLowerCase();

  // TESTで間違えた後の打ち直し練習
  if (practiceMode === "test" && testRetry) {
if (testResult === "wrong") {
  setTestAnswer("");
  setTestResult(null);
  setShowSpellingHint(true);
  return;
}
    if (testResult === "correct") {
      // 打ち直し正解後、次の問題へ
      if (testIndex < testWords.length - 1) {
        setTestIndex((prev) => prev + 1);
   } else {
  saveLearningLog({
    mode: practiceMode,
    type: testMode,
    total: testWords.length,
    correct: correctCount,
  });

  setTestFinished(true);
}
      setTestAnswer("");
      setTestResult(null);
      setTestRetry(false);
      setShowSpellingHint(false);
      return;
    }

if (isCorrect) {
  playCorrectSound();
  setTimeout(() => speakEnglish(correctAnswer), 450);
  setTestResult("correct");
} else {
    playWrongSound();
      setTestResult("wrong");
    }
    return;
  }

  // 通常の採点後
  if (testResult !== null) {
    // TRAININGで間違えたら同じ問題をやり直す
    if (practiceMode === "training" && testResult === "wrong") {
      setTestAnswer("");
      setTestResult(null);
      return;
    }

    // 次の問題へ
    if (testIndex < testWords.length - 1) {
      setTestIndex((prev) => prev + 1);
} else {
  saveLearningLog({
    mode: practiceMode,
    type: testMode,
    total: testWords.length,
    correct: correctCount,
  });

  setTestFinished(true);
}

    setTestAnswer("");
    setTestResult(null);
    setTestRetry(false);
    return;
  }

  // 初回の回答を採点
if (isCorrect) {
  playCorrectSound();
  setTimeout(() => speakEnglish(correctAnswer), 450);
  setCorrectCount((prev) => prev + 1);
    setTestResult("correct");
  } else {
      playWrongSound();
    setTestResult("wrong");

    if (practiceMode === "test") {
      setTestRetry(true);
      setTestAnswer("");
    }
  }
};

// 不正解音：クイズ番組風「ブーーー！」
const playWrongSound = () => {
  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  const audioCtx = new AudioContextClass();
  const now = audioCtx.currentTime;
  const duration = 0.3;

  [130, 136].forEach((frequency) => {
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = "sawtooth";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.02);
    gain.gain.setValueAtTime(0.045, now + duration - 0.08);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + duration
    );

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  });

  setTimeout(() => audioCtx.close(), 900);
};

const saveBooks = (updatedBooks) => {
  setBooks(updatedBooks);
  localStorage.setItem(
    "hal_my_words_books",
    JSON.stringify(updatedBooks)
  );
};
const saveLearningLog = (log) => {
  const isTraining = log.mode === "training";

  const storageKey = isTraining
    ? "eikenTrainingHistory"
    : "eikenBattleHistory";

  const existingLogs = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
  );

  const newRecord = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    playerName: localStorage.getItem("playerName") || "",
    rank: "MY WORDS",
    stage: "-",
    set: log.bookTitle || openBook?.title || "",
    lap: 1,
    battleType: log.type === "pin" ? "📍 TEST" : "TEST",
    score: log.total > 0 ? (log.correct / log.total) * 100 : 0,
  };

  localStorage.setItem(
    storageKey,
    JSON.stringify([newRecord, ...existingLogs])
  );
};
const togglePin = (wordId) => {
  const updatedBooks = books.map((book) =>
    book.id === openBookId
      ? {
          ...book,
          words: book.words.map((word) =>
            word.id === wordId
              ? { ...word, pinned: !word.pinned }
              : word
          ),
        }
      : book
  );

  saveBooks(updatedBooks);
};
const renameBook = () => {
  if (!openBook) return;

  const newTitle = window.prompt(
    "新しい単語帳のタイトルを入力してください",
    openBook.title
  );

  if (newTitle === null) return;

  const trimmedTitle = newTitle.trim();
  if (!trimmedTitle) {
    window.alert("タイトルを入力してください");
    return;
  }

  const updatedBooks = books.map((book) =>
    book.id === openBookId
      ? { ...book, title: trimmedTitle }
      : book
  );

  saveBooks(updatedBooks);
};
const addWord = () => {
  if (!openBook || !english.trim() || !japanese.trim()) return;

  const newWord = {
    id: crypto.randomUUID(),
    english: english.trim(),
    japanese: japanese.trim(),
    pinned: false,
  };

  const updatedBooks = books.map((book) =>
    book.id === openBookId
      ? { ...book, words: [...book.words, newWord] }
      : book
  );

  saveBooks(updatedBooks);
  setEnglish("");
  setJapanese("");
};
if (openBook && testMode === null) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 30px",
        background: "#f7f8fc",
        color: "#222",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <button onClick={() => setOpenBookId(null)}>
          ← MY WORDS
        </button>

<div
  style={{
    display: "table",
    margin: "30px auto 0",
    padding: "18px 45px",
    background: "white",
    border: "2px solid #111827",
    borderRadius: "12px",
    textAlign: "center",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "30px",
      fontWeight: "bold",
      color: "#111827",
    }}
  >
    {openBook.title}
  </h1>
</div>

        <p style={{ textAlign: "center", color: "#888" }}>
          {openBook.words.length} words
        </p>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    margin: "25px 0 16px",
    flexWrap: "wrap",
  }}
>
  <button
 onClick={() => startTest("all", "training")}
    disabled={openBook.words.length === 0}
    style={{
      padding: "14px 24px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "12px",
      border: "1px solid #cbd5e1",
      background: "#e1e7f0",
      color: "#111827",
      cursor: "pointer",
    }}
  >
  TRAINING　🏋️
  </button>

  <button
onClick={() => startTest("all")}
    disabled={openBook.words.length === 0}
    style={{
      padding: "14px 24px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "12px",
      border: "none",
      background: "#111827",
      color: "white",
      cursor: "pointer",
    }}
  >
    TEST
  </button>
  <button
 onClick={() => startTest("pin", "training")}
    disabled={!openBook.words.some((word) => word.pinned)}
    style={{
      padding: "14px 24px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "12px",
      border: "1px solid #cbd5e1",
      background: "#e1e7f0",
      color: "#111827",
      cursor: "pointer",
    }}
  >
    📍　TRAINING　🏋️‍♀️
  </button>


  <button
onClick={() => startTest("pin")}
    disabled={!openBook.words.some((word) => word.pinned)}
    style={{
      padding: "14px 24px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "12px",
      border: "none",
      background: "#111827",
      color: "white",
      cursor: "pointer",
    }}
  >
    📍 TEST
  </button>
</div>
<button
  onClick={deleteBook}
  style={{
    display: "block",
    margin: "35px auto 20px",
    padding: "10px 20px",
    fontSize: "15px",
    color: "#dc2626",
    background: "transparent",
    border: "1px solid #dc2626",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  🗑 DELETE BOOK
</button>
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginTop: "35px",
          }}
        >
          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3>ENGLISH</h3>
              <textarea
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                placeholder="Word / Phrase"
                rows={2}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "15px",
                  fontSize: "24px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  height: "110px",
minHeight: "110px",
maxHeight: "110px",
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h3>日本語</h3>
              <textarea
                value={japanese}
                onChange={(e) => setJapanese(e.target.value)}
                placeholder="意味を入力"
                rows={2}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "15px",
                  fontSize: "24px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  height: "110px",
                  minHeight: "110px",
                  maxHeight: "110px",
                }}
              />
            </div>
          </div>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button
              onClick={addWord}
              disabled={!english.trim() || !japanese.trim()}
              style={{
                padding: "12px 25px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              ＋ ADD WORD
            </button>
          </div>
        </div>

        <div style={{ marginTop: "35px" }}>
          {openBook.words.map((word) => (
            <div
              key={word.id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "12px",
                borderRadius: "12px",
                display: "flex",
                gap: "20px",
              }}
            >
<div
  style={{
    flex: 1,
    minWidth: 0,
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
    fontSize: "24px",
    fontWeight: "bold",
    lineHeight: "1.5",
  }}
>
  {word.english}
</div>

<div
  style={{
    flex: 1,
    minWidth: 0,
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
    fontSize: "20px",
    lineHeight: "1.6",
  }}
>
  {word.japanese}
</div>
<div style={{ display: "flex", alignItems: "center" }}>
  <button
    onClick={() => togglePin(word.id)}
    title={word.pinned ? "PINを解除" : "PINを付ける"}
style={{
  border: "none",
  background: "transparent",
  padding: "8px",
  fontSize: "32px",
  cursor: "pointer",
  opacity: word.pinned ? 1 : 0.25,
}}
  >
    📍
  </button>
  <button
  onClick={() => {
    const newEnglish = window.prompt("英語を編集", word.english);
    if (newEnglish === null || !newEnglish.trim()) return;

    const newJapanese = window.prompt("日本語を編集", word.japanese);
    if (newJapanese === null || !newJapanese.trim()) return;

    const updatedBooks = books.map((book) =>
      book.id === openBookId
        ? {
            ...book,
            words: book.words.map((w) =>
              w.id === word.id
                ? {
                    ...w,
                    english: newEnglish.trim(),
                    japanese: newJapanese.trim(),
                  }
                : w
            ),
          }
        : book
    );

    saveBooks(updatedBooks);
  }}
  title="単語を編集"
  style={{
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    padding: "8px",
  }}
>
  ✏️
</button>
<button
  onClick={() => {
    const ok = window.confirm(
      `「${word.english}」を削除しますか？`
    );
    if (!ok) return;

    const updatedBooks = books.map((book) =>
      book.id === openBookId
        ? {
            ...book,
            words: book.words.filter((w) => w.id !== word.id),
          }
        : book
    );

    saveBooks(updatedBooks);
  }}
  title="単語を削除"
  style={{
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    padding: "8px",
  }}
>
  🗑️
</button>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
if (testMode !== null && testFinished) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "#f7f8fc",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "80px auto",
          padding: "50px 30px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: "32px" }}>
          🏆 {practiceMode === "training" ? "TRAINING" : "TEST"} COMPLETE!
        </h1>

        <h2>{openBook?.title}</h2>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#16a34a",
            margin: "35px 0 10px",
          }}
        >
     {practiceMode === "training" ? testWords.length : correctCount} / {testWords.length}
        </div>

       <p>
  {practiceMode === "training" ? "Words Practiced" : "Correct Answers"}
</p>

        <div
          style={{
            marginTop: "45px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <button
            onClick={() => startTest(testMode, practiceMode)}
            style={{
              padding: "15px 30px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            🔄 RETRY
          </button>

          <button
            onClick={() => {
              setTestMode(null);
              setTestFinished(false);
            }}
            style={{
              padding: "15px 30px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            ← BACK TO BOOK
          </button>
        </div>
      </div>
    </div>
  );
}
if (testMode !== null && testWords.length > 0) {
  return (
    <div
style={{
  minHeight: "100vh",
  boxSizing: "border-box",
  background: "#f7f8fc",
  padding: "40px 20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}}
    >
      <button
        onClick={() => setTestMode(null)}
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
            marginBottom: "25px",
        }}
      >
        ← BACK TO BOOK
      </button>

    <h1 style={{ margin: "0 0 30px 0" }}>
⌨️ TYPING {practiceMode === "training" ? "TRAINING" : "TEST"}
</h1>

<div
  style={{
    display: "table",
    margin: "25px auto 0",
    padding: "18px 45px",
    background: "white",
    border: "2px solid #111827",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  }}
>
  <div
    style={{
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
      textAlign: "center",
    }}
  >
    📖 {openBook?.title}
  </div>
</div>
<p
  style={{
    marginTop: "75px",
    marginBottom: "0px",
    fontSize: "25px",
    color: "#777",
    textAlign: "center",
  }}
>
  Question {testIndex + 1} / {testWords.length}
</p>

 <h2
  style={{
    marginTop: "85px",
    marginBottom: "55px",
fontSize: "30px",
  }}
>
  {testWords[testIndex]?.japanese}
</h2>

{practiceMode === "training" && (
  <div
    style={{
      textAlign: "center",
      fontSize: "30px",
      fontWeight: "bold",
      color: "#2563eb",
      marginBottom: "30px",
    }}
  >
    {testWords[testIndex]?.english}
  </div>
)}
<style>{placeholderStyle}</style>
<input
  className="mywords-answer"
  type="text"
  value={testAnswer}
  onChange={(e) => setTestAnswer(e.target.value)}
  onKeyDown={(e) => {
  // 0キーで正解の英語を読み上げる
  if (e.key === "0" && !e.nativeEvent.isComposing) {
    e.preventDefault();
    speakEnglish(testWords[testIndex]?.english);
    return;
  }

  // Enterキーで採点・次の問題へ
  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
    e.preventDefault();
    checkTestAnswer();
  }
}}
placeholder={
  practiceMode === "test" && testRetry && showSpellingHint
    ? testWords[testIndex]?.english || ""
    : "Type your answer..."
}
  autoComplete="off"
  spellCheck={false}
  style={{
    display: "block",
    width: "min(650px, 90%)",
 margin: "0 auto",
    padding: "24px",
    fontSize: "32px",
    textAlign: "center",
    border: "2px solid #ddd",
    borderRadius: "12px",
  }}
/>
<p
  style={{
    marginTop: "10px",
    textAlign: "center",
    fontSize: "20px",
    color: "#9ca3af",
  }}
>
  Press 0 for 👄
</p>
{testResult && (
  <p
    style={{
      marginTop: "20px",
      fontSize: "26px",
      fontWeight: "bold",
      color: testResult === "correct" ? "#16a34a" : "#dc2626",
    }}
  >
    {testResult === "correct" ? "⭕ CORRECT!" : "❌ TRY AGAIN"}
  </p>
)}
    </div>
  );
}
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 30px",
        background: "#f7f8fc",
        color: "#222",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <button onClick={onBack} style={{ marginBottom: "30px" }}>
          ← MY PAGE
        </button>

        <h1 style={{ textAlign: "center", fontSize: "36px" }}>
          📚 MY WORDS
        </h1>

        <p style={{ textAlign: "center", color: "#777" }}>
          Your personal vocabulary collection
        </p>

        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <button
            onClick={() => setCreating(true)}
            style={{
              padding: "16px 35px",
              fontSize: "24px",
              fontWeight: "bold",
              background: "#fff",
              border: "2px solid #333",
              borderRadius: "14px",
              cursor: "pointer",
              color: "#222",
            }}
          >
            ＋ NEW BOOK
          </button>
        </div>
        <div
          style={{
            maxWidth: "700px",
            margin: "40px auto",
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                background: "white",
                padding: "22px",
                marginBottom: "15px",
                borderRadius: "14px",
                border: "1px solid #ddd",
              }}
            >
<button
  onClick={() => setOpenBookId(book.id)}
  style={{
    fontSize: "22px",
    fontWeight: "bold",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: "#222",
    textAlign: "left",
  }}
>
  📖 {book.title}
</button>

              <div
                style={{
                  marginTop: "10px",
                  color: "#888",
                  fontSize: "14px",
                }}
              >
                Created: {new Date(book.createdAt).toLocaleDateString("ja-JP")}
                {"　"}|{"　"}
                {book.words.length} words
              </div>
            </div>
          ))}
        </div>
        {creating && (
          <div
            style={{
              maxWidth: "500px",
              margin: "35px auto",
              padding: "25px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "16px",
            }}
          >
            <h2>CREATE NEW BOOK</h2>

            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Book title"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                fontSize: "24px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  setCreating(false);
                  setBookTitle("");
                }}
              >
                CANCEL
              </button>

<button
  disabled={!bookTitle.trim()}
  onClick={() => {
    const newBook = {
      id: crypto.randomUUID(),
      title: bookTitle.trim(),
      createdAt: new Date().toISOString(),
      lastStudiedAt: null,
      words: [],
    };

    const updatedBooks = [...books, newBook];

    setBooks(updatedBooks);
    localStorage.setItem(
      "hal_my_words_books",
      JSON.stringify(updatedBooks)
    );

    setBookTitle("");
    setCreating(false);
  }}
>
  CREATE
</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
