"use client";

import { useMemo, useState, useTransition } from "react";

import { trekRoutes } from "@/data/green-pastures";
import { analytics } from "@/lib/analytics";
import type { BookingApiResult, BookingFormValues } from "@/lib/ops-types";

const addOns = [
  "Women guide match",
  "First-time trekker support",
  "Private sisterhood group",
  "Nepali guide pairing",
  "Comfort lodge upgrade",
  "Altitude check-in calls",
  "Pokhara recovery day",
  "Kathmandu arrival help",
];

const emptyValues: BookingFormValues = {
  fullName: "",
  email: "",
  departureWindow: "Oct-Nov",
  routeSlug: trekRoutes[0]?.slug ?? "",
  groupSize: "2",
  style: "Women-led small group",
  addons: [],
  notes: "",
};

export function BookingForm({ initialRouteSlug }: { initialRouteSlug?: string }) {
  const [values, setValues] = useState<BookingFormValues>({
    ...emptyValues,
    routeSlug: trekRoutes.some((route) => route.slug === initialRouteSlug)
      ? initialRouteSlug ?? emptyValues.routeSlug
      : emptyValues.routeSlug,
  });
  const [result, setResult] = useState<BookingApiResult | null>(null);
  const [pending, startTransition] = useTransition();
  const selectedRoute = useMemo(
    () => trekRoutes.find((route) => route.slug === values.routeSlug),
    [values.routeSlug],
  );

  function update<K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleAddon(addon: string) {
    setValues((current) => ({
      ...current,
      addons: current.addons.includes(addon)
        ? current.addons.filter((item) => item !== addon)
        : [...current.addons, addon],
    }));
  }

  function trackBookingResult(payload: BookingApiResult, status: number) {
    const properties = {
      routeSlug: values.routeSlug,
      groupSize: values.groupSize,
      addonCount: values.addons.length,
      provider: payload.provider,
      stored: payload.stored,
      status,
    };

    if (status >= 200 && status < 300 && payload.accepted) {
      analytics.bookingSubmitted(properties);
      return;
    }

    analytics.bookingSubmissionFailed(properties);
  }

  return (
    <section className="bookingLayout shell">
      <form
        className="proposalForm"
        onSubmit={(event) => {
          event.preventDefault();
          setResult(null);
          startTransition(async () => {
            try {
              const response = await fetch("/api/book", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(values),
              });
              const payload = (await response.json()) as BookingApiResult;
              trackBookingResult(payload, response.status);
              setResult(payload);
            } catch {
              analytics.bookingSubmissionFailed({
                routeSlug: values.routeSlug,
                groupSize: values.groupSize,
                addonCount: values.addons.length,
                provider: "preview",
                stored: false,
                status: 0,
              });
              setResult({
                accepted: false,
                stored: false,
                provider: "preview",
                message:
                  "We could not send this proposal request just now. Please try again in a moment.",
              });
            }
          });
        }}
      >
        <Field label="Full name">
          <input value={values.fullName} onChange={(event) => update("fullName", event.target.value)} />
        </Field>
        <Field label="Email">
          <input value={values.email} onChange={(event) => update("email", event.target.value)} />
        </Field>
        <div className="formSplit">
          <Field label="Departure window">
            <select
              value={values.departureWindow}
              onChange={(event) => update("departureWindow", event.target.value)}
            >
              <option>Mar-May</option>
              <option>Oct-Nov</option>
              <option>May-Oct</option>
              <option>Custom</option>
            </select>
          </Field>
          <Field label="Group size">
            <select value={values.groupSize} onChange={(event) => update("groupSize", event.target.value)}>
              <option value="1">Solo traveler</option>
              <option value="2">2 travelers</option>
              <option value="4">4 travelers</option>
              <option value="8+">8+ travelers</option>
            </select>
          </Field>
        </div>
        <Field label="Route">
          <select value={values.routeSlug} onChange={(event) => update("routeSlug", event.target.value)}>
            {trekRoutes.map((route) => (
              <option key={route.slug} value={route.slug}>
                {route.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Trip style">
          <select value={values.style} onChange={(event) => update("style", event.target.value)}>
            <option>Women-led small group</option>
            <option>Private comfort trek</option>
            <option>First Himalayan trek</option>
            <option>Luxury custom route</option>
          </select>
        </Field>
        <div className="addonField">
          <p>Add-ons</p>
          <div className="chipRow">
            {addOns.map((addon) => (
              <button
                className={values.addons.includes(addon) ? "active" : ""}
                key={addon}
                type="button"
                onClick={() => toggleAddon(addon)}
              >
                {addon}
              </button>
            ))}
          </div>
        </div>
        <Field label="Notes">
          <textarea
            rows={5}
            value={values.notes}
            onChange={(event) => update("notes", event.target.value)}
            placeholder="Dates, hiking background, comfort preferences, altitude worries, dream details."
          />
        </Field>
        <button className="btn dark" disabled={pending} type="submit">
          {pending ? "Sending..." : "Build my proposal"} <span className="arrow">→</span>
        </button>
        {result ? <p className="formResult">{result.message}</p> : null}
      </form>

      <aside className="proposalSnapshot">
        <span>Proposal snapshot</span>
        <h2>{selectedRoute?.name}</h2>
        <p>{selectedRoute?.signature}</p>
        <dl>
          <div>
            <dt>Starting guide</dt>
            <dd>${selectedRoute?.fromUsd?.toLocaleString() ?? "Custom"}</dd>
          </div>
          <div>
            <dt>Season</dt>
            <dd>{selectedRoute?.bestSeasons.join(" / ")}</dd>
          </div>
          <div>
            <dt>Support</dt>
            <dd>{values.addons.length ? values.addons.join(", ") : "Choose support add-ons"}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
