export const STAGE5_WORD_POOL = [
  {
    id: "s5-final-word-explain",
    type: "WORD",
    skill: "explain",
    prompt:
      "I didn't understand the rules, so I asked my teacher to ____ them to me.",
    choices: ["protect", "explain", "reduce", "produce"],
    answer: "explain",
    translation:
      "ルールが理解できなかったので、先生に説明してもらいました。",
  },
  {
    id: "s5-final-word-compare",
    type: "WORD",
    skill: "compare",
    prompt:
      "Before choosing a new laptop, we should ____ the prices of different models.",
    choices: ["discover", "create", "compare", "describe"],
    answer: "compare",
    translation:
      "新しいノートパソコンを選ぶ前に、異なるモデルの価格を比較するべきです。",
  },
  {
    id: "s5-final-word-protect",
    type: "WORD",
    skill: "protect",
    prompt:
      "We must ____ endangered animals so they can live safely in the future.",
    choices: ["increase", "protect", "discuss", "develop"],
    answer: "protect",
    translation:
      "絶滅の危機にある動物を守り、将来も安全に暮らせるようにしなければなりません。",
  },
  {
    id: "s5-final-word-reduce",
    type: "WORD",
    skill: "reduce",
    prompt:
      "Our school stopped using plastic cups to ____ the amount of waste.",
    choices: ["produce", "describe", "increase", "reduce"],
    answer: "reduce",
    translation:
      "私たちの学校はごみの量を減らすため、プラスチックのコップを使うのをやめました。",
  },
  {
    id: "s5-final-word-community",
    type: "WORD",
    skill: "community",
    prompt:
      "People in our local ____ worked together to clean the park.",
    choices: ["opinion", "population", "community", "technology"],
    answer: "community",
    translation:
      "地域の人々が協力して公園を掃除しました。",
  },
  {
    id: "s5-final-word-opportunity",
    type: "WORD",
    skill: "opportunity",
    prompt:
      "The school trip gave us a great ____ to learn about another culture.",
    choices: ["disadvantage", "opportunity", "environment", "research"],
    answer: "opportunity",
    translation:
      "修学旅行は、別の文化について学ぶ素晴らしい機会になりました。",
  },
];

// ================================
// STAGE 5 FINAL - PHRASE
// ================================

export const STAGE5_PHRASE_POOL = [
  {
    id: "s5-final-phrase-opinion",
    type: "PHRASE",
    skill: "in my opinion",
    prompt:
      "______, students should have more time to read books at school.",
    choices: [
      "In my opinion",
      "For example",
      "As soon as",
      "Because of",
    ],
    answer: "In my opinion",
    translation:
      "私の意見では、生徒は学校でもっと本を読む時間を持つべきです。",
  },

  {
    id: "s5-final-phrase-responsible",
    type: "PHRASE",
    skill: "be responsible for",
    prompt:
      "Each student will ______ cleaning one part of the classroom.",
    choices: [
      "be interested in",
      "be responsible for",
      "be different from",
      "be afraid of",
    ],
    answer: "be responsible for",
    translation:
      "各生徒は教室の一部分の掃除を担当します。",
  },

  {
    id: "s5-final-phrase-opportunity",
    type: "PHRASE",
    skill: "have an opportunity to",
    prompt:
      "During the school trip, we will ______ talk with students from another country.",
    choices: [
      "have a problem with",
      "have a reason for",
      "have an opportunity to",
      "have a question about",
    ],
    answer: "have an opportunity to",
    translation:
      "修学旅行中、私たちは外国の生徒と話す機会があります。",
  },

  {
    id: "s5-final-phrase-environment",
    type: "PHRASE",
    skill: "protect the environment",
    prompt:
      "Using fewer plastic bags is one way to ______.",
    choices: [
      "protect the environment",
      "increase the population",
      "compare the prices",
      "describe the problem",
    ],
    answer: "protect the environment",
    translation:
      "レジ袋の使用を減らすことは、環境を守る方法の一つです。",
  },

  {
    id: "s5-final-phrase-research",
    type: "PHRASE",
    skill: "do research",
    prompt:
      "Before writing her science report, Mika needs to ______ on sea animals.",
    choices: [
      "make a decision",
      "share an opinion",
      "do research",
      "take a break",
    ],
    answer: "do research",
    translation:
      "理科のレポートを書く前に、ミカは海の動物について調査する必要があります。",
  },

  {
    id: "s5-final-phrase-waste",
    type: "PHRASE",
    skill: "reduce waste",
    prompt:
      "Our school started using reusable cups to ______.",
    choices: [
      "develop a skill",
      "reduce waste",
      "create a website",
      "discover the truth",
    ],
    answer: "reduce waste",
    translation:
      "私たちの学校は、ごみを減らすために再利用できるカップを使い始めました。",
  },
];

