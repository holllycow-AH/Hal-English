// ========================================
// STAGE 4 FINAL
// ========================================


// ========================================
// WORD
// ========================================

export const STAGE4_WORD_POOL = [
  {
    id: "s4-final-word-run",
    type: "WORD",
    skill: "run",
    prompt:
      "Mr. Brown and his wife _____ a small hotel near the lake.",
    choices: ["run", "miss", "save", "leave"],
    answer: "run",
    translation:
      "ブラウンさん夫妻は湖の近くで小さなホテルを経営しています。",
  },

  {
    id: "s4-final-word-miss",
    type: "WORD",
    skill: "miss",
    prompt:
      "If we don't leave home soon, we may _____ the last train.",
    choices: ["find", "miss", "keep", "change"],
    answer: "miss",
    translation:
      "すぐに家を出なければ、終電に乗り遅れるかもしれません。",
  },

  {
    id: "s4-final-word-save",
    type: "WORD",
    skill: "save",
    prompt:
      "Mai wants to travel abroad next year, so she is trying to _____ some money every month.",
    choices: ["save", "mean", "call", "turn"],
    answer: "save",
    translation:
      "マイは来年海外旅行をしたいので、毎月お金を貯めようとしています。",
  },

  {
    id: "s4-final-word-still",
    type: "WORD",
    skill: "still",
    prompt:
      "The movie started two hours ago, but the children are _____ watching it.",
    choices: ["enough", "even", "still", "without"],
    answer: "still",
    translation:
      "映画は2時間前に始まりましたが、子どもたちはまだ見ています。",
  },

  {
    id: "s4-final-word-leave",
    type: "WORD",
    skill: "leave",
    prompt:
      "Please _____ your shoes by the door before you enter the room.",
    choices: ["leave", "become", "depend", "move"],
    answer: "leave",
    translation:
      "部屋に入る前に、靴をドアのそばに置いてください。",
  },

  {
    id: "s4-final-word-possible",
    type: "WORD",
    skill: "possible",
    prompt:
      "Is it _____ to finish this project before Friday?",
    choices: ["possible", "still", "enough", "during"],
    answer: "possible",
    translation:
      "金曜日までにこのプロジェクトを終えることは可能ですか。",
  },
];


// ========================================
// PHRASE
// ========================================

export const STAGE4_PHRASE_POOL = [
  {
    id: "s4-final-phrase-run-out-of",
    type: "PHRASE",
    skill: "run out of",
    prompt:
      "We need to go to the supermarket because we've _____ bread.",
    choices: [
      "run out of",
      "thought about",
      "turned off",
      "looked for",
    ],
    answer: "run out of",
    translation:
      "パンを切らしてしまったので、スーパーへ行く必要があります。",
  },

  {
    id: "s4-final-phrase-think-about",
    type: "PHRASE",
    skill: "think about",
    prompt:
      "You don't have to answer now. Please _____ it and tell me tomorrow.",
    choices: [
      "give up",
      "think about",
      "be late for",
      "turn off",
    ],
    answer: "think about",
    translation:
      "今答える必要はありません。それについて考えて、明日教えてください。",
  },

  {
    id: "s4-final-phrase-give-up",
    type: "PHRASE",
    skill: "give up",
    prompt:
      "The math problem was difficult, but Yuki didn't _____ and finally found the answer.",
    choices: [
      "give up",
      "run out of",
      "be late for",
      "think about",
    ],
    answer: "give up",
    translation:
      "その数学の問題は難しかったですが、ユキはあきらめず、ついに答えを見つけました。",
  },

  {
    id: "s4-final-phrase-turn-off",
    type: "PHRASE",
    skill: "turn off",
    prompt:
      "Please _____ the computer when you finish using it.",
    choices: [
      "look for",
      "turn off",
      "become interested in",
      "be late for",
    ],
    answer: "turn off",
    translation:
      "使い終わったらコンピューターの電源を切ってください。",
  },

  {
    id: "s4-final-phrase-be-late-for",
    type: "PHRASE",
    skill: "be late for",
    prompt:
      "Hurry up, or we'll _____ the beginning of the concert.",
    choices: [
      "give up",
      "look for",
      "be late for",
      "run out of",
    ],
    answer: "be late for",
    translation:
      "急がないと、コンサートの開始に遅れてしまいます。",
  },

  {
    id: "s4-final-phrase-look-for",
    type: "PHRASE",
    skill: "look for",
    prompt:
      "I'm going to _____ my keys. I can't remember where I put them.",
    choices: [
      "look for",
      "turn off",
      "give up",
      "run out of",
    ],
    answer: "look for",
    translation:
      "鍵を探します。どこに置いたのか思い出せません。",
  },
];


