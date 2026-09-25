import { useState } from "react";

export default function AppMyPage({ onBack }) {
  const [name, setName] = useState(
    () => localStorage.getItem("playerName") || ""
  );

  const [inputName, setInputName] = useState(name);
  const [editing, setEditing] = useState(!name);

  const [allHistory] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("newCrownHistory") || "[]"
      );
    } catch {
      return [];
    }
  });
const [allWordHistory] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("wordHistory") || "[]"
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

  // 現在のプレイヤー本人の履歴だけ
  // 最新の記録が一番上
  const history = allHistory
    .filter((record) => record.playerName === name)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
    const wordHistory = allWordHistory
  .filter((record) => record.playerName === name)
  .sort((a, b) => new Date(b.date) - new Date(a.date));
    const now = new Date();

const todayCount = history.filter((record) => {
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

const weeklyCount = history.filter(
  (record) => new Date(record.date) >= sevenDaysAgo
).length;

const monthlyCount = history.filter((record) => {
  const date = new Date(record.date);

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}).length;

const totalCount = history.length;
const wordTodayCount = wordHistory.filter((record) => {
  const date = new Date(record.date);

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}).length;

const wordWeeklyCount = wordHistory.filter(
  (record) => new Date(record.date) >= sevenDaysAgo
).length;

const wordMonthlyCount = wordHistory.filter((record) => {
  const date = new Date(record.date);

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}).length;

const wordTotalCount = wordHistory.length;
  function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("ja-JP", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
      return `${seconds}秒`;
    }

    return `${minutes}分${seconds}秒`;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "35px",
       maxWidth: "1400px",
margin: "0",
      }}
    >
      <h1
  style={{
    textAlign: "center",
    marginBottom: "35px",
  }}
>
  {name ? ` ${name}'s Page` : "MY PAGE"}
</h1>

      <div
        style={{
          display: "grid",
         gridTemplateColumns: "220px 1fr 1fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        {/* 左：プロフィール */}
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
                onChange={(e) =>
                  setInputName(e.target.value)
                }
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
                登録
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
                style={{ fontSize: "12px" }}
              >
                名前変更
              </button>
            </>
          )}

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
    PLAY
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
    <strong>{todayCount}</strong>

    <span>WEEKLY</span>
    <strong>{weeklyCount}</strong>

    <span>MONTHLY</span>
    <strong>{monthlyCount}</strong>

    <span>TOTAL</span>
    <strong>{totalCount}</strong>
  </div>
</div>

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
    WORD
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
<strong>{wordTodayCount}</strong>

<span>WEEKLY</span>
<strong>{wordWeeklyCount}</strong>

<span>MONTHLY</span>
<strong>{wordMonthlyCount}</strong>

<span>TOTAL</span>
<strong>{wordTotalCount}</strong>
  </div>
</div>
        </div>

        {/* 右：学習履歴 */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "14px",
            padding: "25px",
          height: "520px",
overflowY: "auto",
            background: "white",
            textAlign: "left",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
        <h2 style={{ marginTop: 0 }}>
  🎮 PLAY LOG
</h2>

<div
  style={{
    maxHeight: "420px",
    overflowY: "auto",
    paddingRight: "8px",
  }}
></div>
          {history.length === 0 ? (
            <p style={{ color: "#777" }}>
              まだ学習記録はありません
            </p>
          ) : (
  history.map((record) => (
  <div
    key={record.id}
    style={{
      padding: "7px 0",
      borderBottom: "1px solid #ddd",
      fontSize: "13px",
      whiteSpace: "nowrap",
      overflowX: "auto",
    }}
  >
    {record.activity === "GAME 15" ? (
      <>
        {formatDate(record.date)}
        {" ｜ "}
        GAME 15
        {" ｜ "}
        完全正解 {record.correctCount}/{record.totalCount}
      </>
    ) : (
      <>
        {formatDate(record.date)}
        {" ｜ "}
        {record.lessonName} / {record.sectionName}
        {" ｜ "}
        長文
        {" ｜ "}
        正確 {record.correctCount}/{record.totalCount}
        {" ｜ "}
        ミス {record.wrong}
        {" ｜ "}
        {formatTime(record.elapsedTime)}
      </>
    )}
 </div>
 
))
          )}
        </div>
        {/* 右：単語履歴 */}
<div
  style={{
    border: "1px solid #ddd",
    borderRadius: "14px",
    padding: "25px",
   height: "520px",
overflowY: "auto",
    background: "white",
    textAlign: "left",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  }}
>
  <h2 style={{ marginTop: 0 }}>
    📝 WORD LOG
  </h2>

{wordHistory.length === 0 ? (
  <p style={{ color: "#777" }}>
    まだ単語記録はありません
  </p>
) : (
  wordHistory.map((record) => (
    <div
      key={record.id}
      style={{
        padding: "7px 0",
        borderBottom: "1px solid #ddd",
        fontSize: "13px",
        whiteSpace: "nowrap",
        overflowX: "auto",
      }}
    >
      {formatDate(record.date)}
      {" ｜ "}
     {record.activity || record.category}
      {" ｜ "}
      正解 {record.correctCount}/{record.totalCount}
      {" ｜ "}
      ミス {record.wrong}
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
          ← 戻る
        </button>
      </div>
    </div>
  );
}