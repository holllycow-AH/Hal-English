import { useState } from "react";

export default function EikenMyPage({ onBack }) {
  const [name, setName] = useState(
    () => localStorage.getItem("playerName") || ""
  );

  const [inputName, setInputName] = useState(name);
  const [editing, setEditing] = useState(!name);

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
            STAGE 1
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
         gridTemplateColumns: "220px 1fr 1.18fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
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

        {/* 中央：TRAINING履歴 */}
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
            height: "520px",
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
                {record.score}%
                
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
          ← 戻る
        </button>
      </div>
    </div>
  );
}