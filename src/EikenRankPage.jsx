import { useState } from "react";
import { ROOKIE_STAGE1_DATA } from "./data/vocabulary/rookieStage1.js";
import { ROOKIE_STAGE2_DATA } from "./data/vocabulary/rookieStage2.js";
import { ROOKIE_STAGE3_DATA } from "./data/vocabulary/rookieStage3.js";
import { ROOKIE_STAGE4_DATA } from "./data/vocabulary/rookieStage4.js";
import { ROOKIE_STAGE5_DATA } from "./data/vocabulary/rookieStage5.js";
export default function EikenRankPage({ onBack }) {
    const [wordRank, setWordRank] = useState(null);

const [pinnedWords, setPinnedWords] = useState(() => {
  const saved = localStorage.getItem("eiken-pre2-pinned-words");
  return saved ? JSON.parse(saved) : [];
});

    const [openJapanese, setOpenJapanese] = useState(null);
    const [showPinGuide, setShowPinGuide] = useState(false);
const [showPinnedOnly, setShowPinnedOnly] = useState(false);

    const togglePin = (word) => {
  const nextPinnedWords = pinnedWords.includes(word)
    ? pinnedWords.filter((item) => item !== word)
    : [...pinnedWords, word];

  setPinnedWords(nextPinnedWords);

  localStorage.setItem(
    "eiken-pre2-pinned-words",
    JSON.stringify(nextPinnedWords)
  );
};
  const ranks = [
    "ROOKIE",
    "CHALLENGER",
    "FIGHTER",
    "KNIGHT",
    "VETERAN",
    "EXPERT",
    "MASTER",
    "LEGEND",
  ];

  const currentRank = "ROOKIE";
  if (wordRank) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f7f7f7",
          padding: "28px 24px 50px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <button
            type="button"
            onClick={() => setWordRank(null)}
            style={{
              padding: "8px 16px",
              border: "1px solid #bbb",
              borderRadius: "10px",
              background: "#ffffff",
              color: "#222",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            ← RANK
            </button>
          <div
  style={{
    marginTop: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  }}
>
  <div style={{ width: "230px" }} />

  <h1
    style={{
      margin: 0,
      textAlign: "center",
      flex: 1,
    }}
  >
    {showPinnedOnly ? `${wordRank} PIN` : `${wordRank} WORDS`}
  </h1>

  <div
    style={{
      width: "230px",
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px",
    }}
  >
   

    <button
      type="button"
      onClick={() => setShowPinnedOnly((prev) => !prev)}
      style={{
        padding: "7px 10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: showPinnedOnly ? "#f1f1f1" : "#fff",
        color: "#555",
        cursor: "pointer",
        fontWeight: "700",
        whiteSpace: "nowrap",
      }}
    >
      {showPinnedOnly ? "WORDS" : "📍 PIN"}
    </button>
  </div>
</div>

{showPinnedOnly && (
  <div
    style={{
      margin: "14px auto 0",
      padding: "10px 16px",
      maxWidth: "620px",
      background: "#ffffff",
      border: "1px solid #ddd",
      borderRadius: "10px",
      color: "#666",
      fontSize: "15px",
      lineHeight: "1.7",
      textAlign: "center",
    }}
  >
    わからない単語・覚えたい単語に📍をつけよう！
    <br />
    📍をつけた単語だけ、ここでまとめて確認できます。
  </div>
)}

      <div
  style={{
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  }}
>
{[
  ...new Map(
  [
  ...ROOKIE_STAGE1_DATA,
  ...ROOKIE_STAGE2_DATA,
  ...ROOKIE_STAGE3_DATA,
  ...ROOKIE_STAGE4_DATA,

  ...ROOKIE_STAGE5_DATA,

]
      .map((item) => [item.word, item])
  ).values()
]
  .filter((item) => showPinnedOnly ? pinnedWords.includes(item.word) : true)
  .map((item) => {
  const isOpen = openJapanese === item.word;
  const isPinned = pinnedWords.includes(item.word);

  return (
    <div
      key={item.word}
      style={{
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "8px 12px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "250px 1fr 1fr 110px 50px",
          gap: "12px",
          alignItems: "center",
          minHeight: "44px",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: "900",
          }}
        >
          {item.word}
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#444",
          }}
        >
          {item.phrases[0]?.en}
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#444",
          }}
        >
          {item.phrases[1]?.en}
        </div>

        <button
          type="button"
          onClick={() =>
            setOpenJapanese(isOpen ? null : item.word)
          }
          style={{
            border: "1px solid #ccc",
            borderRadius: "9px",
            background: isOpen ? "#f0f0f0" : "#ffffff",
            padding: "9px 12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
            whiteSpace: "nowrap",
            color: "#777",
          }}
        >
          日本語
        </button>

        <button
          type="button"
          onClick={() => togglePin(item.word)}
          title={isPinned ? "PINを外す" : "PINする"}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "28px",
            filter: isPinned ? "none" : "grayscale(1)",
            opacity: isPinned ? 1 : 0.28,
            transition: "0.15s",
          }}
        >
          📍
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "250px 1fr 1fr 110px 50px",
            gap: "12px",
            alignItems: "start",
            paddingTop: "7px",
            paddingBottom: "3px",
            borderTop: "1px dashed #e5e5e5",
            color: "#666",
            fontSize: "18px",
          }}
        >
          <div style={{ fontWeight: "700" }}>
            {item.meaning}
          </div>

          <div>{item.phrases[0]?.ja}</div>

          <div>{item.phrases[1]?.ja}</div>

          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
})}
  
