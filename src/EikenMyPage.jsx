import { useEffect, useState } from "react";

export default function EikenMyPage({ onBack }) {

  const [name, setName] = useState(

    () => localStorage.getItem("playerName") || ""

  );

  const [inputName, setInputName] = useState(name);

  const [editing, setEditing] = useState(!name);

// MY GOAL：プレイヤーごとに保存

const goalKey = `eiken-pre2-goal-${name}`;

const [goal, setGoal] = useState(

  () => localStorage.getItem(goalKey) || ""

);

const [editingGoal, setEditingGoal] = useState(false);

// MY DIARY：プレイヤーごとに保存

const diaryKey = `eiken-pre2-diary-${name}`;

const [diaryText, setDiaryText] = useState("");

const [editingDiaryId, setEditingDiaryId] = useState(null);

const [diaryEntries, setDiaryEntries] = useState([]);
const [showDiaryBook, setShowDiaryBook] = useState(false);

useEffect(() => {

  try {

    const saved = JSON.parse(

      localStorage.getItem(diaryKey) || "[]"

    );

    setDiaryEntries(Array.isArray(saved) ? saved : []);

  } catch {

    setDiaryEntries([]);

  }

  setDiaryText("");

  setEditingDiaryId(null);

}, [diaryKey]);

function saveDiary() {

  const content = diaryText.trim();

  if (!content) return;

  const now = new Date().toISOString();

  const next = editingDiaryId

    ? diaryEntries.map((entry) =>

        entry.id === editingDiaryId

          ? { ...entry, text: content, updatedAt: now }

          : entry

      )

    : [

        {

          id: crypto.randomUUID(),

          text: content,

          createdAt: now,

        },

        ...diaryEntries,

      ];

  localStorage.setItem(diaryKey, JSON.stringify(next));

  setDiaryEntries(next);

  setDiaryText("");

  setEditingDiaryId(null);

}

function editDiary(entry) {

  setDiaryText(entry.text);

  setEditingDiaryId(entry.id);
  setShowDiaryBook(false);

}

function deleteDiary(id) {

  if (!window.confirm("この日記を削除する？")) return;

  const next = diaryEntries.filter((entry) => entry.id !== id);

  localStorage.setItem(diaryKey, JSON.stringify(next));

  setDiaryEntries(next);

  if (editingDiaryId === id) {

    setDiaryText("");

    setEditingDiaryId(null);

  }

}

const diaryDays = new Set(

  diaryEntries.map((entry) =>

    new Date(entry.createdAt).toLocaleDateString("en-CA")

  )

).size;

// 目標を保存

function saveGoal() {

  const trimmedGoal = goal.trim().slice(0, 100);

  localStorage.setItem(goalKey, trimmedGoal);

  setGoal(trimmedGoal);

  setEditingGoal(false);

}

  // HAL英⚔️ TRAINING履歴

  const [allTrainingHistory] = useState(() => {

    try {

      return JSON.parse(

        localStorage.getItem("eikenTrainingHistory") || "[]"

      );

    } catch {

      return [];

    }

  });

  // HAL英⚔️ BATTLE履歴

  const [allBattleHistory] = useState(() => {

    try {

      return JSON.parse(

        localStorage.getItem("eikenBattleHistory") || "[]"

      );

    } catch {

      return [];

    }

  });

  function saveName() {

    const trimmedName = inputName.trim();

    if (trimmedName) {

      localStorage.setItem("playerName", trimmedName);

    } else {

      localStorage.removeItem("playerName");

    }

    setName(trimmedName);

    setEditing(false);

  }

  // 現在のプレイヤー本人の履歴だけ表示

  const trainingHistory = allTrainingHistory

    .filter((record) => record.playerName === name)

    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const battleHistory = allBattleHistory

    .filter((record) => record.playerName === name)

    .sort((a, b) => new Date(b.date) - new Date(a.date));

    // 現在のSTAGEを学習・BATTLE履歴から判定

const currentStage =

  [...trainingHistory, ...battleHistory].some(

    (record) => Number(record.stage) === 2

  )

    ? 2

    : 1;

  const now = new Date();

  function getCounts(history) {

    const today = history.filter((record) => {

      const date = new Date(record.date);

      return (

        date.getFullYear() === now.getFullYear() &&

        date.getMonth() === now.getMonth() &&

        date.getDate() === now.getDate()

      );

    }).length;

    const sevenDaysAgo = new Date(now);

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weekly = history.filter(

      (record) => new Date(record.date) >= sevenDaysAgo

    ).length;

    const monthly = history.filter((record) => {

      const date = new Date(record.date);

      return (

        date.getFullYear() === now.getFullYear() &&

        date.getMonth() === now.getMonth()

      );

    }).length;

    return {

      today,

      weekly,

      monthly,

      total: history.length,

    };

  }

  const trainingCounts = getCounts(trainingHistory);

  const battleCounts = getCounts(battleHistory);

  function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleString("ja-JP", {

      month: "numeric",

      day: "numeric",

      hour: "2-digit",

      minute: "2-digit",

    });

  }

 if (showDiaryBook) {
   return (
     <div style={{ minHeight: "100vh", maxWidth: "1700px", margin: "0 auto", padding: "35px", boxSizing: "border-box" }}>
       <h1 style={{ textAlign: "center", marginTop: 0 }}>📖 MY DIARY BOOK</h1>
       <p style={{ textAlign: "center", color: "#777" }}>{diaryDays} DAYS WRITTEN</p>
       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "30px", alignItems: "start" }}>
         <section style={{ background: "white", border: "1px solid #b9cce4", borderRadius: "14px", padding: "24px", minHeight: "480px" }}>
           <h2 style={{ marginTop: 0 }}>📚 PAST DIARY</h2>
           <p style={{ color: "#888", fontSize: "13px" }}>NEWEST FIRST</p>
           {diaryEntries.length === 0 ? (
             <p style={{ color: "#777" }}>まだ日記はありません。今日の1行から始めよう！</p>
           ) : (
             [...diaryEntries]
               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
               .map((entry) => {
                 const entryDate = new Date(entry.createdAt);
                 return (
                   <article key={entry.id} style={{ display: "grid", gridTemplateColumns: "80px minmax(0, 1fr)", gap: "14px", borderTop: "1px solid #e5e5e5", padding: "20px 0" }}>
                     <div style={{ fontSize: "13px", fontWeight: "bold", lineHeight: "1.7" }}>
                       {entryDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}
                       <div style={{ fontSize: "11px", color: "#888", fontWeight: "normal" }}>
                         {entryDate.toLocaleDateString("en-US", { year: "numeric", weekday: "short" }).toUpperCase()}
                       </div>
                     </div>
                     <div style={{ minWidth: 0 }}>
                       <div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", fontSize: "18px", lineHeight: "1.8" }}>{entry.text}</div>
                       <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                         <button type="button" onClick={() => editDiary(entry)}>EDIT</button>
                         <button type="button" onClick={() => deleteDiary(entry.id)}>DELETE</button>
                       </div>
                     </div>
                   </article>
                 );
               })
           )}
         </section>
         <section style={{ background: "white", border: "1px solid #e6d6a8", borderRadius: "14px", padding: "24px", minHeight: "480px" }}>
           <h2 style={{ marginTop: 0 }}>💡 WRITING TIPS</h2>
           <p style={{ color: "#777" }}>困ったときに開く、英語のヒント集。</p>
           {[
             { title: "1. What did you do today?", meaning: "今日は何をした？", examples: ["I played ...", "I went to ...", "I watched ..."] },
             { title: "2. How did you feel?", meaning: "どんな気持ちだった？", examples: ["It was fun.", "I was tired.", "I was surprised."] },
             { title: "3. What do you think?", meaning: "感想や次にしたいことは？", examples: ["I think ...", "I want to ...", "I hope ..."] },
           ].map((tip) => (
             <details key={tip.title} style={{ background: "#faf8f1", border: "1px solid #eee6d3", borderRadius: "10px", padding: "16px", marginBottom: "14px" }}>
               <summary style={{ cursor: "pointer", fontWeight: "bold" }}>{tip.title}</summary>
               <p style={{ color: "#777", fontSize: "14px" }}>{tip.meaning}</p>
               {tip.examples.map((example) => <p key={example} style={{ margin: "8px 0" }}>• {example}</p>)}
             </details>
           ))}
           <p style={{ fontSize: "13px", color: "#777" }}>1行だけでもOK！ 自分の言葉で書いてみよう。</p>
           <a href="https://translate.google.com/?sl=auto&tl=en&op=translate" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "10px 16px", border: "1px solid #aaa", borderRadius: "8px", color: "#333", textDecoration: "none", marginTop: "12px" }}>🌐 Google 翻訳 ↗</a>
         </section>
       </div>
       <div style={{ textAlign: "center", marginTop: "30px" }}>
         <button type="button" onClick={() => setShowDiaryBook(false)}>← MY PAGE に戻る</button>
       </div>
     </div>
   );
 }

  return (

    <div

      style={{

        minHeight: "100vh",

        padding: "35px",

        maxWidth: "1700px",

        margin: "0 auto",

      }}

    >

      {/* タイトル＋現在地 */}

      <div

        style={{

          position: "relative",

          marginBottom: "20px",

        }}

      >
<button
  type="button"
  onClick={onBack}
  style={{
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
  }}
>
  ← BACK
</button>
        <h1

          style={{

            textAlign: "center",

            margin: 0,

          }}

        >

          {name ? `${name}'s Page` : "MY PAGE"}

        </h1>

        <div

          style={{

            position: "absolute",

            right: "10px",

            top: "50%",

            transform: "translateY(-50%)",

            textAlign: "center",

            fontWeight: "bold",

            lineHeight: "1.4",

          }}

        >

          <div style={{ fontSize: "18px" }}>

            🗡️ ROOKIE

          </div>

          <div

            style={{

              fontSize: "13px",

              color: "#666",

            }}

          >

          STAGE {currentStage}

          </div>

        </div>

      </div>

      {/* 上段：左にプロフィールと回数、右に目標と日記 */}

      <div style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: "30px", alignItems: "start" }}>

        {/* 左：プロフィール＋集計 */}

        <div

          style={{

            border: "1px solid #ddd",

            borderRadius: "14px",

            padding: "20px",

            background: "white",

          }}

        >

          <h3 style={{ marginTop: 0 }}>NAME</h3>

          {!name || editing ? (

            <>

              <p

                style={{

                  fontSize: "13px",

                  marginBottom: "8px",

                }}

              >

                プレイヤー名

              </p>

              <input

                type="text"

                value={inputName}

                onChange={(e) => setInputName(e.target.value)}

                placeholder="名前"

                style={{

                  width: "100%",

                  boxSizing: "border-box",

                  padding: "8px",

                  fontSize: "15px",

                  marginBottom: "8px",

                }}

              />

              <button onClick={saveName}>

                SAVE

              </button>

            </>

          ) : (

            <>

              <div

                style={{

                  fontSize: "24px",

                  fontWeight: "bold",

                  margin: "15px 0",

                }}

              >

                👤 {name}

              </div>

              <button

                onClick={() => {

                  setInputName(name);

                  setEditing(true);

                }}

               style={{ fontSize: "16px" }}

              >

                name

              </button>

            </>

          )}

          {/* TRAINING集計 */}

          <div

            style={{

              marginTop: "20px",

              border: "1px solid #ddd",

              borderRadius: "14px",

              padding: "20px",

              background: "white",

            }}

          >

            <div

              style={{

                fontSize: "12px",

                color: "#666",

                marginBottom: "10px",

                fontWeight: "bold",

              }}

            >

              🏋️ TRAINING

            </div>

            <div

              style={{

                display: "grid",

                gridTemplateColumns: "1fr auto",

                rowGap: "8px",

                fontSize: "13px",

                alignItems: "center",

              }}

            >

              <span>TODAY</span>

              <strong>{trainingCounts.today}</strong>

              <span>WEEKLY</span>

              <strong>{trainingCounts.weekly}</strong>

              <span>MONTHLY</span>

              <strong>{trainingCounts.monthly}</strong>

              <span>TOTAL</span>

              <strong>{trainingCounts.total}</strong>

            </div>

          </div>

          {/* BATTLE集計 */}

          <div

            style={{

              marginTop: "20px",

              border: "1px solid #ddd",

              borderRadius: "14px",

              padding: "20px",

              background: "white",

            }}

          >

            <div

              style={{

                fontSize: "12px",

                color: "#666",

                marginBottom: "10px",

                fontWeight: "bold",

              }}

            >

              ⚔️ BATTLE

            </div>

            <div

              style={{

                display: "grid",

                gridTemplateColumns: "1fr auto",

                rowGap: "8px",

                fontSize: "13px",

                alignItems: "center",

              }}

            >

              <span>TODAY</span>

              <strong>{battleCounts.today}</strong>

              <span>WEEKLY</span>

              <strong>{battleCounts.weekly}</strong>

              <span>MONTHLY</span>

              <strong>{battleCounts.monthly}</strong>

              <span>TOTAL</span>

              <strong>{battleCounts.total}</strong>

            </div>

          </div>

        </div>

        <div style={{ minWidth: 0 }}>

