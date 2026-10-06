import React, { useEffect, useRef, useState } from "react";
import "./EikenTraining.css";
import EikenBattle from "./EikenBattle.jsx";
import EikenMyPage from "./EikenMyPage.jsx";

import { ROOKIE_STAGES } from "./data/rookieStages.js";

const SET_DATA = [
  {
    word: "get",
    meaning: "得る／着く／〜になる",
    phrases: [
      {
        en: "get home",
        ja: "家に着く",
      },
      {
        en: "get better",
        ja: "よくなる",
      },
    ],
    sentences: [
      {
        en: "I usually get home before six.",
        ja: "私はたいてい6時前に家に着きます。",
      },
      {
        en: "Your English will get better with practice.",
        ja: "練習すれば、あなたの英語はもっと上達します。",
      },
    ],
  },

  {
    word: "take",
    meaning: "取る／連れていく／時間がかかる",
    phrases: [
      {
        en: "take a break",
        ja: "休憩する",
      },
      {
        en: "take care of",
        ja: "〜の世話をする",
      },
    ],
    sentences: [
      {
        en: "Let's take a short break before we continue.",
        ja: "続ける前に少し休憩しましょう。",
      },
      {
        en: "It takes about twenty minutes to get to school.",
        ja: "学校に着くまで約20分かかります。",
      },
    ],
  },

  {
    word: "work",
    meaning: "働く／機能する／うまくいく",
    phrases: [
      {
        en: "work together",
        ja: "一緒に取り組む",
      },
      {
        en: "work well",
        ja: "うまく機能する",
      },
    ],
    sentences: [
      {
        en: "We need to work together to solve the problem.",
        ja: "私たちはその問題を解決するために協力する必要があります。",
      },
      {
        en: "This medicine works well for many people.",
        ja: "この薬は多くの人によく効きます。",
      },
    ],
  },

  {
    word: "still",
    meaning: "まだ／今でも／それでも",
    phrases: [
      {
        en: "still waiting",
        ja: "まだ待っている",
      },
      {
        en: "still remember",
        ja: "今でも覚えている",
      },
    ],
    sentences: [
      {
        en: "I am still waiting for his answer.",
        ja: "私はまだ彼の返事を待っています。",
      },
      {
        en: "The test was difficult, but I still enjoyed it.",
        ja: "そのテストは難しかったですが、それでも私は楽しめました。",
      },
    ],
  },

  {
    word: "mean",
    meaning: "意味する／〜するつもりである",
    phrases: [
      {
        en: "mean the same thing",
        ja: "同じことを意味する",
      },
      {
        en: "mean to help",
        ja: "助けるつもりである",
      },
    ],
    sentences: [
      {
        en: "These two words do not mean the same thing.",
        ja: "この2つの単語は同じ意味ではありません。",
      },
      {
        en: "I meant to call you yesterday, but I forgot.",
        ja: "昨日あなたに電話するつもりでしたが、忘れてしまいました。",
      },
    ],
  },
    {
    word: "make",
    meaning: "作る／〜させる／〜になる",
    phrases: [
      {
        en: "make a difference",
        ja: "違いを生む",
      },
      {
        en: "make sure",
        ja: "確かめる／必ず〜する",
      },
    ],
    sentences: [
      {
        en: "Small changes can make a big difference.",
        ja: "小さな変化が大きな違いを生むことがあります。",
      },
      {
        en: "Make sure you have everything before you leave.",
        ja: "出発する前に、必要なものが全部あるか確認してください。",
      },
    ],
  },

  {
    word: "keep",
    meaning: "保つ／持ち続ける／〜し続ける",
    phrases: [
      {
        en: "keep trying",
        ja: "挑戦し続ける",
      },
      {
        en: "keep in touch",
        ja: "連絡を取り続ける",
      },
    ],
    sentences: [
      {
        en: "Keep trying even if you make a mistake.",
        ja: "間違えても挑戦し続けてください。",
      },
      {
        en: "We still keep in touch with our old friends.",
        ja: "私たちは今でも昔の友達と連絡を取り合っています。",
      },
    ],
  },

  {
    word: "leave",
    meaning: "去る／出発する／残す",
    phrases: [
      {
        en: "leave home",
        ja: "家を出る",
      },
      {
        en: "leave a message",
        ja: "伝言を残す",
      },
    ],
    sentences: [
      {
        en: "I usually leave home at seven in the morning.",
        ja: "私はたいてい朝7時に家を出ます。",
      },
      {
        en: "Please leave a message if I am not there.",
        ja: "私がいなければ、伝言を残してください。",
      },
    ],
  },

  {
    word: "find",
    meaning: "見つける／〜だと分かる・気づく",
    phrases: [
      {
        en: "find a way",
        ja: "方法を見つける",
      },
      {
        en: "find it difficult",
        ja: "それを難しいと感じる",
      },
    ],
    sentences: [
      {
        en: "We need to find a better way to solve the problem.",
        ja: "私たちはその問題を解決するために、もっと良い方法を見つける必要があります。",
      },
      {
        en: "Some students find it difficult to speak in front of others.",
        ja: "人前で話すことを難しいと感じる生徒もいます。",
      },
    ],
  },

  {
    word: "enough",
    meaning: "十分な／十分に",
    phrases: [
      {
        en: "enough time",
        ja: "十分な時間",
      },
      {
        en: "good enough",
        ja: "十分によい",
      },
    ],
    sentences: [
      {
        en: "We do not have enough time to finish everything today.",
        ja: "今日はすべてを終えるだけの十分な時間がありません。",
      },
      {
        en: "The room is large enough for twenty people.",
        ja: "その部屋は20人が入れるほど十分に広いです。",
      },
    ],
  },
    {
    word: "give",
    meaning: "与える／渡す／〜を与える",
    phrases: [
      {
        en: "give it a try",
        ja: "試しにやってみる",
      },
      {
        en: "give me a hand",
        ja: "手を貸して",
      },
    ],
    sentences: [
      {
        en: "Give it a try before you decide.",
        ja: "決める前に、まずやってみて。",
      },
      {
        en: "Can you give me a hand with this bag?",
        ja: "このバッグを運ぶのを手伝ってくれる？",
      },
    ],
  },

  {
    word: "put",
    meaning: "置く／入れる／〜の状態にする",
    phrases: [
      {
        en: "put it away",
        ja: "それを片づける",
      },
      {
        en: "put on a jacket",
        ja: "上着を着る",
      },
    ],
    sentences: [
      {
        en: "Please put everything away when you finish.",
        ja: "終わったら、全部片づけてください。",
      },
      {
        en: "Put on a jacket before you go outside.",
        ja: "外に出る前に上着を着て。",
      },
    ],
  },

  {
    word: "turn",
    meaning: "回す／曲がる／〜になる",
    phrases: [
      {
        en: "turn on the light",
        ja: "電気をつける",
      },
      {
        en: "turn into a problem",
        ja: "問題に発展する",
      },
    ],
    sentences: [
      {
        en: "Turn off the lights before you leave the room.",
        ja: "部屋を出る前に電気を消して。",
      },
      {
        en: "A small mistake can turn into a big problem.",
        ja: "小さなミスが大きな問題になることがあります。",
      },
    ],
  },

  {
    word: "call",
    meaning: "電話する／呼ぶ／〜と呼ぶ",
    phrases: [
      {
        en: "call me back",
        ja: "折り返し電話する",
      },
      {
        en: "call it a day",
        ja: "今日はここまでにする",
      },
    ],
    sentences: [
      {
        en: "Call me back when you have time.",
        ja: "時間があるときに折り返し電話して。",
      },
      {
        en: "We finished enough work, so let's call it a day.",
        ja: "十分仕事をしたので、今日はここまでにしましょう。",
      },
    ],
  },

  {
    word: "change",
    meaning: "変える／変わる／変化",
    phrases: [
      {
        en: "change your mind",
        ja: "考えを変える",
      },
      {
        en: "change over time",
        ja: "時間とともに変化する",
      },
    ],
    sentences: [
      {
        en: "You can change your mind if you find a better idea.",
        ja: "もっと良い考えが見つかったら、考えを変えてもいいよ。",
      },
      {
        en: "The way people communicate can change over time.",
        ja: "人々のコミュニケーションの方法は、時代とともに変化することがあります。",
      },
    ],
  },
    {
    word: "move",
    meaning: "動く／移動する／感動させる",
    phrases: [
      {
        en: "move on",
        ja: "次へ進む",
      },
      {
        en: "move closer",
        ja: "もっと近くへ移動する",
      },
    ],
    sentences: [
      {
        en: "Let's move on to the next question.",
        ja: "次の問題に進みましょう。",
      },
      {
        en: "The story moved me more than I expected.",
        ja: "その物語は思っていた以上に私を感動させました。",
      },
    ],
  },

  {
    word: "even",
    meaning: "〜でさえ／さらに／たとえ〜でも",
    phrases: [
      {
        en: "even better",
        ja: "さらに良い",
      },
      {
        en: "even if",
        ja: "たとえ〜でも",
      },
    ],
    sentences: [
      {
        en: "This idea is even better than the first one.",
        ja: "この案は最初の案よりさらに良いです。",
      },
      {
        en: "Keep trying even if you make a mistake.",
        ja: "たとえ間違えても、挑戦し続けてください。",
      },
    ],
  },

  {
    word: "during",
    meaning: "〜の間に／〜の期間中",
    phrases: [
      {
        en: "during the summer",
        ja: "夏の間に",
      },
      {
        en: "during the meeting",
        ja: "会議中に",
      },
    ],
    sentences: [
      {
        en: "I learned a lot during the summer.",
        ja: "私は夏の間にたくさんのことを学びました。",
      },
      {
        en: "Please do not use your phone during the meeting.",
        ja: "会議中は携帯電話を使わないでください。",
      },
    ],
  },

  {
    word: "seem",
    meaning: "〜のように見える／思える",
    phrases: [
      {
        en: "seem tired",
        ja: "疲れているように見える",
      },
      {
        en: "seem to know",
        ja: "知っているようだ",
      },
    ],
    sentences: [
      {
        en: "You seem tired today.",
        ja: "今日は疲れているように見えます。",
      },
      {
        en: "He seems to know a lot about computers.",
        ja: "彼はコンピューターについてとても詳しいようです。",
      },
    ],
  },

  {
    word: "become",
    meaning: "〜になる",
    phrases: [
      {
        en: "become interested in",
        ja: "〜に興味を持つようになる",
      },
      {
        en: "become more important",
        ja: "より重要になる",
      },
    ],
    sentences: [
      {
        en: "She became interested in science at school.",
        ja: "彼女は学校で科学に興味を持つようになりました。",
      },
      {
        en: "Technology has become more important in our lives.",
        ja: "テクノロジーは私たちの生活でより重要になっています。",
      },
    ],
  },
    {
    word: "without",
    meaning: "〜なしで／〜せずに",
    phrases: [
      {
        en: "without any help",
        ja: "何の助けもなしで",
      },
      {
        en: "without saying anything",
        ja: "何も言わずに",
      },
    ],
    sentences: [
      {
        en: "He finished the work without any help.",
        ja: "彼は誰の助けも借りずにその仕事を終えました。",
      },
      {
        en: "She left the room without saying anything.",
        ja: "彼女は何も言わずに部屋を出ました。",
      },
    ],
  },

  {
    word: "possible",
    meaning: "可能な／できる",
    phrases: [
      {
        en: "as soon as possible",
        ja: "できるだけ早く",
      },
      {
        en: "if possible",
        ja: "可能であれば",
      },
    ],
    sentences: [
      {
        en: "Please call me as soon as possible.",
        ja: "できるだけ早く私に電話してください。",
      },
      {
        en: "Try to finish the work today if possible.",
        ja: "可能であれば今日その仕事を終えるようにしてください。",
      },
    ],
  },

  {
    word: "decide",
    meaning: "決める／決心する",
    phrases: [
      {
        en: "decide to go",
        ja: "行くことを決める",
      },
      {
        en: "decide what to do",
        ja: "何をするか決める",
      },
    ],
    sentences: [
      {
        en: "We decided to leave early in the morning.",
        ja: "私たちは朝早く出発することに決めました。",
      },
      {
        en: "You do not have to decide what to do right now.",
        ja: "今すぐ何をするか決める必要はありません。",
      },
    ],
  },

  {
    word: "choose",
    meaning: "選ぶ",
    phrases: [
      {
        en: "choose between two things",
        ja: "2つのものから選ぶ",
      },
      {
        en: "choose the best one",
        ja: "一番良いものを選ぶ",
      },
    ],
    sentences: [
      {
        en: "You can choose between these two plans.",
        ja: "この2つのプランから選ぶことができます。",
      },
      {
        en: "It is sometimes difficult to choose the best one.",
        ja: "一番良いものを選ぶのが難しいこともあります。",
      },
    ],
  },

  {
    word: "depend",
    meaning: "頼る／〜次第である",
    phrases: [
      {
        en: "depend on the weather",
        ja: "天気次第である",
      },
      {
        en: "depend on other people",
        ja: "他の人に頼る",
      },
    ],
    sentences: [
      {
        en: "Our plan depends on the weather.",
        ja: "私たちの計画は天気次第です。",
      },
      {
        en: "You can depend on me when you need help.",
        ja: "助けが必要なときは私を頼っていいよ。",
      },
    ],
  },
];
const STAGE2_DATA = [
  {
    word: "look",
    meaning: "見る／探す／〜のように見える",
    phrases: [
      {
        en: "look for",
        ja: "〜を探す",
      },
      {
        en: "look like",
        ja: "〜のように見える／〜に似ている",
      },
    ],
    sentences: [
      {
        en: "I'm looking for my keys.",
        ja: "私は鍵を探しています。",
      },
      {
        en: "She looks like her mother.",
        ja: "彼女はお母さんに似ています。",
      },
    ],
  },
  {
    word: "have",
    meaning: "持つ／経験する／〜がある",
    phrases: [
      {
        en: "have a good time",
        ja: "楽しい時間を過ごす",
      },
      {
        en: "have trouble sleeping",
        ja: "なかなか眠れない",
      },
    ],
    sentences: [
      {
        en: "We had a good time at the party.",
        ja: "私たちはパーティーで楽しい時間を過ごしました。",
      },
      {
        en: "I sometimes have trouble sleeping.",
        ja: "私は時々なかなか眠れないことがあります。",
      },
    ],
  },
  {
    word: "come",
    meaning: "来る／戻る／実現する",
    phrases: [
      {
        en: "come back",
        ja: "戻ってくる",
      },
      {
        en: "come true",
        ja: "実現する",
      },
    ],
    sentences: [
      {
        en: "Please come back before dinner.",
        ja: "夕食前に戻ってきてください。",
      },
      {
        en: "I hope your dream comes true.",
        ja: "あなたの夢がかなうといいですね。",
      },
    ],
  },
  {
    word: "go",
    meaning: "行く／進む／〜の状態になる",
    phrases: [
      {
        en: "go well",
        ja: "うまくいく",
      },
      {
        en: "go wrong",
        ja: "うまくいかない／問題が起こる",
      },
    ],
    sentences: [
      {
        en: "I hope everything goes well.",
        ja: "すべてうまくいくといいですね。",
      },
      {
        en: "Something went wrong with my computer.",
        ja: "私のコンピューターに何か問題が起きました。",
      },
    ],
  },
  {
    word: "pick",
    meaning: "選ぶ／拾う／迎えに行く",
    phrases: [
      {
        en: "pick one",
        ja: "1つ選ぶ",
      },
      {
        en: "pick me up",
        ja: "私を迎えに来る",
      },
    ],
    sentences: [
      {
        en: "You can pick one from this list.",
        ja: "このリストから1つ選べます。",
      },
      {
        en: "My father will pick me up after school.",
        ja: "父が放課後に私を迎えに来ます。",
      },
    ],
  },
  {
    word: "hold",
    meaning: "持つ／開く／そのまま待つ",
    phrases: [
      {
        en: "hold on",
        ja: "ちょっと待つ",
      },
      {
        en: "hold a meeting",
        ja: "会議を開く",
      },
    ],
    sentences: [
      {
        en: "Hold on a minute, please.",
        ja: "ちょっと待ってください。",
      },
      {
        en: "We will hold a meeting tomorrow.",
        ja: "私たちは明日会議を開きます。",
      },
    ],
  },
  {
    word: "reach",
    meaning: "着く／届く／達成する",
    phrases: [
      {
        en: "reach the station",
        ja: "駅に着く",
      },
      {
        en: "reach a goal",
        ja: "目標を達成する",
      },
    ],
    sentences: [
      {
        en: "We reached the station before noon.",
        ja: "私たちは正午前に駅に着きました。",
      },
      {
        en: "Keep trying until you reach your goal.",
        ja: "目標を達成するまで挑戦し続けてください。",
      },
    ],
  },
  {
    word: "pass",
    meaning: "通る／合格する／渡す",
    phrases: [
      {
        en: "pass the test",
        ja: "試験に合格する",
      },
      {
        en: "pass by",
        ja: "そばを通り過ぎる",
      },
    ],
    sentences: [
      {
        en: "I hope I can pass the test.",
        ja: "その試験に合格できるといいな。",
      },
      {
        en: "I pass by this park every morning.",
        ja: "私は毎朝この公園のそばを通ります。",
      },
    ],
  },
  {
    word: "break",
    meaning: "壊す／破る／休憩",
    phrases: [
      {
        en: "break the rule",
        ja: "規則を破る",
      },
      {
        en: "take a break",
        ja: "休憩する",
      },
    ],
    sentences: [
      {
        en: "You should not break the rules.",
        ja: "規則を破るべきではありません。",
      },
      {
        en: "Let's take a short break before we continue.",
        ja: "続ける前に少し休憩しましょう。",
      },
    ],
  },
  {
    word: "happen",
    meaning: "起こる／偶然〜する",
    phrases: [
      {
        en: "what happened",
        ja: "何が起こったのか",
      },
      {
        en: "happen to meet",
        ja: "偶然会う",
      },
    ],
    sentences: [
      {
        en: "Do you know what happened yesterday?",
        ja: "昨日何が起こったか知っていますか。",
      },
      {
        en: "I happened to meet an old friend at the station.",
        ja: "私は駅で偶然昔の友達に会いました。",
      },
    ],
  },
    {
    word: "right",
    meaning: "正しい／右の／すぐに",
    phrases: [
      {
        en: "the right answer",
        ja: "正しい答え",
      },
      {
        en: "right away",
        ja: "すぐに",
      },
    ],
    sentences: [
      {
        en: "I think you found the right answer.",
        ja: "あなたは正しい答えを見つけたと思います。",
      },
      {
        en: "Please call me right away if you need help.",
        ja: "助けが必要なら、すぐに私に電話してください。",
      },
    ],
  },
  {
    word: "free",
    meaning: "自由な／空いている／無料の",
    phrases: [
      {
        en: "free time",
        ja: "自由な時間",
      },
      {
        en: "feel free to ask",
        ja: "遠慮なく尋ねる",
      },
    ],
    sentences: [
      {
        en: "What do you usually do in your free time?",
        ja: "あなたは普段、自由な時間に何をしますか。",
      },
      {
        en: "Feel free to ask me any questions.",
        ja: "何でも遠慮なく質問してください。",
      },
    ],
  },
  {
    word: "kind",
    meaning: "親切な／種類",
    phrases: [
      {
        en: "kind to others",
        ja: "他の人に親切な",
      },
      {
        en: "a kind of",
        ja: "一種の",
      },
    ],
    sentences: [
      {
        en: "She is always kind to other people.",
        ja: "彼女はいつも他の人に親切です。",
      },
      {
        en: "This is a kind of traditional Japanese food.",
        ja: "これは日本の伝統的な食べ物の一種です。",
      },
    ],
  },
  {
    word: "matter",
    meaning: "問題／重要である／困ったこと",
    phrases: [
      {
        en: "It doesn't matter.",
        ja: "大丈夫です／問題ありません",
      },
      {
        en: "What's the matter?",
        ja: "どうしたの？",
      },
    ],
    sentences: [
      {
        en: "It doesn't matter if you make a mistake.",
        ja: "間違えても問題ありません。",
      },
      {
        en: "What's the matter? You seem tired.",
        ja: "どうしたの？疲れているように見えるよ。",
      },
    ],
  },
  {
    word: "mind",
    meaning: "気にする／考え／心",
    phrases: [
      {
        en: "change your mind",
        ja: "考えを変える",
      },
      {
        en: "Do you mind if",
        ja: "〜しても構いませんか",
      },
    ],
    sentences: [
      {
        en: "You can change your mind later.",
        ja: "あとで考えを変えてもいいですよ。",
      },
      {
        en: "Do you mind if I sit here?",
        ja: "ここに座ってもいいですか。",
      },
    ],
  },
    {
    word: "while",
    meaning: "〜している間／しばらく",
    phrases: [
      {
        en: "for a while",
        ja: "しばらくの間",
      },
      {
        en: "while I was waiting",
        ja: "私が待っている間",
      },
    ],
    sentences: [
      {
        en: "Let's rest here for a while.",
        ja: "ここでしばらく休みましょう。",
      },
      {
        en: "I read a book while I was waiting.",
        ja: "私は待っている間、本を読んでいました。",
      },
    ],
  },
  {
    word: "since",
    meaning: "〜以来／〜なので",
    phrases: [
      {
        en: "since last year",
        ja: "去年からずっと",
      },
      {
        en: "since I was a child",
        ja: "子どものころからずっと",
      },
    ],
    sentences: [
      {
        en: "I have lived here since last year.",
        ja: "私は去年からここに住んでいます。",
      },
      {
        en: "I have loved music since I was a child.",
        ja: "私は子どものころからずっと音楽が大好きです。",
      },
    ],
  },
  {
    word: "instead",
    meaning: "その代わりに",
    phrases: [
      {
        en: "instead of",
        ja: "〜の代わりに",
      },
      {
        en: "do this instead",
        ja: "代わりにこれをする",
      },
    ],
    sentences: [
      {
        en: "We stayed home instead of going out.",
        ja: "私たちは外出する代わりに家にいました。",
      },
      {
        en: "This plan is too difficult, so let's try this instead.",
        ja: "この計画は難しすぎるので、代わりにこちらを試しましょう。",
      },
    ],
  },
  {
    word: "probably",
    meaning: "たぶん／おそらく",
    phrases: [
      {
        en: "will probably",
        ja: "たぶん〜だろう",
      },
      {
        en: "probably because",
        ja: "たぶん〜だから",
      },
    ],
    sentences: [
      {
        en: "I will probably get home before six.",
        ja: "私はたぶん6時前に家に着きます。",
      },
      {
        en: "He is tired, probably because he worked late.",
        ja: "彼が疲れているのは、たぶん遅くまで働いたからです。",
      },
    ],
  },
  {
    word: "especially",
    meaning: "特に／とりわけ",
    phrases: [
      {
        en: "especially important",
        ja: "特に重要な",
      },
      {
        en: "especially for",
        ja: "特に〜にとって",
      },
    ],
    sentences: [
      {
        en: "Sleep is especially important for young people.",
        ja: "睡眠は若い人にとって特に重要です。",
      },
      {
        en: "I like fruit, especially strawberries.",
        ja: "私は果物が好きで、特にイチゴが好きです。",
      },
    ],
  },
    {
    word: "allow",
    meaning: "許す／〜することを認める",
    phrases: [
      {
        en: "allow me to",
        ja: "私が〜することを許す",
      },
      {
        en: "be allowed to",
        ja: "〜することを許されている",
      },
    ],
    sentences: [
      {
        en: "My parents allow me to use the computer.",
        ja: "両親は私がコンピューターを使うことを許してくれます。",
      },
      {
        en: "We are not allowed to use phones during class.",
        ja: "私たちは授業中に携帯電話を使うことを許されていません。",
      },
    ],
  },
  {
    word: "expect",
    meaning: "予想する／期待する",
    phrases: [
      {
        en: "expect to see",
        ja: "会えると期待する／予想する",
      },
      {
        en: "more than I expected",
        ja: "思っていた以上に",
      },
    ],
    sentences: [
      {
        en: "I expect to see him again soon.",
        ja: "近いうちにまた彼に会えると思います。",
      },
      {
        en: "The trip took longer than I expected.",
        ja: "その旅行は思っていたより時間がかかりました。",
      },
    ],
  },
  {
    word: "experience",
    meaning: "経験／経験する",
    phrases: [
      {
        en: "have experience",
        ja: "経験がある",
      },
      {
        en: "a good experience",
        ja: "よい経験",
      },
    ],
    sentences: [
      {
        en: "Do you have any experience with computers?",
        ja: "コンピューターを使った経験はありますか。",
      },
      {
        en: "Studying abroad was a good experience for me.",
        ja: "海外で勉強したことは私にとってよい経験でした。",
      },
    ],
  },
  {
    word: "continue",
    meaning: "続ける／続く",
    phrases: [
      {
        en: "continue to learn",
        ja: "学び続ける",
      },
      {
        en: "continue working",
        ja: "働き続ける",
      },
    ],
    sentences: [
      {
        en: "I want to continue to learn English.",
        ja: "私は英語を学び続けたいです。",
      },
      {
        en: "She continued working after a short break.",
        ja: "彼女は少し休憩したあと、仕事を続けました。",
      },
    ],
  },
  {
    word: "improve",
    meaning: "改善する／上達する",
    phrases: [
      {
        en: "improve your English",
        ja: "英語を上達させる",
      },
      {
        en: "improve over time",
        ja: "時間とともに改善する",
      },
    ],
    sentences: [
      {
        en: "Reading every day can improve your English.",
        ja: "毎日読むことで英語を上達させることができます。",
      },
      {
        en: "Your skills will improve over time.",
        ja: "あなたの技能は時間とともに上達していきます。",
      },
    ],
  },
];
const STAGE3_DATA = [
  {
    word: "decide",
    meaning: "決める",
    phrases: [
      {
        en: "decide to",
        ja: "〜することに決める",
      },
      {
        en: "decide on",
        ja: "〜に決める",
      },
    ],
    sentences: [
      {
        en: "I decided to study English every day.",
        ja: "私は毎日英語を勉強することに決めました。",
      },
      {
        en: "We decided on a place for our trip.",
        ja: "私たちは旅行先を決めました。",
      },
    ],
  },

  {
    word: "choose",
    meaning: "選ぶ",
    phrases: [
      {
        en: "choose from",
        ja: "〜の中から選ぶ",
      },
      {
        en: "choose to",
        ja: "〜することを選ぶ",
      },
    ],
    sentences: [
      {
        en: "You can choose from these three games.",
        ja: "この3つのゲームから選べます。",
      },
      {
        en: "I chose to stay home and relax.",
        ja: "私は家にいてのんびりすることを選びました。",
      },
    ],
  },

  {
    word: "spend",
    meaning: "過ごす／費やす",
    phrases: [
      {
        en: "spend time",
        ja: "時間を過ごす",
      },
      {
        en: "spend money on",
        ja: "〜にお金を使う",
      },
    ],
    sentences: [
      {
        en: "I spent two hours playing games.",
        ja: "私は2時間ゲームをして過ごしました。",
      },
      {
        en: "I don't want to spend too much money on games.",
        ja: "ゲームにあまりお金を使いたくありません。",
      },
    ],
  },

  {
    word: "invite",
    meaning: "招待する",
    phrases: [
      {
        en: "invite a friend to",
        ja: "友達を〜に招待する",
      },
      {
        en: "be invited to",
        ja: "〜に招待される",
      },
    ],
    sentences: [
      {
        en: "I invited my friend to my house.",
        ja: "私は友達を家に招待しました。",
      },
      {
        en: "I was invited to a birthday party.",
        ja: "私は誕生日パーティーに招待されました。",
      },
    ],
  },

  {
    word: "prepare",
    meaning: "準備する",
    phrases: [
      {
        en: "prepare for",
        ja: "〜の準備をする",
      },
      {
        en: "prepare to",
        ja: "〜する準備をする",
      },
    ],
    sentences: [
      {
        en: "I need to prepare for the test.",
        ja: "私はテストの準備をする必要があります。",
      },
      {
        en: "We prepared to leave early in the morning.",
        ja: "私たちは朝早く出発する準備をしました。",
      },
    ],
  },
    // ===== SET 2 =====
  {
    word: "experience",
    meaning: "経験／体験",
    phrases: [
      {
        en: "have experience",
        ja: "経験がある",
      },
      {
        en: "a great experience",
        ja: "すばらしい経験",
      },
    ],
    sentences: [
      {
        en: "It was a great experience for me.",
        ja: "それは私にとってすばらしい経験でした。",
      },
      {
        en: "I had a new experience at school today.",
        ja: "今日、学校で新しい体験をしました。",
      },
    ],
  },

  {
    word: "continue",
    meaning: "続ける",
    phrases: [
      {
        en: "continue to",
        ja: "〜し続ける",
      },
      {
        en: "continue studying",
        ja: "勉強を続ける",
      },
    ],
    sentences: [
      {
        en: "I want to continue studying English.",
        ja: "私は英語の勉強を続けたいです。",
      },
      {
        en: "We continued playing the game after dinner.",
        ja: "私たちは夕食後もゲームを続けました。",
      },
    ],
  },

  {
    word: "possible",
    meaning: "可能な",
    phrases: [
      {
        en: "as soon as possible",
        ja: "できるだけ早く",
      },
      {
        en: "if possible",
        ja: "可能なら",
      },
    ],
    sentences: [
      {
        en: "Please come home as soon as possible.",
        ja: "できるだけ早く家に帰ってきてください。",
      },
      {
        en: "Is it possible to finish this today?",
        ja: "これを今日終わらせることは可能ですか。",
      },
    ],
  },

  {
    word: "instead",
    meaning: "その代わりに",
    phrases: [
      {
        en: "instead of",
        ja: "〜の代わりに",
      },
      {
        en: "do this instead",
        ja: "代わりにこれをする",
      },
    ],
    sentences: [
      {
        en: "I stayed home instead of going out.",
        ja: "私は出かける代わりに家にいました。",
      },
      {
        en: "I played a game instead.",
        ja: "私は代わりにゲームをしました。",
      },
    ],
  },

  {
    word: "improve",
    meaning: "上達する／改善する",
    phrases: [
      {
        en: "improve my English",
        ja: "英語を上達させる",
      },
      {
        en: "improve my skills",
        ja: "技能を向上させる",
      },
    ],
    sentences: [
      {
        en: "I want to improve my English.",
        ja: "私は英語を上達させたいです。",
      },
      {
        en: "Practice can improve your skills.",
        ja: "練習はあなたの技能を向上させることができます。",
      },
    ],
  },

  // ===== SET 3 =====
  {
    word: "agree",
    meaning: "賛成する／同意する",
    phrases: [
      {
        en: "agree with",
        ja: "〜に賛成する",
      },
      {
        en: "agree to",
        ja: "〜することに同意する",
      },
    ],
    sentences: [
      {
        en: "I agree with my friend.",
        ja: "私は友達に賛成です。",
      },
      {
        en: "We agreed to meet after school.",
        ja: "私たちは放課後に会うことにしました。",
      },
    ],
  },

  {
    word: "remember",
    meaning: "覚えている／思い出す",
    phrases: [
      {
        en: "remember to",
        ja: "忘れずに〜する",
      },
      {
        en: "remember doing",
        ja: "〜したことを覚えている",
      },
    ],
    sentences: [
      {
        en: "Remember to bring your homework.",
        ja: "宿題を持ってくるのを忘れないでください。",
      },
      {
        en: "I remember playing this game before.",
        ja: "以前このゲームをしたことを覚えています。",
      },
    ],
  },

  {
    word: "happen",
    meaning: "起こる",
    phrases: [
      {
        en: "what happened",
        ja: "何が起こったのか",
      },
      {
        en: "happen to",
        ja: "〜に起こる",
      },
    ],
    sentences: [
      {
        en: "What happened at school today?",
        ja: "今日学校で何があったの？",
      },
      {
        en: "Something strange happened yesterday.",
        ja: "昨日、何か変なことが起こりました。",
      },
    ],
  },

  {
    word: "notice",
    meaning: "気づく",
    phrases: [
      {
        en: "notice a difference",
        ja: "違いに気づく",
      },
      {
        en: "notice that",
        ja: "〜だと気づく",
      },
    ],
    sentences: [
      {
        en: "I noticed a difference between the two games.",
        ja: "私は2つのゲームの違いに気づきました。",
      },
      {
        en: "I noticed that my phone was missing.",
        ja: "私は携帯がないことに気づきました。",
      },
    ],
  },

  {
    word: "expect",
    meaning: "予想する／期待する",
    phrases: [
      {
        en: "expect to",
        ja: "〜すると思う",
      },
      {
        en: "as expected",
        ja: "予想どおり",
      },
    ],
    sentences: [
      {
        en: "I expect to finish it today.",
        ja: "私は今日それを終えられると思います。",
      },
      {
        en: "The test was easier than I expected.",
        ja: "テストは思ったより簡単でした。",
      },
    ],
  },

  // ===== SET 4 =====
  {
    word: "probably",
    meaning: "たぶん／おそらく",
    phrases: [
      {
        en: "will probably",
        ja: "たぶん〜するだろう",
      },
      {
        en: "probably not",
        ja: "たぶん〜ない",
      },
    ],
    sentences: [
      {
        en: "I will probably stay home tomorrow.",
        ja: "私は明日たぶん家にいるでしょう。",
      },
      {
        en: "He will probably play games tonight.",
        ja: "彼は今夜たぶんゲームをするでしょう。",
      },
    ],
  },

  {
    word: "especially",
    meaning: "特に",
    phrases: [
      {
        en: "especially good",
        ja: "特に良い",
      },
      {
        en: "especially important",
        ja: "特に重要な",
      },
    ],
    sentences: [
      {
        en: "I like action movies, especially this one.",
        ja: "私はアクション映画が好きで、特にこれは好きです。",
      },
      {
        en: "Breakfast is especially important before a test.",
        ja: "テスト前は朝食が特に大切です。",
      },
    ],
  },

  {
    word: "different",
    meaning: "異なる／違う",
    phrases: [
      {
        en: "different from",
        ja: "〜と異なる",
      },
      {
        en: "something different",
        ja: "何か違うもの",
      },
    ],
    sentences: [
      {
        en: "This game is different from the old one.",
        ja: "このゲームは古いものとは違います。",
      },
      {
        en: "I want to try something different.",
        ja: "私は何か違うことを試してみたいです。",
      },
    ],
  },

  {
    word: "enough",
    meaning: "十分な／十分に",
    phrases: [
      {
        en: "good enough",
        ja: "十分に良い",
      },
      {
        en: "enough time",
        ja: "十分な時間",
      },
    ],
    sentences: [
      {
        en: "I didn't have enough time to finish my homework.",
        ja: "宿題を終える十分な時間がありませんでした。",
      },
      {
        en: "This computer is good enough for me.",
        ja: "このパソコンは私には十分です。",
      },
    ],
  },

  {
    word: "necessary",
    meaning: "必要な",
    phrases: [
      {
        en: "if necessary",
        ja: "必要なら",
      },
      {
        en: "be necessary to",
        ja: "〜する必要がある",
      },
    ],
    sentences: [
      {
        en: "You can ask for help if necessary.",
        ja: "必要なら助けを求めてもいいです。",
      },
      {
        en: "It is necessary to practice every day.",
        ja: "毎日練習することが必要です。",
      },
    ],
  },

  // ===== SET 5 =====
  {
    word: "promise",
    meaning: "約束する／約束",
    phrases: [
      {
        en: "promise to",
        ja: "〜すると約束する",
      },
      {
        en: "keep a promise",
        ja: "約束を守る",
      },
    ],
    sentences: [
      {
        en: "I promised to finish my homework.",
        ja: "私は宿題を終えると約束しました。",
      },
      {
        en: "It is important to keep a promise.",
        ja: "約束を守ることは大切です。",
      },
    ],
  },

  {
    word: "believe",
    meaning: "信じる／〜だと思う",
    phrases: [
      {
        en: "believe in",
        ja: "〜を信じる",
      },
      {
        en: "believe that",
        ja: "〜だと思う／信じる",
      },
    ],
    sentences: [
      {
        en: "I believe that I can do it.",
        ja: "私は自分ならできると思っています。",
      },
      {
        en: "You should believe in yourself.",
        ja: "自分自身を信じるべきです。",
      },
    ],
  },

  {
    word: "suggest",
    meaning: "提案する",
    phrases: [
      {
        en: "suggest a plan",
        ja: "計画を提案する",
      },
      {
        en: "suggest doing",
        ja: "〜することを提案する",
      },
    ],
    sentences: [
      {
        en: "My friend suggested a new game.",
        ja: "友達が新しいゲームを提案しました。",
      },
      {
        en: "I suggested going there by train.",
        ja: "私はそこへ電車で行くことを提案しました。",
      },
    ],
  },

  {
    word: "surprised",
    meaning: "驚いた",
    phrases: [
      {
        en: "be surprised at",
        ja: "〜に驚く",
      },
      {
        en: "be surprised to",
        ja: "〜して驚く",
      },
    ],
    sentences: [
      {
        en: "I was surprised at the result.",
        ja: "私はその結果に驚きました。",
      },
      {
        en: "I was surprised to see my friend there.",
        ja: "そこで友達を見て驚きました。",
      },
    ],
  },

  {
    word: "successful",
    meaning: "成功した／うまくいった",
    phrases: [
      {
        en: "be successful",
        ja: "成功する",
      },
      {
        en: "a successful event",
        ja: "成功したイベント",
      },
    ],
    sentences: [
      {
        en: "Our school event was successful.",
        ja: "私たちの学校行事は成功しました。",
      },
      {
        en: "Practice is important if you want to be successful.",
        ja: "成功したいなら練習は大切です。",
      },
    ],
  },
];
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"’“”\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const speakEnglish = (text) => {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  const speakWithSamantha = () => {
    const voices = synth.getVoices();

    const samantha = voices.find(
      (voice) => voice.name === "Samantha"
    );

    // Samanthaがまだ読み込まれていない場合
    if (!samantha) {
      setTimeout(speakWithSamantha, 120);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.voice = samantha;
    utterance.rate = 0.9;

    synth.speak(utterance);
  };

  speakWithSamantha();
};
// 判定するときだけ無視する文字
const normalizeForCheck = (text) => {
  return text
    .toLowerCase()
    .replace(/[\s.,!?'"’“”\-:;]/g, "");
};


// ミス音
const playWrongSound = () => {
  try {
    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 110;

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.09
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.09);
  } catch {
    // 音が使えない環境では何もしない
  }
};


function TypingLine({
  label,
  english,
  japanese,
  inputRef,
  onComplete,
  autoFocus = false,
}) {
  const [value, setValue] = useState("");
  const [completed, setCompleted] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showJapanese, setShowJapanese] = useState(false);

  useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);


  const handleChange = (e) => {
    if (completed) return;

    const nextValue = e.target.value;

    const typedCheck = normalizeForCheck(nextValue);
    const answerCheck = normalizeForCheck(english);

    // 入力した文字そのものは、そのまま表示する
    // 判定だけ、大文字小文字・スペース・句読点をゆるくする
    if (answerCheck.startsWith(typedCheck)) {
      setValue(nextValue);
      setWrong(false);

      if (
        typedCheck === answerCheck &&
        answerCheck.length > 0
      ) {
        setCompleted(true);

        // 完成した瞬間に日本語を表示
        setShowJapanese(true);

        // 同時に朗読
        speakEnglish(english);

        // 朗読終了を待たず次へ
const delay = label === "SENTENCE 2" ? 6000 : 1500;

setTimeout(() => {
  onComplete();
}, delay);
      }

      return;
    }

    // 本当に違う文字だけ拒否
    setWrong(true);
    playWrongSound();

    setTimeout(() => {
      setWrong(false);
    }, 120);
  };


  return (
    <div className="typing-block">
      <div className="typing-label">{label}</div>

      <div className="english-model">{english}</div>

      {!showJapanese && japanese && (
        <button
          type="button"
          className="show-japanese-button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowJapanese(true)}
        >
          日本語を見る
        </button>
      )}

      {showJapanese && japanese && (
        <div className="japanese japanese-reveal">
          {japanese}
        </div>
      )}

      <input
        ref={inputRef}
        className={`typing-input ${
          wrong ? "wrong" : ""
        } ${completed ? "completed" : ""}`}
        value={value}
        onChange={handleChange}
        spellCheck="false"
        autoComplete="off"
        placeholder="Type here..."
      />
    </div>
  );
}

