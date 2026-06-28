import { NextResponse } from "next/server";

import { type ConciergeMessage } from "@/lib/chat-engine";
import { generateModelConciergeReply } from "@/lib/model-concierge";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const rawMessages = payload && typeof payload === "object" && "messages" in payload
    ? (payload as { messages?: unknown }).messages
    : [];
  const messages: ConciergeMessage[] = Array.isArray(rawMessages)
    ? rawMessages
        .filter(
          (message): message is ConciergeMessage =>
            message &&
            typeof message === "object" &&
            ((message as ConciergeMessage).role === "user" ||
              (message as ConciergeMessage).role === "assistant") &&
            typeof (message as ConciergeMessage).content === "string",
        )
        .slice(-8)
    : [];

  return NextResponse.json(await generateModelConciergeReply(messages));
}
