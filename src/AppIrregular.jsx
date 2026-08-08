import { useRef, useState } from "react";
const verbs = [
  {
    japanese: "～になる",
    base: "become",
    past: "became",
    participle: "become",
  },
  {
    japanese: "始める",
    base: "begin",
    past: "began",
    participle: "begun",
  },
  {
    japanese: "持ってくる",
    base: "bring",
    past: "brought",
    participle: "brought",
  },
  {
    japanese: "買う",
    base: "buy",
    past: "bought",
    participle: "bought",
  },
  {
    japanese: "捕まえる",
    base: "catch",
    past: "caught",
    participle: "caught",
  },
];export default function AppIrregular() {
    const current = verbs[0];
    const [base, setBase] = useState("");
const [past, setPast] = useState("");
const [participle, setParticiple] = useState("");

const baseRef = useRef(null);
const pastRef = useRef(null);
const participleRef = useRef(null);
return (
  <div
style={{
  padding: "30px",
  textAlign: "center",
  maxWidth: "1000px",
  margin: "0 auto",
}}
  >
    <h1 style={{ marginBottom: "8px" }}>⚡ 不規則動詞</h1>

    <p style={{ marginTop: 0, fontWeight: "bold" }}>
      原形 → 過去形 → 過去分詞
    </p>

   <div
  style={{
    fontSize: "52px",
    lineHeight: 1,
    letterSpacing: "1px",
    margin: "28px 0 20px",
    minHeight: "58px",
  }}
>
  ⚪ ⚪ ⚪
</div>
<div
  style={{
    textAlign: "center",
    marginBottom: "24px",
  }}
>
  <div style={{ fontSize: "20px", color: "#666" }}>
    1 / {verbs.length}
  </div>

  <h2
    style={{
      fontSize: "42px",
      marginTop: "12px",
      marginBottom: "50",
      fontWeight: "700",
    }}
  >
    {current.japanese}
  </h2>
</div>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
        marginTop: "70px",
      }}
    >
      <div>
<p
  style={{
    fontSize: "32px",
    color: "#666",
    fontWeight: "700",
    whiteSpace: "nowrap",
    margin: "0 0 14px",
  }}
>
  ① 原形
</p><input
  ref={baseRef}
  value={base}
  style={inputStyle}
  onChange={(e) => {
    const value = e.target.value;
    setBase(value);

    if (value.toLowerCase() === current.base) {
      pastRef.current.focus();
    }
  }}
/>
      </div>

      <div>
<p
  style={{
    fontSize: "32px",
    color: "#666",
    fontWeight: "700",
    whiteSpace: "nowrap",
    margin: "0 0 14px",
  }}
>
  ② 過去形
</p>
        <input style={inputStyle} />
      </div>

      <div>
<p
  style={{
    fontSize: "32px",
    color: "#666",
    fontWeight: "700",
    whiteSpace: "nowrap",
    margin: "0 0 14px",
  }}
>
  ③ 過去分詞
</p>
        <input
  ref={pastRef}
  value={past}
  style={inputStyle}
  onChange={(e) => {
    const value = e.target.value;
    setPast(value);

    if (value.toLowerCase() === current.past) {
      participleRef.current.focus();
    }
  }}
/>
      </div>
    </div>
  </div>
);
}
const inputStyle = {
  width: "220px",
  padding: "18px",
  fontSize: "24px",
  textAlign: "center",
  border: "2px solid #d1d5db",
  borderRadius: "12px",
  outline: "none",
};