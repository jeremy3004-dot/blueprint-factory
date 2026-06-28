"use client";

import { useMemo, useState, useTransition } from "react";
import type { DragEvent } from "react";

import { routeOptions } from "@/data/ops-demo";
import type { AdminIdentity } from "@/lib/admin-auth";
import type {
  BookingFormValues,
  BookingRequestStatus,
  OpsBookingRequest,
  OpsDashboard,
  OpsGuide,
  OpsTrip,
  PipelineStage,
} from "@/lib/ops-types";

type WorkspaceTab = "create" | "pipeline" | "calendar" | "guides";
type Message = { tone: "info" | "success" | "error"; text: string };
type GuideDraft = Omit<OpsGuide, "id" | "regions" | "languages"> & {
  regions: string;
  languages: string;
};

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

const emptyGuide: GuideDraft = {
  name: "",
  role: "Lead women-only trekking guide",
  regions: "Annapurna, Everest",
  languages: "Nepali, English",
  active: true,
};

const stages: Array<{ id: PipelineStage; label: string; hint: string }> = [
  { id: "first_contact", label: "First contact", hint: "New inquiry or first reply due" },
  { id: "qualified", label: "Qualified", hint: "Dates, route, group fit checked" },
  { id: "proposal", label: "Proposal", hint: "Custom plan being prepared" },
  { id: "scheduled", label: "Scheduled", hint: "Dates held and guide cover next" },
  { id: "on_trek", label: "On trek", hint: "Team is in the field" },
  { id: "completed", label: "Completed", hint: "Follow-up and review due" },
  { id: "lost", label: "Lost", hint: "Closed without booking" },
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

function compactDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(`${value}T00:00:00`),
  );
}