export default function EikenTraining() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([false, false, false, false]);
  const [setFinished, setSetFinished] = useState(false);
const [lap, setLap] = useState(0);
const [resumeLoaded, setResumeLoaded] = useState(false);
const [showMyPage, setShowMyPage] = useState(false);

const [showBattle, setShowBattle] = useState(false);

useEffect(() => {
  if (selectedSet === null) {
    setLap(0);
    setResumeLoaded(false);
    return;
  }

const lapKey =
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}`;

const resumeKey =
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}-resume`;

  const savedLap = Number(
    localStorage.getItem(lapKey)
  );

  setLap(Number.isFinite(savedLap) ? savedLap : 0);

  const savedResume = Number(
    localStorage.getItem(resumeKey)
  );

  if (
    Number.isInteger(savedResume) &&
    savedResume >= 0 &&
    savedResume < 5
  ) {
    setCardIndex(savedResume);
  } else {
    setCardIndex(0);
  }

  setLineIndex(0);
  setCompletedLines([false, false, false, false]);
  setSetFinished(false);
  setResumeLoaded(true);
}, [selectedSet]);
const refs = [
  useRef(null),
  useRef(null),
  useRef(null),
  useRef(null),
];

const activeStageData =
  ROOKIE_STAGES[selectedStage] ?? ROOKIE_STAGES[1];

