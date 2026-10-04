// ========================================
// STAGE 3 FINAL
// ========================================


// ========================================
// WORD
// ========================================

export const STAGE3_WORD_POOL = [
  {
    id: "s3-final-word-decide",
    type: "WORD",
    skill: "decide",
    prompt:
      "Maya thought about the two clubs for several days. In the end, she _____ to join the tennis club.",
    choices: ["noticed", "decided", "happened", "spent"],
    answer: "decided",
    translation:
      "マヤは数日間2つのクラブについて考えました。最終的に、テニス部に入ることに決めました。",
  },

  {
    id: "s3-final-word-invite",
    type: "WORD",
    skill: "invite",
    prompt:
      "We're having a small party at our house on Saturday. I'd like to _____ some of my classmates.",
    choices: ["invite", "spend", "happen", "improve"],
    answer: "invite",
    translation:
      "土曜日に家で小さなパーティーをします。クラスメートを何人か招待したいです。",
  },

  {
    id: "s3-final-word-improve",
    type: "WORD",
    skill: "improve",
    prompt:
      "Riku reads English stories for twenty minutes every night. He hopes this habit will _____ his reading skills.",
    choices: ["agree", "improve", "invite", "happen"],
    answer: "improve",
    translation:
      "リクは毎晩20分英語の物語を読んでいます。この習慣で読解力が上達することを願っています。",
  },

  {
    id: "s3-final-word-notice",
    type: "WORD",
    skill: "notice",
    prompt:
      "When I entered the classroom, I immediately _____ something unusual. All the desks were facing the back wall.",
    choices: ["promised", "noticed", "expected", "continued"],
    answer: "noticed",
    translation:
      "教室に入ると、私はすぐに何かいつもと違うことに気づきました。すべての机が後ろの壁を向いていました。",
  },

  {
    id: "s3-final-word-enough",
    type: "WORD",
    skill: "enough",
    prompt:
      "We made sandwiches for twenty people, but only twelve came to the picnic. There was _____ food for everyone.",
    choices: ["different", "enough", "necessary", "possible"],
    answer: "enough",
    translation:
      "20人分のサンドイッチを作りましたが、ピクニックには12人しか来ませんでした。全員に十分な食べ物がありました。",
  },

  {
    id: "s3-final-word-successful",
    type: "WORD",
    skill: "successful",
    prompt:
      "More than three hundred people came to the school concert, and everyone enjoyed the music. The event was very _____.",
    choices: ["possible", "surprised", "successful", "different"],
    answer: "successful",
    translation:
      "300人以上が学校のコンサートに来て、みんな音楽を楽しみました。そのイベントは大成功でした。",
  },
];


// ========================================
// PHRASE
// ========================================

export const STAGE3_PHRASE_POOL = [
  {
    id: "s3-final-phrase-decide-on",
    type: "PHRASE",
    skill: "decide on",
    prompt:
      "We looked at five different hotels and finally _____ one near the beach.",
    choices: [
      "decided on",
      "prepared for",
      "agreed with",
      "believed in",
    ],
    answer: "decided on",
    translation:
      "私たちは5つのホテルを見て、最終的に海の近くのホテルに決めました。",
  },

  {
    id: "s3-final-phrase-spend-time",
    type: "PHRASE",
    skill: "spend time",
    prompt:
      "During summer vacation, I want to _____ with my grandparents because I don't see them very often.",
    choices: [
      "spend time",
      "keep a promise",
      "notice a difference",
      "suggest a plan",
    ],
    answer: "spend time",
    translation:
      "夏休みには、普段あまり会えない祖父母と一緒に時間を過ごしたいです。",
  },

  {
    id: "s3-final-phrase-as-soon-as-possible",
    type: "PHRASE",
    skill: "as soon as possible",
    prompt:
      "The library book is already late, so please return it _____.",
    choices: [
      "if necessary",
      "as soon as possible",
      "instead of",
      "as expected",
    ],
    answer: "as soon as possible",
    translation:
      "図書館の本はすでに返却期限を過ぎているので、できるだけ早く返してください。",
  },

  {
    id: "s3-final-phrase-agree-with",
    type: "PHRASE",
    skill: "agree with",
    prompt:
      "Ken thinks students should have more time for lunch, and I _____ him.",
    choices: [
      "prepare for",
      "agree with",
      "remember to",
      "believe in",
    ],
    answer: "agree with",
    translation:
      "ケンは生徒にはもっと昼食時間が必要だと考えていて、私も彼に賛成です。",
  },

  {
    id: "s3-final-phrase-different-from",
    type: "PHRASE",
    skill: "different from",
    prompt:
      "Life in a large city is very _____ life in a small village.",
    choices: [
      "surprised at",
      "successful in",
      "different from",
      "possible for",
    ],
    answer: "different from",
    translation:
      "大都市での生活は、小さな村での生活とは大きく異なります。",
  },

  {
    id: "s3-final-phrase-keep-promise",
    type: "PHRASE",
    skill: "keep a promise",
    prompt:
      "I told my little brother that I would go to his soccer game. I always try to _____.",
    choices: [
      "suggest a plan",
      "keep a promise",
      "notice a difference",
      "spend money",
    ],
    answer: "keep a promise",
    translation:
      "弟のサッカーの試合を見に行くと伝えました。私はいつも約束を守るようにしています。",
  },
];


