import type { BookingFormValues } from "@/lib/ops-types";

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function list(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean)
    : [];
}

export function validateBookingPayload(payload: unknown):
  | { ok: true; values: BookingFormValues }
  | { ok: false; issues: Record<string, string> } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, issues: { form: "Send booking details as JSON." } };
  }

  const raw = payload as Record<string, unknown>;
  const values: BookingFormValues = {
    fullName: text(raw.fullName),
    email: text(raw.email),
    departureWindow: text(raw.departureWindow),
    routeSlug: text(raw.routeSlug),
    groupSize: text(raw.groupSize),
    style: text(raw.style),
    addons: list(raw.addons),
    notes: text(raw.notes),
  };
  const issues: Record<string, string> = {};

  if (values.fullName.length < 2) issues.fullName = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) issues.email = "Enter a valid email.";
  if (!values.departureWindow) issues.departureWindow = "Choose a departure window.";
  if (!values.routeSlug) issues.routeSlug = "Choose a route.";
  if (!values.groupSize) issues.groupSize = "Choose a group size.";
  if (!values.style) issues.style = "Choose a travel style.";
  if ((values.notes ?? "").length > 1500) issues.notes = "Keep notes under 1500 characters.";

  return Object.keys(issues).length ? { ok: false, issues } : { ok: true, values };
}
