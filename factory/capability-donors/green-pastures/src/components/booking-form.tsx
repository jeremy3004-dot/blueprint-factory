"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { trekRoutes } from "@/data/treks";
import { formatStartingRate } from "@/lib/route-pricing";
import {
  bookingSchema,
  type BookingApiResult,
  type BookingFormValues,
} from "@/lib/booking";
import { analytics } from "@/lib/analytics";

const addOns = [
  "Helicopter extraction",
  "Private jeep transfers",
  "Kathmandu arrival concierge",
  "Pokhara recovery hotel",
  "Women-led guide request",
  "Everest mountain flight",
  "Chitwan safari extension",
  "Luxury lodge upgrade",
  "Photography guide",
  "Kathmandu heritage day tour",
  "Pokhara paragliding",
  "Satellite phone rental",
  "Oxygen support kit",
];

type BookingFormProps = {
  initialRouteSlug?: string;
};

export function BookingForm({ initialRouteSlug }: BookingFormProps) {
  const [submissionSnapshot, setSubmissionSnapshot] =
    useState<BookingFormValues | null>(null);
  const [submissionResult, setSubmissionResult] = useState<BookingApiResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const defaultRouteSlug = trekRoutes.some((route) => route.slug === initialRouteSlug)
    ? initialRouteSlug
    : trekRoutes[0]?.slug ?? "";

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      departureWindow: "Oct-Nov",
      routeSlug: defaultRouteSlug,
      groupSize: "2",
      style: "Private premium",
      addons: [],
      notes: "",
    },
  });

  const routeSlug = useWatch({
    control: form.control,
    name: "routeSlug",
  });
  const departureWindow = useWatch({
    control: form.control,
    name: "departureWindow",
  });
  const groupSize = useWatch({
    control: form.control,
    name: "groupSize",
  });
  const style = useWatch({
    control: form.control,
    name: "style",
  });
  const addons = useWatch({
    control: form.control,
    name: "addons",
  });
  const selectedRoute = useMemo(
    () => trekRoutes.find((route) => route.slug === routeSlug),
    [routeSlug],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form
        className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        onSubmit={form.handleSubmit((values) => {
          setSubmissionSnapshot(values);
          setSubmissionResult(null);

          startTransition(async () => {
            try {
              const response = await fetch("/api/book", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              const payload = (await response.json()) as BookingApiResult;
              setSubmissionResult(payload);
              analytics.bookingSubmitted({
                addonsCount: values.addons.length,
                groupSize: values.groupSize,
                provider: payload.provider,
                routeSlug: values.routeSlug,
                stored: payload.stored,
                style: values.style,
              });
            } catch {
              analytics.bookingSubmissionFailed({
                addonsCount: values.addons.length,
                groupSize: values.groupSize,
                routeSlug: values.routeSlug,
                style: values.style,
              });
              setSubmissionResult({
                accepted: true,
                stored: false,
                provider: "preview",
                message:
                  "Your request is ready, but it could not be delivered just now. Please try again in a moment or reach out directly so we can hold your dates.",
              });
            }
          });
        })}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Full name"
            error={form.formState.errors.fullName?.message}
            input={
              <input
                {...form.register("fullName")}
                className="field-input"
                placeholder="Alex Morgan"
              />
            }
          />
          <Field
            label="Email"
            error={form.formState.errors.email?.message}
            input={
              <input
                {...form.register("email")}
                className="field-input"
                placeholder="alex@example.com"
              />
            }
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field
            label="Departure window"
            error={form.formState.errors.departureWindow?.message}
            input={
              <select {...form.register("departureWindow")} className="field-input">
                <option>Mar-May</option>
                <option>Oct-Nov</option>
                <option>May-Oct</option>
                <option>Custom</option>
              </select>
            }
          />
          <Field
            label="Group size"
            error={form.formState.errors.groupSize?.message}
            input={
              <select {...form.register("groupSize")} className="field-input">
                <option value="1">Solo traveler</option>
                <option value="2">2 travelers</option>
                <option value="4">4 travelers</option>
                <option value="8+">8+ travelers</option>
              </select>
            }
          />
          <Field
            label="Style"
            error={form.formState.errors.style?.message}
            input={
              <select {...form.register("style")} className="field-input">
                <option>Private premium</option>
                <option>Small group</option>
                <option>Luxury custom</option>
                <option>Women-led departure</option>
              </select>
            }
          />
        </div>
        <Field
          label="Route"
          error={form.formState.errors.routeSlug?.message}
          input={
            <select {...form.register("routeSlug")} className="field-input">
              {trekRoutes.map((route) => (
                <option key={route.slug} value={route.slug}>
                  {route.name}
                </option>
              ))}
            </select>
          }
        />
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Add-ons</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {addOns.map((addon) => (
              <label
                key={addon}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-stone-300"
              >
                <input
                  type="checkbox"
                  value={addon}
                  {...form.register("addons")}
                  className="accent-amber-300"
                />
                {addon}
              </label>
            ))}
          </div>
        </div>
        <Field
          label="Notes"
          input={
            <textarea
              {...form.register("notes")}
              rows={4}
              className="field-input"
              placeholder="Tell us your date range, hiking background, comfort preferences, and anything special you want built into the trip."
            />
          }
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-amber-200"
        >
          {isPending ? "Saving proposal..." : "Build my proposal"}
        </button>
      </form>

      <aside className="rounded-[2rem] border border-white/10 bg-stone-950/80 p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Proposal snapshot</p>
        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-display text-3xl text-white">{selectedRoute?.name}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              {selectedRoute?.signature}
            </p>
          </div>
          <div className="grid gap-3 text-sm text-stone-300">
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span>Suggested starting rate</span>
              <span className="text-white">
                {formatStartingRate(selectedRoute?.fromUsd)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span>Duration</span>
              <span className="text-white">{selectedRoute?.durationDays} days</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span>Altitude</span>
              <span className="text-white">
                {selectedRoute?.maxAltitudeM.toLocaleString()}m
              </span>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
              Current form state
            </p>
            <p className="mt-3 text-sm leading-6 text-stone-300">
              Departure: {departureWindow} · Group: {groupSize} · Style: {style}
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              Selected extras: {addons.length > 0 ? addons.join(", ") : "No add-ons selected yet"}
            </p>
          </div>
          {submissionResult && submissionSnapshot ? (
            <div
              className={`rounded-[1.5rem] border p-4 text-sm leading-6 ${
                submissionResult.stored
                  ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                  : "border-amber-300/25 bg-amber-300/10 text-amber-100"
              }`}
            >
              <p>
                Proposal prepared for {submissionSnapshot.fullName}. {submissionResult.message}
              </p>
              {submissionResult.bookingId ? (
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-emerald-200/80">
                  Reference {submissionResult.bookingId}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.28em] text-stone-500">{label}</span>
      {input}
      {error ? <span className="text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}