</div>
        </div>
      </div>
    );
  }


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        padding: "28px 24px 50px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* BACK */}
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "8px 16px",
            border: "1px solid #bbb",
            borderRadius: "10px",
            background: "#ffffff",
            color: "#222",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          ← MY PAGE
        </button>

        {/* TITLE */}
        <div
          style={{
            textAlign: "center",
            marginTop: "18px",
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: "900",
            }}
          >
            HAL ENGLISH 英⚔️ Pre2
          </h1>

          <div
            style={{
              marginTop: "8px",
              fontSize: "15px",
              fontWeight: "800",
              letterSpacing: "2px",
              color: "#777",
            }}
          >
            RANK
          </div>
        </div>

        {/* RANK LIST */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {ranks.map((rank) => {
            const isCurrent = rank === currentRank;
            const isLocked = !isCurrent;

            return (
              <div
                key={rank}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 130px 130px",
                  gap: "10px",
                  alignItems: "stretch",
                }}
              >
                {/* RANK BUTTON */}
                <button
                  type="button"
                  disabled={isLocked}
                  style={{
                    minHeight: "62px",
                    padding: "10px 18px",
                    border: isCurrent
                      ? "2px solid #222"
                      : "1px solid #d5d5d5",
                    borderRadius: "12px",
                    background: isCurrent ? "#ffffff" : "#eeeeee",
                    color: isCurrent ? "#111" : "#999",
                    cursor: isCurrent ? "pointer" : "default",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "900",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {rank}
                    </div>

                    {isCurrent && (
                      <div
                        style={{
                          marginTop: "3px",
                          fontSize: "11px",
                          fontWeight: "800",
                          color: "#777",
                        }}
                      >
                        CURRENT RANK
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {isLocked ? "🔒" : "⚔️"}
                  </div>
                </button>

                {/* WORD */}
                <button
                  type="button"
                  onClick={() => setWordRank(rank)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "12px",
                    background: "#ffffff",
                    color: "#222",
                    cursor: "pointer",
                    fontWeight: "800",
                    fontSize: "14px",
                  }}
                >
                  WORD
                </button>

                {/* PIN */}
                <button
                  type="button"
                  onClick={() => {
  setShowPinnedOnly(true);
  setWordRank(rank);
}}
                  style={{
                    
                    border: "1px solid #ccc",
                    borderRadius: "12px",
                    background: "#ffffff",
                    color: "#222",
                    cursor: "pointer",
                    fontWeight: "800",
                    fontSize: "14px",
                  }}
                >
                  📍 PIN
                </button>
              </div>
            );
          })}
        </div>

        {/* SIMPLE PROGRESS */}
        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            color: "#888",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          Clear each rank to unlock the next.
        </div>
      </div>
    </div>
  );
}