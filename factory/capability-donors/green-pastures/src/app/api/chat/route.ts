import { NextResponse } from "next/server";
import { z } from "zod";

import {
  applyBookingCallToAction,
  generateConciergeReply,
} from "@/lib/chat-engine";
import {
  conciergeReadiness,
  generateModelConciergeReply,
} from "@/lib/model-concierge";

const chatPayloadSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2_500),
      }),
    )
    .default([]),
});

export async function POST(request: Request) {
  const parsed = chatPayloadSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      {
        reply:
          "The concierge needs at least one valid message before it can respond.",
        provider: "local",
      },
      { status: 400 },
    );
  }

  const messages = parsed.data.messages;

  try {
    const providerReply = await generateModelConciergeReply(messages);

    if (providerReply) {
      return NextResponse.json({
        reply: applyBookingCallToAction(providerReply.reply, messages),
        provider: providerReply.provider ?? conciergeReadiness.provider,
        model: providerReply.model ?? conciergeReadiness.model,
      });
    }
  } catch (error) {
    console.error("Model concierge fallback triggered", error);
  }

  return NextResponse.json({
    reply: generateConciergeReply(messages),
    provider: "local",
  });
}