export const STAGE5_SENTENCE_POOL = [
  {
    id: "s5-final-sentence-compare",
    type: "SENTENCE",
    skill: "compare",
    translation: "私たちは旅行前に2つのホテルを比較しました。",
    parts: [
      "two hotels",
      "before our trip",
      "We compared",
    ],
    answer: [
      "We compared",
      "two hotels",
      "before our trip",
    ],
  },

  {
    id: "s5-final-sentence-develop",
    type: "SENTENCE",
    skill: "develop",
    translation: "彼女は毎日練習して英語の技能を伸ばしました。",
 parts: [
  "her English skills",
  "by practicing every day",
  "She developed",
],
answer: [
  "She developed",
  "her English skills",
  "by practicing every day",
],
  },

  {
    id: "s5-final-sentence-community",
    type: "SENTENCE",
    skill: "community",
    translation: "私たちの地域社会は毎年夏にお祭りを開きます。",
    parts: [
      "a festival",
      "Our local community holds",
      "every summer",
    ],
    answer: [
      "Our local community holds",
      "a festival",
      "every summer",
    ],
  },

  {
    id: "s5-final-sentence-technology",
    type: "SENTENCE",
    skill: "technology",
    translation: "新しい技術は私たちの生活をより便利にすることができます。",
    parts: [
      "our lives",
      "New technology can make",
      "more convenient",
    ],
    answer: [
      "New technology can make",
      "our lives",
      "more convenient",
    ],
  },

  {
    id: "s5-final-sentence-tradition",
    type: "SENTENCE",
    skill: "tradition",
    translation: "この町の人々は古い伝統を守り続けています。",
parts: [
  "an old tradition alive",
  "People in this town",
  "keep",
],
answer: [
  "People in this town",
  "keep",
  "an old tradition alive",
],
  },
];

export const STAGE5_LISTENING_POOL = [
  {
    id: "s5-final-listening-research",
    type: "LISTENING",
    skill: "research",
    audio:
      "Girl: What are you doing for your science project? Boy: I'm doing research on animals that live in the ocean. Girl: That sounds interesting. Where do you find information? Boy: I use books from the library and some science websites.",
    question:
      "Where does the boy get information for his project?",
    choices: [
      "From his friends at school.",
      "From books and science websites.",
      "From a television program.",
      "From his science teacher only.",
    ],
    answer: "From books and science websites.",
    translation:
      "女子：理科の課題では何をしているの？ 男子：海に住む動物について調べているんだ。女子：面白そうね。どこで情報を見つけるの？ 男子：図書館の本と科学関係のウェブサイトを使っているよ。",
  },

  {
    id: "s5-final-listening-environment",
    type: "LISTENING",
    skill: "environment",
    audio:
      "Boy: Why did your class start collecting plastic bottles? Girl: We want to reduce waste at our school. Boy: What will you do with the bottles? Girl: We'll send them to a recycling center next Friday.",
    question:
      "Why is the girl's class collecting plastic bottles?",
    choices: [
      "To make decorations for a festival.",
      "To sell them at a school event.",
      "To reduce waste at school.",
      "To build a new classroom.",
    ],
    answer: "To reduce waste at school.",
    translation:
      "男子：どうして君のクラスはペットボトルを集め始めたの？ 女子：学校のごみを減らしたいからよ。男子：集めたボトルはどうするの？ 女子：来週の金曜日にリサイクルセンターへ送る予定よ。",
  },

  {
    id: "s5-final-listening-opportunity",
    type: "LISTENING",
    skill: "opportunity",
    audio:
      "Girl: I heard you're going to visit Australia this summer. Boy: Yes. My school gave me an opportunity to study there for two weeks. Girl: That's exciting! What are you looking forward to? Boy: I'm looking forward to speaking English with local students.",
    question:
      "What is the boy looking forward to?",
    choices: [
      "Learning how to cook Japanese food.",
      "Meeting a famous sports player.",
      "Speaking English with local students.",
      "Visiting his grandparents.",
    ],
    answer: "Speaking English with local students.",
    translation:
      "女子：この夏オーストラリアへ行くんだってね。男子：うん。学校が2週間そこで勉強する機会をくれたんだ。女子：楽しそう！ 何が一番楽しみ？ 男子：現地の生徒と英語で話すことだよ。",
  },

  {
    id: "s5-final-listening-technology",
    type: "LISTENING",
    skill: "technology",
    audio:
      "Boy: Your grandfather uses a tablet every day? Girl: Yes. He started using one last year. Boy: What does he use it for? Girl: He reads the news and makes video calls with our family.",
    question:
      "What does the girl's grandfather use his tablet for?",
    choices: [
      "Playing games and drawing pictures.",
      "Reading the news and making video calls.",
      "Studying for an English test.",
      "Buying new computers online.",
    ],
    answer: "Reading the news and making video calls.",
    translation:
      "男子：君のおじいさんは毎日タブレットを使っているの？ 女子：そうよ。去年使い始めたの。男子：何に使っているの？ 女子：ニュースを読んだり、家族とビデオ通話をしたりしているわ。",
  },
];