{/* MY GOAL */}

<div

  style={{

    background: "white",

    border: "1px solid #e6d6a8",

    borderRadius: "14px",

    padding: "20px 25px",

    marginBottom: "20px",

  }}

>

  <div

    style={{

      color: "#999",

      fontWeight: "bold",

      marginBottom: "10px",

    }}

  >

    🎯 MY GOAL

  </div>

  {editingGoal ? (

    <>

 <textarea

  defaultValue={goal}

  onChange={(e) => {

    if (!e.nativeEvent.isComposing) {

      setGoal(e.target.value);

    }

  }}

  onCompositionEnd={(e) => {

    setGoal(e.currentTarget.value);

  }}

  maxLength={100}

        placeholder="ここに目標を書こう！"

        rows={2}

style={{

  display: "block",

  width: "100%",

  height: "90px",

  minHeight: "90px",

  maxHeight: "90px",

  boxSizing: "border-box",

  padding: "12px",

  fontSize: "20px",

  lineHeight: "1.5",

  border: "1px solid #ccc",

  borderRadius: "8px",

  resize: "none",

}}

      />

      <div style={{ marginTop: "10px" }}>

        <button onClick={saveGoal}>保存する</button>

        <span style={{ marginLeft: "12px", color: "#888" }}>

          {goal.length}/100

        </span>

      </div>

    </>

  ) : (

    <div

      onClick={() => setEditingGoal(true)}

      style={{

        fontSize: "24px",

        fontWeight: "bold",

        cursor: "pointer",

        minHeight: "35px",

        color: goal ? "#222" : "#aaa",

      }}

    >

      {goal || "ここに目標を書こう！ いつでも編集できるよ ✏️"}

    </div>

  )}

