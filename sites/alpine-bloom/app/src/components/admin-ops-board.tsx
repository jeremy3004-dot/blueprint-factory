"use client";

import { useMemo, useState, useTransition } from "react";

import { routeOptions } from "@/data/ops-demo";
import type {
  BookingFormValues,
  BookingRequestStatus,
  OpsDashboard,
  OpsGuide,
  OpsTrip,
  PipelineStage,
} from "@/lib/ops-types";

const emptyBooking: BookingFormValues = {
  fullName: "",
  email: "",
  departureWindow: "",
  routeSlug: "annapurna-circuit",
  groupSize: "2",
  style: "Private comfort trek",
  addons: [],
  notes: "",
};

const stages: Array<{ id: PipelineStage; label: string }> = [
  { id: "first_contact", label: "First contact" },
  { id: "qualified", label: "Qualified" },
  { id: "proposal", label: "Proposal" },
  { id: "scheduled", label: "Scheduled" },
  { id: "on_trek", label: "On trek" },
  { id: "completed", label: "Completed" },
  { id: "lost", label: "Lost" },
];

const statusByStage: Record<PipelineStage, BookingRequestStatus> = {
  first_contact: "contacted",
  qualified: "contacted",
  proposal: "proposal_sent",
  scheduled: "confirmed",
  on_trek: "confirmed",
  completed: "confirmed",
  lost: "lost",
};

function routeName(slug: string) {
  return routeOptions.find((route) => route.slug === slug)?.name ?? slug;
}

function postJson<T>(path: string, body: unknown) {
  return fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  }).then(async (response) => {
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message ?? "Demo operation failed.");
    return payload as T;
  });
}

function patchJson<T>(path: string, body: unknown) {
  return fetch(path, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  }).then(async (response) => {
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message ?? "Demo operation failed.");
    return payload as T;
  });
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="adminField">
      <span>{label}</span>
      {children}
    </label>
  );
}

function TripCard({
  trip,
  guides,
  onAssign,
}: {
  trip: OpsTrip;
  guides: OpsGuide[];
  onAssign: (tripId: string, guideId: string) => void;
}) {
  const assignedIds = new Set(trip.assignedGuides.map((guide) => guide.guideId));

  return (
    <article className="adminCard">
      <div className="adminCardTop">
        <span>{trip.status}</span>
        <strong>{trip.startDate}</strong>
      </div>
      <h3>{trip.name}</h3>
      <p>
        {routeName(trip.routeSlug)} · {trip.travelerCount} travelers · {trip.endDate}
      </p>
      <div className="adminChips">
        {trip.assignedGuides.length ? (
          trip.assignedGuides.map((guide) => <span key={guide.id}>{guide.guideName}</span>)
        ) : (
          <span>Needs guide</span>
        )}
      </div>
      <select
        defaultValue=""
        onChange={(event) => {
          if (event.target.value) onAssign(trip.id, event.target.value);
          event.currentTarget.value = "";
        }}
      >
        <option value="">Assign guide</option>
        {guides
          .filter((guide) => !assignedIds.has(guide.id))
          .map((guide) => (
            <option key={guide.id} value={guide.id}>
              {guide.name}
            </option>
          ))}
      </select>
    </article>
  );
}

