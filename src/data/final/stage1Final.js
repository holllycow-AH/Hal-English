export const WORD_POOL = [
  {
    id: "word-enough-1",
    type: "WORD",
    skill: "enough",
    prompt:
      "We have _____ chairs for everyone, so we don't need any more.",
    choices: [
      "enough",
      "still",
      "mean",
      "change",
    ],
    answer: "enough",
    translation:
      "全員分の椅子が十分にあるので、これ以上必要ありません。",
  },
  {
    id: "word-still-1",
    type: "WORD",
    skill: "still",
    prompt:
      "Ken started his homework an hour ago, and he is _____ working on it.",
    choices: [
      "still",
      "enough",
      "possible",
      "away",
    ],
    answer: "still",
    translation:
      "ケンは1時間前に宿題を始め、今もまだ取り組んでいます。",
  },
  {
    id: "word-take-1",
    type: "WORD",
    skill: "take",
    prompt:
      "It will _____ about thirty minutes to get to the station.",
    choices: [
      "take",
      "give",
      "mean",
      "find",
    ],
    answer: "take",
    translation:
      "駅に着くまで約30分かかります。",
  },
  {
    id: "word-change-1",
    type: "WORD",
    skill: "change",
    prompt:
      "Our plans may _____ if it rains tomorrow.",
    choices: [
      "change",
      "leave",
      "work",
      "call",
    ],
    answer: "change",
    translation:
      "明日雨が降れば、私たちの予定は変わるかもしれません。",
  },
];

export const PHRASE_POOL = [
  {
    id: "phrase-make-sure-1",
    type: "PHRASE",
    skill: "make sure",
    prompt:
      "Before you go to bed, _____ that the front door is locked.",
    choices: [
      "make sure",
      "call it a day",
      "give it a try",
      "change your mind",
    ],
    answer: "make sure",
    translation:
      "寝る前に、玄関のドアに鍵がかかっていることを確認してください。",
  },
  {
    id: "phrase-give-try-1",
    type: "PHRASE",
    skill: "give it a try",
    prompt:
      "This game looks difficult, but why don't you _____?",
    choices: [
      "give it a try",
      "put it away",
      "call me back",
      "turn it off",
    ],
    answer: "give it a try",
    translation:
      "このゲームは難しそうだけど、やってみたらどう？",
  },
  {
    id: "phrase-change-mind-1",
    type: "PHRASE",
    skill: "change your mind",
    prompt:
      "You can _____ later if you decide that you want to come with us.",
    choices: [
      "change your mind",
      "give me a hand",
      "call it a day",
      "get home",
    ],
    answer: "change your mind",
    translation:
      "あとで一緒に行きたいと思ったら、考えを変えてもいいですよ。",
  },
  {
    id: "phrase-call-day-1",
    type: "PHRASE",
    skill: "call it a day",
    prompt:
      "We've finished most of the work. Let's _____ and continue tomorrow.",
    choices: [
      "call it a day",
      "turn into a problem",
      "give it a try",
      "put it away",
    ],
    answer: "call it a day",
    translation:
      "仕事のほとんどが終わりました。今日はここまでにして、明日続きをしましょう。",
  },
];

export const SENTENCE_POOL = [
  {
    id: "sentence-mean-1",
    type: "SENTENCE",
    skill: "mean to",
    translation:
      "昨日あなたに電話するつもりでしたが、忘れてしまいました。",
    parts: [
      "I meant",
      "to call you",
      "yesterday",
      "but I forgot",
    ],
    answer: [
      "I meant",
      "to call you",
      "yesterday",
      "but I forgot",
    ],
  },
  {
  id: "sentence-better-1",
  type: "SENTENCE",
  skill: "get better",
  translation:
    "毎日練習すれば、あなたの英語はもっと上達します。",
  parts: [
    "Your English",
    "will get better",
    "if you practice",
    "every day",
  ],
  answer: [
    "Your English",
    "will get better",
    "if you practice",
    "every day",
  ],
  answers: [
    [
      "Your English",
      "will get better",
      "if you practice",
      "every day",
    ],
    [
      "if you practice",
      "every day",
      "Your English",
      "will get better",
    ],
  ],
},
  {
    id: "sentence-put-away-1",
    type: "SENTENCE",
    skill: "put away",
    translation:
      "使い終わったら、本を片付けてください。",
    parts: [
      "Please put",
      "the books away",
      "when you",
      "finish using them",
    ],
    answer: [
      "Please put",
      "the books away",
      "when you",
      "finish using them",
    ],
    answers: [
  [
    "Please put",
    "the books away",
    "when you",
    "finish using them",
  ],
  [
    "when you",
    "finish using them",
    "Please put",
    "the books away",
  ],
],
  },
  {
    id: "sentence-turn-problem-1",
    type: "SENTENCE",
    skill: "turn into",
    translation:
      "小さな問題でも、無視すると大きな問題になることがあります。",
    parts: [
      "A small problem",
      "can turn into",
      "a bigger one",
      "if you ignore it",
    ],
    answer: [
      "A small problem",
      "can turn into",
      "a bigger one",
      "if you ignore it",
  ],
},
];