</div>

{/* MY DIARY */}

<div

  style={{

    background: "white",

    border: "1px solid #b9cce4",

    borderRadius: "14px",

    padding: "20px 25px",

    marginBottom: "20px",

    height: "auto",

    minHeight: "180px",

    boxSizing: "border-box",

    display: "flow-root",

  }}

>

  <div

    style={{

      display: "flex",

     justifyContent: "flex-start",
gap: "40px",

      alignItems: "center",

      marginBottom: "12px",

    }}

  >

    <strong>📓 MY DIARY</strong>

    <span style={{ color: "#888", fontSize: "13px" }}>

      FREE WRITING

    </span>

  </div>

  <textarea

    value={diaryText}

    onChange={(e) => {
  const englishOnly = e.target.value.replace(/[^\x00-\x7F]/g, "");
  setDiaryText(englishOnly);
}}

    onPaste={(e) => e.preventDefault()}

   placeholder="Write anything about your day... Only in English!!"

    rows={3}

style={{

  boxSizing: "border-box",

  display: "block",

  width: "100%",

  height: "168px",

  minHeight: "168px",

  padding: "10px 12px",

  fontSize: "22px",

  lineHeight: "48px",

  border: "1px solid #b9cce4",

  borderRadius: "8px",

  backgroundColor: "#fff",

  backgroundImage:

    "repeating-linear-gradient(to bottom, transparent 0px, transparent 47px, #b9cce4 47px, #b9cce4 48px)",

  backgroundOrigin: "content-box",

  backgroundClip: "content-box",

  resize: "vertical",

  fontFamily: "inherit",

}}

  />

  <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "10px",
    flexWrap: "wrap",
  }}
