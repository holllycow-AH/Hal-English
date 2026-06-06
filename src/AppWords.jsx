import React, { useMemo, useRef, useState } from "react";
import "./App.css";

const WORD_LISTS = {
  "家族": `father,父,👨
mother,母,👩
brother,兄弟,👦
sister,姉妹,👧
uncle,おじ,👨
aunt,おば,👩
grandfather,祖父,👴
grandmother,祖母,👵
cousin,いとこ,
son,息子,👦
daughter,娘,👧
husband,夫,👨
wife,妻,👩
grandparents,祖父母,👴👵
parent,親,🧑
child,子供,🧒
baby,赤ちゃん,👶
boy,少年,👦
girl,少女,👧
man,男性,👨
woman,女性,👩
king,王様,🤴
queen,女王,👸
friend,友達,🧑‍🤝‍🧑
teacher,先生,🧑‍🏫
student,生徒,🎒`,

  "職業": `doctor,医者,🩺
nurse,看護師,💉
dentist,歯医者,🦷
farmer,農家,🌾
musician,音楽家,🎵
singer,歌手,🎤
pilot,パイロット,✈️
scientist,科学者,🧪
flight attendant,客室乗務員,🛫
police officer,警察官,🚓
carpenter,大工,🪚
lawyer,弁護士,⚖️
driver,運転手,🚗
artist,画家,🎨
writer,作家,✍️
pianist,ピアニスト,🎹
fan,ファン,📣
player,選手,🏅
classmate,クラスメート,🎒
actor,俳優,🎬
actress,女優,🎬
cook,料理人,🍳
clerk,店員,🏪`,

  "国": `Japan,日本,🗾
China,中国,🇨🇳
Korea,韓国,🇰🇷
Canada,カナダ,🇨🇦
America,アメリカ,🇺🇸
Mexico,メキシコ,🇲🇽
Brazil,ブラジル,🇧🇷
France,フランス,🇫🇷
Spain,スペイン,🇪🇸
Germany,ドイツ,🇩🇪
Italy,イタリア,🇮🇹
England,イギリス,🇬🇧
Russia,ロシア,🇷🇺
Australia,オーストラリア,🇦🇺
New Zealand,ニュージーランド,🇳🇿
Egypt,エジプト,🇪🇬`,

  "国籍": `Japanese,日本人,🗾
Chinese,中国人,🇨🇳
Korean,韓国人,🇰🇷
Canadian,カナダ人,🇨🇦
American,アメリカ人,🇺🇸
Mexican,メキシコ人,🇲🇽
Brazilian,ブラジル人,🇧🇷
French,フランス人,🇫🇷
Spanish,スペイン人,🇪🇸
German,ドイツ人,🇩🇪
Italian,イタリア人,🇮🇹
British,イギリス人,🇬🇧
Russian,ロシア人,🇷🇺
Australian,オーストラリア人,🇦🇺`,

  "場所": `New York,ニューヨーク,🗽
London,ロンドン,🇬🇧
Sydney,シドニー,🇦🇺
country,国,🌍
city,都市,🏙️
house,家,🏠
school,学校,🏫
church,教会,⛪
station,駅,🚉
hospital,病院,🏥
library,図書館,📚
bank,銀行,🏦
store,店,🏪
building,建物,🏢
zoo,動物園,🦁
post office,郵便局,📮
farm,農場,🚜
museum,博物館,🏛️
park,公園,🌳
hotel,ホテル,🏨`,

  "教科": `Japanese,国語,📖
math,数学,🔢
English,英語,🔤
science,理科,🧪
social studies,社会,🌏
history,歴史,🏯
P.E.,体育,🏃
music,音楽,🎵
art,美術,🎨
club,部活,🎒
sport,スポーツ,🏅
classroom,教室,🏫
gym,体育館,🏟️`,

  "スポーツ": `baseball,野球,⚾
soccer,サッカー,⚽
basketball,バスケットボール,🏀
volleyball,バレーボール,🏐
badminton,バドミントン,🏸
tennis,テニス,🎾
table tennis,卓球,🏓
swimming,水泳,🏊
piano,ピアノ,🎹
guitar,ギター,🎸
violin,バイオリン,🎻`,

  "乗り物": `bike,自転車,🚲
car,車,🚗
bus,バス,🚌
train,電車,🚃
plane,飛行機,✈️
taxi,タクシー,🚕
ship,船,🚢`,

  "自然": `sea,海,🌊
river,川,🏞️
lake,湖,💧
mountain,山,⛰️
forest,森,🌲
garden,庭,🌷
flower,花,🌸
tree,木,🌳
sun,太陽,☀️
moon,月,🌙
cloud,雲,☁️
sky,空,🌌
rain,雨,🌧️
snow,雪,❄️
wind,風,💨
typhoon,台風,🌀`,

  "月": `January,1月,🎍
February,2月,❄️
March,3月,🌸
April,4月,🌷
May,5月,🎏
June,6月,☔
July,7月,🎋
August,8月,🌻
September,9月,🌕
October,10月,🎃
November,11月,🍁
December,12月,🎄
spring,春,🌸
summer,夏,🌻
fall,秋,🍁
winter,冬,❄️`,

  "数字": `one,1,1️⃣
two,2,2️⃣
three,3,3️⃣
four,4,4️⃣
five,5,5️⃣
six,6,6️⃣
seven,7,7️⃣
eight,8,8️⃣
nine,9,9️⃣
ten,10,🔟
eleven,11,
twelve,12,
thirteen,13,
fourteen,14,
fifteen,15,
sixteen,16,
seventeen,17,
eighteen,18,
nineteen,19,
twenty,20,
thirty,30,
forty,40,
fifty,50,
sixty,60,
seventy,70,
eighty,80,
ninety,90,`,

  "曜日": `Monday,月曜日,🌙
Tuesday,火曜日,🔥
Wednesday,水曜日,💧
Thursday,木曜日,🌳
Friday,金曜日,🥇
Saturday,土曜日,🌏
Sunday,日曜日,☀️`,

  "色": `white,白,⬜
black,黒,⬛
brown,茶,🟫
red,赤,🟥
blue,青,🟦
yellow,黄,🟨
green,緑,🟩
pink,ピンク,🩷
purple,紫,🟪
orange,オレンジ,🟧
gold,金,🥇
silver,銀,🥈
bronze,銅,🥉`,

  "序列": `first,1番目,🥇
second,2番目,🥈
third,3番目,🥉
fourth,4番目,
fifth,5番目,
sixth,6番目,
seventh,7番目,
eighth,8番目,
ninth,9番目,
tenth,10番目,
eleventh,11番目,
twelfth,12番目,
thirteenth,13番目,
fourteenth,14番目,
fifteenth,15番目,
sixteenth,16番目,
seventeenth,17番目,
eighteenth,18番目,
nineteenth,19番目,
twentieth,20番目,
thirtieth,30番目,
fortieth,40番目,
fiftieth,50番目,
sixtieth,60番目,
seventieth,70番目,
eightieth,80番目,
ninetieth,90番目,`,

  "身の回り": `desk,机,🪑
chair,いす,💺
table,テーブル,🛋️
book,本,📖
notebook,ノート,📓
pencil,鉛筆,✏️
pen,ペン,🖊️
eraser,消しゴム,
window,窓,🪟
door,ドア,🚪`,
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

function unlockSound() {
  tone(660, 0, 0.08, "triangle", 0.35);
  tone(990, 0.08, 0.1, "triangle", 0.3);
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
    [392, 523, 659, 784].forEach((note, i) => tone(note, i * 0.18, 0.3, "triangle", 0.34));
    tone(523, 0.85, 0.55, "sine", 0.22);
    tone(659, 0.85, 0.55, "sine", 0.2);
  }
}