// ========================================
// SENTENCE
// ========================================

export const STAGE4_SENTENCE_POOL = [
  {
    id: "s4-final-sentence-run",
    type: "SENTENCE",
    skill: "run",
    translation:
      "彼女の両親は町で小さな店を経営しています。",
    parts: [
      "a small shop",
      "Her parents run",
      "in town",
    ],
    answer: [
      "Her parents run",
      "a small shop",
      "in town",
    ],
  },

  {
    id: "s4-final-sentence-save",
    type: "SENTENCE",
    skill: "save",
    translation:
      "私は新しい自転車を買うためにお金を貯めています。",
    parts: [
      "for a new bicycle",
      "I am saving money",
      "to buy",
    ],
    answer: [
      "I am saving money",
      "to buy",
      "for a new bicycle",
    ],
  },

  {
    id: "s4-final-sentence-forget",
    type: "SENTENCE",
    skill: "forget",
    translation:
      "明日、その本を返すのを忘れないでください。",
    parts: [
      "the book tomorrow",
      "Don't forget",
      "to return",
    ],
    answer: [
      "Don't forget",
      "to return",
      "the book tomorrow",
    ],
  },

  {
    id: "s4-final-sentence-find",
    type: "SENTENCE",
    skill: "find",
    translation:
      "彼は駅への道を見つけることができませんでした。",
    parts: [
      "the way",
      "He couldn't find",
      "to the station",
    ],
    answer: [
      "He couldn't find",
      "the way",
      "to the station",
    ],
  },

  {
    id: "s4-final-sentence-turn-off",
    type: "SENTENCE",
    skill: "turn off",
    translation:
      "寝る前にテレビを消してください。",
    parts: [
      "before you go to bed",
      "Please turn off",
      "the TV",
    ],
    answer: [
      "Please turn off",
      "the TV",
      "before you go to bed",
    ],
  },

  {
    id: "s4-final-sentence-take-time",
    type: "SENTENCE",
    skill: "take time",
    translation:
      "新しい言語を学ぶには時間がかかります。",
    parts: [
      "a new language",
      "It takes time",
      "to learn",
    ],
    answer: [
      "It takes time",
      "to learn",
      "a new language",
    ],
  },
];


// ========================================
// LISTENING
// ========================================