// ========================================
// SENTENCE
// ========================================

export const STAGE3_SENTENCE_POOL = [
  {
    id: "s3-final-sentence-prepare",
    type: "SENTENCE",
    skill: "prepare for",
    translation:
      "私たちは来週の英語のテストに向けて準備する必要があります。",
    parts: [
      "for the English test",
      "We need to prepare",
      "next week",
    ],
    answer: [
      "We need to prepare",
      "for the English test",
      "next week",
    ],
  },

  {
    id: "s3-final-sentence-continue",
    type: "SENTENCE",
    skill: "continue",
    translation:
      "疲れていましたが、彼女は宿題を続けました。",
    parts: [
      "her homework",
      "Although she was tired",
      "she continued",
    ],
    answer: [
      "Although she was tired",
      "she continued",
      "her homework",
    ],
  },

  {
    id: "s3-final-sentence-remember",
    type: "SENTENCE",
    skill: "remember to",
    translation:
      "家を出る前に窓を閉めるのを忘れないでください。",
    parts: [
      "before you leave the house",
      "Remember to close",
      "the windows",
    ],
    answer: [
      "Remember to close",
      "the windows",
      "before you leave the house",
    ],
    answers: [
      [
        "Remember to close",
        "the windows",
        "before you leave the house",
      ],
      [
        "before you leave the house",
        "Remember to close",
        "the windows",
      ],
    ],
  },

  {
    id: "s3-final-sentence-expect",
    type: "SENTENCE",
    skill: "expect",
    translation:
      "私たちはその映画がもっと長いと思っていました。",
    parts: [
      "to be longer",
      "the movie",
      "We expected",
    ],
    answer: [
      "We expected",
      "the movie",
      "to be longer",
    ],
  },

  {
    id: "s3-final-sentence-probably",
    type: "SENTENCE",
    skill: "probably",
    translation:
      "雨が降っているので、私たちはたぶん家にいるでしょう。",
    parts: [
      "because it is raining",
      "We will probably",
      "stay home",
    ],
    answer: [
      "We will probably",
      "stay home",
      "because it is raining",
    ],
    answers: [
      [
        "We will probably",
        "stay home",
        "because it is raining",
      ],
      [
        "because it is raining",
        "We will probably",
        "stay home",
      ],
    ],
  },

  {
    id: "s3-final-sentence-suggest",
    type: "SENTENCE",
    skill: "suggest",
    translation:
      "母は電車でそこへ行くことを提案しました。",
    parts: [
      "going there",
      "My mother suggested",
      "by train",
    ],
    answer: [
      "My mother suggested",
      "going there",
      "by train",
    ],
  },
];


// ========================================
// LISTENING
// ========================================

