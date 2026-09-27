export const STAGE2_WORD_POOL = [
  {
    id: "s2-final-word-reach",
    type: "WORD",
    skill: "reach",
    prompt:
      "After walking for three hours, we finally _____ the top of the mountain.",
    choices: ["reached", "passed", "held", "continued"],
    answer: "reached",
    translation:
      "3時間歩いたあと、私たちはついに山頂に到着しました。",
  },
  {
    id: "s2-final-word-matter",
    type: "WORD",
    skill: "matter",
    prompt:
      "It doesn't _____ which color you choose. Both look great.",
    choices: ["mean", "matter", "expect", "happen"],
    answer: "matter",
    translation:
      "どちらの色を選んでも構いません。両方とも素敵です。",
  },
  {
    id: "s2-final-word-instead",
    type: "WORD",
    skill: "instead",
    prompt:
      "The swimming pool was closed, so we played tennis _____.",
    choices: ["already", "instead", "almost", "still"],
    answer: "instead",
    translation:
      "プールが閉まっていたので、代わりにテニスをしました。",
  },
  {
    id: "s2-final-word-expected",
    type: "WORD",
    skill: "expect",
    prompt:
      "We _____ about twenty people at the event, but more than fifty came.",
    choices: ["continued", "expected", "allowed", "reached"],
    answer: "expected",
    translation:
      "イベントには20人ほど来ると予想していましたが、50人以上が来ました。",
  },
  {
    id: "s2-final-word-wrong",
    type: "WORD",
    skill: "wrong",
    prompt:
      "I got on the _____ bus and ended up at a different station.",
    choices: ["free", "wrong", "kind", "possible"],
    answer: "wrong",
    translation:
      "違うバスに乗ってしまい、別の駅に着いてしまいました。",
  },
  {
    id: "s2-final-word-free",
    type: "WORD",
    skill: "free",
    prompt:
      "Admission to the museum is _____ for children under twelve.",
    choices: ["free", "wrong", "ready", "enough"],
    answer: "free",
    translation:
      "その博物館は12歳未満の子どもの入場料が無料です。",
  },
];

export const STAGE2_PHRASE_POOL = [
  {
    id: "s2-final-phrase-look-for",
    type: "PHRASE",
    skill: "look for",
    prompt:
      "We need to _____ a hotel near the airport before our trip.",
    choices: [
      "look after",
      "look for",
      "look at",
      "look like",
    ],
    answer: "look for",
    translation:
      "旅行前に空港近くのホテルを探す必要があります。",
  },
  {
    id: "s2-final-phrase-come-true",
    type: "PHRASE",
    skill: "come true",
    prompt:
      "After years of practice, her dream of becoming a professional dancer finally _____.",
    choices: [
      "came back",
      "came out",
      "came true",
      "came over",
    ],
    answer: "came true",
    translation:
      "何年も練習を重ね、プロのダンサーになるという彼女の夢がついに実現しました。",
  },
  {
    id: "s2-final-phrase-pick-up",
    type: "PHRASE",
    skill: "pick up",
    prompt:
      "Could you _____ at the station when my train arrives?",
    choices: [
      "pick me out",
      "pick me off",
      "pick me up",
      "pick me on",
    ],
    answer: "pick me up",
    translation:
      "私の電車が到着したら、駅まで迎えに来てもらえますか。",
  },
  {
    id: "s2-final-phrase-go-well",
    type: "PHRASE",
    skill: "go well",
    prompt:
      "Our first cooking lesson didn't _____, but we learned a lot from our mistakes.",
    choices: [
      "go away",
      "go back",
      "go wrong",
      "go well",
    ],
    answer: "go well",
    translation:
      "初めての料理教室はうまくいきませんでしたが、失敗から多くを学びました。",
  },
  {
    id: "s2-final-phrase-take-break",
    type: "PHRASE",
    skill: "take a break",
    prompt:
      "If your eyes feel tired while using the computer, you should _____.",
    choices: [
      "make a break",
      "take a break",
      "hold a break",
      "pass a break",
    ],
    answer: "take a break",
    translation:
      "パソコンを使っていて目が疲れたら、休憩を取るべきです。",
  },
  {
    id: "s2-final-phrase-have-good-time",
    type: "PHRASE",
    skill: "have a good time",
    prompt:
      "I hope you _____ during your stay in Canada next week.",
    choices: [
      "make a good time",
      "take a good time",
      "have a good time",
      "hold a good time",
    ],
    answer: "have a good time",
    translation:
      "来週のカナダ滞在を楽しく過ごせるといいですね。",
  },
];

