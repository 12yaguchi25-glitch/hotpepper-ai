"use client";

import { useState } from "react";

export default function Home() {
const [review, setReview] = useState("");
const [reply, setReply] = useState("");

const generateReply = async () => {
const res = await fetch("/api/reply", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
review,
}),
});

const data = await res.json();

setReply(data.reply);

};

return (
<main style={{ padding: 40 }}>
口コミAI返信

  <textarea
    value={review}
    onChange={(e) => setReview(e.target.value)}
    placeholder="口コミを入力"
    style={{
      width: "100%",
      height: 200,
      marginTop: 20,
    }}
  />

  <br />
  <br />

  <button onClick={generateReply}
style={{
backgroundColor: "#111827",
color: "white",
border: "none",
padding: "14px 24px",
borderRadius: "12px",
fontSize: "16px",
fontWeight: "bold",
cursor: "pointer",
boxShadow:
"0 4px 12px rgba(0,0,0,0.15)",
transition: "0.2s",
}}>
    AI返信生成
  </button>

  <br />
  <br />

  <textarea
    value={reply}
    readOnly
    style={{
      width: "100%",
      height: 200,
    }}
  />
</main>

);
}