export const STAGE3_LISTENING_POOL = [
  {
    id: "s3-final-listening-cake",
    type: "LISTENING",
    skill: "prepare",
    audio:
      "Girl: I'm preparing a cake for my mother's birthday, but I've never made one before. Boy: My sister makes cakes all the time. Would you like me to ask her for some advice? Girl: That would be great. Thank you.",
    question:
      "How will the boy help the girl?",
    choices: [
      "He will buy a cake for her.",
      "He will ask his sister for advice.",
      "He will invite her mother to a restaurant.",
      "He will make the cake by himself.",
    ],
    answer:
      "He will ask his sister for advice.",
    translation:
      "女子は母親の誕生日のために初めてケーキを作ろうとしています。男子は、よくケーキを作る姉妹にアドバイスを聞いてあげることにしました。",
  },

  {
    id: "s3-final-listening-wallet",
    type: "LISTENING",
    skill: "notice",
    audio:
      "Boy: I can't find my wallet. I had it when we left the restaurant. Girl: Wait. I noticed something under your seat in the car. Maybe that was your wallet. Boy: Really? Let's go and check.",
    question:
      "Where may the boy's wallet be?",
    choices: [
      "Under his seat in the car.",
      "On a table at school.",
      "Inside the restaurant kitchen.",
      "At the girl's house.",
    ],
    answer:
      "Under his seat in the car.",
    translation:
      "男子は財布を探しています。女子は車の男子の座席の下に何かがあることに気づいていました。2人は確認しに行くことにしました。",
  },

  {
    id: "s3-final-listening-piano",
    type: "LISTENING",
    skill: "continue",
    audio:
      "Girl: Are you still taking piano lessons? Boy: Yes. I wanted to stop last month because the new songs were difficult. But my teacher told me I was improving, so I decided to continue.",
    question:
      "Why did the boy continue his piano lessons?",
    choices: [
      "His parents bought him a new piano.",
      "His teacher said he was improving.",
      "The lessons became shorter.",
      "His friend joined the same class.",
    ],
    answer:
      "His teacher said he was improving.",
    translation:
      "男子は新しい曲が難しくてピアノをやめようと思いましたが、先生から上達していると言われ、続けることにしました。",
  },

  {
    id: "s3-final-listening-picnic",
    type: "LISTENING",
    skill: "instead",
    audio:
      "Boy: Are we still having the picnic in the park tomorrow? Girl: Probably not. The weather report says it will rain all day. Boy: What should we do instead? Girl: We can have lunch together at my house.",
    question:
      "What will they probably do tomorrow?",
    choices: [
      "Play soccer in the park.",
      "Cancel all their plans.",
      "Have lunch at the girl's house.",
      "Go swimming together.",
    ],
    answer:
      "Have lunch at the girl's house.",
    translation:
      "明日は一日中雨の予報なので、公園でのピクニックの代わりに女子の家で一緒に昼食を食べる予定です。",
  },

  {
    id: "s3-final-listening-volunteer",
    type: "LISTENING",
    skill: "experience",
    audio:
      "Last summer, Yumi volunteered at an animal shelter for two weeks. At first, she was nervous because she had no experience taking care of dogs. The workers showed her what to do, and soon she became comfortable feeding and walking them. Yumi hopes to volunteer there again next summer.",
    question:
      "Why was Yumi nervous at first?",
    choices: [
      "She was afraid of the shelter workers.",
      "She had never taken care of dogs before.",
      "She did not have enough time to volunteer.",
      "She wanted to work at another place.",
    ],
    answer:
      "She had never taken care of dogs before.",
    translation:
      "ユミは動物保護施設でボランティアをしました。最初は犬の世話をした経験がなかったので緊張していましたが、職員に教えてもらい慣れていきました。",
  },

  {
    id: "s3-final-listening-camera",
    type: "LISTENING",
    skill: "choose",
    audio:
      "Taro wanted a camera for his school trip. He found two cameras that he liked. One was cheaper, but the other was smaller and easier to carry. Because he would be walking a lot during the trip, Taro chose the smaller camera.",
    question:
      "Why did Taro choose the smaller camera?",
    choices: [
      "It was easier to carry.",
      "It took better pictures at night.",
      "His teacher told him to buy it.",
      "It was the cheapest camera in the store.",
    ],
    answer:
      "It was easier to carry.",
    translation:
      "タロウは修学旅行用のカメラを探していました。旅行中たくさん歩くため、持ち運びやすい小さいカメラを選びました。",
  },
];


// ========================================
// READING
// ========================================