function parseWords(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/[,，\t]/);
      return {
        english: (parts[0] || "").trim(),
        japanese: (parts[1] || "意味未入力").trim(),
        icon: (parts[2] || "").trim(),
      };
    })
    .filter((item) => item.english);
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

export default function App() {
  const firstMode = Object.keys(WORD_LISTS)[0];
  const musicRef = useRef(null);
  const checkingRef = useRef(false);

  const [mode, setMode] = useState(firstMode);
  const [listText, setListText] = useState(WORD_LISTS[firstMode]);
  const words = useMemo(() => parseWords(listText), [listText]);

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [reaction, setReaction] = useState("");
  const [hideEnglish, setHideEnglish] = useState(false);
  const [soundReady, setSoundReady] = useState(false);
  const [goalPlayed, setGoalPlayed] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [checking, setChecking] = useState(false);

  const current = words[index] || { english: "", japanese: "", icon: "" };
  const finished = index >= words.length;
  const score = correct + wrong === 0 ? 0 : Math.round((correct / (correct + wrong)) * 100);

  function resetGame(nextText = listText) {
    checkingRef.current = false;
    setChecking(false);
    setListText(nextText);
    setIndex(0);
    setAnswer("");
    setCorrect(0);
    setWrong(0);
    setReaction("");
    setGoalPlayed(false);
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    resetGame(WORD_LISTS[nextMode]);
  }

  function nextWord() {
    setAnswer("");
    setReaction("");
    if (index >= words.length - 1) {
      setIndex(words.length);
    } else {
      setIndex((prev) => prev + 1);
    }
    checkingRef.current = false;
    setChecking(false);
  }

  function checkAnswer() {
    if (!current.english || checkingRef.current) return;
    checkingRef.current = true;
    setChecking(true);

    if (answer.trim().toLowerCase() === current.english.toLowerCase()) {
      setCorrect((prev) => prev + 1);
      setReaction("🎉 正解！");
      playCorrectSound();
      setTimeout(() => speak(current.english), 280);
      setTimeout(() => nextWord(), 900);
    } else {
      setWrong((prev) => prev + 1);
      setReaction("💥 ブー！");
      playWrongSound();
      setTimeout(() => {
        setReaction("");
        checkingRef.current = false;
        setChecking(false);
      }, 700);
    }
  }

  function toggleMusic() {
    const audio = musicRef.current;
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      audio.volume = 0.22;
      audio.play();
      setMusicOn(true);
    }
  }

  if (finished) {
    if (!goalPlayed) {
      playGoalSound(correct === words.length && wrong === 0);
      setGoalPlayed(true);
    }

    return (
      <div className="app">
        <div className="game-card">
          <h1>{correct === words.length && wrong === 0 ? "🏆 PERFECT!" : "🎯 GOAL!"}</h1>
          <div className="meaning">
            点数：{score}点
            <br />
            正解：{correct}
            <br />
            ミス：{wrong}
          </div>
          <button onClick={() => resetGame()}>もう一回</button>
        </div>
        <audio ref={musicRef} src="/rpg_bgm.mp3" loop />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="game-card">
        <h1>英単語タイピングゲーム</h1>

        <div className="score-row">
          <div>カテゴリ：{mode}</div>
          <div>{index + 1} / {words.length}</div>
          <div>正解：{correct}</div>
          <div>ミス：{wrong}</div>
          <div>点数：{score}</div>
        </div>

        <div className="button-row">
          {Object.keys(WORD_LISTS).map((name) => (
            <button key={name} onClick={() => changeMode(name)}>
              {name}
            </button>
          ))}
        </div>

        <div className="button-row">
          <button
            onClick={() => {
              unlockSound();
              setSoundReady(true);
            }}
          >
            {soundReady ? "🔊 音OK" : "🔊 音を有効化"}
          </button>
          <button onClick={() => setHideEnglish(false)}>英語あり</button>
          <button onClick={() => setHideEnglish(true)}>英語なし</button>
          <button onClick={toggleMusic}>{musicOn ? "music off" : "music"}</button>
        </div>

        <div className="word-box">
          <div className="meaning">
            {current.icon && <div style={{ fontSize: "56px", marginBottom: "8px" }}>{current.icon}</div>}
            <div>{current.japanese}</div>
          </div>

          {!hideEnglish && <div className="word">{current.english}</div>}
          {hideEnglish && (
            <div className="word" style={{ color: "#94a3b8" }}>
              ？？？？？
            </div>
          )}

          <button onClick={() => speak(current.english)}>🔊 音声</button>
        </div>

        <input
          className="typing"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") checkAnswer();
          }}
          placeholder="ここにタイプ"
          autoFocus
        />

        <div className="button-row">
          <button onClick={checkAnswer} disabled={checking}>{checking ? "判定中" : "答え合わせ"}</button>
          <button onClick={nextWord}>スキップ</button>
        </div>

        <div style={{ fontSize: "34px", fontWeight: "bold", marginTop: "20px" }}>
          {reaction}
        </div>
      </div>

      <div className="list-card">
        <h2>単語リスト</h2>
        <textarea value={listText} onChange={(e) => resetGame(e.target.value)} />
      </div>

      <audio ref={musicRef} src="/rpg_bgm.mp3" loop />
    </div>
  );
}
