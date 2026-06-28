"use client";

export type AnalyticsProperties = Record<
  string,
  boolean | number | string | null | undefined
>;

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const distinctIdKey = "alpine_bloom_analytics_id";

let initialized = false;
let distinctId: string | null = null;

export function analyticsEnabled() {
  return Boolean(posthogKey);
}

function anonymousId() {
  if (distinctId) return distinctId;

  if (typeof window === "undefined") return "server";

  const nextId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `anon-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  try {
    const stored = window.localStorage.getItem(distinctIdKey);
    if (stored) {
      distinctId = stored;
      return stored;
    }

    window.localStorage.setItem(distinctIdKey, nextId);
  } catch {
    // Private browsing or strict storage settings should not break the app.
  }

  distinctId = nextId;
  return distinctId;
}

export function initAnalytics() {
  if (!posthogKey || initialized || typeof window === "undefined") return;

  anonymousId();
  initialized = true;
}

export function captureEvent(eventName: string, properties?: AnalyticsProperties) {
  if (!posthogKey || typeof window === "undefined") return;

  initAnalytics();

  const payload = JSON.stringify({
    api_key: posthogKey,
    event: eventName,
    distinct_id: anonymousId(),
    properties: {
      ...properties,
      app: "alpine-bloom",
    },
  });
  const url = `${posthogHost.replace(/\/$/, "")}/capture/`;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
    return;
  }

  void fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  });
}

export function capturePageView(url: string) {
  captureEvent("$pageview", { $current_url: url });
}

export const analytics = {
  adminLoginViewed: () => captureEvent("admin_login_viewed"),
  adminViewed: () => captureEvent("admin_viewed"),
  bookingSubmitted: (properties: AnalyticsProperties) =>
    captureEvent("booking_submitted", properties),
  bookingSubmissionFailed: (properties: AnalyticsProperties) =>
    captureEvent("booking_submission_failed", properties),
  chatOpened: (properties?: AnalyticsProperties) => captureEvent("chat_opened", properties),
  chatPromptSent: (properties: AnalyticsProperties) =>
    captureEvent("chat_prompt_sent", properties),
  pageViewed: capturePageView,
};
