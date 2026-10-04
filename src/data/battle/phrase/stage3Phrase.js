export const STAGE3_QUESTIONS = [
  // Q1
  // decide → decide to
  {
    type: "japanese",
    prompt: "〜することに決める",
    parts: ["decide", "to", "on", "for"],
    answer: ["decide", "to"],
    translation: "〜することに決める",
  },

  // Q2
  // spend → spend time
  {
    type: "context",
    prompt: "I like to ________ with my family on weekends.",
    parts: ["spend", "time", "money", "on"],
    answer: ["spend", "time"],
    completed: "I like to spend time with my family on weekends.",
    translation: "私は週末に家族と一緒に時間を過ごすのが好きです。",
  },

  // Q3
  // prepare → prepare for
  {
    type: "japanese",
    prompt: "〜の準備をする",
    parts: ["prepare", "for", "to", "with"],
    answer: ["prepare", "for"],
    translation: "〜の準備をする",
  },

  // Q4
  // continue → continue studying
  {
    type: "context",
    prompt: "Even when English is difficult, I want to ________.",
    parts: ["continue", "studying", "possible", "instead"],
    answer: ["continue", "studying"],
    completed:
      "Even when English is difficult, I want to continue studying.",
    translation:
      "英語が難しいときでも、私は勉強を続けたいです。",
  },

  // Q5
  // possible → as soon as possible
  {
    type: "japanese",
    prompt: "できるだけ早く",
    parts: ["as", "soon", "as", "possible", "enough"],
    answer: ["as", "soon", "as", "possible"],
    translation: "できるだけ早く",
  },

  // Q6
  // agree → agree with
  {
    type: "context",
    prompt: "That's a good idea. I ________ you.",
    parts: ["agree", "with", "to", "remember"],
    answer: ["agree", "with"],
    completed: "That's a good idea. I agree with you.",
    translation: "それは良い考えですね。私はあなたに賛成です。",
  },

  // Q7
  // remember → remember to
  {
    type: "japanese",
    prompt: "忘れずに〜する",
    parts: ["remember", "to", "doing", "for"],
    answer: ["remember", "to"],
    translation: "忘れずに〜する",
  },

  // Q8
  // different → different from
  {
    type: "context",
    prompt: "This new game is very ________ the old one.",
    parts: ["different", "from", "enough", "especially"],
    answer: ["different", "from"],
    completed:
      "This new game is very different from the old one.",
    translation:
      "この新しいゲームは古いゲームとは大きく違います。",
  },

  // Q9
  // promise → keep a promise
  {
    type: "japanese",
    prompt: "約束を守る",
    parts: ["keep", "a", "promise", "make", "believe"],
    answer: ["keep", "a", "promise"],
    translation: "約束を守る",
  },

  // Q10
  // surprised → be surprised to
  {
    type: "context",
    prompt: "I was ________ see my friend at the station.",
    parts: ["surprised", "to", "at", "successful"],
    answer: ["surprised", "to"],
    completed:
      "I was surprised to see my friend at the station.",
    translation:
      "私は駅で友達を見かけて驚きました。",
  },
];