export const STAGE2_SENTENCE_POOL = [
  {
    id: "s2-final-sentence-what-happened",
    type: "SENTENCE",
    skill: "indirect question",
    translation:
      "なぜ電車が遅れたのか知っていますか。",
    parts: [
      "the train",
      "Do you know",
      "why",
      "was delayed",
    ],
    answer: [
      "Do you know",
      "why",
      "the train",
      "was delayed",
    ],
  },
  {
    id: "s2-final-sentence-until",
    type: "SENTENCE",
    skill: "until",
    translation:
      "雨がやむまでここで待ちましょう。",
    parts: [
      "until",
      "Let's wait here",
      "the rain stops",
    ],
    answer: [
      "Let's wait here",
      "until",
      "the rain stops",
    ],
  },
  {
    id: "s2-final-sentence-before",
    type: "SENTENCE",
    skill: "before",
    translation:
      "出かける前に宿題を終わらせてください。",
    parts: [
      "before",
      "you go out",
      "Please finish",
      "your homework",
    ],
    answer: [
      "Please finish",
      "your homework",
      "before",
      "you go out",
    ],
    answers: [
      [
        "Please finish",
        "your homework",
        "before",
        "you go out",
      ],
      [
        "before",
        "you go out",
        "Please finish",
        "your homework",
      ],
    ],
  },
  {
    id: "s2-final-sentence-hold-meeting",
    type: "SENTENCE",
    skill: "time expression",
    translation:
      "私たちは来週、新しい計画について話し合う予定です。",
    parts: [
      "next week",
      "We will discuss",
      "our new plan",
    ],
    answer: [
      "We will discuss",
      "our new plan",
      "next week",
    ],
    answers: [
      [
        "We will discuss",
        "our new plan",
        "next week",
      ],
      [
        "next week",
        "We will discuss",
        "our new plan",
      ],
    ],
  },
  {
    id: "s2-final-sentence-hope",
    type: "SENTENCE",
    skill: "hope",
    translation:
      "明日は天気がよくなるといいな。",
    parts: [
      "the weather",
      "I hope",
      "will get better",
      "tomorrow",
    ],
    answer: [
      "I hope",
      "the weather",
      "will get better",
      "tomorrow",
    ],
  },
  {
    id: "s2-final-sentence-pick-up",
    type: "SENTENCE",
    skill: "pick up",
    translation:
      "駅に着いたら、兄が私を迎えに来てくれます。",
    parts: [
      "when I arrive",
      "My brother",
      "at the station",
      "will pick me up",
    ],
    answer: [
      "My brother",
      "will pick me up",
      "when I arrive",
      "at the station",
    ],
    answers: [
      [
        "My brother",
        "will pick me up",
        "when I arrive",
        "at the station",
      ],
      [
        "when I arrive",
        "at the station",
        "My brother",
        "will pick me up",
      ],
    ],
  },
];

