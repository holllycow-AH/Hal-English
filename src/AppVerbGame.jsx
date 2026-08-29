import { useMemo, useRef, useState } from "react";
import { verbs } from "./AppIrregular";

const GAME_SIZE = 15;

const answerKeys = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."123456789",
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function makeGameQuestions() {
  return shuffle(verbs).slice(0, GAME_SIZE);
}

function makeMeaningChoices(current) {
  const wrongChoices = shuffle(
    verbs.filter((verb) => verb.base !== current.base)
  ).slice(0, 3);

  const choices = shuffle([current, ...wrongChoices]);
  const keys = shuffle(answerKeys).slice(0, 4);

  return choices.map((verb, index) => ({
    key: keys[index],
    japanese: verb.japanese,
    correct: verb.base === current.base,
  }));
}

export default function AppVerbGame({ onBack }) {
  const [questions] = useState(() => makeGameQuestions());
  const [questionIndex, setQuestionIndex] = useState(0);

  const [past, setPast] = useState("");
  const [participle, setParticiple] = useState("");
  const [meaningKey, setMeaningKey] = useState("");

  const [pastDone, setPastDone] = useState(false);
  const [participleDone, setParticipleDone] = useState(false);

  const [pastMessage, setPastMessage] = useState("");
  const [participleMessage, setParticipleMessage] = useState("");
  const [meaningMessage, setMeaningMessage] = useState("");

  const [questionMistakes, setQuestionMistakes] = useState({
    past: false,
    participle: false,
    meaning: false,
  });

  const [stats, setStats] = useState({
    perfect: 0,
    pastMistakes: 0,
    participleMistakes: 0,
    meaningMistakes: 0,
    giveUps: 0,
  });

  const [finished, setFinished] = useState(false);

  const pastRef = useRef(null);
  const participleRef = useRef(null);
  const meaningRef = useRef(null);

  const advancingRef = useRef(false);

  const current = questions[questionIndex];

  const meaningChoices = useMemo(
    () => makeMeaningChoices(current),
    [current]
  );

  const correctMeaning = meaningChoices.find(
    (choice) => choice.correct
  );

  const resetQuestion = () => {
    setPast("");
    setParticiple("");
    setMeaningKey("");

    setPastDone(false);
    setParticipleDone(false);

    setPastMessage("");
    setParticipleMessage("");
    setMeaningMessage("");

    setQuestionMistakes({
      past: false,
      participle: false,
      meaning: false,
    });

    advancingRef.current = false;

    setTimeout(() => {
      pastRef.current?.focus();
    }, 50);
  };

  const finishQuestion = (finalMistakes = questionMistakes) => {
    const perfect =
      !finalMistakes.past &&
      !finalMistakes.participle &&
      !finalMistakes.meaning;

    setStats((prev) => ({
      ...prev,
      perfect: prev.perfect + (perfect ? 1 : 0),
      pastMistakes:
        prev.pastMistakes + (finalMistakes.past ? 1 : 0),
      participleMistakes:
        prev.participleMistakes +
        (finalMistakes.participle ? 1 : 0),
      meaningMistakes:
        prev.meaningMistakes +
        (finalMistakes.meaning ? 1 : 0),
    }));

    if (questionIndex >= GAME_SIZE - 1) {
      setTimeout(() => {
        setFinished(true);
      }, 350);

      return;
    }

    setTimeout(() => {
      setQuestionIndex((prev) => prev + 1);
      resetQuestion();
    }, 350);
  };

  const handlePastEnter = () => {
    if (pastDone) return;

    const answer = past.trim().toLowerCase();
    const correct = current.past.toLowerCase();

    // 空欄Enter = ギブアップ
    if (answer === "") {
      const newMistakes = {
        ...questionMistakes,
        past: true,
      };

      setQuestionMistakes(newMistakes);

      setStats((prev) => ({
        ...prev,
        giveUps: prev.giveUps + 1,
      }));

      setPast(current.past);
      setPastDone(true);
      setPastMessage(`🏳️ 正解: ${current.past}`);

      setTimeout(() => {
        participleRef.current?.focus();
      }, 150);

      return;
    }

    // 正解
    if (answer === correct) {
      setPastDone(true);
      setPastMessage("✓");

      setTimeout(() => {
        participleRef.current?.focus();
      }, 100);

      return;
    }

    // 間違えてEnter
    setQuestionMistakes((prev) => ({
      ...prev,
      past: true,
    }));

    setPastMessage("× もう一度");
  };

  const handleParticipleEnter = () => {
    if (participleDone) return;

    const answer = participle.trim().toLowerCase();
    const correct = current.participle.toLowerCase();

    // 空欄Enter = ギブアップ
    if (answer === "") {
      const newMistakes = {
        ...questionMistakes,
        participle: true,
      };

      setQuestionMistakes(newMistakes);

      setStats((prev) => ({
        ...prev,
        giveUps: prev.giveUps + 1,
      }));

      setParticiple(current.participle);
      setParticipleDone(true);
      setParticipleMessage(
        `🏳️ 正解: ${current.participle}`
      );

      setTimeout(() => {
        meaningRef.current?.focus();
      }, 150);

      return;
    }

    // 正解
    if (answer === correct) {
      setParticipleDone(true);
      setParticipleMessage("✓");

      setTimeout(() => {
        meaningRef.current?.focus();
      }, 100);

      return;
    }

    // 間違えてEnter
    setQuestionMistakes((prev) => ({
      ...prev,
      participle: true,
    }));

    setParticipleMessage("× もう一度");
  };

const handleMeaningKeyDown = (e) => {
  if (advancingRef.current) return;

  const key = e.key.toLowerCase();

  // Backspace = 入力を消す
  if (e.key === "Backspace") {
    e.preventDefault();
    setMeaningKey("");
    setMeaningMessage("");
    return;
  }

  // Enter = 回答確定
  if (e.key === "Enter") {
    e.preventDefault();

    // 空欄Enter = ギブアップ
    if (meaningKey === "") {
      advancingRef.current = true;

      const newMistakes = {
        ...questionMistakes,
        meaning: true,
      };

      setQuestionMistakes(newMistakes);

      setStats((prev) => ({
        ...prev,
        giveUps: prev.giveUps + 1,
      }));

      setMeaningKey(correctMeaning.key);

      setMeaningMessage(
        `🏳️ 正解: ${correctMeaning.key}. ${correctMeaning.japanese}`
      );

      finishQuestion(newMistakes);
      return;
    }

    // 入力されたキーが4択のどれか確認
    const selectedChoice = meaningChoices.find(
      (choice) => choice.key === meaningKey.toLowerCase()
    );

    // 4択に存在しない文字
    if (!selectedChoice) {
      setMeaningMessage("このキーは選択肢にありません");
      return;
    }

    // 正解
    if (selectedChoice.correct) {
      advancingRef.current = true;

      setMeaningMessage("✓");

      finishQuestion(questionMistakes);
      return;
    }

    // 4択にある別の意味を選んでEnter = 意味ミス
    setQuestionMistakes((prev) => ({
      ...prev,
      meaning: true,
    }));

    setMeaningMessage("× もう一度");

    setTimeout(() => {
      setMeaningKey("");
      setMeaningMessage("");
    }, 500);

    return;
  }

  // アルファベット・数字の入力
  if (/^[a-z1-9]$/.test(key)) {
    e.preventDefault();

    // まだ採点しない。入力するだけ。
    setMeaningKey(key);
    setMeaningMessage("");
  }
};

  if (finished) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "42px" }}>
          🎮 GAME 15 RESULT
        </h1>

        <div
          style={{
            fontSize: "54px",
            fontWeight: "800",
            margin: "35px 0",
          }}
        >
          {stats.perfect} / 15
        </div>

        <div
          style={{
            fontSize: "20px",
            lineHeight: "2",
            marginBottom: "35px",
          }}
        >
          <div>
            完全正解　<strong>{stats.perfect}</strong>
          </div>

          <div>
            過去形ミス　<strong>{stats.pastMistakes}</strong>
          </div>

          <div>
            過去分詞ミス　
            <strong>{stats.participleMistakes}</strong>
          </div>

          <div>
            意味ミス　<strong>{stats.meaningMistakes}</strong>
          </div>

          <div>
            ギブアップ　<strong>{stats.giveUps}</strong>
          </div>
        </div>

        <button
          onClick={onBack}
          style={{
            padding: "12px 28px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ← BACK
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        maxWidth: "850px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        ← BACK
      </button>

      <div
        style={{
          fontSize: "18px",
          fontWeight: "700",
          marginBottom: "25px",
        }}
      >
        🎮 GAME 15　{questionIndex + 1} / 15
      </div>

      <h1
        style={{
          fontSize: "52px",
          margin: "15px 0 35px",
        }}
      >
        {current.base}
      </h1>

      {/* 過去形・過去分詞 横並び */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          flexWrap: "wrap",
          marginBottom: "35px",
        }}
      >
        {/* 過去形 */}
        <div>
          <div
            style={{
              fontSize: "18px",
              marginBottom: "8px",
            }}
          >
            過去形
          </div>

          <input
            ref={pastRef}
            autoFocus
            disabled={pastDone}
            value={past}
            onChange={(e) => {
              setPast(
                e.target.value.replaceAll(" ", "")
              );

              setPastMessage("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handlePastEnter();
              }
            }}
            style={{
              width: "250px",
              padding: "14px",
              fontSize: "26px",
              textAlign: "center",
            }}
          />

          <div
            style={{
              minHeight: "28px",
              marginTop: "7px",
              fontWeight: "700",
            }}
          >
            {pastMessage}
          </div>
        </div>

        {/* 過去分詞 */}
        <div>
          <div
            style={{
              fontSize: "18px",
              marginBottom: "8px",
            }}
          >
            過去分詞
          </div>

          <input
            ref={participleRef}
            disabled={!pastDone || participleDone}
            value={participle}
            onChange={(e) => {
              setParticiple(
                e.target.value.replaceAll(" ", "")
              );

              setParticipleMessage("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleParticipleEnter();
              }
            }}
            style={{
              width: "250px",
              padding: "14px",
              fontSize: "26px",
              textAlign: "center",
            }}
          />

          <div
            style={{
              minHeight: "28px",
              marginTop: "7px",
              fontWeight: "700",
            }}
          >
            {participleMessage}
          </div>
        </div>
      </div>

      {/* 意味問題 */}
      <div
        style={{
          marginTop: "10px",
          paddingTop: "24px",
          borderTop: "1px solid #ddd",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "18px",
          }}
        >
          意味は？
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            maxWidth: "560px",
            margin: "0 auto 20px",
            textAlign: "left",
          }}
        >
          {meaningChoices.map((choice) => (
            <div
              key={choice.key}
              style={{
                padding: "12px",
                fontSize: "19px",
              }}
            >
              <strong>{choice.key}.</strong>{" "}
              {choice.japanese}
            </div>
          ))}
        </div>

        <input
          ref={meaningRef}
          value={meaningKey}
          readOnly
          disabled={!participleDone}
          onKeyDown={handleMeaningKeyDown}
          style={{
            width: "90px",
            padding: "12px",
            fontSize: "28px",
            textAlign: "center",
            fontWeight: "700",
          }}
        />

        <div
          style={{
            minHeight: "30px",
            marginTop: "8px",
            fontWeight: "700",
          }}
        >
          {meaningMessage}
        </div>

        <div
          style={{
            marginTop: "10px",
            fontSize: "14px",
            opacity: 0.65,
          }}
        >
          分からないときは空欄のまま Enter
        </div>
      </div>
    </div>
  );
}