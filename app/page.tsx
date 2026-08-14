"use client";

import { useState } from "react";

export default function Home() {
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [copied, setCopied] = useState(false);

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
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!reply) return;

    try {
      await navigator.clipboard.writeText(reply);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("コピーに失敗しました");
    }
  };

  return (
    <main
      style={{
        padding: 40,
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        💇‍♀️ 口コミAI返信
      </h1>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="口コミを入力してください"
        style={{
          width: "100%",
          height: 200,
          padding: 15,
          fontSize: 16,
          borderRadius: 12,
          border: "1px solid #ccc",
        }}
      />

      <br />
      <br />

      <button
        onClick={generateReply}
        style={{
          backgroundColor: "#111827",
          color: "white",
          border: "none",
          padding: "14px 24px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
        }}
      >
        ✨ AI返信生成
      </button>

      <br />
      <br />

      <textarea
        value={reply}
        readOnly
        placeholder="ここにAI返信が表示されます"
        style={{
          width: "100%",
          height: 200,
          padding: 15,
          fontSize: 16,
          borderRadius: 12,
          border: "1px solid #ccc",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleCopy}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "14px 24px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {copied ? "✅ コピー済み" : "📋 コピー"}
      </button>

      {copied && (
        <p
          style={{
            color: "#16a34a",
            fontWeight: "bold",
            marginTop: 15,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          ✅ コピーしました！
        </p>
      )}
    </main>
  );
}