export const STAGE2_LISTENING_POOL = [
  {
    id: "s2-final-listening-library",
    type: "LISTENING",
    skill: "hold on",
    audio:
      "Boy: Excuse me. Can I borrow this book? Girl: Hold on a moment. I need to check your library card first. Boy:",
    question:
      "What should the boy say next?",
    choices: [
      "Sure. Here it is.",
      "I read it yesterday.",
      "The library is very big.",
    ],
    answer: "Sure. Here it is.",
    translation:
      "男子：すみません。この本を借りられますか。女子：少し待ってください。まず図書館のカードを確認する必要があります。男子：",
  },
  {
    id: "s2-final-listening-camera",
    type: "LISTENING",
    skill: "go wrong",
    audio:
      "Girl: My camera stopped working during our school trip. Boy: That's too bad. Did you lose all your pictures? Girl: No, I saved them on my computer yesterday. Boy:",
    question:
      "What should the boy say next?",
    choices: [
      "Then you should buy a new school bag.",
      "That's good. At least your pictures are safe.",
      "I hope you enjoyed your lunch.",
    ],
    answer:
      "That's good. At least your pictures are safe.",
    translation:
      "女子：修学旅行中にカメラが動かなくなったの。男子：それは残念だね。写真は全部なくなっちゃった？ 女子：ううん。昨日パソコンに保存しておいたの。男子：",
  },
  {
    id: "s2-final-listening-concert",
    type: "LISTENING",
    skill: "instead of",
    audio:
      "Boy: Are you still going to the outdoor concert on Sunday? Girl: No. It was canceled because of the weather. Boy: What will you do instead? Girl: My sister and I are going to see a movie.",
    question:
      "What will the girl do on Sunday?",
    choices: [
      "Go to an outdoor concert.",
      "Stay home and practice music.",
      "See a movie with her sister.",
      "Visit her grandparents.",
    ],
    answer:
      "See a movie with her sister.",
    translation:
      "日曜日の屋外コンサートは天候のため中止になりました。女子は代わりに姉妹と映画を見に行く予定です。",
  },
  {
    id: "s2-final-listening-volunteer",
    type: "LISTENING",
    skill: "reach",
    audio:
      "Girl: How is your volunteer project going? Boy: Pretty well. We wanted to collect one hundred books for children, and we've already collected eighty. Girl: That's great! When does the project end? Boy: Next Friday. I think we can reach our goal by then.",
    question:
      "What is the boy trying to do?",
    choices: [
      "Read eighty books by Friday.",
      "Collect one hundred books for children.",
      "Start a new library at his school.",
      "Give away all his own books.",
    ],
    answer:
      "Collect one hundred books for children.",
    translation:
      "男子たちは子どもたちのために100冊の本を集めようとしています。すでに80冊集まり、来週の金曜日までに目標を達成できそうです。",
  },
  {
    id: "s2-final-listening-garden",
    type: "LISTENING",
    skill: "expected",
    audio:
      "Last spring, Hana started growing vegetables in a small garden behind her house. She expected to get only a few tomatoes because she had never grown vegetables before. However, she picked more than thirty tomatoes during the summer. She gave some to her neighbors and used the rest to make tomato sauce with her mother.",
    question:
      "What surprised Hana?",
    choices: [
      "Her neighbors started growing vegetables.",
      "Her mother bought a larger garden.",
      "She grew more tomatoes than she expected.",
      "The tomatoes were too small to eat.",
    ],
    answer:
      "She grew more tomatoes than she expected.",
    translation:
      "ハナは初めて野菜を育てたので、トマトは少ししか収穫できないと思っていました。しかし、夏の間に30個以上も収穫でき、近所の人に分けたり、母親とトマトソースを作ったりしました。",
  },
  {
    id: "s2-final-listening-running",
    type: "LISTENING",
    skill: "take a break",
    audio:
      "Taku wanted to run five kilometers without stopping. At first, he could run only two kilometers before he needed to take a break. He practiced three times a week and slowly increased the distance. After two months, he finally ran five kilometers without stopping. Now he wants to enter a local running event.",
    question:
      "What can Taku do now?",
    choices: [
      "Run five kilometers without stopping.",
      "Win every running event he enters.",
      "Run ten kilometers every morning.",
      "Teach other students how to run.",
    ],
    answer:
      "Run five kilometers without stopping.",
    translation:
      "タクは休まずに5キロ走れるようになりたいと思っていました。最初は2キロで休憩が必要でしたが、週3回練習し、少しずつ距離を伸ばしました。2か月後、ついに5キロを休まずに走れるようになり、今は地域のランニング大会への参加を考えています。",
  },
];