function splitList(value: string) {
  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function endDateForCalendar(value: string) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

async function requestJson<T>(
  path: string,
  method: "DELETE" | "GET" | "PATCH" | "POST",
  body?: unknown,
) {
  const response = await fetch(path, {
    method,
    headers: body === undefined ? undefined : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message ?? "Demo operation failed.");
  }

  return payload as T;
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="adminStat">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export function AdminOpsBoard({
  identity,
  initialDashboard,
}: {
  identity: AdminIdentity;
  initialDashboard: OpsDashboard;
}) {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [bookingDraft, setBookingDraft] = useState(emptyBooking);
  const [guideDraft, setGuideDraft] = useState(emptyGuide);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("pipeline");
  const [dragGuideId, setDragGuideId] = useState<string | null>(null);
  const [dragBookingId, setDragBookingId] = useState<string | null>(null);
  const [message, setMessage] = useState<Message>({
    tone: "info",
    text: "Demo mode active. Drag women traveler leads across the pipeline or drag women guides onto trip cards.",
  });
  const [isPending, startTransition] = useTransition();

  const brief = useMemo(() => {
    const firstContact = dashboard.bookings.filter(
      (booking) => booking.pipelineStage === "first_contact",
    ).length;
    const scheduled = dashboard.bookings.filter(
      (booking) => booking.pipelineStage === "scheduled",
    ).length;
    const unassigned = dashboard.trips.filter((trip) => !trip.assignedGuides.length).length;
    return `${firstContact} first-contact women traveler lead${firstContact === 1 ? "" : "s"}, ${scheduled} women-only departures scheduled, ${unassigned} needing women guide coverage.`;
  }, [dashboard]);
  const tripByBookingId = useMemo(
    () => new Map(dashboard.trips.map((trip) => [trip.requestId, trip])),
    [dashboard.trips],
  );

  function run(action: () => Promise<OpsDashboard>, success: string) {
    startTransition(async () => {
      try {
        setDashboard(await action());
        setMessage({ tone: "success", text: success });
      } catch (error) {
        setMessage({
          tone: "error",
          text: error instanceof Error ? error.message : "Demo operation failed.",
        });
      }
    });
  }

  function refresh() {
    run(
      () => requestJson<OpsDashboard>("/api/admin/dashboard", "GET"),
      "Demo dashboard refreshed.",
    );
  }

  function moveBooking(bookingId: string, pipelineStage: PipelineStage) {
    run(
      () =>
        requestJson<OpsDashboard>(`/api/admin/bookings/${bookingId}`, "PATCH", {
          pipelineStage,
          status: statusByStage[pipelineStage],
        }),
      `Lead moved to ${stages.find((stage) => stage.id === pipelineStage)?.label}.`,
    );
  }

  function assignGuide(tripId: string, guideId: string) {
    run(
      () => requestJson<OpsDashboard>("/api/admin/assignments", "POST", { tripId, guideId }),
      "Guide assigned to the departure.",
    );
  }

  function removeAssignment(assignmentId: string) {
    run(
      () => requestJson<OpsDashboard>(`/api/admin/assignments/${assignmentId}`, "DELETE"),
      "Guide assignment removed.",
    );
  }

  function createTrip(bookingId: string) {
    run(
      () => requestJson<OpsDashboard>("/api/admin/trips", "POST", { bookingId }),
      "Trip hold created from the lead.",
    );
  }

  function submitBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    run(
      () => requestJson<OpsDashboard>("/api/admin/bookings", "POST", bookingDraft),
      "Demo booking added to the board.",
    );
    setBookingDraft(emptyBooking);
    setActiveTab("pipeline");
  }

  function submitGuide(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    run(
      () =>
        requestJson<OpsDashboard>("/api/admin/guides", "POST", {
          ...guideDraft,
          regions: splitList(guideDraft.regions),
          languages: splitList(guideDraft.languages),
        }),
      "Guide added to the roster.",
    );
    setGuideDraft(emptyGuide);
    setActiveTab("guides");
  }

  function updateGuide(guide: OpsGuide, draft: GuideDraft) {
    run(
      () =>
        requestJson<OpsDashboard>(`/api/admin/guides/${guide.id}`, "PATCH", {
          ...draft,
          regions: splitList(draft.regions),
          languages: splitList(draft.languages),
        }),
      `${guide.name} updated.`,
    );
  }

  function onPipelineDrop(event: DragEvent<HTMLElement>, stage: PipelineStage) {
    event.preventDefault();
    const bookingId =
      event.dataTransfer.getData("application/x-booking-id") ||
      event.dataTransfer.getData("text/plain") ||
      dragBookingId;

    if (bookingId) moveBooking(bookingId, stage);
    setDragBookingId(null);
  }

  function onTripDrop(event: DragEvent<HTMLElement>, tripId: string) {
    event.preventDefault();
    event.stopPropagation();
    const guideId =
      event.dataTransfer.getData("application/x-guide-id") ||
      event.dataTransfer.getData("text/plain") ||
      dragGuideId;

    if (guideId) assignGuide(tripId, guideId);
    setDragGuideId(null);
  }

  return (
    <section className="adminOps shell">
      <div className="adminHero">
        <div>
          <p className="kicker">Demo operations</p>
          <h1>Alpine Bloom admin desk</h1>
          <p>{brief}</p>
        </div>
        <div className="adminIdentityCard">
          <span>Signed in</span>
          <strong>{identity.email}</strong>
          <small>{identity.role.replace("_", " ")} · {identity.source.replace("-", " ")}</small>
          <form action="/api/admin/logout" method="post">
            <button type="submit">Log out</button>
          </form>
        </div>
        <button className="adminButton" type="button" onClick={refresh} disabled={isPending}>
          {isPending ? "Working..." : "Refresh"}
        </button>
      </div>

      <div className="adminStats">
        <StatCard label="Women leads" value={String(dashboard.bookings.length)} />
        <StatCard label="Women-only trips" value={String(dashboard.trips.length)} />
        <StatCard label="Women guides" value={String(dashboard.guides.filter((guide) => guide.active).length)} />
        <StatCard label="Conflicts" value={String(dashboard.conflicts.length)} />
      </div>

      <div className={`adminNotice ${message.tone}`}>{message.text}</div>

      <div className="adminWorkspaceTabs" aria-label="Admin workspace">
        {[
          ["create", "Create"],
          ["pipeline", "Pipeline"],
          ["calendar", "Calendar"],
          ["guides", "Guides"],
        ].map(([id, label]) => (
          <button
            className={activeTab === id ? "active" : ""}
            key={id}
            type="button"
            onClick={() => setActiveTab(id as WorkspaceTab)}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "create" ? (
        <div className="adminGrid">
          <form className="adminPanel" onSubmit={submitBooking}>
            <div className="adminPanelHead">
              <h2>Create request</h2>
              <span>Women traveler intake</span>
            </div>
            <Field label="Woman traveler">
              <input value={bookingDraft.fullName} onChange={(event) => setBookingDraft({ ...bookingDraft, fullName: event.target.value })} required />
            </Field>
            <Field label="Email">
              <input type="email" value={bookingDraft.email} onChange={(event) => setBookingDraft({ ...bookingDraft, email: event.target.value })} required />
            </Field>
            <Field label="Route">
              <select value={bookingDraft.routeSlug} onChange={(event) => setBookingDraft({ ...bookingDraft, routeSlug: event.target.value })}>
                {routeOptions.map((route) => <option key={route.slug} value={route.slug}>{route.name}</option>)}
              </select>
            </Field>
            <Field label="Departure">
              <input value={bookingDraft.departureWindow} onChange={(event) => setBookingDraft({ ...bookingDraft, departureWindow: event.target.value })} required />
            </Field>
            <Field label="Group size">
              <input value={bookingDraft.groupSize} onChange={(event) => setBookingDraft({ ...bookingDraft, groupSize: event.target.value })} required />
            </Field>
            <Field label="Style">
              <input value={bookingDraft.style} onChange={(event) => setBookingDraft({ ...bookingDraft, style: event.target.value })} required />
            </Field>
            <Field label="Notes">
              <textarea value={bookingDraft.notes} onChange={(event) => setBookingDraft({ ...bookingDraft, notes: event.target.value })} rows={4} />
            </Field>
            <button className="adminButton wide" type="submit" disabled={isPending}>
              Add request
            </button>
          </form>

          <form className="adminPanel" onSubmit={submitGuide}>
            <div className="adminPanelHead">
              <h2>Add guide</h2>
              <span>Women guide roster</span>
            </div>
            <Field label="Guide">
              <input value={guideDraft.name} onChange={(event) => setGuideDraft({ ...guideDraft, name: event.target.value })} required />
            </Field>
            <Field label="Role">
              <input value={guideDraft.role} onChange={(event) => setGuideDraft({ ...guideDraft, role: event.target.value })} required />
            </Field>
            <Field label="Regions">
              <input value={guideDraft.regions} onChange={(event) => setGuideDraft({ ...guideDraft, regions: event.target.value })} />
            </Field>
            <Field label="Languages">
              <input value={guideDraft.languages} onChange={(event) => setGuideDraft({ ...guideDraft, languages: event.target.value })} />
            </Field>
            <label className="adminCheck">
              <input type="checkbox" checked={guideDraft.active} onChange={(event) => setGuideDraft({ ...guideDraft, active: event.target.checked })} />
              Active for assignments
            </label>
            <button className="adminButton wide" type="submit" disabled={isPending}>
              Add guide
            </button>
          </form>

          <AdminBrief dashboard={dashboard} />
        </div>
      ) : null}

      {activeTab === "pipeline" ? (
        <div className="adminOpsLayout">
          <section className="adminPanel spanWide">
            <div className="adminPanelHead">
              <h2>Women traveler pipeline</h2>
              <span>Drag cards</span>
            </div>
            <div className="pipelineGrid">
              {stages.map((stage) => (
                <div
                  className="pipelineColumn"
                  data-active={Boolean(dragBookingId)}
                  key={stage.id}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => onPipelineDrop(event, stage.id)}
                >
                  <div className="pipelineHeader">
                    <h3>{stage.label}</h3>
                    <span>{dashboard.bookings.filter((booking) => booking.pipelineStage === stage.id).length}</span>
                  </div>
                  <p>{stage.hint}</p>
                  {dashboard.bookings
                    .filter((booking) => booking.pipelineStage === stage.id)
                    .map((booking) => (
                      <LeadCard
                        booking={booking}
                        key={booking.id}
                        trip={tripByBookingId.get(booking.id)}
                        onCreateTrip={createTrip}
                        onDragStart={setDragBookingId}
                        onTripDrop={onTripDrop}
                      />
                    ))}
                </div>
              ))}
            </div>
          </section>

          <aside className="adminSideStack">
            <GuideRoster guides={dashboard.guides} onDragStart={setDragGuideId} />
            <ConflictWatch dashboard={dashboard} />
          </aside>
        </div>
      ) : null}

      {activeTab === "calendar" ? (
        <CalendarWorkspace
          dashboard={dashboard}
          dragGuideId={dragGuideId}
          onDragGuide={setDragGuideId}
          onRemoveAssignment={removeAssignment}
          onTripDrop={onTripDrop}
        />
      ) : null}

      {activeTab === "guides" ? (
        <GuideWorkspace dashboard={dashboard} onUpdate={updateGuide} />
      ) : null}
    </section>
  );
}

function LeadCard({
  booking,
  trip,
  onCreateTrip,
  onDragStart,
  onTripDrop,
}: {
  booking: OpsBookingRequest;
  trip?: OpsTrip;
  onCreateTrip: (bookingId: string) => void;
  onDragStart: (bookingId: string) => void;
  onTripDrop: (event: DragEvent<HTMLElement>, tripId: string) => void;
}) {
  return (
    <article
      className="leadCard draggable"
      draggable
      onDragEnd={() => onDragStart("")}
      onDragStart={(event) => {
        event.dataTransfer.setData("application/x-booking-id", booking.id);
        event.dataTransfer.setData("text/plain", booking.id);
        onDragStart(booking.id);
      }}
    >
      <strong>{booking.fullName}</strong>
      <span>{routeName(booking.routeSlug)}</span>
      <small>{booking.departureWindow} · {booking.groupSize} women</small>
      {trip ? (
        <div
          className="leadTripDrop"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => onTripDrop(event, trip.id)}
        >
          <span>{compactDate(trip.startDate)} to {compactDate(trip.endDate)}</span>
          <small>{trip.assignedGuides.length ? `${trip.assignedGuides.length} guide assigned` : "Drop guide here"}</small>
        </div>
      ) : (
        <button type="button" className="adminGhostButton" onClick={() => onCreateTrip(booking.id)}>
          Create trip hold
        </button>
      )}
    </article>
  );
}

function GuideRoster({
  guides,
  onDragStart,
}: {
  guides: OpsGuide[];
  onDragStart: (guideId: string | null) => void;
}) {
  return (
    <section className="adminPanel">
      <div className="adminPanelHead">
        <h2>Women guide roster</h2>
        <span>Drag to assign</span>
      </div>
      <div className="guideList">
        {guides.map((guide) => (
          <article
            className="draggable"
            draggable={guide.active}
            key={guide.id}
            onDragEnd={() => onDragStart(null)}
            onDragStart={(event) => {
              event.dataTransfer.setData("application/x-guide-id", guide.id);
              event.dataTransfer.setData("text/plain", guide.id);
              onDragStart(guide.id);
            }}
          >
            <strong>{guide.name}</strong>
            <span>{guide.role}</span>
            <small>{guide.regions.join(", ")} · {guide.languages.join(" / ")}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminBrief({ dashboard }: { dashboard: OpsDashboard }) {
  return (
    <aside className="adminPanel">
      <div className="adminPanelHead">
        <h2>Ops brief</h2>
        <span>{dashboard.generatedAt.slice(0, 10)}</span>
      </div>
      <p className="adminModeNote">
        Keep first-contact women traveler leads moving, convert scheduled leads into trip holds,
        and drag active women guides onto the women-only departures that need coverage.
      </p>
    </aside>
  );
}

function ConflictWatch({ dashboard }: { dashboard: OpsDashboard }) {
  return (
    <section className="adminPanel">
      <div className="adminPanelHead">
        <h2>Conflict watch</h2>
        <span>{dashboard.conflicts.length}</span>
      </div>
      <div className="guideList">
        {dashboard.conflicts.length ? (
          dashboard.conflicts.map((conflict) => (
            <article key={`${conflict.guideId}-${conflict.tripId ?? conflict.startDate}`}>
              <strong>{conflict.guideName}</strong>
              <span>{conflict.tripName ?? "Guide availability"}</span>
              <small>{conflict.startDate} to {conflict.endDate}. {conflict.reason}</small>
            </article>
          ))
        ) : (
          <article>
            <strong>No conflicts showing</strong>
            <span>Guide assignments are clean in this preview.</span>
          </article>
        )}
      </div>
    </section>
  );
}

function CalendarWorkspace({
  dashboard,
  dragGuideId,
  onDragGuide,
  onRemoveAssignment,
  onTripDrop,
}: {
  dashboard: OpsDashboard;
  dragGuideId: string | null;
  onDragGuide: (guideId: string | null) => void;
  onRemoveAssignment: (assignmentId: string) => void;
  onTripDrop: (event: DragEvent<HTMLElement>, tripId: string) => void;
}) {
  const year = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(year, index, 1);
    return {
      index,
      label: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
      trips: dashboard.trips.filter((trip) => {
        const startDate = new Date(`${trip.startDate}T00:00:00`);
        return startDate.getFullYear() === year && startDate.getMonth() === index;
      }),
    };
  });
  const calendarEvents = dashboard.trips.map((trip) => ({
    ...trip,
    calendarEnd: endDateForCalendar(trip.endDate),
  }));

  return (
    <div className="adminCalendarLayout">
      <section className="adminPanel spanWide">
        <div className="adminPanelHead">
          <h2>Departure calendar</h2>
          <span>{year}</span>
        </div>
        <div className="adminCalendar">
          {months.map((month) => (
            <div className="calendarMonth" key={month.label}>
              <div>
                <strong>{month.label}</strong>
                <span>{month.trips.length}</span>
              </div>
              {month.trips.length ? (
                month.trips.map((trip) => (
                  <TripScheduleCard
                    dragGuideId={dragGuideId}
                    key={trip.id}
                    onRemoveAssignment={onRemoveAssignment}
                    onTripDrop={onTripDrop}
                    trip={trip}
                  />
                ))
              ) : (
                <p>No departures.</p>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="adminPanel">
        <div className="adminPanelHead">
          <h2>Trip spans</h2>
          <span>{calendarEvents.length}</span>
        </div>
        <div className="calendarEventList">
          {calendarEvents.map((trip) => (
            <article
              key={trip.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => onTripDrop(event, trip.id)}
            >
              <strong>{trip.name}</strong>
              <span>{trip.startDate} to {trip.calendarEnd}</span>
              <small>{trip.assignedGuides.length} guide{trip.assignedGuides.length === 1 ? "" : "s"} · {trip.status}</small>
            </article>
          ))}
        </div>
      </section>
      <GuideRoster guides={dashboard.guides} onDragStart={onDragGuide} />
    </div>
  );
}

function TripScheduleCard({
  dragGuideId,
  onRemoveAssignment,
  onTripDrop,
  trip,
}: {
  dragGuideId: string | null;
  onRemoveAssignment: (assignmentId: string) => void;
  onTripDrop: (event: DragEvent<HTMLElement>, tripId: string) => void;
  trip: OpsTrip;
}) {
  return (
    <article
      className="tripScheduleCard"
      data-active={Boolean(dragGuideId)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => onTripDrop(event, trip.id)}
    >
      <strong>{trip.name}</strong>
      <span>{compactDate(trip.startDate)} to {compactDate(trip.endDate)} · {trip.status}</span>
      <div className="adminChips">
        {trip.assignedGuides.length ? (
          trip.assignedGuides.map((assignment) => (
            <button key={assignment.id} type="button" onClick={() => onRemoveAssignment(assignment.id)}>
              {assignment.guideName} ×
            </button>
          ))
        ) : (
          <span>Drop guide</span>
        )}
      </div>
    </article>
  );
}

function GuideWorkspace({
  dashboard,
  onUpdate,
}: {
  dashboard: OpsDashboard;
  onUpdate: (guide: OpsGuide, draft: GuideDraft) => void;
}) {
  return (
    <div className="guideEditGrid">
      {dashboard.guides.map((guide) => (
        <GuideEditCard key={guide.id} guide={guide} trips={dashboard.trips} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

function GuideEditCard({
  guide,
  trips,
  onUpdate,
}: {
  guide: OpsGuide;
  trips: OpsTrip[];
  onUpdate: (guide: OpsGuide, draft: GuideDraft) => void;
}) {
  const [draft, setDraft] = useState<GuideDraft>({
    active: guide.active,
    languages: guide.languages.join(", "),
    name: guide.name,
    regions: guide.regions.join(", "),
    role: guide.role,
  });
  const assignments = trips.flatMap((trip) =>
    trip.assignedGuides
      .filter((assignment) => assignment.guideId === guide.id)
      .map((assignment) => ({ assignment, trip })),
  );

  return (
    <article className="adminPanel">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onUpdate(guide, draft);
        }}
      >
        <div className="adminPanelHead">
          <h2>{guide.name}</h2>
          <span>{guide.active ? "active" : "inactive"}</span>
        </div>
        <Field label="Name">
          <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
        </Field>
        <Field label="Role">
          <input value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} />
        </Field>
        <Field label="Regions">
          <input value={draft.regions} onChange={(event) => setDraft({ ...draft, regions: event.target.value })} />
        </Field>
        <Field label="Languages">
          <input value={draft.languages} onChange={(event) => setDraft({ ...draft, languages: event.target.value })} />
        </Field>
        <label className="adminCheck">
          <input type="checkbox" checked={draft.active} onChange={(event) => setDraft({ ...draft, active: event.target.checked })} />
          Active for assignments
        </label>
        <button className="adminButton wide" type="submit">Save guide</button>
      </form>
      <div className="guideList">
        {assignments.length ? (
          assignments.map(({ assignment, trip }) => (
            <article key={assignment.id}>
              <strong>{trip.name}</strong>
              <span>{compactDate(assignment.startDate)} to {compactDate(assignment.endDate)}</span>
            </article>
          ))
        ) : (
          <article>
            <strong>No assignments yet</strong>
            <span>Drag this guide onto a trip card.</span>
          </article>
        )}
      </div>
    </article>
  );
}
