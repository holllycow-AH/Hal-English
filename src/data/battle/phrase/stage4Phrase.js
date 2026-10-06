export const STAGE4_QUESTIONS = [
  // Q1
  // run → run out of
  {
    type: "japanese",
    prompt: "〜を使い果たす／〜がなくなる",
    parts: ["run", "out", "of", "for", "away"],
    answer: ["run", "out", "of"],
    translation: "〜を使い果たす／〜がなくなる",
  },

  // Q2
  // miss → miss the train
  {
    type: "context",
    prompt: "Hurry up, or we'll ________.",
    parts: ["miss", "the", "train", "catch", "on"],
    answer: ["miss", "the", "train"],
    completed: "Hurry up, or we'll miss the train.",
    translation: "急いで、そうしないと電車に乗り遅れます。",
  },

  // Q3
  // set → set a goal
  {
    type: "japanese",
    prompt: "目標を立てる",
    parts: ["set", "a", "goal", "make", "point"],
    answer: ["set", "a", "goal"],
    translation: "目標を立てる",
  },

  // Q4
  // bring → bring back
  {
    type: "context",
    prompt: "Please ________ the book tomorrow.",
    parts: ["bring", "back", "return", "with"],
    answer: ["bring", "back"],
    completed: "Please bring back the book tomorrow.",
    translation: "明日その本を持ってきて返してください。",
  },

  // Q5
  // follow → follow the rules
  {
    type: "japanese",
    prompt: "規則に従う",
    parts: ["follow", "the", "rules", "keep", "with"],
    answer: ["follow", "the", "rules"],
    translation: "規則に従う",
  },

  // Q6
  // fall → fall asleep
  {
    type: "context",
    prompt: "I was so tired that I ________ on the sofa.",
    parts: ["fell", "asleep", "grew", "up"],
    answer: ["fell", "asleep"],
    completed: "I was so tired that I fell asleep on the sofa.",
    translation: "私はとても疲れていたので、ソファで眠ってしまいました。",
  },

  // Q7
  // care → take care of
  {
    type: "japanese",
    prompt: "〜の世話をする",
    parts: ["take", "care", "of", "for", "give"],
    answer: ["take", "care", "of"],
    translation: "〜の世話をする",
  },

  // Q8
  // point → point out
  {
    type: "context",
    prompt: "My teacher ________ my mistake.",
    parts: ["pointed", "out", "looked", "after"],
    answer: ["pointed", "out"],
    completed: "My teacher pointed out my mistake.",
    translation: "先生は私の間違いを指摘しました。",
  },

  // Q9
  // own → on one's own
  {
    type: "japanese",
    prompt: "自力で／ひとりで",
    parts: ["on", "your", "own", "by", "self"],
    answer: ["on", "your", "own"],
    translation: "自力で／ひとりで",
  },

  // Q10
  // provide → provide A with B
  {
    type: "context",
    prompt: "The hotel ________ free breakfast.",
    parts: ["provides", "guests", "with", "for", "gives"],
    answer: ["provides", "guests", "with"],
    completed: "The hotel provides guests with free breakfast.",
    translation: "そのホテルは宿泊客に無料の朝食を提供しています。",
  },
];