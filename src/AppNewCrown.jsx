import { useRef, useState } from "react";
import "./App.css";

const LESSONS = {
  "Chapter 4-1": {
    "Scene 1": [
      {
        en: "Last summer, I went to Kobe with my family. I enjoyed hiking on Mt. Rokko. I saw a great view from the top. It was beautiful. That night, I ate a thick steak. It was so good. I also ate cheesecake for dessert.",
        ja: "去年の夏、私は家族と神戸へ行きました。六甲山でハイキングを楽しみました。山頂から素晴らしい景色を見ました。とても美しかったです。その夜、私は厚いステーキを食べました。とてもおいしかったです。デザートにはチーズケーキも食べました。"
      }
    ]
  },

  "Chapter 4-2": {
    "Scene 1": [
      {
        en: "Where do you want to go, Mark? I want to go to Seattle. It's my hometown. I want to see my baby cousin. I also want to eat a Seattle Dog. What's a Seattle Dog? It's a hot dog with cream cheese.",
        ja: "どこに行きたいの、マーク？ 私はシアトルに行きたいです。そこは私の故郷です。いとこに会いたいです。シアトルドッグも食べたいです。シアトルドッグって何？ クリームチーズが入ったホットドッグです。"

      }
    ]
  },

  "Chapter 4-3": {
    "Scene 1": [
      {
        en: "I want to go to a summer festival. I want to eat many different flavors of shaved ice. I want to see fireworks with my friends.",
        ja: ""
      }
    ]
  },

  "Chapter 4-4": {
    "Scene 1": [
      {
        en: "What would you like? I'd like the tuna sandwich with avocado. Do you want anything with it? Um, orange juice and French fries, please. How much is the total? It's ten dollars. Please pick up your order at that counter.",
       ja: "何になさいますか？ アボカド入りのツナサンドをお願いします。ほかに何かいかがですか？ ええと、オレンジジュースとフライドポテトもお願いします。全部でいくらですか？ 10ドルです。あちらのカウンターで注文した品を受け取ってください。"

      }
    ]
  },

  "Chapter 5-1": {
    "Scene 1": [
      {
        en: "This is my father. He's a taxi driver. He knows every street in London. He takes tourists to famous places like Big Ben. My father is a big fan of football. He often watches games on TV. He sometimes goes to the stadium with my mother. They wear their favorite team's uniform for the games.",
       ja: "こちらは私の父です。父はタクシー運転手です。ロンドンのすべての通りを知っています。ビッグ・ベンのような有名な場所へ観光客を連れて行きます。父はサッカーの大ファンです。テレビでよく試合を見ます。時々、母と一緒にスタジアムへ行きます。そこでお気に入りのチームのユニフォームを着ます。"
      }
    ]
  },

  "Chapter 5-2": {
    "Scene 1": [
      {
        en: "This is my brother, Peter. He studies music at university. He's in a rock band. Oh, is he a guitarist? No. He does not play the guitar. He plays the bagpipes, a traditional musical instrument in Scotland. Interesting! Does he play them in concerts? Yes, he does. You can watch his performances on the internet.",
        ja: "こちらは私の兄のピーターです。大学で音楽を勉強しています。ロックバンドに入っています。彼はギタリストですか？ いいえ、ギターは弾きません。スコットランドの伝統的な楽器、バグパイプを演奏します。おもしろいですね！ コンサートで演奏するのですか？ はい、演奏します。インターネットで彼の演奏を見ることができます。"
      }
    ]
  },

  "Chapter 5-3": {
    "Scene 1": [
      {
        en: "This is Sherlock Holmes. He is a character from a world-famous book series. He is a clever detective. He always looks at things carefully. He knows many strange facts. He solves many difficult problems. Sherlock Holmes is a popular character in the U.K.",
       ja: "こちらはシャーロック・ホームズです。世界的に有名な本のシリーズに登場する人物です。彼は頭の切れる探偵です。いつも物事を注意深く観察します。たくさんの不思議な事実を知っています。難しい問題をたくさん解決します。シャーロック・ホームズはイギリスで人気のある人物です。"
      }
    ]
  },

  "Chapter 6-1": {
    "Scene 1": [
      {
        en: "At Kevin's school, students choose their own classes. Everyone has a different schedule. This is a picture of a short break between classes. These students are walking to their next class. The boy is going to his music class. He is holding a flute case. The girl is carrying her gym shoes to P.E. class.",
       ja: "ケビンの学校では、生徒たちは自分で授業を選びます。みんなそれぞれ違う時間割です。これは授業と授業の間の短い休み時間の写真です。生徒たちは次の授業へ歩いています。男の子は音楽の授業へ向かっています。フルートケースを持っています。女の子は体育の授業へ体操着を持って行っています。"
      }
    ]
  },

  "Chapter 6-2": {
    "Scene 1": [
      {
        en: "Some students buy lunch at the cafeteria. Others bring lunch from home. What kind of food do they bring from home? Well, sandwiches and fresh fruit are common. Is this boy eating a sandwich? No, he is not. He is eating a taco. It's a popular Mexican food.",
        ja: "カフェテリアで昼食を買う生徒もいます。家から昼食を持ってくる生徒もいます。家からはどんな食べ物を持ってくるのでしょう？ サンドイッチや新鮮な果物が一般的です。この男の子はサンドイッチを食べていますか？ いいえ、食べていません。タコスを食べています。タコスは人気のあるメキシコ料理です。"
      }
    ]
  },

  "Chapter 6-3": {
    "Scene 1": [
      {
        en: "Dear friends, This is a picture of my favorite class. We are studying Spanish. We are listening to a story in Spanish. At my school, all students study a foreign language. We can choose Spanish, French, German, Chinese, or Japanese. Many students choose Spanish. Please tell me about your school life in Japan. Yours, Kevin",
       ja: "親愛なるみなさん、これは私のお気に入りの授業の写真です。私たちはスペイン語を勉強しています。スペイン語で物語を聞いています。私の学校では、すべての生徒が外国語を勉強します。スペイン語、フランス語、ドイツ語、中国語、日本語から選ぶことができます。多くの生徒がスペイン語を選びます。日本での学校生活について教えてください。ケビンより"
      }
    ]
  }
};
let audioContext = null;
function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!audioContext) audioContext = new AudioContext();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function tone(freq, delay = 0, duration = 0.2, type = "sine", volume = 0.3) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration);
}

