"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { LoaderCircle, SendHorizonal } from "lucide-react";

import { ConciergeAvatarIcon } from "@/components/concierge-avatar-icon";
import { companyProfile } from "@/data/company";
import { formatAssistantReply } from "@/lib/chat-format";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "Compare Everest Base Camp vs Annapurna Base Camp",
  "I only have 10 days. What should I do?",
  "Show me a women-led route for a first-time trekker",
];

type AIConciergeProps = {
  className?: string;
  variant?: "embedded" | "floating";
};

type PromptPhase = "typing" | "holding" | "deleting";

function useRotatingPrompt({
  prompts,
  paused,
}: {
  prompts: string[];
  paused: boolean;
}) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [phase, setPhase] = useState<PromptPhase>("typing");
  const activePrompt = prompts[promptIndex] ?? "";

  useEffect(() => {
    if (paused) {
      return;
    }

    let timeout = 0;

    if (phase === "typing") {
      if (visibleText.length < activePrompt.length) {
        timeout = window.setTimeout(() => {
          setVisibleText(activePrompt.slice(0, visibleText.length + 1));
        }, 42);
      } else {
        timeout = window.setTimeout(() => {
          setPhase("holding");
        }, 1800);
      }
    } else if (phase === "holding") {
      timeout = window.setTimeout(() => {
        setPhase("deleting");
      }, 2400);
    } else if (visibleText.length > 0) {
      timeout = window.setTimeout(() => {
        setVisibleText(activePrompt.slice(0, Math.max(0, visibleText.length - 2)));
      }, 18);
    } else {
      timeout = window.setTimeout(() => {
        setPromptIndex((current) => (current + 1) % prompts.length);
        setPhase("typing");
      }, 260);
    }

    return () => window.clearTimeout(timeout);
  }, [activePrompt, paused, phase, prompts.length, visibleText]);

  return paused ? activePrompt : visibleText;
}

export function AIConcierge({
  className,
  variant = "embedded",
}: AIConciergeProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        `I can help you compare routes, explain permit rules, suggest guide fits, and shape a ${companyProfile.shortName} itinerary around your days, pace, and comfort level.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  const sendMessage = async (prompt: string) => {
    const nextMessages = [...messages, { role: "user" as const, content: prompt }];
    analytics.chatPromptSent({
      messageCount: nextMessages.length,
      promptLength: prompt.length,
      variant,
    });
    setLoading(true);
    setInput("");
    setMessages(nextMessages);

    startTransition(async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });

        const payload = (await response.json()) as {
          reply: string;
        };

        setMessages((current) => [...current, { role: "assistant", content: payload.reply }]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content:
              "I could not load a reply just now. Please send that again and I will pick it up from there.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    });
  };

  const isFloating = variant === "floating";
  const rotatingPrompt = useRotatingPrompt({
    prompts: starterPrompts,
    paused: inputFocused || input.trim().length > 0 || loading,
  });
  const showConversation =
    !isFloating ||
    loading ||
    messages.some((message, index) => !(index === 0 && message.role === "assistant"));

  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        isFloating ? "p-4 md:p-5" : "p-5 md:p-7",
        className,
      )}
    >
      {!isFloating ? (
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-amber-300/25 bg-[linear-gradient(135deg,rgba(241,201,129,0.24),rgba(255,255,255,0.03))] text-amber-200">
            <ConciergeAvatarIcon />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                {companyProfile.shortName} Trip Desk
              </p>
            </div>
            <p className="text-sm text-stone-300">
              Route-aware answers for permits, guides, seasonality, and logistics.
            </p>
          </div>
        </div>
      ) : null}

      {showConversation ? (
        <div
          className={cn(
            "space-y-3",
            isFloating
              ? "max-h-[16rem] overflow-y-auto border-b border-white/10 pb-4 pr-1 md:max-h-[20rem]"
              : "mt-5 max-h-[22rem] overflow-y-auto pr-1 md:max-h-[24rem]",
          )}
        >
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[88%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 ${
                message.role === "assistant"
                  ? "bg-stone-900/90 text-stone-200"
                  : "ml-auto bg-amber-300 text-stone-950"
              }`}
            >
              <span className="whitespace-pre-wrap">
                {message.role === "assistant"
                  ? formatAssistantReply(message.content)
                  : message.content}
              </span>
            </div>
          ))}
          {loading ? (
            <div className="inline-flex items-center gap-2 rounded-[1.5rem] bg-stone-900/90 px-4 py-3 text-sm text-stone-300">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Checking permits, pacing, and route options...
            </div>
          ) : null}
        </div>
      ) : (
        <p
          className={cn(
            "text-sm leading-6 text-stone-300",
            isFloating ? "pb-4" : "mt-5",
          )}
        >
          Ask about routes, permits, guide fit, women-led departures, or helicopter exits.
        </p>
      )}

      <form
        className={cn("flex gap-3", showConversation || !isFloating ? "mt-5" : "")}
        onSubmit={(event) => {
          event.preventDefault();

          if (!canSubmit) {
            return;
          }

          void sendMessage(input.trim());
        }}
      >
        <label className="sr-only" htmlFor="chat-input">
          Ask the {companyProfile.shortName} trip desk
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder={
            rotatingPrompt ||
            "Ask about Everest vs Annapurna, permits, women-led guides, or helicopter exits"
          }
          className="min-w-0 flex-1 rounded-full border border-white/10 bg-stone-950/80 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-300/40"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send <SendHorizonal className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
