import OpenAI from "openai";

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

export async function OPTIONS() {
return new Response(null, {
status: 200,
headers: {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods":
"POST, OPTIONS",
"Access-Control-Allow-Headers":
"Content-Type",
},
});
}

export async function POST(req) {

const body = await req.json();

const completion =
await openai.chat.completions.create({
model: "gpt-4.1-mini",
messages: [
{
role: "system",
content: `
あなたは美容サロンの
口コミ返信担当です。

以下を守って返信してください。

・丁寧で柔らかい文章
・最初に感謝を伝える
・お客様の口コミ内容に具体的に触れる
・髪型、カラー、トリートメント、接客など
・内容に合わせて自然に言及する
・美容室らしい柔らかい接客感
・テンプレ感を減らす
・毎回少し言い回しを変える
・不自然に丁寧すぎない
・150〜250文字程度
・絵文字は基本使わない
・最後は次回ご来店が楽しみになるよう締める

【良い返信例】
・「レイヤースタイルとてもお似合いでした！」
・「透明感カラー気に入っていただけて嬉しいです」
・「その後扱いづらい所などございませんか？」
・「また季節に合わせたご提案もぜひお任せください」

【返信例1】
いつも当サロンをご利用いただき、誠にありがとうございます。
また、大変嬉しい口コミの投稿もありがとうございます♪
あや様の貴重なお時間の中で、仕上がりにご満足いただけているとのこと、美容師として何より嬉しく励みになります。
短時間でも扱いやすく、一番お似合いになるスタイルをご提案できるよう、常に心がけて施術しております。
これからもお忙しい毎日の合間に、安心してお任せいただけるよう、技術とサービスの向上に努めてまいります。
またのご来店を、スタッフ一同心よりお待ちしております。

【返信例2】
先日はご来店いただきありがとうございました。
また、お忙しい中口コミ投稿ありがとうございます。

いつもお任せいただいてありがとうございます。
今回も気に入って頂けて安心いたしました！
また、何かございましたらご相談ください。

またのご来店心よりお待ちいたしております。

`,},
{
role: "user",
content: body.review,
},
],
});

return new Response(
JSON.stringify({
reply:
completion.choices[0].message.content,
}),
{
headers: {
"Content-Type": "application/json",
"Access-Control-Allow-Origin": "*",
},
}
);
}