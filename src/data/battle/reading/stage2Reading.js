export const STAGE2_PASSAGES = [
  {
    id: 1,
    title: "The Game That Almost Failed",

    text: `Last month, Yuta and his friends decided to make a computer game for their school festival. Yuta had some experience with programming, but the others were beginners.

At first, everything seemed to go well. However, two days before the festival, something went wrong. The game suddenly stopped working. Yuta tried to find the problem, but it took much longer than he expected.

His friends wanted to take a break, but Yuta said they should continue working. Then one friend suggested trying a simpler program instead of fixing the old one. Everyone agreed.

They finished the new game just before the festival. Many students enjoyed playing it, and the team had a great time. Yuta learned that working together was especially important when things did not go as planned.`,

    translation: `先月、ユウタと友達は文化祭のためにコンピューターゲームを作ることにしました。ユウタにはプログラミングの経験が少しありましたが、ほかのメンバーは初心者でした。

最初はすべて順調に見えました。しかし、文化祭の2日前に問題が起こりました。ゲームが突然動かなくなったのです。ユウタは問題を見つけようとしましたが、予想よりずっと時間がかかりました。

友達は休憩したがりましたが、ユウタは作業を続けるべきだと言いました。すると、ある友達が古いプログラムを修正する代わりに、もっと簡単なプログラムを試すことを提案しました。全員が賛成しました。

彼らは文化祭の直前に新しいゲームを完成させました。多くの生徒がゲームを楽しみ、チームも楽しい時間を過ごしました。ユウタは、物事が計画どおりに進まないときこそ、協力することが特に重要だと学びました。`,

    questions: [
      {
        question:
          "Why was making the game difficult for Yuta and his friends?",
        choices: [
          "They did not have computers.",
          "Their game stopped working.",
          "Their teacher changed the festival date.",
          "Nobody wanted to play their game.",
        ],
        answer: 1,
        evidence:
          "The game suddenly stopped working.",
      },
      {
        question:
          "How did they solve the problem?",
        choices: [
          "They bought a new computer.",
          "They asked their teacher to make the game.",
          "They made a simpler program.",
          "They stopped working on the game.",
        ],
        answer: 2,
        evidence:
          "Then one friend suggested trying a simpler program instead of fixing the old one. Everyone agreed.",
      },
      {
        question:
          "What did Yuta learn?",
        choices: [
          "He should always work alone.",
          "Simple games are never popular.",
          "Programming is easy for beginners.",
          "Working together is important when problems happen.",
        ],
        answer: 3,
        evidence:
          "Yuta learned that working together was especially important when things did not go as planned.",
      },
    ],
  },

  {
    id: 2,
    title: "A Different Kind of School Trip",

    text: `Last summer, Emma's class visited a small island. The students expected to spend most of their time swimming, but their teacher had a different plan.

On the first day, they met local people who were trying to protect the island's beaches. The students learned that plastic waste was a serious problem, especially for sea animals.

The next morning, they helped clean a beach. Emma found many plastic bottles while she was working. After a while, she began to feel tired, but she decided to continue.

In the afternoon, the students were allowed to explore the island. They could pick one activity from a list. Emma chose a boat trip and saw several dolphins.

When she came back home, she told her family about the trip. She had learned much more than she expected. It was a valuable experience, and she hoped to visit the island again.`,

    translation: `昨年の夏、エマのクラスは小さな島を訪れました。生徒たちはほとんどの時間を泳いで過ごすと思っていましたが、先生には別の計画がありました。

初日、生徒たちは島の海岸を守ろうとしている地元の人たちに会いました。プラスチックごみが、特に海の動物たちにとって深刻な問題であることを学びました。

翌朝、生徒たちは海岸の清掃を手伝いました。エマは作業中にたくさんのペットボトルを見つけました。しばらくすると疲れてきましたが、続けることにしました。

午後、生徒たちは島を自由に探検することを許されました。リストから好きな活動を1つ選ぶことができました。エマはボートツアーを選び、何頭かのイルカを見ました。

帰宅すると、エマは家族に旅行の話をしました。予想していたよりもずっと多くのことを学んでいました。貴重な経験だったので、また島を訪れたいと思いました。`,

    questions: [
      {
        question:
          "What did the students learn on their first day?",
        choices: [
          "How to build a boat.",
          "Why plastic waste is a problem.",
          "How to swim with dolphins.",
          "Why the island needed more tourists.",
        ],
        answer: 1,
        evidence:
          "The students learned that plastic waste was a serious problem, especially for sea animals.",
      },
      {
        question:
          "What did Emma choose to do in the afternoon?",
        choices: [
          "Clean another beach.",
          "Go swimming.",
          "Take a boat trip.",
          "Visit a local school.",
        ],
        answer: 2,
        evidence:
          "Emma chose a boat trip and saw several dolphins.",
      },
      {
        question:
          "How did Emma feel about the trip?",
        choices: [
          "She learned more than she expected.",
          "She wanted to go home early.",
          "She thought the activities were too easy.",
          "She wished she had stayed at school.",
        ],
        answer: 0,
        evidence:
          "She had learned much more than she expected. It was a valuable experience, and she hoped to visit the island again.",
      },
    ],
  },
];
