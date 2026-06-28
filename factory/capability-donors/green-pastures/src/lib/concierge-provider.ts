export type ConciergeRole = "user" | "assistant";

export type ConciergeProvider = "anthropic" | "openai";

export type ConciergeProviderConfig = {
  provider: ConciergeProvider | null;
  apiKey: string | null;
  model: string | null;
  connected: boolean;
};

export type ConciergeProviderMessage = {
  role: ConciergeRole;
  content: string;
};

export const DEFAULT_OPENAI_MODEL = "gpt-5.4-mini";
export const DEFAULT_ANTHROPIC_FAST_MODEL = "claude-3-5-haiku-20241022";
export const DEFAULT_ANTHROPIC_DEEP_MODEL = "claude-sonnet-4-20250514";
export const ANTHROPIC_API_VERSION = "2023-06-01";
export const CONCIERGE_MESSAGE_LIMIT = 8;
export const CONCIERGE_MAX_OUTPUT_TOKENS = 360;

function readEnvValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function resolveConciergeProvider(
  env: NodeJS.ProcessEnv = process.env,
): ConciergeProviderConfig {
  const anthropicApiKey = readEnvValue(env.ANTHROPIC_API_KEY);

  if (anthropicApiKey) {
    return {
      provider: "anthropic",
      apiKey: anthropicApiKey,
      model: readEnvValue(env.ANTHROPIC_MODEL) ?? DEFAULT_ANTHROPIC_FAST_MODEL,
      connected: true,
    };
  }

  const openaiApiKey = readEnvValue(env.OPENAI_API_KEY);

  if (openaiApiKey) {
    return {
      provider: "openai",
      apiKey: openaiApiKey,
      model: readEnvValue(env.OPENAI_MODEL) ?? DEFAULT_OPENAI_MODEL,
      connected: true,
    };
  }

  return {
    provider: null,
    apiKey: null,
    model: null,
    connected: false,
  };
}

function scorePromptComplexity(prompt: string) {
  const lowered = prompt.toLowerCase();

  const keywordHits = [
    "compare",
    "tradeoff",
    "trade-off",
    "plan",
    "itinerary",
    "proposal",
    "custom",
    "optimize",
    "detailed",
    "day-by-day",
    "reason",
    "analyze",
    "analysis",
    "contingency",
    "weather",
    "risk",
    "budget",
    "luxury",
    "premium",
    "versus",
    "vs",
  ].filter((keyword) => lowered.includes(keyword)).length;

  const routeMentions = [
    "everest",
    "annapurna",
    "langtang",
    "mardi",
    "manaslu",
    "mustang",
    "dolpo",
    "gokyo",
    "kanchenjunga",
  ].filter((route) => lowered.includes(route)).length;

  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;

  return keywordHits + Math.max(0, routeMentions - 1) + (wordCount >= 24 ? 2 : 0);
}

export function selectAnthropicModel(messages: ConciergeProviderMessage[]) {
  const lastUserPrompt =
    [...messages].reverse().find((message) => message.role === "user")?.content ?? "";

  return scorePromptComplexity(lastUserPrompt) >= 3
    ? DEFAULT_ANTHROPIC_DEEP_MODEL
    : DEFAULT_ANTHROPIC_FAST_MODEL;
}

export function buildAnthropicRequestBody({
  system,
  messages,
  model,
}: {
  system: string;
  messages: ConciergeProviderMessage[];
  model?: string;
}) {
  return {
    model: model ?? selectAnthropicModel(messages),
    max_tokens: CONCIERGE_MAX_OUTPUT_TOKENS,
    system,
    messages: messages.slice(-CONCIERGE_MESSAGE_LIMIT).map((message) => ({
      role: message.role,
      content: message.content,
    })),
  };
}