const currentSetData =
  selectedSet === null
    ? []
    : activeStageData.slice(
        selectedSet * 5,
        selectedSet * 5 + 5
      );

const card =
  selectedSet === null
    ? SET_DATA[0]
    : currentSetData[cardIndex];

  const items = [

    {
      label: "PHRASE 1",
      english: card.phrases[0].en,
      japanese: card.phrases[0].ja,
    },
    {
      label: "PHRASE 2",
      english: card.phrases[1].en,
      japanese: card.phrases[1].ja,
    },
    {
      label: "SENTENCE 1",
      english: card.sentences[0].en,
      japanese: card.sentences[0].ja,
    },
    {
      label: "SENTENCE 2",
      english: card.sentences[1].en,
      japanese: card.sentences[1].ja,
    },
  ];
const completeLine = (index) => {
  // すでに完了している欄なら何もしない
  if (completedLines[index]) return;

  const nextCompleted = [...completedLines];
  nextCompleted[index] = true;

  // まず状態を更新
  setCompletedLines(nextCompleted);

  // ─────────────────────
  // まだ未完了の欄がある
  // ─────────────────────
  if (!nextCompleted.every(Boolean)) {
    let nextIndex = -1;

    for (let i = 1; i <= nextCompleted.length; i++) {
      const candidate =
        (index + i) % nextCompleted.length;

      if (!nextCompleted[candidate]) {
        nextIndex = candidate;
        break;
      }
    }

    if (nextIndex !== -1) {
      setLineIndex(nextIndex);

      requestAnimationFrame(() => {
        refs[nextIndex]?.current?.focus();
      });
    }

    return;
  }

  // ─────────────────────
  // 4つ全部完成
  // ─────────────────────

  // まだSET内に次のWORDがある
  if (cardIndex < currentSetData.length - 1) {
    const nextCardIndex = cardIndex + 1;

  localStorage.setItem(
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}-resume`,
  String(nextCardIndex)
);

    setTimeout(() => {
      setCardIndex(nextCardIndex);
      setLineIndex(0);
      setCompletedLines([
        false,
        false,
        false,
        false,
      ]);

      requestAnimationFrame(() => {
        refs[0]?.current?.focus();
      });
    }, 250);

    return;
  }

  // ─────────────────────
  // SET最後のWORDまで全部完成
  // ─────────────────────

 localStorage.removeItem(
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}-resume`
);

  const nextLap = Math.min(lap + 1, 5);
  setLap(nextLap);

 localStorage.setItem(
  `eiken-pre2-rookie-stage${selectedStage}-set${selectedSet + 1}`,
  String(nextLap)
);

  // TRAINING履歴を保存
  const playerName =
    localStorage.getItem("playerName") || "";

  const oldHistory = JSON.parse(
    localStorage.getItem("eikenTrainingHistory") || "[]"
  );

  const newRecord = {
    id: `${Date.now()}-${Math.random()}`,
    playerName,
    date: new Date().toISOString(),
    rank: "ROOKIE",
  stage: selectedStage,
    set: selectedSet + 1,
    lap: nextLap,
  };

  localStorage.setItem(
    "eikenTrainingHistory",
    JSON.stringify([...oldHistory, newRecord])
  );

  setSetFinished(true);
};

  useEffect(() => {
    if (!setFinished) {
      requestAnimationFrame(() => {
        refs[0]?.current?.focus();
      });
    }
  }, [cardIndex, setFinished]);

