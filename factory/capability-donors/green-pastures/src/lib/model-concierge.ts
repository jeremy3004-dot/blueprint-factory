import OpenAI from "openai";

import {
  buildConciergeSystemPrompt,
  type ConciergeMessage,
} from "@/lib/chat-engine";
import {
  DEFAULT_ANTHROPIC_DEEP_MODEL,
  DEFAULT_ANTHROPIC_FAST_MODEL,
  ANTHROPIC_API_VERSION,
  buildAnthropicRequestBody,
  resolveConciergeProvider,
  selectAnthropicModel,
} from "@/lib/concierge-provider";

type AnthropicResponse = {
  content?: Array<
    | {
        type: "text";
        text: string;
      }
    | {
        type: string;
      }
  >;
};

function isAnthropicTextBlock(
  block: NonNullable<AnthropicResponse["content"]>[number],
): block is { type: "text"; text: string } {
  return block.type === "text";
}

const providerConfig = resolveConciergeProvider();

const openai =
  providerConfig.provider === "openai" && providerConfig.apiKey
    ? new OpenAI({ apiKey: providerConfig.apiKey })
    : null;

export const conciergeReadiness = {
  connected: providerConfig.connected,
  provider: providerConfig.provider ?? "local",
  model: providerConfig.model,
};

async function generateAnthropicConciergeReply(messages: ConciergeMessage[]) {
  if (
    providerConfig.provider !== "anthropic" ||
    !providerConfig.apiKey
  ) {
    return null;
  }

  const selectedModel = selectAnthropicModel(messages);
  const fallbackModel =
    selectedModel === DEFAULT_ANTHROPIC_FAST_MODEL
      ? DEFAULT_ANTHROPIC_DEEP_MODEL
      : DEFAULT_ANTHROPIC_FAST_MODEL;

  const candidateModels = Array.from(
    new Set(
      [providerConfig.model, selectedModel, fallbackModel].filter(
        (candidate): candidate is string => Boolean(candidate),
      ),
    ),
  );

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
      const details = await response.text();

      if (response.status === 404) {
        console.warn(
          `Anthropic model unavailable, retrying with fallback model ${model}: ${details.slice(0, 300)}`,
        );
        continue;
      }

      throw new Error(
        `Anthropic concierge request failed (${response.status}): ${details.slice(0, 500)}`,
      );
    }

    const payload = (await response.json()) as AnthropicResponse;

    return (
      payload.content
        ?.filter(isAnthropicTextBlock)
        .map((block) => block.text)
        .join("\n")
        .trim() || null
    );
  }

  return null;
}

async function generateOpenAIConciergeReply(messages: ConciergeMessage[]) {
  if (
    providerConfig.provider !== "openai" ||
    !openai ||
    !providerConfig.model
  ) {
    return null;
  }

  const response = await openai.responses.create({
    model: providerConfig.model,
    instructions: buildConciergeSystemPrompt(),
    input: messages.slice(-8).map((message) => ({
      role: message.role,
      content: [{ type: "input_text", text: message.content }],
    })),
    max_output_tokens: 360,
    text: {
      format: {
        type: "text",
      },
    },
  });

  return response.output_text?.trim() || null;
}

export async function generateModelConciergeReply(
  messages: ConciergeMessage[],
) {
  if (providerConfig.provider === "anthropic") {
    const reply = await generateAnthropicConciergeReply(messages);

    if (!reply) {
      return null;
    }

    return {
      reply,
      provider: "anthropic" as const,
      model: selectAnthropicModel(messages),
    };
  }

  if (providerConfig.provider === "openai") {
    const reply = await generateOpenAIConciergeReply(messages);

    if (!reply) {
      return null;
    }

    return {
      reply,
      provider: "openai" as const,
      model: providerConfig.model,
    };
  }

  return null;
}