>
  <a
    href="https://translate.google.com/?sl=auto&tl=en&op=translate"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "8px 12px",
      border: "1px solid #b9cce4",
      borderRadius: "8px",
      textDecoration: "none",
      color: "#24364b",
      fontSize: "13px",
    }}
  >
    🌐 Google 翻訳 ↗
  </a>

  {editingDiaryId && (
    <button
      type="button"
      onClick={() => {
        setDiaryText("");
        setEditingDiaryId(null);
      }}
    >
      CANCEL
    </button>
  )}

  <button
    type="button"
    onClick={saveDiary}
    disabled={!diaryText.trim()}
  >
{editingDiaryId ? "SAVE" : "SAVE"}
  </button>

  <button
    type="button"
    onClick={() => setShowDiaryBook(true)}
  style={{
    marginLeft: "250px",
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: "10px",
  padding: "9px 16px",
  fontWeight: "bold",
}}
  >
  📖 MY DIARY →
  </button>

  <span
    style={{
      marginLeft: "auto",
      fontSize: "13px",
      color: "#888",
      whiteSpace: "nowrap",
    }}
  >
    {diaryDays} DAYS WRITTEN
  </span>
</div>
</div>

        </div>

      </div>
{/* MY WORDS 入口 */}
<div
  style={{
  display: "flex",
alignItems: "center",
justifyContent: "flex-start",
gap: "80px",
margin: "-70px 300px 17px 240px",
    padding: "14px 22px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "14px",
  }}