const restartSet = () => {
  setCardIndex(0);
  setLineIndex(0);
  setCompletedLines([false, false, false, false]);
  setSetFinished(false);
};
if (showBattle) {
  return (
<EikenBattle
  stage={selectedStage}
  onBack={() => setShowBattle(false)}
/>
  );
}
if (showMyPage) {
  return (
    <EikenMyPage
      onBack={() => setShowMyPage(false)}
    />
  );
}

if (selectedSet === null) {

  const setCount = Math.ceil(SET_DATA.length / 5);

  const stage1Laps = Array.from({ length: 5 }, (_, index) => {
    return (
      Number(
        localStorage.getItem(
          `eiken-pre2-rookie-stage1-set${index + 1}`
        )
      ) || 0
    );
  });

const stage2Laps = Array.from({ length: 5 }, (_, index) => {
  return (
    Number(
      localStorage.getItem(
        `eiken-pre2-rookie-stage2-set${index + 1}`
      )
    ) || 0
  );
});
const stage3Laps = Array.from({ length: 5 }, (_, index) => {
  return (
    Number(
      localStorage.getItem(
        `eiken-pre2-rookie-stage3-set${index + 1}`
      )
    ) || 0
  );
});
const stage4Laps = Array.from({ length: 5 }, (_, index) => {
  return (
    Number(
      localStorage.getItem(
        `eiken-pre2-rookie-stage4-set${index + 1}`
      )
    ) || 0
  );
});
const battleUnlocked = stage1Laps.every((laps) => laps >= 5);
const stage2BattleUnlocked = stage2Laps.every((laps) => laps >= 5);
const stage3BattleUnlocked = stage3Laps.every((laps) => laps >= 5);
const stage4BattleUnlocked = stage4Laps.every((laps) => laps >= 5);
  return (
    <div className="eiken-app">
      <div className="rookie-map-title">
        🗡️ ROOKIE TRAINING 🏋️
      </div>

      <button
  type="button"
  onClick={() => setShowMyPage(true)}
  title="MY PAGE"
  style={{
    position: "absolute",
    top: "26px",
    right: "34px",
    border: "1px solid #ccc",
    borderRadius: "999px",
   backgroundColor: "#ffffff",
color: "#222222",
    padding: "9px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "800",
    whiteSpace: "nowrap",
    color: "#222",
    appearance: "none",
WebkitAppearance: "none",
  }}
>
MY PAGE 
</button>

      <div className="progress-screen">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* STAGE 1 */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "800",
                whiteSpace: "nowrap",
                width: "130px",
              }}
            >
              STAGE 1
            </div>

            {Array.from({ length: setCount }, (_, index) => {
              const savedLap = stage1Laps[index] || 0;

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  <button
                    className="next-run-button"
                    onClick={() => {
                          setSelectedStage(1);
                      setSelectedSet(index);
                      setCardIndex(0);
                      setLineIndex(0);
                      setCompletedLines([false, false, false, false]);
                      setSetFinished(false);
                    }}
                  >
                    SET {index + 1}
                  </button>

                  <div
                    style={{
                      fontSize: "20px",
                      letterSpacing: "2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {[0, 1, 2, 3, 4].map((i) =>
                      i < savedLap ? "★" : "☆"
                    )}
                  </div>
                </div>
              );
            })}

            {/* BATTLE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <button
                type="button"
                className="next-run-button"
                disabled={!battleUnlocked}
                onClick={() => {
                  if (battleUnlocked) {
                    setShowBattle(true);
                  }
                }}
                style={{
                  opacity: battleUnlocked ? 1 : 0.35,
                  cursor: battleUnlocked ? "pointer" : "not-allowed",
                }}
              >
                ⚔ BATTLE
              </button>

              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  opacity: battleUnlocked ? 1 : 0.35,
                  whiteSpace: "nowrap",
                }}
              >
                {battleUnlocked ? "READY!" : "🔒 LOCKED"}
              </div>
            </div>
          </div>

          {/* STAGE 2〜5 */}
          {[2, 3, 4, 5].map((stageNumber) => (
            <div
              key={stageNumber}
              style={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                  width: "130px",
                }}
              >
                STAGE {stageNumber}
              </div>

              {[1, 2, 3, 4, 5].map((setNumber) => (
                <div
                  key={setNumber}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                 <button
  type="button"
  className="next-run-button"
disabled={
  (stageNumber === 2 && !battleUnlocked) ||
  (stageNumber === 3 && !stage2BattleUnlocked) ||
  (stageNumber === 4 && !stage3BattleUnlocked) ||
  stageNumber > 4
}
onClick={() => {
  if (
    (stageNumber === 2 && battleUnlocked) ||
    (stageNumber === 3 && stage2BattleUnlocked) ||
    (stageNumber === 4 && stage3BattleUnlocked)
  ) {
    setSelectedStage(stageNumber);
    setSelectedSet(setNumber - 1);
  }
}}
 style={{
  opacity:
    (stageNumber === 2 && battleUnlocked) ||
    (stageNumber === 3 && stage2BattleUnlocked) ||
    (stageNumber === 4 && stage3BattleUnlocked)
      ? 1
      : 0.35,
  cursor:
    (stageNumber === 2 && battleUnlocked) ||
    (stageNumber === 3 && stage2BattleUnlocked) ||
    (stageNumber === 4 && stage3BattleUnlocked)
      ? "pointer"
      : "not-allowed",
}}
>
  SET {setNumber}
</button>

<div
  style={{
    fontSize: "20px",
    letterSpacing: "2px",
    whiteSpace: "nowrap",
opacity: stageNumber <= 4 ? 1 : 0.35,
  }}
>
  {[0, 1, 2, 3, 4].map((i) => {
  const laps =
    Number(
      localStorage.getItem(
        `eiken-pre2-rookie-stage${stageNumber}-set${setNumber}`
      )
    ) || 0;

  return i < laps ? "★" : "☆";
})}
</div>

                </div>
                      ))}

        {/* BATTLE */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
  }}
>
  <button
    type="button"
    className="next-run-button"
disabled={
  (stageNumber === 2 && !stage2BattleUnlocked) ||
  (stageNumber === 3 && !stage3BattleUnlocked) ||
  (stageNumber === 4 && !stage4BattleUnlocked) ||
  stageNumber > 4
}
onClick={() => {
if (
  (stageNumber === 2 && stage2BattleUnlocked) ||
  (stageNumber === 3 && stage3BattleUnlocked) ||
  (stageNumber === 4 && stage4BattleUnlocked)
) {
    setSelectedStage(stageNumber);
    setShowBattle(true);
  }
}}
style={{
opacity:
  (stageNumber === 2 && stage2BattleUnlocked) ||
  (stageNumber === 3 && stage3BattleUnlocked) ||
  (stageNumber === 4 && stage4BattleUnlocked)
    ? 1
    : 0.35,
cursor:
  (stageNumber === 2 && stage2BattleUnlocked) ||
  (stageNumber === 3 && stage3BattleUnlocked) ||
  (stageNumber === 4 && stage4BattleUnlocked)
    ? "pointer"
    : "not-allowed",
}}
  >
    ⚔
    <br />
    BATTLE
  </button>

  <div
    style={{
      fontSize: "14px",
      fontWeight: "700",
opacity:
  (stageNumber === 2 && stage2BattleUnlocked) ||
  (stageNumber === 3 && stage3BattleUnlocked) ||
  (stageNumber === 4 && stage4BattleUnlocked)
    ? 1
    : 0.35,
      whiteSpace: "nowrap",
    }}
  >
{(stageNumber === 2 && stage2BattleUnlocked) ||
(stageNumber === 3 && stage3BattleUnlocked) ||
(stageNumber === 4 && stage4BattleUnlocked)
  ? "READY!"
  : "🔒 LOCKED"}
  </div>
</div>

      </div>
    ))}
        </div>
      </div>
    </div>
  );
}