function playCorrectSound() {
  tone(784, 0, 0.12, "triangle", 0.42);
  tone(1046, 0.1, 0.14, "triangle", 0.42);
  tone(1568, 0.24, 0.18, "sine", 0.34);
}

function playWrongSound() {
  tone(170, 0, 0.28, "sawtooth", 0.46);
  tone(95, 0.18, 0.36, "sawtooth", 0.4);
}

function playGoalSound(isPerfect) {
  if (isPerfect) {
    const melody = [523, 659, 784, 1046, 1318, 1568, 2093];
    melody.forEach((note, i) => tone(note, i * 0.15, 0.32, "triangle", 0.45));
    tone(523, 1.16, 1.1, "sine", 0.32);
    tone(659, 1.16, 1.1, "sine", 0.3);
    tone(784, 1.16, 1.1, "sine", 0.28);
    tone(1046, 1.16, 1.1, "triangle", 0.24);
    tone(1568, 2.1, 0.35, "triangle", 0.42);
    tone(2093, 2.34, 0.75, "sine", 0.38);
  } else {
    [392, 523, 659, 784].forEach((note, i) =>
      tone(note, i * 0.18, 0.3, "triangle", 0.34)
    );
  }
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[.?!,']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function showSpaces(text) {
  return text.replace(/ /g, "＿");
}

function speakOne(text, lang, onEnd) {
  if (!window.speechSynthesis) {
    onEnd?.();
    return;
  }

  const speakNow = () => {
    const voices = window.speechSynthesis.getVoices();

    const samantha = voices.find(
      (v) => v.name === "Samantha" && v.lang === "en-US"
    );

    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = lang === "en-US" ? 0.9 : 1;
    u.volume = 1;

    if (lang === "en-US" && samantha) {
      u.voice = samantha;
    }

    u.onend = () => onEnd?.();

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const voices = window.speechSynthesis.getVoices();

  if (voices.length > 0) {
    speakNow();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      speakNow();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }
}
function speak(text, onEnd) {
  if (!window.speechSynthesis) {
    onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();
  speakOne(text, "en-US", onEnd);
}

function stopEarMode() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

function playEarMode(items) {
  stopEarMode();

  let i = 0;

  function next() {
    if (i >= items.length) return;

    const item = items[i];

    speakOne(item.en, "en-US", () => {
      setTimeout(() => {
        speakOne(item.ja, "ja-JP", () => {
          i++;
          setTimeout(next, 800);
        });
      }, 500);
    });
  }

  next();
}

function playEarTestMode(items) {
  stopEarMode();

  let i = 0;

  function waitBeep(callback) {
    tone(700, 0, 0.08, "triangle", 0.25);
    tone(700, 0.6, 0.08, "triangle", 0.25);
    tone(700, 1.2, 0.08, "triangle", 0.25);
    tone(1000, 1.8, 0.18, "triangle", 0.3);

    setTimeout(callback, 2400);
  }

  function next() {
    if (i >= items.length) return;

    const item = items[i];

    speakOne(item.en, "en-US", () => {
      waitBeep(() => {
        speakOne(item.ja, "ja-JP", () => {
          i++;
          setTimeout(next, 900);
        });
      });
    });
  }

  next();
}

export default function App() {
  const musicRef = useRef(null);
  const checkingRef = useRef(false);
const wordMistakeRef = useRef(false);
  const [lessonName, setLessonName] = useState("Chapter 4");
  const [sectionName, setSectionName] = useState("Scene 1");
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [reaction, setReaction] = useState("");
  const [finished, setFinished] = useState(false);
  const [goalPlayed, setGoalPlayed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [hideEnglish, setHideEnglish] = useState(false);
  const [speaking, setSpeaking] = useState(false);
const [showJapanese, setShowJapanese] = useState(false);
const startTimeRef = useRef(null);
const finishGameCalledRef = useRef(false);
const [elapsedTime, setElapsedTime] = useState(0);

const chapterSections = LESSONS[lessonName] || {};
const items = Object.values(chapterSections).flat();

const fullEnglishText = items
  .map((item) => item.en)
  .filter(Boolean)
  .join(" ");
const fullJapaneseText = items
  .map((item) => item.ja)
  .filter(Boolean)
  .join(" ");
const current = {
  en: fullEnglishText,
  ja: fullJapaneseText
};

const isWordMode = false;

  const score =
    correct + wrong === 0
      ? 0
      : Math.round((correct / (correct + wrong)) * 100);

  const isPerfect = correct === items.length && wrong === 0;

  function toggleMusic() {
    const audio = musicRef.current;
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      audio.volume = 0.06;
      audio.play();
      setMusicOn(true);
    }
  }

  function resetGame(nextLesson = lessonName, nextSection = sectionName) {
    checkingRef.current = false;
    setChecking(false);
    stopEarMode();

    setLessonName(nextLesson);
    setSectionName(nextSection);
    setIndex(0);
    setAnswer("");
    setCorrect(0);
    setWrong(0);
    wordMistakeRef.current = false;
    finishGameCalledRef.current = false;
    setReaction("");
    setFinished(false);
    setGoalPlayed(false);
    setSpeaking(false);
    setHideEnglish(false);
    startTimeRef.current = null;
setElapsedTime(0);
  }

  function nextQuestion(nextCorrect = correct, nextWrong = wrong) {
    setAnswer("");
    setReaction("");

    if (index >= items.length - 1) {
      setCorrect(nextCorrect);
      setWrong(nextWrong);
      setFinished(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  }

  function checkAnswer() {
    if (checkingRef.current || finished || answer.trim() === "") return;

    checkingRef.current = true;
    setChecking(true);

    if (normalize(answer) === normalize(current.en)) {
      const nextCorrect = correct + 1;

      setCorrect(nextCorrect);
      setReaction("🎉 正解！");
      playCorrectSound();
      setSpeaking(true);

      speak(current.en, () => {
        setSpeaking(false);
        setTimeout(() => {
          nextQuestion(nextCorrect, wrong);
        }, 450);
      });

  } else {
  const expectedChar = current.en[answer.length];
  const nextWrong = expectedChar === " " ? wrong : wrong + 1;

  setWrong(nextWrong);

  if (expectedChar !== " ") {
    setReaction("❌ ブー！");
    playWrongSound();
  }

      setTimeout(() => {
        setReaction("");
        checkingRef.current = false;
        setChecking(false);
      }, 700);
    }
  }

  function skipQuestion() {
    checkingRef.current = false;
    setChecking(false);
    nextQuestion(correct, wrong);
  }

  if (finished) {
    if (!goalPlayed) {
      playGoalSound(isPerfect);
      setGoalPlayed(true);
    }

    return (
      <div className="app">
        <div className="game-card">
     <h1>🏁 RESULT</h1>

<div className="meaning">
  {lessonName} / {sectionName}
  <br />
  評価：{Math.max(0, current.en.replace(/ /g, "").length - wrong)}
  ／{current.en.replace(/ /g, "").length}
  <br />
  ミスタッチ：{wrong}回
  <br />
  タイム：
  {Math.floor(elapsedTime / 1000) >= 60
    ? `${Math.floor(elapsedTime / 60000)}分${Math.floor(
        (elapsedTime % 60000) / 1000
      )}秒`
    : `${Math.floor(elapsedTime / 1000)}秒`}
</div>

          <div className="button-row">
            <button onClick={() => resetGame()}>もう一回</button>
            <button onClick={toggleMusic}>
              {musicOn ? "music off" : "music"}
            </button>
            <button onClick={stopEarMode}>⏹ 停止</button>
          </div>
        </div>

        <audio ref={musicRef} src="/rpg_bgm.mp3" loop />
      </div>
    );
  }

  return (
    <div className="app">
      <div
  style={{
    position: "fixed",
    top: "170px",
    right: "28px",
    width: "280px",
    zIndex: 10,
  }}
>
  <button
    onClick={() => setShowJapanese(!showJapanese)}
    style={{
      background: "#111827",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "6px 10px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "8px",
    }}
  >
    🇯🇵 {showJapanese ? "日本語訳を隠す" : "日本語訳"}
  </button>

  {showJapanese && current.ja && (
    <div
      style={{
        background: "rgba(255,255,255,0.82)",
        borderRadius: "12px",
        padding: "14px 16px",
        fontSize: "16px",
        lineHeight: "1.7",
        color: "#333",
        textAlign: "left",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      {current.ja}
    </div>
  )}
</div>
      <div className="game-card">
        <h1>👑New Crown Typing</h1>
<div className="button-row">
  
</div>
      

        {["4", "5", "6"].map((chapter) => {
  const chapterLessons = Object.keys(LESSONS).filter((lesson) =>
    lesson.startsWith(`Chapter ${chapter}-`)
  );

  return (
    <div
      key={chapter}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "6px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "700",
          minWidth: "110px",
        }}
      >
        📚 Chapter {chapter}
      </div>

      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {chapterLessons.map((lesson) => (
          <button
            key={lesson}
            onClick={() => resetGame(lesson, "Scene 1")}
            style={{
              background:
                lessonName === lesson ? "#2563eb" : "#111827",
              color: "white",
              border: "none",
              borderRadius: "7px",
              padding: "4px 9px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Scene {lesson.replace("Chapter ", "")}
          </button>
        ))}
      </div>
    </div>
  );
})}
        <div className="score-row">
          <div>{lessonName}</div>
          <div>{sectionName}</div>
          <div>
            {index + 1} / {items.length}
          </div>
          <div>正解：{correct}</div>
          <div>ミス：{wrong}</div>
          <div>点数：{score}</div>
        </div>

        {isWordMode && (
          <div className="button-row">
            <button onClick={() => setHideEnglish(!hideEnglish)}>
              {hideEnglish ? "英語を表示" : "英語を隠す"}
            </button>
          </div>
        )}

        <div className="word-box" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "72px" }}>{current.icon}</div>

        

        <div
  className="word"
  style={{
    fontSize: "26px",
    lineHeight: 1.7,
    minHeight: "60px",
  }}
>
  {isWordMode && hideEnglish ? (
    "？？？"
  ) : (
    <>
      <span style={{ color: "#999" }}>
        {showSpaces(current.en.slice(0, answer.length))}
      </span>

      <span
        style={{
          color: "#e63946",
          fontWeight: "bold",
          textDecoration: "underline",
          textUnderlineOffset: "6px",
        }}
      >
        {showSpaces(current.en.slice(answer.length, answer.length + 1))}
      </span>

      <span>
        {showSpaces(current.en.slice(answer.length + 1))}
      </span>
    </>
  )}
</div>

          <button
            onClick={() => {
              setSpeaking(true);
              speak(current.en, () => setSpeaking(false));
            }}
          >
            🔊 音声
          </button>
        </div>

<input
  className="typing"
  value={answer}
  onChange={() => {}}
  onKeyDown={(e) => {
// Backspaceは自由に使える
if (e.key === "Backspace") {
  e.preventDefault();
  setAnswer((prev) => prev.slice(0, -1));
  return;
}

// Shift・Control・矢印など、文字以外のキーは無視
if (e.key.length !== 1) {
  return;
}

e.preventDefault();

const typedChar = e.key;

// 最初の文字キーを押した瞬間にタイマー開始
if (startTimeRef.current === null) {
  startTimeRef.current = Date.now();
}

// 正しい1文字なら必ず進める
if (typedChar === current.en[answer.length]) {
  const newAnswer = answer + typedChar;
  setAnswer(newAnswer);

    if (typedChar === " ") {
  wordMistakeRef.current = false;
}

    // , . ? まで正しく打ったら、その区切りまで読み上げ
    const isComplete = newAnswer === current.en;
const isPunctuation = [",", ".", "?"].includes(typedChar);

const finishGame = () => {
  if (finishGameCalledRef.current) return;
finishGameCalledRef.current = true;
  const finalElapsedTime = startTimeRef.current
    ? Date.now() - startTimeRef.current
    : 0;

  setElapsedTime(finalElapsedTime);

  // MY PAGEで登録したプレイヤー名
  const playerName = localStorage.getItem("playerName");

  // 名前が登録されている場合だけ履歴保存
  if (playerName) {
    const totalCount = current.en.replace(/ /g, "").length;
    const correctCount = Math.max(0, totalCount - wrong);

    const newRecord = {
      id: Date.now(),
      playerName,
      date: new Date().toISOString(),
      lessonName,
      sectionName,
      activity: "Long Sentence Typing",
      correctCount,
      totalCount,
      wrong,
      elapsedTime: finalElapsedTime,
    };

    const oldHistory = JSON.parse(
      localStorage.getItem("newCrownHistory") || "[]"
    );

    // 最新の記録を一番上に追加
    const newHistory = [newRecord, ...oldHistory];

    localStorage.setItem(
      "newCrownHistory",
      JSON.stringify(newHistory)
    );
  }

  setFinished(true);
  setCorrect(1);
  playGoalSound(true);
};

// , . ? まで正しく打ったら、その区切りまで読み上げ
if (isPunctuation) {
  const parts = newAnswer.split(/(?<=[,.?])/);
  const chunk =
    parts[parts.length - 1] || parts[parts.length - 2];

  if (chunk && chunk.trim()) {
    const utterance =
      new SpeechSynthesisUtterance(chunk.trim());

    utterance.lang = "en-US";
    utterance.rate = 0.9;

    const voices =
      window.speechSynthesis.getVoices();

    const samantha = voices.find((voice) =>
      voice.name.includes("Samantha")
    );

    if (samantha) {
      utterance.voice = samantha;
    }

    // 最後の文章なら、読み終わってから少し待って結果画面へ
    if (isComplete) {
      utterance.onend = () => {
        setTimeout(() => {
          finishGame();
        }, 700);
      };
    }

    window.speechSynthesis.speak(utterance);
  } else if (isComplete) {
    setTimeout(() => {
      finishGame();
    }, 700);
  }
} else if (isComplete) {
  // 万一、最後が句読点でない文章にも対応
  setTimeout(() => {
    finishGame();
  }, 700);
}
} else {
  if (!wordMistakeRef.current) {
    setWrong((prev) => prev + 1);
    wordMistakeRef.current = true;
  }
  playWrongSound();
}
}}
  placeholder="ここに英語をタイプ"
  autoFocus
/>
<p
  style={{
    fontSize: "12px",
    color: "#777",
    margin: "6px 4px 12px",
  }}
>
  ※ 大文字・小文字、スペース、カンマ（,）、ピリオド（.）、クエスチョンマーク（?）、アポストロフィ（'）も正確に入力。
</p>
        
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          {reaction}
        </div>
      </div>

      <audio ref={musicRef} src="/rpg_bgm.mp3" loop />
    </div>
  );
}