export function AdminOpsBoard({ initialDashboard }: { initialDashboard: OpsDashboard }) {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [draft, setDraft] = useState(emptyBooking);
  const [message, setMessage] = useState("Demo mode active. Operations stay local to the preview.");
  const [isPending, startTransition] = useTransition();

  const brief = useMemo(() => {
    const newCount = dashboard.bookings.filter((booking) => booking.status === "new").length;
    const unassigned = dashboard.trips.filter((trip) => !trip.assignedGuides.length).length;
    return `${newCount} new request${newCount === 1 ? "" : "s"}, ${dashboard.trips.length} trip holds, ${unassigned} needing guide coverage.`;
  }, [dashboard]);

  function run(action: () => Promise<OpsDashboard>, success: string) {
    startTransition(async () => {
      try {
        setDashboard(await action());
        setMessage(success);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Demo operation failed.");
      }
    });
  }

  function refresh() {
    run(
      () => fetch("/api/admin/dashboard", { cache: "no-store" }).then((response) => response.json()),
      "Demo dashboard refreshed.",
    );
  }

  function submitDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    run(
      () => postJson<OpsDashboard>("/api/admin/bookings", draft),
      "Demo booking added to the admin board.",
    );
    setDraft(emptyBooking);
  }

  return (
    <section className="adminOps shell">
      <div className="adminHero">
        <p className="kicker">Demo operations</p>
        <h1>Alpine Bloom admin desk</h1>
        <p>{brief}</p>
        <button className="adminButton" type="button" onClick={refresh} disabled={isPending}>
          {isPending ? "Working..." : "Refresh"}
        </button>
      </div>

      <div className="adminNotice">{message}</div>

      <div className="adminGrid">
        <form className="adminPanel" onSubmit={submitDraft}>
          <div className="adminPanelHead">
            <h2>Create request</h2>
            <span>Preview only</span>
          </div>
          <Field label="Traveler">
            <input
              value={draft.fullName}
              onChange={(event) => setDraft({ ...draft, fullName: event.target.value })}
              required
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={draft.email}
              onChange={(event) => setDraft({ ...draft, email: event.target.value })}
              required
            />
          </Field>
          <Field label="Route">
            <select
              value={draft.routeSlug}
              onChange={(event) => setDraft({ ...draft, routeSlug: event.target.value })}
            >
              {routeOptions.map((route) => (
                <option key={route.slug} value={route.slug}>
                  {route.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Departure">
            <input
              value={draft.departureWindow}
              onChange={(event) => setDraft({ ...draft, departureWindow: event.target.value })}
              placeholder="October 2026"
              required
            />
          </Field>
          <Field label="Group size">
            <input
              value={draft.groupSize}
              onChange={(event) => setDraft({ ...draft, groupSize: event.target.value })}
              required
            />
          </Field>
          <Field label="Style">
            <input
              value={draft.style}
              onChange={(event) => setDraft({ ...draft, style: event.target.value })}
              required
            />
          </Field>
          <Field label="Notes">
            <textarea
              value={draft.notes}
              onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
              rows={4}
            />
          </Field>
          <button className="adminButton wide" type="submit" disabled={isPending}>
            Add demo request
          </button>
        </form>

        <div className="adminPanel spanTwo">
          <div className="adminPanelHead">
            <h2>Pipeline</h2>
            <span>{dashboard.provider}</span>
          </div>
          <div className="pipelineGrid">
            {stages.map((stage) => (
              <div className="pipelineColumn" key={stage.id}>
                <h3>{stage.label}</h3>
                {dashboard.bookings
                  .filter((booking) => booking.pipelineStage === stage.id)
                  .map((booking) => (
                    <article className="leadCard" key={booking.id}>
                      <strong>{booking.fullName}</strong>
                      <span>{routeName(booking.routeSlug)}</span>
                      <small>{booking.departureWindow}</small>
                      <div className="leadActions">
                        <button
                          type="button"
                          onClick={() =>
                            run(
                              () =>
                                patchJson<OpsDashboard>(`/api/admin/bookings/${booking.id}`, {
                                  pipelineStage: stage.id === "proposal" ? "scheduled" : "proposal",
                                  status: stage.id === "proposal" ? "confirmed" : "proposal_sent",
                                }),
                              "Lead moved in the demo pipeline.",
                            )
                          }
                        >
                          Move
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            run(
                              () => postJson<OpsDashboard>("/api/admin/trips", { bookingId: booking.id }),
                              "Trip hold created from demo lead.",
                            )
                          }
                        >
                          Hold
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="adminGrid lower">
        <div className="adminPanel">
          <div className="adminPanelHead">
            <h2>Guide roster</h2>
            <span>{dashboard.guides.length} active</span>
          </div>
          <div className="guideList">
            {dashboard.guides.map((guide) => (
              <article key={guide.id}>
                <strong>{guide.name}</strong>
                <span>{guide.role}</span>
                <small>{guide.regions.join(", ")}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="adminPanel spanTwo">
          <div className="adminPanelHead">
            <h2>Trip holds</h2>
            <span>{dashboard.generatedAt.slice(0, 10)}</span>
          </div>
          <div className="tripGrid">
            {dashboard.trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                guides={dashboard.guides}
                onAssign={(tripId, guideId) =>
                  run(
                    () => postJson<OpsDashboard>("/api/admin/assignments", { tripId, guideId }),
                    "Guide assigned in demo mode.",
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className="adminPanel">
          <div className="adminPanelHead">
            <h2>Conflict watch</h2>
            <span>{dashboard.conflicts.length} item{dashboard.conflicts.length === 1 ? "" : "s"}</span>
          </div>
          <div className="guideList">
            {dashboard.conflicts.length ? (
              dashboard.conflicts.map((conflict) => (
                <article key={`${conflict.guideId}-${conflict.tripId ?? conflict.startDate}`}>
                  <strong>{conflict.guideName}</strong>
                  <span>{conflict.tripName ?? "Guide availability"}</span>
                  <small>
                    {conflict.startDate} to {conflict.endDate}. {conflict.reason}
                  </small>
                </article>
              ))
            ) : (
              <article>
                <strong>No conflicts showing</strong>
                <span>Guide assignments are clean in this preview.</span>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
