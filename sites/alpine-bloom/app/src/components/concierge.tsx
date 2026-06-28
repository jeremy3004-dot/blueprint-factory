"use client";

import { useRef, useState, useTransition } from "react";

import { ConciergeAvatarIcon } from "@/components/concierge-avatar-icon";
import { formatAssistantReply } from "@/lib/chat-format";
import { analytics } from "@/lib/analytics";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starters = [
  "Compare Everest Base Camp and Annapurna Circuit",
  "I have 7 days and this is my first trek",
  "Can I request a Nepali woman guide?",
];

export function Concierge({ variant = "embedded" }: { variant?: "embedded" | "floating" }) {
  const openedTracked = useRef(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Tell me your route dream, travel window, group size, and what support would help you feel steady. I will shape the first Alpine Bloom women-only trek brief.",
    },
  ]);
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();

  function trackOpened(source = `${variant}_concierge`) {
    if (variant === "floating") return;
    if (openedTracked.current) return;
    openedTracked.current = true;
    analytics.chatOpened({ source, variant });
  }

  function send(prompt: string) {
    trackOpened(`${variant}_concierge_prompt`);
    const next = [...messages, { role: "user" as const, content: prompt }];
    analytics.chatPromptSent({
      variant,
      promptLength: prompt.length,
      messageCount: next.length,
    });
    setMessages(next);
    setInput("");
    startTransition(async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        const payload = (await response.json()) as { reply?: string; provider?: string };

        if (!response.ok || !payload.reply) {
          throw new Error("Concierge reply failed.");
        }

        const reply = payload.reply;
        setMessages((current) => [...current, { role: "assistant", content: reply }]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content:
              "I could not load a fresh reply just now. Try again, or send the route, dates, group size, and women guide support notes through /book.",
          },
        ]);
      }
    });
  }

  return (
    <section className={`conciergePanel ${variant === "floating" ? "floating" : ""}`}>
      <div className="conciergeHead">
        <div className="conciergeAvatar">
          <ConciergeAvatarIcon />
        </div>
        <div>
          <p className="kicker">Alpine Bloom guide desk</p>
          <span>Nepali women guide matching, altitude pacing, and route fit.</span>
        </div>
      </div>
      <div className="chatWindow">
        {messages.map((message, index) => (
          <div className={`chatBubble ${message.role}`} key={`${message.role}-${index}`}>
            {message.role === "assistant" ? formatAssistantReply(message.content) : message.content}
          </div>
        ))}
        {pending ? <div className="chatBubble assistant">Checking routes, altitude pacing, permits, and women guide fit...</div> : null}
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
          onFocus={() => trackOpened(`${variant}_concierge_input`)}
          placeholder="Ask about routes, guides, altitude, permits, or dates"
        />
        <button className="btn" type="submit" disabled={!input.trim() || pending}>
          Send <span className="arrow">→</span>
        </button>
      </form>
    </section>
  );
}