export const STAGE5_READING_POOL = [
  {
    id: "s5-final-reading-community",
    type: "READING",
    skills: [
      "community",
      "environment",
      "reduce",
      "opportunity",
      "responsible",
    ],
    title: "A Small Change in Our Town",

    passage: `Last year, a group of students in a small town noticed that their local park was often full of plastic bottles and food packages. Many people enjoyed visiting the park, but some left their trash behind.

The students decided to do something about the problem. First, they discussed different ideas and created a plan. Every Saturday morning, they cleaned the park together. They also made posters to explain why protecting the environment was important.

At first, only six students joined the activity. However, after a few weeks, more students and some parents began to help. A local shop even provided gloves and trash bags.

The students discovered that cleaning the park was not enough. They wanted people to produce less waste. They asked visitors to bring reusable bottles and take their trash home.

After three months, the park became much cleaner. The students were proud of their work, but they also learned something important. They realized that everyone in the community was responsible for keeping public places clean.

Their teacher said, "You have shown that even young people can make a difference." The students were happy that they had taken the opportunity to improve their town.`,

    translation: `昨年、ある小さな町の生徒たちは、地元の公園にペットボトルや食品の包装がたくさん落ちていることに気づきました。多くの人が公園を楽しんでいましたが、ごみを置いていく人もいました。

生徒たちはこの問題に取り組むことにしました。まず、さまざまな案について話し合い、計画を立てました。毎週土曜日の朝、みんなで公園を掃除しました。また、環境を守ることがなぜ大切なのかを説明するポスターも作りました。

最初は6人の生徒しか参加しませんでした。しかし数週間後、さらに多くの生徒や保護者が手伝い始めました。地元のお店も手袋とごみ袋を提供してくれました。

生徒たちは、公園を掃除するだけでは十分ではないことに気づきました。人々にごみを減らしてほしいと考えたのです。そこで、訪問者に再利用できるボトルを持参し、ごみを持ち帰るようお願いしました。

3か月後、公園はずっときれいになりました。生徒たちは自分たちの活動を誇りに思いましたが、大切なことも学びました。公共の場所を清潔に保つ責任は、地域の全員にあると気づいたのです。

先生は「若い人でも変化を起こせることを示しましたね」と言いました。生徒たちは、町を良くする機会を生かせたことをうれしく思いました。`,

    questions: [
      {
        question:
          "Why did the students decide to start cleaning the park?",
        choices: [
          "They wanted to practice for a sports event.",
          "They noticed that people were leaving trash in the park.",
          "Their teacher told them to build a new park.",
          "They wanted to open a shop near the park.",
        ],
        answer: "They noticed that people were leaving trash in the park.",
        evidence:
          "Many people enjoyed visiting the park, but some left their trash behind.",
      },
      {
        question:
          "How did the local shop help the students?",
        choices: [
          "It gave them money to buy new bicycles.",
          "It made posters for the students.",
          "It provided gloves and trash bags.",
          "It offered free meals every Saturday.",
        ],
        answer: "It provided gloves and trash bags.",
        evidence:
          "A local shop even provided gloves and trash bags.",
      },
      {
        question:
          "What did the students learn from their activity?",
        choices: [
          "Only adults can solve environmental problems.",
          "Cleaning a park once is enough.",
          "Public parks should be closed on weekends.",
          "Everyone in the community has a responsibility to keep public places clean.",
        ],
        answer: "Everyone in the community has a responsibility to keep public places clean.",
        evidence:
          "They realized that everyone in the community was responsible for keeping public places clean.",
      },
    ],
  },
];
