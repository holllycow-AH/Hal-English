import { useRef, useState } from "react";
import "./App.css";

const LESSONS = {
  "Lesson 1": {
    "Scene 1": [
      { icon: "👋", en: "Hi.", ja: "こんにちは。" },
      { icon: "👧", en: "I am Hana.", ja: "私はハナです。" },
      { icon: "⚽", en: "I like sports.", ja: "私はスポーツが好きです。" },
      { icon: "🔤", en: "I like English.", ja: "私は英語が好きです。" },
      { icon: "⚽", en: "I play soccer.", ja: "私はサッカーをします。" },
      { icon: "🤝", en: "Nice to meet you.", ja: "よろしくお願いします。" },
      { icon: "✅", en: "Yes, I am.", ja: "はい、そうです。" },
      { icon: "❌", en: "No, I am not.", ja: "いいえ、違います。" },
    ],
    "Scene 2": [
      { icon: "🏫", en: "Are you in a club?", ja: "あなたは部活に入っていますか。" },
      { icon: "❌", en: "No, I am not.", ja: "いいえ、入っていません。" },
      { icon: "💃", en: "I take dance lessons.", ja: "私はダンスレッスンを受けています。" },
      { icon: "🎵", en: "Do you like hip-hop?", ja: "あなたはヒップホップが好きですか。" },
      { icon: "✅", en: "Yes, I do.", ja: "はい、好きです。" },
      { icon: "❌", en: "No, I do not.", ja: "いいえ、好きではありません。" },
      { icon: "🗓️", en: "I practice on Sundays.", ja: "私は日曜日に練習します。" },
      { icon: "❌", en: "I do not practice.", ja: "私は練習しません。" },
      { icon: "🎤", en: "I am not a fan.", ja: "私はファンではありません。" },
    ],
    "Scene 3": [
      { icon: "🏫", en: "What do you do after school?", ja: "あなたは放課後何をしますか。" },
      { icon: "📷", en: "I take pictures.", ja: "私は写真を撮ります。" },
      { icon: "🐾", en: "What animals do you like?", ja: "あなたはどんな動物が好きですか。" },
      { icon: "🦎", en: "I like iguanas.", ja: "私はイグアナが好きです。" },
      { icon: "👀", en: "Look at this picture.", ja: "この写真を見て。" },
      { icon: "😊", en: "Cute!", ja: "かわいい！" },
      { icon: "🎬", en: "What do you do on weekends?", ja: "週末に何をしますか。" },
      { icon: "🎥", en: "I often watch movies.", ja: "私はよく映画を見ます。" },
      { icon: "🎵", en: "What music do you like?", ja: "どんな音楽が好きですか。" },
      { icon: "🎧", en: "I like J-pop.", ja: "私はJ-popが好きです。" },
      { icon: "🏀", en: "You play basketball.", ja: "あなたはバスケットボールをします。" },
      { icon: "📚", en: "You really like manga.", ja: "あなたは本当にマンガが好きです。" },
    ],
    Words: [
      { icon: "🏫", en: "club", ja: "部活、クラブ" },
      { icon: "💃", en: "dance", ja: "踊る、ダンス" },
      { icon: "📘", en: "lesson", ja: "レッスン、授業" },
      { icon: "📝", en: "practice", ja: "練習する" },
      { icon: "🗓️", en: "Sunday", ja: "日曜日" },
      { icon: "📷", en: "picture", ja: "写真、絵" },
      { icon: "🐾", en: "animal", ja: "動物" },
      { icon: "🦎", en: "iguana", ja: "イグアナ" },
      { icon: "🎵", en: "music", ja: "音楽" },
      { icon: "🌈", en: "weekend", ja: "週末" },
      { icon: "🎬", en: "movie", ja: "映画" },
      { icon: "🎤", en: "fan", ja: "ファン" },
    ],
  },

  "Lesson 2": {
    "Scene 1": [
      { icon: "🏊", en: "I can swim.", ja: "私は泳げます。" },
      { icon: "🎤", en: "I can sing.", ja: "私は歌えます。" },
      { icon: "💃", en: "I can dance.", ja: "私は踊れます。" },
      { icon: "🍳", en: "I can cook.", ja: "私は料理できます。" },
      { icon: "🎹", en: "I can play the piano.", ja: "私はピアノをひけます。" },
      { icon: "🏊", en: "I cannot swim.", ja: "私は泳げません。" },
      { icon: "🎸", en: "I cannot play the guitar.", ja: "私はギターをひけません。" },
      { icon: "❓", en: "Can you swim?", ja: "あなたは泳げますか。" },
      { icon: "✅", en: "Yes, I can.", ja: "はい、できます。" },
      { icon: "❌", en: "No, I cannot.", ja: "いいえ、できません。" },
    ],
    "Scene 2": [
      { icon: "♟️", en: "He can play shogi.", ja: "彼は将棋ができます。" },
      { icon: "🛹", en: "She can skateboard.", ja: "彼女はスケートボードができます。" },
      { icon: "👍", en: "He can play very well.", ja: "彼はとても上手にできます。" },
      { icon: "👍", en: "She can skateboard very well.", ja: "彼女はとても上手にスケートボードができます。" },
      { icon: "🇯🇵", en: "He can speak Japanese.", ja: "彼は日本語を話せます。" },
      { icon: "🇺🇸", en: "He can speak English.", ja: "彼は英語を話せます。" },
      { icon: "🇨🇳", en: "He can speak Chinese.", ja: "彼は中国語を話せます。" },
      { icon: "😊", en: "He is kind.", ja: "彼は親切です。" },
      { icon: "🦁", en: "He is brave.", ja: "彼は勇敢です。" },
      { icon: "😄", en: "He smiles.", ja: "彼はほほえみます。" },
    ],
    "Scene 3": [
      { icon: "⚾", en: "Are you a baseball fan?", ja: "あなたは野球ファンですか。" },
      { icon: "✅", en: "Yes, I am.", ja: "はい、そうです。" },
      { icon: "❌", en: "No, I am not.", ja: "いいえ、違います。" },
      { icon: "⚽", en: "Do you play soccer?", ja: "あなたはサッカーをしますか。" },
      { icon: "✅", en: "Yes, I do.", ja: "はい、します。" },
      { icon: "❌", en: "No, I do not.", ja: "いいえ、しません。" },
      { icon: "🔤", en: "I like English.", ja: "私は英語が好きです。" },
      { icon: "⚽", en: "I do not play soccer.", ja: "私はサッカーをしません。" },
      { icon: "👧", en: "I am Tanaka Hana.", ja: "私は田中花です。" },
    ],
    Words: [
      { icon: "💪", en: "can", ja: "できる" },
      { icon: "❌", en: "cannot", ja: "できない" },
      { icon: "🎮", en: "play", ja: "する、演奏する" },
      { icon: "🗣️", en: "speak", ja: "話す" },
      { icon: "🏊", en: "swim", ja: "泳ぐ" },
      { icon: "🎤", en: "sing", ja: "歌う" },
      { icon: "💃", en: "dance", ja: "踊る" },
      { icon: "🍳", en: "cook", ja: "料理する" },
      { icon: "🎸", en: "guitar", ja: "ギター" },
      { icon: "🎹", en: "piano", ja: "ピアノ" },
      { icon: "🇯🇵", en: "Japanese", ja: "日本語、日本の" },
      { icon: "🇺🇸", en: "English", ja: "英語、英語の" },
      { icon: "🇨🇳", en: "Chinese", ja: "中国語、中国の" },
      { icon: "😊", en: "kind", ja: "親切な" },
      { icon: "🦁", en: "brave", ja: "勇敢な" },
      { icon: "😄", en: "smile", ja: "ほほえむ" },
      { icon: "⚾", en: "baseball", ja: "野球" },
      { icon: "⚽", en: "soccer", ja: "サッカー" },
      { icon: "🎤", en: "fan", ja: "ファン" },
      { icon: "👍", en: "very well", ja: "とても上手に" },
    ],
  },

  "Lesson 3": {
    "Scene 1": [
      { icon: "🍦", en: "This is an ice cream shop.", ja: "これはアイスクリーム店です。" },
      { icon: "🍫", en: "That is chocolate ice cream.", ja: "あれはチョコレートアイスです。" },
      { icon: "🍦", en: "This is not an ice cream shop.", ja: "これはアイスクリーム店ではありません。" },
      { icon: "🍫", en: "That is not chocolate ice cream.", ja: "あれはチョコレートアイスではありません。" },
      { icon: "❓", en: "Is this an ice cream shop?", ja: "これはアイスクリーム店ですか。" },
      { icon: "✅", en: "Yes, it is.", ja: "はい、そうです。" },
      { icon: "❌", en: "No, it is not.", ja: "いいえ、違います。" },
      { icon: "❓", en: "What is this?", ja: "これは何ですか。" },
      { icon: "📚", en: "It is an old dictionary.", ja: "それは古い辞書です。" },
    ],
    "Scene 2": [
      { icon: "⭐", en: "Who is your favorite character?", ja: "あなたのお気に入りのキャラクターは誰ですか。" },
      { icon: "🧙", en: "Harry.", ja: "ハリーです。" },
      { icon: "🧠", en: "He is smart.", ja: "彼は賢いです。" },
      { icon: "❤️", en: "I like him very much.", ja: "私は彼がとても好きです。" },
      { icon: "🎤", en: "Can she sing?", ja: "彼女は歌えますか。" },
      { icon: "🏊", en: "Can he swim?", ja: "彼は泳げますか。" },
      { icon: "⚾", en: "Does he like baseball?", ja: "彼は野球が好きですか。" },
      { icon: "👍", en: "I like him too.", ja: "私も彼が好きです。" },
    ],
    "Scene 3": [
      { icon: "🙋", en: "Excuse me.", ja: "すみません。" },
      { icon: "🍰", en: "How can I get to the cake shop?", ja: "ケーキ屋へはどう行けばいいですか。" },
      { icon: "⬆️", en: "Go straight on this street.", ja: "この通りをまっすぐ行ってください。" },
      { icon: "↩️", en: "Turn left at the second corner.", ja: "二つ目の角を左に曲がってください。" },
      { icon: "➡️", en: "It is on your right.", ja: "それは右側にあります。" },
      { icon: "💡", en: "I see.", ja: "わかりました。" },
      { icon: "🙏", en: "Thank you.", ja: "ありがとう。" },
    ],
    Words: [
      { icon: "👇", en: "this", ja: "これ、この" },
      { icon: "👉", en: "that", ja: "あれ、あの" },
      { icon: "🏬", en: "shop", ja: "店" },
      { icon: "📚", en: "dictionary", ja: "辞書" },
      { icon: "🕰️", en: "old", ja: "古い" },
      { icon: "❓", en: "who", ja: "誰" },
      { icon: "⭐", en: "character", ja: "キャラクター、登場人物" },
      { icon: "❤️", en: "favorite", ja: "お気に入りの" },
      { icon: "👦", en: "him", ja: "彼を、彼に" },
      { icon: "💖", en: "very much", ja: "とても" },
      { icon: "💡", en: "idea", ja: "考え、アイデア" },
      { icon: "🧠", en: "know", ja: "知っている" },
      { icon: "⭕", en: "correct", ja: "正しい" },
      { icon: "❌", en: "wrong", ja: "間違った" },
      { icon: "👌", en: "almost", ja: "ほとんど" },
      { icon: "🎁", en: "gift", ja: "贈り物" },
      { icon: "💻", en: "online", ja: "オンラインの" },
      { icon: "🎎", en: "traditional", ja: "伝統的な" },
      { icon: "🎵", en: "musical", ja: "音楽の" },
      { icon: "🎸", en: "instrument", ja: "楽器" },
      { icon: "🙋", en: "excuse", ja: "許す、失礼" },
      { icon: "⬆️", en: "straight", ja: "まっすぐ" },
      { icon: "🛣️", en: "street", ja: "通り" },
      { icon: "↩️", en: "turn", ja: "曲がる" },
      { icon: "⬅️", en: "left", ja: "左" },
      { icon: "📍", en: "corner", ja: "角" },
      { icon: "➡️", en: "right", ja: "右" },
      { icon: "🙏", en: "thank", ja: "感謝する" },
      { icon: "❓", en: "where", ja: "どこ" },
      { icon: "🚪", en: "open", ja: "開く、開いている" },
      { icon: "🕒", en: "o'clock", ja: "〜時" },
      { icon: "🍵", en: "Japanese-style", ja: "和風の" },
    ],
  },
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

  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = lang === "en-US" ? 0.9 : 1;
  u.volume = 1;
  u.onend = () => onEnd?.();

  window.speechSynthesis.speak(u);
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

  const [lessonName, setLessonName] = useState("Lesson 1");
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

  const items = LESSONS[lessonName][sectionName];
  const current = items[index];
  const isWordMode = sectionName === "Words";

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
    setReaction("");
    setFinished(false);
    setGoalPlayed(false);
    setSpeaking(false);
    setHideEnglish(false);
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
      const nextWrong = wrong + 1;

      setWrong(nextWrong);
      setReaction("💥 ブー！");
      playWrongSound();

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
          <h1>{isPerfect ? "🏆 PERFECT!" : "🎯 CLEAR!"}</h1>

          <div className="meaning">
            {lessonName} / {sectionName}
            <br />
            点数：{score}点
            <br />
            正解：{correct}
            <br />
            ミス：{wrong}
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
      <div className="game-card">
        <h1>📚 New Crown Typing</h1>

        <div className="button-row">
          <button
            onClick={() => {
              tone(660, 0, 0.08, "triangle", 0.35);
              tone(990, 0.08, 0.1, "triangle", 0.3);
            }}
          >
            🔊 音を有効化
          </button>

          <button onClick={toggleMusic}>
            {musicOn ? "music off" : "music"}
          </button>

          <button onClick={() => playEarMode(items)}>
            🎧 耳モード
          </button>

          <button onClick={() => playEarTestMode(items)}>
            📝 耳テスト
          </button>

          <button onClick={stopEarMode}>
            ⏹ 停止
          </button>
        </div>

        {Object.keys(LESSONS).map((lesson) => (
          <div key={lesson} style={{ marginBottom: "14px" }}>
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "25px",
    marginBottom: "8px",
    flexWrap: "wrap",
  }}
>
  <h2 style={{ margin: 0 }}>📚 {lesson}</h2>

  
   <a
  href={`/audio/NewCrown1_${lesson.replace(" ", "")}_Study.mp3`}
  download
  style={{
    background: "#16a34a",
    color: "white",
    padding: "8px 12px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginRight: "8px",
  }}
>
  👂 学習 ⬇
</a>

<a
  href={`/audio/NewCrown1_${lesson.replace(" ", "")}_Test.mp3`}
  download
  style={{
    background: "#7c3aed",
    color: "white",
    padding: "8px 12px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  }}
>
  🧠 テスト ⬇
</a>
</div>

            <div className="button-row">
              {Object.keys(LESSONS[lesson]).map((section) => (
                <button
                  key={`${lesson}-${section}`}
                  onClick={() => resetGame(lesson, section)}
                  style={{
                    background:
                      lessonName === lesson && sectionName === section
                        ? "#2563eb"
                        : "#111827",
                  }}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        ))}

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

          <div className="meaning">{current.ja}</div>

          <div
            className="word"
            style={{
              fontSize: "36px",
              lineHeight: 1.5,
              minHeight: "60px",
            }}
          >
            {isWordMode && hideEnglish ? "？？？" : showSpaces(current.en)}
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
          onChange={(e) => {
            setAnswer(e.target.value);
            checkingRef.current = false;
            setChecking(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") checkAnswer();
          }}
          placeholder="ここに英語をタイプ"
          autoFocus
        />

        <div className="button-row">
          <button onClick={checkAnswer} disabled={checking || speaking}>
            {speaking ? "読み上げ中" : checking ? "判定中" : "答え合わせ"}
          </button>

          <button onClick={skipQuestion} disabled={speaking}>
            スキップ
          </button>
        </div>

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