if (setFinished) {
return (
    <div className="eiken-app">
   <div className="rookie-map-title">🗡️ ROOKIE TRAINING 🏋️</div>
<button
  type="button"
  onClick={() => setShowMyPage(true)}
  title="MY PAGE"
  style={{
    position: "absolute",
    top: "26px",
    right: "34px",
    border: "1px solid #ccc",
    borderRadius: "999px",
    backgroundColor: "#ffffff",
    color: "#222222",
    padding: "9px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "800",
    whiteSpace: "nowrap",
    appearance: "none",
    WebkitAppearance: "none",
  }}
>
  MY PAGE
</button>
      <div className="progress-screen">
        <h1>SET {selectedSet + 1} COMPLETE</h1>

        <div className="progress-location">
準2級 / ROOKIE / STAGE {selectedStage} / SET {selectedSet + 1}
        </div>

        <div className="stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i}>{i < lap ? "★" : "☆"}</span>
          ))}
        </div>

        <div className="lap-text">{lap} / 5 周</div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(lap / 5) * 100}%` }}
          />
        </div>

        <p className="progress-note">
          {lap < 5
            ? "このSETはあとでまた挑戦できます。"
            : "このSETは5周完了しました！"}
        </p>

        <button
          type="button"
          className="next-run-button"
          onClick={() => {
            setSelectedSet(null);
            setCardIndex(0);
            setLineIndex(0);
            setCompletedLines([false, false, false, false]);
            setSetFinished(false);
          }}
        >
          ← SET選択へ戻る
        </button>

        {lap >= 5 && (
          <div className="set-mastered">
            SET {selectedSet + 1} ★★★★★
          </div>
        )}
      </div>
    </div>
  );
  }


return (
  <div className="eiken-app">

<button
  type="button"
  onClick={() => {
    setSelectedSet(null);
    setSetFinished(false);
  }}
  style={{
    alignSelf: "flex-start",
    marginBottom: "12px",
    padding: "8px 16px",
    border: "1px solid #bbb",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#333333",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    width: "auto",
  }}
>
  ← SET選択へ戻る
</button>

    <header className="eiken-header">
        <div>
          <div className="rank-name">ROOKIE</div>
          <div className="location-line">
準2級　/　STAGE {selectedStage}　/　SET {selectedSet + 1}
          </div>
        </div>

      <div className="card-counter">
  {(cardIndex % 5) + 1} / 5
</div>
      </header>

      <div className="top-progress">
        <div
          className="top-progress-fill"
          style={{
            width: `${((cardIndex + lineIndex / 4) / SET_DATA.length) * 100}%`,
          }}
        />
      </div>

      <main className="word-card">
        <div className="word-number">
          WORD {cardIndex + 1}
        </div>

        <h1 className="main-word">{card.word}</h1>
        <div className="main-meaning">{card.meaning}</div>

        <div className="training-list">
  {items.map((item, index) => (
  <TypingLine
    key={`${cardIndex}-${index}`}
    label={item.label}
    english={item.english}
    japanese={item.japanese}
    inputRef={refs[index]}
    autoFocus={index === 0}
    onComplete={() => completeLine(index)}
  />
))}
        </div>
      </main>
    </div>
  );
}