export const LISTENING_POOL = [
  {
    id: "listening-enough-1",
    type: "LISTENING",
    skill: "enough",
    audio:
      "Lisa wants to buy a new notebook. She has five dollars, and the notebook costs three dollars. She has enough money to buy it.",
    question:
      "Why can Lisa buy the notebook?",
    choices: [
      "She has enough money.",
      "Her friend will buy it.",
      "The notebook is free.",
      "She already has the notebook.",
    ],
    answer: "She has enough money.",
    translation:
      "リサは新しいノートを買いたいと思っています。5ドル持っていて、そのノートは3ドルです。彼女にはそれを買う十分なお金があります。",
  },
  {
    id: "listening-get-better-1",
    type: "LISTENING",
    skill: "get better",
    audio:
      "Tom was sick last week, so he stayed home from school. He is getting better now and plans to return to school tomorrow.",
    question:
      "What does Tom plan to do tomorrow?",
    choices: [
      "Return to school.",
      "Visit a doctor.",
      "Stay in bed.",
      "Go shopping.",
    ],
    answer: "Return to school.",
    translation:
      "トムは先週病気だったので学校を休みました。今はよくなってきていて、明日は学校に戻る予定です。",
  },
  {
    id: "listening-change-1",
    type: "LISTENING",
    skill: "change",
    audio:
      "Maya planned to go to the park on Saturday. However, the weather report says it will rain. She decided to change her plan and visit a museum instead.",
    question:
      "Why did Maya change her plan?",
    choices: [
      "Because it will rain.",
      "Because the museum is closed.",
      "Because she has to work.",
      "Because her friend is sick.",
    ],
    answer: "Because it will rain.",
    translation:
      "マヤは土曜日に公園へ行く予定でした。しかし天気予報では雨になると言っています。そこで予定を変え、代わりに博物館へ行くことにしました。",
  },
  {
    id: "listening-give-try-1",
    type: "LISTENING",
    skill: "give it a try",
    audio:
      "Ben has never cooked dinner for his family before. His sister tells him that making pasta is easy and says he should give it a try. Ben decides to cook pasta tonight.",
    question:
      "What will Ben do tonight?",
    choices: [
      "Cook pasta.",
      "Eat at a restaurant.",
      "Visit his sister.",
      "Buy a new pan.",
    ],
    answer: "Cook pasta.",
    translation:
      "ベンはこれまで家族の夕食を作ったことがありません。姉はパスタなら簡単だからやってみたらと言います。ベンは今夜パスタを作ることにしました。",
  },
];

export const READING_POOL = [
  {
    id: "reading-library-1",
    type: "READING",
    skills: [
      "enough",
      "give it a try",
      "change",
    ],
    title: "A Different Place to Study",
    passage:
      "Ryan usually studied at home after school, but he often found it difficult to concentrate there. His younger brother watched television in the same room, and there was sometimes too much noise. One day, Ryan's teacher told him about a small study room at the local library. Ryan decided to give it a try. The room was quiet, and there were enough desks for students. After studying there for a week, Ryan changed his usual routine. Now he goes to the library three days a week and studies at home on the other days.",
    translation:
      "ライアンは普段、放課後に家で勉強していましたが、家では集中するのが難しいことがよくありました。弟が同じ部屋でテレビを見ていて、時々とても騒がしかったからです。ある日、先生が地域の図書館にある小さな自習室について教えてくれました。ライアンは試してみることにしました。その部屋は静かで、生徒が使える机も十分にありました。そこで1週間勉強したあと、ライアンは普段の生活を変えました。今では週3日は図書館へ行き、残りの日は家で勉強しています。",
    questions: [
      {
        question:
          "Why was it sometimes difficult for Ryan to study at home?",
        choices: [
          "There was too much noise.",
          "He did not have enough books.",
          "His teacher gave him too much homework.",
          "The library closed early.",
        ],
        answer:
          "There was too much noise.",
      },
      {
        question:
          "What did Ryan do after trying the library study room?",
        choices: [
          "He began using the library regularly.",
          "He stopped studying after school.",
          "He asked his brother to leave home.",
          "He decided to study only on weekends.",
        ],
        answer:
          "He began using the library regularly.",
      },
    ],
  },
  {
    id: "reading-club-1",
    type: "READING",
    skills: [
      "give it a try",
      "get better",
      "still",
    ],
    title: "Trying Something New",
    passage:
      "Emily had always enjoyed taking pictures with her phone, but she had never joined a photography club. When her school started a new club, her friend asked her to join. Emily was not sure at first because she did not know much about cameras. Her friend told her to give it a try. During the first meeting, an older student showed Emily how to take better pictures. Emily still has a lot to learn, but she now enjoys taking photos even more than before.",
    translation:
      "エミリーは以前からスマートフォンで写真を撮るのが好きでしたが、写真部に入ったことはありませんでした。学校に新しい写真部ができたとき、友達が彼女を誘いました。エミリーはカメラについてあまり知らなかったため、最初は迷っていました。友達はやってみたらと勧めました。最初の活動では、上級生がより良い写真の撮り方を教えてくれました。エミリーにはまだ学ぶことがたくさんありますが、今では以前よりさらに写真を撮ることを楽しんでいます。",
    questions: [
      {
        question:
          "Why was Emily unsure about joining the club?",
        choices: [
          "She did not know much about cameras.",
          "She did not like taking pictures.",
          "Her friend did not want to join.",
          "The club met too early.",
        ],
        answer:
          "She did not know much about cameras.",
      },
      {
        question:
          "What happened at the first club meeting?",
        choices: [
          "An older student taught Emily about taking pictures.",
          "Emily bought a new phone.",
          "The club went on a trip.",
          "Emily decided to leave the club.",
        ],
        answer:
          "An older student taught Emily about taking pictures.",
      },
    ],
  },
];
