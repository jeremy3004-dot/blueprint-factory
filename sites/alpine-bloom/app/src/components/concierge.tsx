"use client";

import { useState, useTransition } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starters = [
  "Compare Everest Base Camp and Annapurna Circuit",
  "I have 7 days and this is my first trek",
  "Can I request a Nepali woman guide?",
];

export function Concierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Tell me your route dream, travel window, group size, and how brave you want the trip to feel. I will shape the first Alpine Bloom brief.",
    },
  ]);
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();

  function send(prompt: string) {
    const next = [...messages, { role: "user" as const, content: prompt }];
    setMessages(next);
    setInput("");
    startTransition(async () => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const payload = (await response.json()) as { reply: string };
      setMessages((current) => [...current, { role: "assistant", content: payload.reply }]);
    });
  }

  return (
    <section className="conciergePanel">
      <div className="chatWindow">
        {messages.map((message, index) => (
          <div className={`chatBubble ${message.role}`} key={`${message.role}-${index}`}>
            {message.content}
          </div>
        ))}
        {pending ? <div className="chatBubble assistant">Checking routes, permits, and guide fit...</div> : null}
      </div>
      <div className="starterRow">
        {starters.map((starter) => (
          <button key={starter} type="button" onClick={() => send(starter)}>
            {starter}
          </button>
        ))}
      </div>
      <form
        className="chatForm"
        onSubmit={(event) => {
          event.preventDefault();
          if (input.trim()) send(input.trim());
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about routes, guides, altitude, permits, or dates"
        />
        <button className="btn" type="submit" disabled={!input.trim() || pending}>
          Send <span className="arrow">→</span>
        </button>
      </form>
    </section>
  );
}