export const STAGE2_READING_POOL = [
  {
    id: "s2-final-reading-robot",
    type: "READING",
    skills: [
      "go wrong",
      "instead of",
      "expected",
      "reach",
    ],
    title: "The Robot That Couldn't Turn Left",

    passage: `Mika and her younger brother, Sota, spent three months building a robot for a local competition. Their robot could pick up small boxes and carry them to different places. They hoped to win a prize.

On the morning of the competition, something went wrong. During a practice run, the robot suddenly stopped turning left. Sota wanted to take it apart, but Mika was worried. They had only thirty minutes before their turn.

Instead of taking the robot apart, Mika suggested changing their plan. The robot could still turn right, so they tried to find a different route around the course. It was longer than they expected, but they managed to move all the boxes.

They did not win first prize. However, the judges gave them a special award for solving a problem in a creative way.

On their way home, Sota said he wanted to build a better robot next year. Mika smiled and told him that learning how to deal with unexpected problems was just as valuable as winning.`,

    translation: `ミカと弟のソウタは、地域の大会に出場するため、3か月かけてロボットを製作しました。ロボットは小さな箱を持ち上げ、別の場所へ運ぶことができました。2人は入賞を目指していました。

大会当日の朝、問題が起こりました。練習中、ロボットが突然左に曲がれなくなったのです。ソウタはロボットを分解したがりましたが、ミカは心配でした。自分たちの出番まで、あと30分しかなかったからです。

ミカは分解する代わりに、計画を変更することを提案しました。ロボットはまだ右には曲がれたので、コースを進む別のルートを探しました。予想より長いルートでしたが、すべての箱を運ぶことができました。

2人は優勝できませんでした。しかし、審査員は創造的な方法で問題を解決したことを評価し、特別賞を授与しました。

帰り道、ソウタは来年もっと良いロボットを作りたいと言いました。ミカはほほえみ、予想外の問題への対処法を学ぶことは、優勝するのと同じくらい価値があると伝えました。`,

    questions: [
      {
        question:
          "Why did Mika suggest changing their plan?",
        choices: [
          "They did not have enough time to take the robot apart.",
          "The judges had changed the rules.",
          "Their robot could no longer pick up boxes.",
          "Sota wanted to leave the competition.",
        ],
        answer:
          "They did not have enough time to take the robot apart.",
      },
      {
        question:
          "Why did Mika and Sota receive a special award?",
        choices: [
          "Their robot was the fastest.",
          "They helped another team repair its robot.",
          "They found a creative way to solve their problem.",
          "They built a completely new robot during the competition.",
        ],
        answer:
          "They found a creative way to solve their problem.",
      },
    ],
  },

  {
    id: "s2-final-reading-train",
    type: "READING",
    skills: [
      "look for",
      "expected",
      "instead of",
      "go well",
    ],
    title: "The Last Train Home",

    passage: `Last Saturday, Daniel and his friend Leo visited a science museum in another city. It was their first trip without their parents. They had planned everything carefully, including which train to take home.

They enjoyed the museum so much that they stayed longer than they expected. When they finally reached the station, they discovered that they had missed the last direct train to their town.

Leo became worried and wanted to call his father immediately. Daniel suggested checking the train information first. They found another train that stopped at a station near their town, but they would need to take a bus from there.

Before buying their tickets, they called their parents to explain the situation. Daniel's mother checked the bus schedule and told them that the last bus would leave fifteen minutes after their train arrived.

The boys decided to take the train. Fortunately, everything went well, and they caught the bus with five minutes to spare.

When Daniel got home, he told his mother that the trip had taught him something important. Planning ahead was useful, but knowing what to do when plans changed was important too.`,

    translation: `先週の土曜日、ダニエルと友達のレオは別の街にある科学博物館を訪れました。親と一緒ではない初めての旅行でした。2人は帰りの電車も含めて、すべて慎重に計画していました。

博物館がとても楽しかったので、予想以上に長居してしまいました。ようやく駅に着くと、自分たちの町へ向かう最終の直通電車に乗り遅れたことが分かりました。

レオは心配になり、すぐに父親に電話したがりました。ダニエルは、まず電車の案内を確認しようと提案しました。すると、町の近くの駅に停車する別の電車が見つかりました。ただし、そこからバスに乗る必要がありました。

切符を買う前に、2人は親に電話して状況を説明しました。ダニエルの母親がバスの時刻表を調べると、最終バスは電車の到着15分後に出発することが分かりました。

2人はその電車に乗ることにしました。幸い、すべて順調に進み、5分の余裕をもってバスに間に合いました。

帰宅したダニエルは、今回の旅行で大切なことを学んだと母親に話しました。事前に計画することは役立ちますが、計画が変わったときにどう対応するかを知っておくことも大切なのです。`,

    questions: [
      {
        question:
          "What did the boys do before buying their train tickets?",
        choices: [
          "They asked a museum worker for help.",
          "They called their parents and explained their plan.",
          "They decided to stay in the city overnight.",
          "They took a taxi to their town.",
        ],
        answer:
          "They called their parents and explained their plan.",
      },
      {
        question:
          "What did Daniel learn from the trip?",
        choices: [
          "Traveling without parents is always dangerous.",
          "Museums should close earlier on weekends.",
          "It is better not to make travel plans.",
          "It is important to know how to respond when plans change.",
        ],
        answer:
          "It is important to know how to respond when plans change.",
      },
    ],
  },
];