>
<div style={{ textAlign: "left" }}>
<div
  style={{
    fontSize: "20px",
    color: "#888",
    fontWeight: "normal",
  }}
>
  Build your own word list. Up to 30 words.
</div>
</div>

  <button
    type="button"
    style={{
      padding: "13px 28px",
      fontSize: "16px",
      fontWeight: "bold",
    }}
  >
    📚 MY WORDS →
  </button>
</div>
      {/* 下段：学習履歴を横幅いっぱいに2列表示 */}

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "30px", alignItems: "start", marginTop: "24px" }}>

        {/* 中央：TRAINING履歴 */}

        <div

          style={{

            border: "1px solid #ddd",

            borderRadius: "14px",

            padding: "25px",

           height: "260px",

            overflowY: "auto",

            background: "white",

            textAlign: "left",

            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",

          }}

        >

          <h2 style={{ marginTop: 0 }}>

            🏋️ TRAINING LOG

          </h2>

          {trainingHistory.length === 0 ? (

            <p style={{ color: "#777" }}>

              まだTRAINING記録はありません

            </p>

          ) : (

            trainingHistory.map((record) => (

              <div

                key={record.id}

                style={{

                  padding: "9px 0",

                  borderBottom: "1px solid #ddd",

                  fontSize: "13px",

                }}

              >

                {formatDate(record.date)}

                {" ｜ "}

                {record.rank} STAGE {record.stage}

                {" ｜ "}

                SET {record.set}

                {" ｜ "}

                ★ {record.lap}

              </div>

            ))

          )}

        </div>

        {/* 右：BATTLE履歴 */}

        <div

          style={{

            border: "1px solid #ddd",

            borderRadius: "14px",

            padding: "25px",

            height: "260px",

            overflowY: "auto",

            background: "white",

            textAlign: "left",

            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",

          }}

        >

          <h2 style={{ marginTop: 0 }}>

            ⚔️ BATTLE LOG

          </h2>

          {battleHistory.length === 0 ? (

            <p style={{ color: "#777" }}>

              まだBATTLE記録はありません

            </p>

          ) : (

           battleHistory.map((record) => (
              <div

                key={record.id}

                style={{

                  padding: "9px 0",

                  borderBottom: "1px solid #ddd",

                  fontSize: "13px",

                    display: "flex",

                    whiteSpace: "nowrap",

  alignItems: "center",

                }}

              >

                {formatDate(record.date)}

                {" ｜ "}

                {record.rank} STAGE {record.stage}

                {" ｜ "}

                {record.battleType}

                {" ｜ "}

              {Math.round(record.score)}%

                {" ｜ "}

                <strong style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>

                  {record.score >= 80

                    ? "WIN ⚔️"

                    : "LOSE"}

                </strong>

              </div>

            ))

          )}

        </div>

      </div>

      <div

        style={{

          marginTop: "30px",

          textAlign: "center",

        }}

      >

        <button onClick={onBack}>

         ← BACK

        </button>

      </div>

    </div>

  );

}