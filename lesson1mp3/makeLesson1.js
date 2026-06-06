const OpenAI = require("openai");
const fs = require("fs");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function makeMp3(filename, text) {
  const mp3 = await client.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    speed: 0.85,
    input: text,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(filename, buffer);
  console.log(`${filename} 作成完了！`);
}

async function main() {
  const lesson2Study = `
New Crown Lesson 2. Study.

Scene 1.

I can swim.
私は泳げます。

I can sing.
私は歌えます。

I can dance.
私は踊れます。

I can cook.
私は料理できます。

I can play the piano.
私はピアノをひけます。

I cannot swim.
私は泳げません。

I cannot play the guitar.
私はギターをひけません。

Can you swim?
あなたは泳げますか。

Yes, I can.
はい、できます。

No, I cannot.
いいえ、できません。

Scene 2.

He can play shogi.
彼は将棋ができます。

She can skateboard.
彼女はスケートボードができます。

He can play very well.
彼はとても上手にできます。

She can skateboard very well.
彼女はとても上手にスケートボードができます。

He can speak Japanese.
彼は日本語を話せます。

He can speak English.
彼は英語を話せます。

He can speak Chinese.
彼は中国語を話せます。

He is kind.
彼は親切です。

He is brave.
彼は勇敢です。

He smiles.
彼はほほえみます。

Scene 3.

Are you a baseball fan?
あなたは野球ファンですか。

Yes, I am.
はい、そうです。

No, I am not.
いいえ、違います。

Do you play soccer?
あなたはサッカーをしますか。

Yes, I do.
はい、します。

No, I do not.
いいえ、しません。

I like English.
私は英語が好きです。

I do not play soccer.
私はサッカーをしません。

I am Tanaka Hana.
私は田中花です。

Words.

can.
できる。

cannot.
できない。

play.
する。演奏する。

speak.
話す。

swim.
泳ぐ。

sing.
歌う。

dance.
踊る。

cook.
料理する。

guitar.
ギター。

piano.
ピアノ。

Japanese.
日本語。日本の。

English.
英語。英語の。

Chinese.
中国語。中国の。

kind.
親切な。

brave.
勇敢な。

smile.
ほほえむ。

baseball.
野球。

soccer.
サッカー。

fan.
ファン。

very well.
とても上手に。
`;

  const lesson2Test = `
New Crown Lesson 2. Test.

Scene 1.

I can swim.
I can sing.
I can dance.
I can cook.
I can play the piano.
I cannot swim.
I cannot play the guitar.
Can you swim?
Yes, I can.
No, I cannot.

Scene 2.

He can play shogi.
She can skateboard.
He can play very well.
She can skateboard very well.
He can speak Japanese.
He can speak English.
He can speak Chinese.
He is kind.
He is brave.
He smiles.

Scene 3.

Are you a baseball fan?
Yes, I am.
No, I am not.
Do you play soccer?
Yes, I do.
No, I do not.
I like English.
I do not play soccer.
I am Tanaka Hana.

Words.

can.
cannot.
play.
speak.
swim.
sing.
dance.
cook.
guitar.
piano.
Japanese.
English.
Chinese.
kind.
brave.
smile.
baseball.
soccer.
fan.
very well.
`;

  const lesson3Study = `
New Crown Lesson 3. Study.

Scene 1.

This is an ice cream shop.
これはアイスクリーム店です。

That is chocolate ice cream.
あれはチョコレートアイスです。

This is not an ice cream shop.
これはアイスクリーム店ではありません。

That is not chocolate ice cream.
あれはチョコレートアイスではありません。

Is this an ice cream shop?
これはアイスクリーム店ですか。

Yes, it is.
はい、そうです。

No, it is not.
いいえ、違います。

What is this?
これは何ですか。

It is an old dictionary.
それは古い辞書です。

Scene 2.

Who is your favorite character?
あなたのお気に入りのキャラクターは誰ですか。

Harry.
ハリーです。

He is smart.
彼は賢いです。

I like him very much.
私は彼がとても好きです。

Can she sing?
彼女は歌えますか。

Can he swim?
彼は泳げますか。

Does he like baseball?
彼は野球が好きですか。

I like him too.
私も彼が好きです。

Scene 3.

Excuse me.
すみません。

How can I get to the cake shop?
ケーキ屋へはどう行けばいいですか。

Go straight on this street.
この通りをまっすぐ行ってください。

Turn left at the second corner.
二つ目の角を左に曲がってください。

It is on your right.
それは右側にあります。

I see.
わかりました。

Thank you.
ありがとう。

Words.

this.
これ。この。

that.
あれ。あの。

shop.
店。

dictionary.
辞書。

old.
古い。

who.
誰。

character.
キャラクター。登場人物。

favorite.
お気に入りの。

him.
彼を。彼に。

very much.
とても。

idea.
考え。アイデア。

know.
知っている。

correct.
正しい。

wrong.
間違った。

almost.
ほとんど。

gift.
贈り物。

online.
オンラインの。

traditional.
伝統的な。

musical.
音楽の。

instrument.
楽器。

excuse.
失礼。

straight.
まっすぐ。

street.
通り。

turn.
曲がる。

left.
左。

corner.
角。

right.
右。

thank.
感謝する。

where.
どこ。

open.
開く。開いている。

o'clock.
何時。

Japanese-style.
和風の。
`;

  const lesson3Test = `
New Crown Lesson 3. Test.

Scene 1.

This is an ice cream shop.
That is chocolate ice cream.
This is not an ice cream shop.
That is not chocolate ice cream.
Is this an ice cream shop?
Yes, it is.
No, it is not.
What is this?
It is an old dictionary.

Scene 2.

Who is your favorite character?
Harry.
He is smart.
I like him very much.
Can she sing?
Can he swim?
Does he like baseball?
I like him too.

Scene 3.

Excuse me.
How can I get to the cake shop?
Go straight on this street.
Turn left at the second corner.
It is on your right.
I see.
Thank you.

Words.

this.
that.
shop.
dictionary.
old.
who.
character.
favorite.
him.
very much.
idea.
know.
correct.
wrong.
almost.
gift.
online.
traditional.
musical.
instrument.
excuse.
straight.
street.
turn.
left.
corner.
right.
thank.
where.
open.
o'clock.
Japanese-style.
`;

  await makeMp3("NewCrown1_Lesson2_Study.mp3", lesson2Study);
  await makeMp3("NewCrown1_Lesson2_Test.mp3", lesson2Test);
  await makeMp3("NewCrown1_Lesson3_Study.mp3", lesson3Study);
  await makeMp3("NewCrown1_Lesson3_Test.mp3", lesson3Test);
}

main();