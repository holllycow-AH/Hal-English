import { useEffect, useRef, useState } from "react";

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
];

export default function AppIrregular() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [base, setBase] = useState("");
  const [past, setPast] = useState("");
  const [participle, setParticiple] = useState("");

  const [completedCount, setCompletedCount] = useState(0);
const [helpField, setHelpField] = useState(null);
  const baseRef = useRef(null);
  const pastRef = useRef(null);
  const participleRef = useRef(null);

  const current = verbs[currentIndex];
  
const playFireSound = (level) => {
const audio = new Audio("/sounds/mixkit-arrow-whoosh-1491.wav");

  if (level === 1) audio.volume = 0.75;
  if (level === 2) audio.volume = 0.85;
  if (level === 3) audio.volume = 0.99;

  audio.play().catch(() => {});
};
const speakForms = (base, past, participle) => {
  const voices = speechSynthesis.getVoices();

  const voice =
    voices.find((v) => v.name === "Google US English") ||
    voices.find((v) => v.lang === "en-US");

  const text = `${base}, ${past}, ${participle}`;

  const utterance = new SpeechSynthesisUtterance(text);

  if (voice) {
    utterance.voice = voice;
  }

  utterance.lang = "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};
  useEffect(() => {
    baseRef.current?.focus();
  }, [currentIndex]);

  const nextQuestion = () => {
    setTimeout(() => {
      setBase("");
      setPast("");
      setParticiple("");
      setCompletedCount(0);

      setCurrentIndex((prev) => {
        if (prev === verbs.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, 2600);
  };

  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          marginBottom: "8px",
        }}
      >
        ⚡ 不規則動詞
      </h1>

      <p
        style={{
          marginTop: 0,
          fontWeight: "bold",
          color: "#666",
          fontSize: "22px",
        }}
      >
        原形 → 過去形 → 過去分詞
      </p>

      <div
        style={{
          fontSize: "64px",
          display: "flex",
          justifyContent: "center",
          gap: "18px",
          margin: "32px 0 32px",
        }}
      >
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              transform:
                completedCount > index ? "scale(1.15)" : "scale(1)",
              transition: "all 0.15s ease",
            }}
          >
            {completedCount > index ? "🔥" : "○"}
          </span>
        ))}
      </div>

      <div
        style={{
          fontSize: "18px",
          color: "#888",
          marginBottom: "30px",
        }}
      >
        {currentIndex + 1} / {verbs.length}
      </div>

      <h2
        style={{
          fontSize: "48px",
          fontWeight: "700",
          margin: "0 0 70px",
        }}
      >
        {current.japanese}
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "nowrap",
        }}
      >
        <div>
<div>
  <p style={labelStyle}>① 原形</p>

  <input
    ref={baseRef}
    value={base}
    style={inputStyle}
    onKeyDown={(e) => {
      if (e.key === "0") {
        e.preventDefault();
        setHelpField("base");
      }
    }}
    onChange={(e) => {
      const value = e.target.value.replaceAll("0", "");

      setBase(value);

      if (
        value.trim().toLowerCase() ===
        current.base.toLowerCase()
      ) {
        setCompletedCount(1);
        playFireSound(1);
        setHelpField(null);
        pastRef.current?.focus();
      }
    }}
  />

{helpField === "base" && (
  <p
    style={{
      color: "#aaa",
      fontSize: "22px",
      marginTop: "10px",
      marginBottom: "0",
    }}
  >
    {current.base}
  </p>
)}
</div>

        <div>
          <p style={labelStyle}>② 過去形</p>

          <input
            ref={pastRef}
            value={past}
            style={inputStyle}
            onChange={(e) => {
              const value = e.target.value;
              setPast(value);

              if (
                value.trim().toLowerCase() ===
                current.past.toLowerCase()
) {
setCompletedCount(2);
playFireSound(2);
participleRef.current?.focus();
}
            }}
          />
        </div>

        <div>
         <div>
  <p style={labelStyle}>③ 過去分詞</p>

  <input
    ref={participleRef}
    value={participle}
    style={inputStyle}
    onChange={(e) => {
      const value = e.target.value;
      setParticiple(value);

      if (
        value.trim().toLowerCase() ===
        current.participle.toLowerCase()
      ) {
        setCompletedCount(3);
        playFireSound(3);

        setTimeout(() => {
          speakForms(
            current.base,
            current.past,
            current.participle
          );
        }, 250);

        nextQuestion();
      }
    }}
  />
</div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: "32px",
  color: "#666",
  fontWeight: "700",
  whiteSpace: "nowrap",
  margin: "0 0 18px",
};

const inputStyle = {
  width: "220px",
  padding: "18px",
  fontSize: "26px",
  textAlign: "center",
  border: "2px solid #d1d5db",
  borderRadius: "12px",
  outline: "none",
};