export const STAGE4_LISTENING_POOL = [
  {
    id: "s4-final-listening-bus",
    type: "LISTENING",
    skill: "miss",
    audio:
      "Girl: Why are you walking to school today? Boy: I missed my usual bus, and the next one doesn't come for thirty minutes. Girl: I see. We can walk together.",
    question:
      "Why is the boy walking to school?",
    choices: [
      "He missed his usual bus.",
      "His bicycle is at school.",
      "He wants to exercise every morning.",
      "The girl asked him to walk with her.",
    ],
    answer:
      "He missed his usual bus.",
    translation:
      "男子はいつものバスに乗り遅れ、次のバスは30分後なので、学校まで歩いています。",
  },

  {
    id: "s4-final-listening-book",
    type: "LISTENING",
    skill: "find",
    audio:
      "Boy: Did you find the book you were looking for? Girl: Yes. I thought I had left it at school, but it was under my bed. Boy: That's good. You need it for tomorrow, right?",
    question:
      "Where did the girl find her book?",
    choices: [
      "At school.",
      "Under her bed.",
      "In the library.",
      "On the bus.",
    ],
    answer:
      "Under her bed.",
    translation:
      "女子は本を学校に置いてきたと思っていましたが、実際にはベッドの下で見つけました。",
  },

  {
    id: "s4-final-listening-money",
    type: "LISTENING",
    skill: "save",
    audio:
      "Girl: Are you buying the new game today? Boy: No. I'm saving money for a computer, so I decided not to buy the game. Girl: That's probably a good idea.",
    question:
      "Why won't the boy buy the game?",
    choices: [
      "He already has the game.",
      "The store does not have it.",
      "He is saving money for a computer.",
      "His friend told him not to play games.",
    ],
    answer:
      "He is saving money for a computer.",
    translation:
      "男子はコンピューターを買うためにお金を貯めているので、新しいゲームを買わないことにしました。",
  },

  {
    id: "s4-final-listening-light",
    type: "LISTENING",
    skill: "turn off",
    audio:
      "Boy: Why is the classroom light still on? Girl: I think everyone forgot to turn it off. Boy: I'll do it before we leave.",
    question:
      "What will the boy do?",
    choices: [
      "Open the classroom door.",
      "Turn off the light.",
      "Call his teacher.",
      "Stay in the classroom.",
    ],
    answer:
      "Turn off the light.",
    translation:
      "教室の電気がまだついているので、男子が帰る前に消すことにしました。",
  },

  {
    id: "s4-final-listening-running",
    type: "LISTENING",
    skill: "give up",
    audio:
      "Mina started running every weekend because she wanted to enter a five-kilometer race. At first, she became tired after only one kilometer. She thought about giving up, but her friend encouraged her to continue. After several weeks, Mina could run the whole distance.",
    question:
      "What helped Mina continue running?",
    choices: [
      "Her friend encouraged her.",
      "The race became shorter.",
      "She bought a new bicycle.",
      "Her teacher entered the race.",
    ],
    answer:
      "Her friend encouraged her.",
    translation:
      "ミナは最初1キロで疲れてしまい、あきらめようと思いましたが、友達に励まされて練習を続けました。",
  },

  {
    id: "s4-final-listening-restaurant",
    type: "LISTENING",
    skill: "run",
    audio:
      "Ken's parents run a small restaurant near the station. Ken usually helps them on Saturday evenings. Last Saturday, the restaurant was especially busy, so Ken stayed two hours longer than usual. His parents were very thankful for his help.",
    question:
      "Why did Ken stay longer at the restaurant?",
    choices: [
      "He wanted to eat dinner there.",
      "The restaurant was especially busy.",
      "His parents arrived late.",
      "He was waiting for a friend.",
    ],
    answer:
      "The restaurant was especially busy.",
    translation:
      "ケンの両親は駅の近くで小さなレストランを経営しています。先週の土曜日は特に忙しかったため、ケンはいつもより2時間長く手伝いました。",
  },
];


// ========================================
// READING
// ========================================

