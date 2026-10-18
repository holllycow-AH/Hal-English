
export const STAGE5_QUESTIONS = [
  // Q1：explain
  {
    type: "japanese",
    prompt: "理由を説明する",
    parts: ["explain", "the", "reason", "protect", "animals"],
    answer: ["explain", "the", "reason"],
    translation: "理由を説明する",
  },

  // Q2：describe
  {
    type: "context",
    prompt: "What happened yesterday? Please ________.",
    parts: ["describe", "what", "happened", "reduce", "waste"],
    answer: ["describe", "what", "happened"],
    completed: "What happened yesterday? Please describe what happened.",
    translation: "昨日何が起きたの？ 何が起きたか説明してください。",
  },

  // Q3：compare
  {
    type: "japanese",
    prompt: "価格を比較する",
    parts: ["compare", "prices", "develop", "skill", "the"],
    answer: ["compare", "prices"],
    translation: "価格を比較する",
  },

  // Q4：solve
  {
    type: "japanese",
    prompt: "問題を解決する",
    parts: ["solve", "a", "problem", "create", "food"],
    answer: ["solve", "a", "problem"],
    translation: "問題を解決する",
  },

  // Q5：protect
  {
    type: "context",
    prompt: "Many animals are in danger. We must ________.",
    parts: ["protect", "animals", "compare", "prices", "quickly"],
    answer: ["protect", "animals"],
    completed: "Many animals are in danger. We must protect animals.",
    translation: "多くの動物が危険にさらされています。私たちは動物を守らなければなりません。",
  },

  // Q6：reduce
  {
    type: "japanese",
    prompt: "ごみを減らす",
    parts: ["reduce", "waste", "discover", "truth", "the"],
    answer: ["reduce", "waste"],
    translation: "ごみを減らす",
  },

  // Q7：tradition
  {
    type: "japanese",
    prompt: "伝統を守り続ける",
    parts: ["keep", "a", "tradition", "alive", "modern", "prices"],
    answer: ["keep", "a", "tradition", "alive"],
    translation: "伝統を守り続ける",
  },

  // Q8：research
  {
    type: "context",
    prompt: "We need to learn more about this topic. Let's ________.",
    parts: ["do", "research", "protect", "animals", "the"],
    answer: ["do", "research"],
    completed: "We need to learn more about this topic. Let's do research.",
    translation: "このテーマについてもっと知る必要があります。調査をしましょう。",
  },

  // Q9：opinion
  {
    type: "japanese",
    prompt: "私の意見では",
    parts: ["in", "my", "opinion", "reduce", "waste"],
    answer: ["in", "my", "opinion"],
    translation: "私の意見では",
  },

  // Q10：opportunity
  {
    type: "context",
    prompt: "I can study English in America. This is ________!",
    parts: ["a", "good", "opportunity", "reduce", "waste"],
    answer: ["a", "good", "opportunity"],
    completed: "I can study English in America. This is a good opportunity!",
    translation: "アメリカで英語を勉強できます。これは良い機会です！",
  },
];
