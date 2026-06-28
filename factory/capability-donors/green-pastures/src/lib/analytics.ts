"use client";

import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

let initialized = false;

export type AnalyticsProperties = Record<
  string,
  boolean | number | string | null | undefined
>;

export function analyticsEnabled() {
  return Boolean(posthogKey);
}

export function initAnalytics() {
  if (!posthogKey || initialized) {
    return;
  }

  posthog.init(posthogKey, {
    api_host: posthogHost || "https://us.i.posthog.com",
    capture_pageview: false,
    persistence: "localStorage+cookie",
    person_profiles: "identified_only",
  });

  initialized = true;
}

export function captureEvent(
  eventName: string,
  properties?: AnalyticsProperties,
) {
  if (!posthogKey) {
    return;
  }

  initAnalytics();
  posthog.capture(eventName, properties);
}

export function capturePageView(url: string) {
  captureEvent("$pageview", { $current_url: url });
}

export const analytics = {
  adminLoginViewed: () => captureEvent("admin_login_viewed"),
  bookingSubmitted: (properties: AnalyticsProperties) =>
    captureEvent("booking_submitted", properties),
  bookingSubmissionFailed: (properties: AnalyticsProperties) =>
    captureEvent("booking_submission_failed", properties),
  chatOpened: (properties?: AnalyticsProperties) =>
    captureEvent("chat_opened", properties),
  chatPromptSent: (properties: AnalyticsProperties) =>
    captureEvent("chat_prompt_sent", properties),
  pageViewed: capturePageView,
};
