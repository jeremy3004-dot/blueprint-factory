import {
  buildConciergeSystemPrompt,
  generateConciergeReply,
  type ConciergeMessage,
} from "@/lib/chat-engine";
import {
  ANTHROPIC_API_VERSION,
  buildAnthropicRequestBody,
  DEFAULT_ANTHROPIC_DEEP_MODEL,
  DEFAULT_ANTHROPIC_FAST_MODEL,
  resolveConciergeProvider,
  selectAnthropicModel,
} from "@/lib/concierge-provider";

type AnthropicResponse = {
  content?: Array<{ type: "text"; text: string } | { type: string }>;
};

type OpenAiResponse = {
  output_text?: string;
  output?: Array<{ content?: Array<{ text?: string }> }>;
};

const providerConfig = resolveConciergeProvider();

export const conciergeReadiness = {
  connected: providerConfig.connected,
  provider: providerConfig.provider ?? "local",
  model: providerConfig.model,
};

function isAnthropicTextBlock(
  block: NonNullable<AnthropicResponse["content"]>[number],
): block is { type: "text"; text: string } {
  return block.type === "text";
}

function applyBookingCallToAction(reply: string, messages: ConciergeMessage[]) {
  const lastUserPrompt =
    [...messages].reverse().find((message) => message.role === "user")?.content.toLowerCase() ?? "";
  const wantsBooking = /\b(book|booking|quote|proposal|price|cost|reserve|hold)\b/.test(lastUserPrompt);

  if (!wantsBooking || reply.includes("/book")) return reply;

  return `${reply}\n\nWhen she is ready, send the route, dates, group size, and women guide support notes through /book so Alpine Bloom can shape the proposal.`;
}

function openAiText(payload: OpenAiResponse) {
  return (
    payload.output_text ??
    payload.output
      ?.flatMap((item) => item.content ?? [])
      .map((item) => item.text ?? "")
      .join("\n") ??
    ""
  ).trim();
}

async function generateAnthropicConciergeReply(messages: ConciergeMessage[]) {
  if (providerConfig.provider !== "anthropic" || !providerConfig.apiKey) return null;

  const selectedModel = selectAnthropicModel(messages);
  const fallbackModel =
    selectedModel === DEFAULT_ANTHROPIC_FAST_MODEL
      ? DEFAULT_ANTHROPIC_DEEP_MODEL
      : DEFAULT_ANTHROPIC_FAST_MODEL;
  const candidateModels = Array.from(
    new Set([providerConfig.model, selectedModel, fallbackModel].filter(Boolean)),
  ) as string[];

  for (const model of candidateModels) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": providerConfig.apiKey,
        "anthropic-version": ANTHROPIC_API_VERSION,
      },
      body: JSON.stringify(
        buildAnthropicRequestBody({
          system: buildConciergeSystemPrompt(),
          messages,
          model,
        }),
      ),
    });

    if (!response.ok) {
      if (response.status === 404) continue;
      throw new Error(`Anthropic concierge request failed with ${response.status}`);
    }

    const payload = (await response.json()) as AnthropicResponse;
    const reply =
      payload.content
        ?.filter(isAnthropicTextBlock)
        .map((block) => block.text)
        .join("\n")
        .trim() ?? "";

    if (reply) return { reply: applyBookingCallToAction(reply, messages), provider: "anthropic" as const, model };
  }

  return null;
}

async function generateOpenAiConciergeReply(messages: ConciergeMessage[]) {
  if (providerConfig.provider !== "openai" || !providerConfig.apiKey || !providerConfig.model) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${providerConfig.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: providerConfig.model,
      instructions: buildConciergeSystemPrompt(),
      input: messages.slice(-8).map((message) => ({
        role: message.role,
        content: [{ type: "input_text", text: message.content }],
      })),
      max_output_tokens: 360,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI concierge request failed with ${response.status}`);
  }

  const payload = (await response.json()) as OpenAiResponse;
  const reply = openAiText(payload);

  return reply
    ? {
        reply: applyBookingCallToAction(reply, messages),
        provider: "openai" as const,
        model: providerConfig.model,
      }
    : null;
}

export async function generateModelConciergeReply(messages: ConciergeMessage[]) {
  try {
    if (providerConfig.provider === "anthropic") {
      const reply = await generateAnthropicConciergeReply(messages);
      if (reply) return reply;
    }

    if (providerConfig.provider === "openai") {
      const reply = await generateOpenAiConciergeReply(messages);
      if (reply) return reply;
    }
  } catch (error) {
    console.error("Model concierge failed; using local fallback", error);
  }

  return {
    reply: applyBookingCallToAction(generateConciergeReply(messages), messages),
    provider: "local" as const,
    model: null,
  };
}