export const STAGE3_READING_POOL = [
  {
    id: "s3-final-reading-library",
    type: "READING",
    skills: [
      "suggest",
      "agree",
      "possible",
      "prepare",
      "successful",
    ],
    title: "A Library Without Silence",

    passage: `When Aya's school library became crowded after school, some students began complaining about the noise. Many students wanted to study there, but other students used the library to work together on group projects.

At first, the librarian considered making the entire library a silent area. However, Aya thought this would cause another problem. Students working on projects needed a place where they could talk.

Aya suggested dividing the library into two areas. One area would be completely quiet, while students would be allowed to talk softly in the other. Some students were not sure this was possible because the library was not very large.

The librarian agreed to try Aya's idea for one month. Students helped move several bookshelves and prepare signs explaining the new rules.

At the end of the month, the librarian asked students what they thought. Most students said the library had become easier to use. The quiet area was especially popular before tests, while groups could still work together on the other side.

The librarian decided to keep the new system. Aya was happy that a simple change had been successful without stopping either group from using the library.`,

    translation: `アヤの学校では、放課後になると図書館が混雑し、騒音について不満を言う生徒が出てきました。多くの生徒はそこで勉強したいと思っていましたが、一方でグループ活動のために図書館を使う生徒たちもいました。

最初、司書は図書館全体を静かな場所にすることを考えました。しかしアヤは、それでは別の問題が起こると思いました。グループ活動をする生徒には、話ができる場所が必要だったからです。

アヤは図書館を2つのエリアに分けることを提案しました。一方は完全に静かな場所にし、もう一方では小さな声で話すことを認めるという案です。図書館はそれほど広くなかったため、それが可能なのか疑問に思う生徒もいました。

司書はアヤの案を1か月試すことに賛成しました。生徒たちは本棚をいくつか移動し、新しいルールを説明する掲示を準備しました。

1か月後、司書が生徒たちに感想を聞くと、ほとんどの生徒が図書館を使いやすくなったと答えました。静かなエリアは特にテスト前に人気があり、一方でグループも反対側で一緒に活動できました。

司書はこの新しい仕組みを続けることにしました。アヤは、どちらのグループも図書館を使えなくすることなく、簡単な変更がうまくいったことを喜びました。`,

    questions: [
      {
        question:
          "Why did Aya disagree with making the whole library silent?",
        choices: [
          "She wanted students to play games in the library.",
          "Students working on group projects needed to talk.",
          "The librarian did not have enough signs.",
          "She thought students should study outside.",
        ],
        answer:
          "Students working on group projects needed to talk.",
      },
      {
        question:
          "What happened after they tried Aya's idea for a month?",
        choices: [
          "Most students said the library was easier to use.",
          "The school decided to close the library after school.",
          "Students stopped using the quiet area.",
          "The librarian removed all the bookshelves.",
        ],
        answer:
          "Most students said the library was easier to use.",
      },
    ],
  },

  {
    id: "s3-final-reading-race",
    type: "READING",
    skills: [
      "expect",
      "continue",
      "notice",
      "necessary",
      "surprised",
    ],
    title: "More Than Winning",

    passage: `Daichi joined a five-kilometer charity race with his older sister. He played soccer every week, so he expected the race to be easy. His sister warned him not to run too fast at the beginning, but Daichi was excited and started quickly.

After two kilometers, he began to feel tired. Several runners passed him, and he thought about stopping. Then he noticed an older man running slowly a few meters ahead of him.

Instead of trying to pass everyone, Daichi decided to follow the man's pace. The man told him that it was not necessary to run fast all the time. The important thing was to continue moving at a speed he could manage.

Near the end of the race, Daichi began to feel stronger again. He and the older man crossed the finish line only a few seconds apart.

Daichi's time was much slower than he had expected, but he was surprised that this did not bother him. He had finished the entire race and had also learned how important it was to control his pace.

Later, Daichi thanked the man for helping him. On the way home, he told his sister that he wanted to enter another race someday, but next time he would start more carefully.`,

    translation: `ダイチは姉と一緒に5キロのチャリティーレースに参加しました。毎週サッカーをしていたので、レースは簡単だと思っていました。姉は最初から速く走りすぎないよう注意しましたが、ダイチは興奮して速いペースでスタートしました。

2キロを過ぎると疲れ始め、何人ものランナーに抜かれました。やめようかとも思いました。そのとき、数メートル前をゆっくり走っている年上の男性に気づきました。

みんなを追い抜こうとする代わりに、ダイチはその男性のペースについていくことにしました。男性は、ずっと速く走る必要はなく、自分が続けられる速さで動き続けることが大切だと教えました。

ゴールが近づくころ、ダイチは再び力が出てきました。ダイチと男性は、わずか数秒の差でゴールしました。

タイムは予想よりずっと遅かったのですが、それが気にならない自分にダイチは驚きました。最後まで走り切り、ペースを調整することの大切さも学んだからです。

その後、ダイチは助けてくれた男性にお礼を言いました。帰り道、姉にまたいつかレースに出たいと話しました。ただし次は、もっと慎重にスタートするつもりです。`,

    questions: [
      {
        question:
          "What did Daichi do when he became tired?",
        choices: [
          "He stopped and called his sister.",
          "He tried to run faster than everyone else.",
          "He followed the pace of an older runner.",
          "He left the race and went home.",
        ],
        answer:
          "He followed the pace of an older runner.",
      },
      {
        question:
          "What did Daichi learn from the race?",
        choices: [
          "Winning a race is the only important goal.",
          "He should never enter a long race again.",
          "Playing soccer is better than running.",
          "Controlling his pace can help him continue.",
        ],
        answer:
          "Controlling his pace can help him continue.",
      },
    ],
  },
];