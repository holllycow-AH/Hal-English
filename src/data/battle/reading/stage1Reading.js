export const PASSAGES = [
  {
    id: 1,
    title: "A New School Club",

    text: `Last spring, Ken wanted to try something new at school. He was interested in photography, but he had never used a real camera before. When his friend asked him to join the photography club, Ken was not sure at first.

His friend said, "Why don't you give it a try? You can always change your mind later."

Ken decided to join. At first, taking good pictures was harder than he expected. He often took pictures that were too dark or unclear. However, the older students gave him a hand and showed him how to use the camera. They also told him to make sure there was enough light before taking a picture.

After a few weeks, Ken's pictures began to get better. One day, the club teacher chose one of his photos for the school website. Ken was surprised and happy. He was glad that he had tried something new.`,

    translation: `昨年の春、ケンは学校で何か新しいことに挑戦したいと思っていました。彼は写真に興味がありましたが、それまで本物のカメラを使ったことはありませんでした。友達から写真部に入らないかと誘われたとき、ケンは最初、迷っていました。

友達は「やってみたら？ あとで気が変わってもいいんだから」と言いました。

ケンは入部することにしました。最初は、上手な写真を撮ることは思っていたより難しいものでした。写真が暗すぎたり、ぼやけたりすることもよくありました。しかし、上級生たちがケンを手伝い、カメラの使い方を教えてくれました。また、写真を撮る前に十分な明るさがあることを確認するように教えてくれました。

数週間後、ケンの写真はだんだん上手になってきました。ある日、顧問の先生がケンの写真を1枚、学校のウェブサイトに載せるために選びました。ケンは驚き、そしてうれしくなりました。新しいことに挑戦してよかったと思いました。`,

    questions: [
      {
        question:
          "Why was Ken not sure about joining the photography club?",
        choices: [
          "He did not like the older students.",
          "He had never used a real camera before.",
          "He did not have enough time after school.",
          "He wanted to join another club.",
        ],
        answer: 1,
        evidence:
          "He was interested in photography, but he had never used a real camera before.",
      },
      {
        question:
          "What did the older students teach Ken to do?",
        choices: [
          "Take pictures only outside.",
          "Put his camera away after school.",
          "Make sure there was enough light before taking a picture.",
          "Change the pictures on the school website.",
        ],
        answer: 2,
        evidence:
          "They also told him to make sure there was enough light before taking a picture.",
      },
      {
        question:
          "What happened after Ken had been in the club for a few weeks?",
        choices: [
          "He bought a new camera.",
          "He decided to leave the club.",
          "His pictures improved, and one was chosen for the school website.",
          "His friend stopped taking pictures.",
        ],
        answer: 2,
        evidence:
          "After a few weeks, Ken's pictures began to get better. One day, the club teacher chose one of his photos for the school website.",
      },
    ],
  },

  {
    id: 2,
    title: "A Small Change at the Library",

    text: `A public library in a small town had a problem. Many students came to the library after school, but there were not enough seats for everyone. Some students had to wait, and others decided to go home.

The library staff wanted to change the situation. At first, they thought about buying more tables and chairs. However, there was not enough space for them. Then one staff member found another idea. There was a large room that was used only for meetings twice a month. She suggested turning it into a study room on other days.

Before making the change, the library asked local students what they thought. Most of them liked the idea, so the staff decided to give it a try for three months. They put small desks in the room and made sure students could use Wi-Fi there.

The new study room soon became popular. More students began to stay at the library after school, and some said they could work better there than at home. What started as a small change turned into a useful service for the community.`,

    translation: `ある小さな町の公共図書館には、ある問題がありました。放課後、多くの生徒が図書館に来ていましたが、全員が座れるだけの席がありませんでした。待たなければならない生徒もいれば、家に帰ることにする生徒もいました。

図書館の職員たちは、この状況を変えたいと考えました。最初は、もっと多くの机と椅子を買うことを考えました。しかし、それらを置く十分なスペースがありませんでした。そこで、ある職員が別のアイデアを見つけました。月に2回しか会議に使われていない大きな部屋があったのです。彼女は、それ以外の日にはその部屋を学習室に変えることを提案しました。

変更する前に、図書館は地元の生徒たちにどう思うか尋ねました。ほとんどの生徒がその案を気に入ったので、職員たちは3か月間試してみることにしました。部屋に小さな机を置き、生徒たちがそこでWi-Fiを使えることも確認しました。

新しい学習室はすぐに人気になりました。放課後に図書館に残る生徒が増え、中には家よりもそこで勉強した方がはかどると言う生徒もいました。小さな変化として始まったものが、地域にとって役立つサービスへと変わったのです。`,

    questions: [
      {
        question:
          "Why couldn't the library simply add more tables and chairs?",
        choices: [
          "They were too expensive.",
          "Students did not want them.",
          "There was not enough space.",
          "The library was closed after school.",
        ],
        answer: 2,
        evidence:
          "However, there was not enough space for them.",
      },
      {
        question:
          "What did the library do before using the meeting room as a study room?",
        choices: [
          "It asked local students for their opinions.",
          "It closed the library for three months.",
          "It asked students to bring their own desks.",
          "It stopped holding meetings in the building.",
        ],
        answer: 0,
        evidence:
          "Before making the change, the library asked local students what they thought.",
      },
      {
        question:
          "What is one result of the library's new idea?",
        choices: [
          "Students began to study only at home.",
          "Fewer students visited the library.",
          "The library stopped providing Wi-Fi.",
          "More students stayed at the library after school.",
        ],
        answer: 3,
        evidence:
          "More students began to stay at the library after school, and some said they could work better there than at home.",
      },
    ],
  },
];