export const STAGE4_READING_POOL = [
  {
    id: "s4-final-reading-phone",
    type: "READING",
    skills: [
      "still",
      "change",
      "without",
      "decide",
      "possible",
    ],
    title: "A Week Without a Phone",

    passage: `Rina used her smartphone every day. She checked messages while eating breakfast, watched videos on the train, and often used it until just before going to bed.

One day, her phone suddenly stopped working. The repair shop told her that it would take about a week to fix it. At first, Rina thought it would be impossible to spend a whole week without her phone.

The first two days were difficult. She still reached for her phone several times before remembering that it was not there. On the train, she did not know what to do, so she started reading a book that had been in her bag for months.

After a few days, Rina noticed some changes. She finished the book and started another one. At home, she talked with her family more often instead of watching videos by herself.

When her phone was finally fixed, Rina was happy to get it back. However, she decided not to return completely to her old habits. She began leaving her phone in another room while studying and stopped using it just before bed.

Rina did not decide that smartphones were bad. Instead, she learned that it was possible to enjoy her time without looking at a screen all the time.`,

    translation: `リナは毎日スマートフォンを使っていました。朝食を食べながらメッセージを確認し、電車では動画を見て、寝る直前まで使うこともよくありました。

ある日、スマートフォンが突然動かなくなりました。修理店では、直すのに約1週間かかると言われました。最初、リナはスマートフォンなしで丸1週間過ごすなんて不可能だと思いました。

最初の2日間は大変でした。スマートフォンがないことを思い出す前に、何度も手を伸ばしてしまいました。電車の中で何をしたらよいかわからず、何か月もかばんに入ったままだった本を読み始めました。

数日後、リナはいくつかの変化に気づきました。その本を読み終え、別の本も読み始めました。家では、一人で動画を見る代わりに、以前より家族と話すようになりました。

ようやくスマートフォンが直ると、リナは戻ってきたことを喜びました。しかし、以前の習慣に完全に戻らないことにしました。勉強中はスマートフォンを別の部屋に置き、寝る直前には使わなくなりました。

リナはスマートフォンが悪いものだと考えたわけではありません。その代わり、いつも画面を見ていなくても時間を楽しめることを学びました。`,

    questions: [
      {
        question:
          "What did Rina do on the train after her phone stopped working?",
        choices: [
          "She borrowed a phone from another passenger.",
          "She started reading a book.",
          "She slept during every trip.",
          "She went to the repair shop.",
        ],
        answer:
          "She started reading a book.",
      },
      {
        question:
          "How did Rina change her habits after getting her phone back?",
        choices: [
          "She stopped using smartphones completely.",
          "She bought a second smartphone.",
          "She sometimes kept her phone away while studying.",
          "She started watching more videos before bed.",
        ],
        answer:
          "She sometimes kept her phone away while studying.",
      },
    ],
  },

  {
    id: "s4-final-reading-cafe",
    type: "READING",
    skills: [
      "run",
      "save",
      "enough",
      "depend",
      "choose",
    ],
    title: "The Saturday Café",

    passage: `Sota's aunt ran a small café near his house. One Saturday, one of her workers became sick, so she asked Sota if he could help for a few hours.

Sota had never worked in a café before. At first, he was worried that he would make mistakes. His aunt told him to start with simple jobs, such as carrying clean cups and bringing water to customers.

Around lunchtime, the café became very busy. There were not enough clean cups, and several tables needed to be cleared. Sota wanted to do everything quickly, but he soon learned that trying to do several jobs at the same time caused more mistakes.

His aunt showed him how to choose the most important job first. Sota began working more carefully, and things became easier. By the afternoon, his aunt could depend on him to prepare tables without being told what to do.

At the end of the day, his aunt gave him some money for his work. Sota had been saving money for a new pair of shoes, so he was happy to add it to his savings.

More importantly, Sota learned something about working. Being fast was useful, but knowing what to do first was even more important.`,

    translation: `ソウタのおばは家の近くで小さなカフェを経営していました。ある土曜日、従業員の一人が病気になったため、おばはソウタに数時間手伝ってくれないかと頼みました。

ソウタはそれまでカフェで働いたことがありませんでした。最初は失敗するのではないかと心配していました。おばは、きれいなカップを運んだり、お客さんに水を持っていったりする簡単な仕事から始めるよう言いました。

昼食時になると、カフェはとても忙しくなりました。きれいなカップが足りず、片づけなければならないテーブルもいくつかありました。ソウタはすべてを素早くやろうとしましたが、いくつもの仕事を同時にしようとすると、かえって失敗が増えることに気づきました。

おばは、まず最も重要な仕事を選ぶ方法を教えました。ソウタがより注意深く働き始めると、仕事は楽になりました。午後には、おばは何をすべきか言わなくてもテーブルの準備をソウタに任せられるようになりました。

一日の終わりに、おばは仕事のお金をソウタに渡しました。ソウタは新しい靴を買うためにお金を貯めていたので、そのお金を貯金に加えられて喜びました。

それ以上に、ソウタは働くことについて一つ学びました。速く動くことも役に立ちますが、何を最初にすべきかを知ることのほうがさらに重要だったのです。`,

    questions: [
      {
        question:
          "What problem did Sota have when the café became busy?",
        choices: [
          "He tried to do several jobs at the same time.",
          "He forgot how to speak to his aunt.",
          "He did not want to help the customers.",
          "He left the café during lunchtime.",
        ],
        answer:
          "He tried to do several jobs at the same time.",
      },
      {
        question:
          "What did Sota learn from working at the café?",
        choices: [
          "Working quickly is the only important thing.",
          "Cafés should have fewer customers.",
          "Choosing what to do first is important.",
          "It is better to work without asking for help.",
        ],
        answer:
          "Choosing what to do first is important.",
      },
    ],
  },
];