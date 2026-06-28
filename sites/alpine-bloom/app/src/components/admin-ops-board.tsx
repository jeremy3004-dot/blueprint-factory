"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { DragEvent } from "react";

import { routeOptions } from "@/data/ops-demo";
import type { AdminIdentity } from "@/lib/admin-auth";
import { analytics } from "@/lib/analytics";
import type { AssistedBookingDraft, AssistedGuideDraft } from "@/lib/ops-ai";
import { isWomenOnlyGuideText, sanitizeWomenGuideText, validRouteSlug } from "@/lib/ops-ai";
import type {
  BookingFormValues,
  BookingRequestStatus,
  OpsBookingRequest,
  OpsDashboard,
  OpsGuide,
  OpsReadiness,
  OpsTrip,
  PipelineStage,
} from "@/lib/ops-types";

type WorkspaceTab = "create" | "pipeline" | "calendar" | "guides";
type Message = { tone: "info" | "success" | "error"; text: string };
type AssistMode = "booking" | "guide";
type GuideDraft = {
  name: string;
  role: string;
  focus: string;
  regions: string;
  languages: string;
  certifications: string;
  specialties: string;
  bio: string;
  active: boolean;
};

type DictationRecognition = {
  lang: string;
  interimResults: boolean;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult:
    | ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void)
    | null;
  start: () => void;
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
  focus: "Women-only Himalayan pacing, route confidence, and supportive trail care.",
  regions: "Annapurna, Everest",
  languages: "Nepali, English",
  certifications: "Licensed women trekking guide",
  specialties: "First Himalayan trek, Altitude confidence",
  bio: "A Nepali woman guide for small Alpine Bloom departures.",
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

function fieldAfter(text: string, labels: string[]) {
  for (const label of labels) {
    const pattern = new RegExp(`${label}\\s*[:\\-]\\s*([^\\n;]+)`, "i");
    const match = text.match(pattern)?.[1]?.trim();

    if (match) return match;

    const loosePattern = new RegExp(`${label}\\s+([^,.;\\n]+)`, "i");
    const looseMatch = text.match(loosePattern)?.[1]?.trim();

    if (looseMatch) return looseMatch;
  }

  return "";
}

function detectEmail(text: string) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
}

function detectRouteSlug(text: string) {
  const normalized = text.toLowerCase();
  return routeOptions.find(
    (route) =>
      normalized.includes(route.name.toLowerCase()) ||
      normalized.includes(route.slug.replace(/-/g, " ")),
  )?.slug;
}

function joinWomenOnlyList(values: string[] | undefined, fallback: string) {
  const safeValues = values?.filter(isWomenOnlyGuideText) ?? [];

  return safeValues.length ? safeValues.join(", ") : fallback;
}

function mergeAssistedBookingDraft(
  current: BookingFormValues,
  draft: AssistedBookingDraft,
  fallbackText: string,
): BookingFormValues {
  return {
    ...current,
    fullName: draft.fullName || current.fullName,
    email: draft.email || current.email || detectEmail(fallbackText),
    departureWindow: draft.departureWindow || current.departureWindow,
    routeSlug:
      draft.routeSlug && validRouteSlug(draft.routeSlug)
        ? draft.routeSlug
        : detectRouteSlug(fallbackText) || current.routeSlug,
    groupSize: draft.groupSize || current.groupSize,
    style: draft.style || current.style,
    addons: draft.addons?.length ? draft.addons : current.addons,
    notes: draft.notes || fallbackText.trim() || current.notes,
  };
}

function mergeAssistedGuideDraft(current: GuideDraft, draft: AssistedGuideDraft): GuideDraft {
  return {
    ...current,
    name: draft.name || current.name,
    role: sanitizeWomenGuideText(draft.role ?? "", current.role),
    regions: joinWomenOnlyList(draft.regions, current.regions),
    languages: joinWomenOnlyList(draft.languages, current.languages),
    certifications: joinWomenOnlyList(draft.certifications, current.certifications),
  };
}

function inferBookingDraft(text: string, current: BookingFormValues): BookingFormValues {
  return mergeAssistedBookingDraft(
    current,
    {
      fullName: fieldAfter(text, ["name", "traveler", "woman traveler", "client"]),
      email: detectEmail(text),
      departureWindow: fieldAfter(text, ["departure", "window", "dates", "season"]),
      routeSlug: detectRouteSlug(text) ?? "",
      groupSize: fieldAfter(text, ["group size", "group", "travelers"]),
      style: fieldAfter(text, ["style", "trip style", "pace"]),
      addons: splitList(fieldAfter(text, ["addons", "add-ons", "support"])),
      notes: text.trim(),
    },
    text,
  );
}

function inferGuideDraft(text: string, current: GuideDraft): GuideDraft {
  const certifications = splitList(
    fieldAfter(text, ["certifications", "certs", "licenses"]),
  ).filter(isWomenOnlyGuideText);

  return mergeAssistedGuideDraft(current, {
    name: fieldAfter(text, ["name", "guide"]),
    role: fieldAfter(text, ["role", "title", "position"]) || "Women-only trekking guide",
    regions: splitList(fieldAfter(text, ["regions", "routes", "specialties", "areas"])).filter(
      isWomenOnlyGuideText,
    ),
    languages: splitList(fieldAfter(text, ["languages", "speaks"])).filter(isWomenOnlyGuideText),
    certifications: certifications.length ? certifications : ["Licensed women trekking guide"],
  });
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
  initialBrief,
  initialDashboard,
  readiness,
}: {
  identity: AdminIdentity;
  initialBrief: string;
  initialDashboard: OpsDashboard;
  readiness: OpsReadiness;
}) {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [opsBrief, setOpsBrief] = useState(initialBrief);
  const [bookingDraft, setBookingDraft] = useState(emptyBooking);
  const [guideDraft, setGuideDraft] = useState(emptyGuide);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("pipeline");
  const [dragGuideId, setDragGuideId] = useState<string | null>(null);
  const [dragBookingId, setDragBookingId] = useState<string | null>(null);
  const [message, setMessage] = useState<Message>({
    tone: readiness.connected ? "success" : "info",
    text: readiness.connected
      ? "Ops backend connected. Admin changes are durable."
      : "Setup required. Preview data is visible, but admin writes need the ops backend before they save.",
  });
  const [isPending, startTransition] = useTransition();
  const setupRequired = !readiness.connected;

  useEffect(() => {
    analytics.adminViewed();
  }, []);

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

  function run(
    action: () => Promise<OpsDashboard>,
    success: string,
    options: { onSuccess?: () => void; requiresBackend?: boolean } = {},
  ) {
    const requiresBackend = options.requiresBackend ?? true;

    if (requiresBackend && setupRequired) {
      setMessage({
        tone: "error",
        text: "Ops backend setup required before admin changes can be saved.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const nextDashboard = await action();
        setDashboard(nextDashboard);
        setOpsBrief("Brief needs refresh after the latest board change.");
        setMessage({ tone: "success", text: success });
        options.onSuccess?.();
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
      setupRequired ? "Setup preview refreshed." : "Ops dashboard refreshed.",
      { requiresBackend: false },
    );
  }

  function refreshBrief() {
    startTransition(async () => {
      try {
        const payload = await requestJson<{ brief: string }>("/api/admin/brief", "GET");
        setOpsBrief(payload.brief);
        setMessage({ tone: "success", text: "Ops brief refreshed." });
      } catch (error) {
        setMessage({
          tone: "error",
          text: error instanceof Error ? error.message : "Ops brief refresh failed.",
        });
      }
    });
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
      {
        onSuccess: () => {
          setBookingDraft(emptyBooking);
          setActiveTab("pipeline");
        },
      },
    );
  }

  function submitGuide(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    run(
      () =>
        requestJson<OpsDashboard>("/api/admin/guides", "POST", {
          ...guideDraft,
          regions: splitList(guideDraft.regions),
          languages: splitList(guideDraft.languages),
          certifications: splitList(guideDraft.certifications),
          specialties: splitList(guideDraft.specialties),
        }),
      "Guide added to the roster.",
      {
        onSuccess: () => {
          setGuideDraft(emptyGuide);
          setActiveTab("guides");
        },
      },
    );
  }

  function updateGuide(guide: OpsGuide, draft: GuideDraft) {
    run(
      () =>
        requestJson<OpsDashboard>(`/api/admin/guides/${guide.id}`, "PATCH", {
          ...draft,
          regions: splitList(draft.regions),
          languages: splitList(draft.languages),
          certifications: splitList(draft.certifications),
          specialties: splitList(draft.specialties),
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
          <p className="kicker">{setupRequired ? "Setup required" : "Connected operations"}</p>
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

      <div className="adminSetupBanner" data-connected={readiness.connected}>
        <div>
          <strong>{readiness.connected ? "Ops backend connected" : "Ops backend setup required"}</strong>
          <span>
            {readiness.connected
              ? `${dashboard.tenantName} is reading durable ${dashboard.provider} operations data.`
              : "Preview data is available for review. Configure the ops backend before saving admin changes."}
          </span>
        </div>
        <div className="adminSetupChecks">
          <span data-ok={readiness.urlConfigured}>OPS_API_URL</span>
          <span data-ok={readiness.tokenConfigured}>OPS_API_TOKEN</span>
          <span data-ok={dashboard.tenantId === "alpine-bloom"}>{dashboard.tenantId}</span>
        </div>
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
          <AdminAssistPanel
            bookingDraft={bookingDraft}
            guideDraft={guideDraft}
            onBookingDraft={setBookingDraft}
            onGuideDraft={setGuideDraft}
          />
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
            <Field label="Certifications">
              <input value={guideDraft.certifications} onChange={(event) => setGuideDraft({ ...guideDraft, certifications: event.target.value })} />
            </Field>
            <label className="adminCheck">
              <input type="checkbox" checked={guideDraft.active} onChange={(event) => setGuideDraft({ ...guideDraft, active: event.target.checked })} />
              Active for assignments
            </label>
            <button className="adminButton wide" type="submit" disabled={isPending}>
              Add guide
            </button>
          </form>

          <AdminBrief
            brief={opsBrief}
            dashboard={dashboard}
            isPending={isPending}
            onRefreshBrief={refreshBrief}
          />
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
            {guide.specialties?.length ? <small>{guide.specialties.slice(0, 2).join(" · ")}</small> : null}
            <small>{guide.regions.join(", ")} · {guide.languages.join(" / ")}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminAssistPanel({
  bookingDraft,
  guideDraft,
  onBookingDraft,
  onGuideDraft,
}: {
  bookingDraft: BookingFormValues;
  guideDraft: GuideDraft;
  onBookingDraft: (draft: BookingFormValues) => void;
  onGuideDraft: (draft: GuideDraft) => void;
}) {
  const [mode, setMode] = useState<AssistMode>("booking");
  const [assistantText, setAssistantText] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [isListening, setIsListening] = useState(false);

  async function applyAssistant() {
    if (!assistantText.trim()) return;

    setIsDrafting(true);

    try {
      const response = await fetch("/api/admin/draft", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode, text: assistantText }),
      });
      const payload = (await response.json().catch(() => null)) as {
        draft?: AssistedBookingDraft | AssistedGuideDraft | null;
      } | null;

      if (!response.ok) {
        const message =
          payload && typeof payload === "object" && "message" in payload
            ? String((payload as { message?: unknown }).message)
            : "Draft assist failed.";
        throw new Error(message);
      }

      if (payload?.draft) {
        if (mode === "booking") {
          onBookingDraft(
            mergeAssistedBookingDraft(
              bookingDraft,
              payload.draft as AssistedBookingDraft,
              assistantText,
            ),
          );
        } else {
          onGuideDraft(mergeAssistedGuideDraft(guideDraft, payload.draft as AssistedGuideDraft));
        }

        return;
      }
    } catch {
      // The local deterministic extractor below is the intended no-key fallback.
    } finally {
      setIsDrafting(false);
    }

    if (mode === "booking") {
      onBookingDraft(inferBookingDraft(assistantText, bookingDraft));
    } else {
      onGuideDraft(inferGuideDraft(assistantText, guideDraft));
    }
  }

  function startDictation() {
    const SpeechRecognition =
      typeof window !== "undefined"
        ? ((window as unknown as {
            SpeechRecognition?: new () => DictationRecognition;
            webkitSpeechRecognition?: new () => DictationRecognition;
          }).SpeechRecognition ??
          (window as unknown as {
            webkitSpeechRecognition?: new () => DictationRecognition;
          }).webkitSpeechRecognition)
        : undefined;

    if (!SpeechRecognition) {
      setAssistantText((text) =>
        text || "Dictation is not available in this browser. Paste women traveler or guide notes here instead.",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();

      setAssistantText((text) => [text, transcript].filter(Boolean).join(" "));
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    setIsListening(true);
    recognition.start();
  }

  return (
    <section className="adminPanel adminAssistPanel">
      <div className="adminPanelHead">
        <div>
          <h2>AI assist</h2>
          <span>Paste or dictate women-only intake notes</span>
        </div>
        <div className="adminAssistToggle">
          <button
            className={mode === "booking" ? "active" : ""}
            type="button"
            onClick={() => setMode("booking")}
          >
            Booking
          </button>
          <button
            className={mode === "guide" ? "active" : ""}
            type="button"
            onClick={() => setMode("guide")}
          >
            Guide
          </button>
        </div>
      </div>
      <textarea
        value={assistantText}
        onChange={(event) => setAssistantText(event.target.value)}
        placeholder={
          mode === "booking"
            ? "Example: Name Priya Shah, priya@example.com, 2 women, Mardi Himal, October 2026, private comfort trek, wants altitude reassurance and a Nepali woman guide."
            : "Example: Name Asha Rai, role Annapurna confidence coach, regions Poon Hill and Mardi Himal, languages Nepali and English, certifications first aid and licensed trekking guide."
        }
        rows={7}
      />
      <div className="adminAssistActions">
        <button type="button" className="adminGhostButton" onClick={startDictation}>
          {isListening ? "Listening" : "Dictate"}
        </button>
        <button
          type="button"
          className="adminButton"
          onClick={applyAssistant}
          disabled={isDrafting || !assistantText.trim()}
        >
          {isDrafting ? "Drafting..." : "Draft fields"}
        </button>
      </div>
      <p className="adminModeNote">
        Draft assist keeps examples women-only and guide profiles women-led. Unclear details stay
        in notes for ops review instead of being invented.
      </p>
    </section>
  );
}

function AdminBrief({
  brief,
  dashboard,
  isPending,
  onRefreshBrief,
}: {
  brief: string;
  dashboard: OpsDashboard;
  isPending: boolean;
  onRefreshBrief: () => void;
}) {
  return (
    <aside className="adminPanel">
      <div className="adminPanelHead">
        <h2>AI ops brief</h2>
        <span>{dashboard.generatedAt.slice(0, 10)}</span>
      </div>
      <p className="adminModeNote">{brief}</p>
      <button className="adminButton wide" type="button" onClick={onRefreshBrief} disabled={isPending}>
        Refresh brief
      </button>
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
    certifications: guide.certifications.join(", "),
    name: guide.name,
    regions: guide.regions.join(", "),
    role: guide.role,
    focus: guide.focus ?? "",
    specialties: guide.specialties?.join(", ") ?? "",
    bio: guide.bio ?? "",
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
        <Field label="Focus">
          <input value={draft.focus} onChange={(event) => setDraft({ ...draft, focus: event.target.value })} />
        </Field>
        <Field label="Regions">
          <input value={draft.regions} onChange={(event) => setDraft({ ...draft, regions: event.target.value })} />
        </Field>
        <Field label="Languages">
          <input value={draft.languages} onChange={(event) => setDraft({ ...draft, languages: event.target.value })} />
        </Field>
        <Field label="Certifications">
          <input value={draft.certifications} onChange={(event) => setDraft({ ...draft, certifications: event.target.value })} />
        </Field>
        <Field label="Specialties">
          <input value={draft.specialties} onChange={(event) => setDraft({ ...draft, specialties: event.target.value })} />
        </Field>
        <Field label="Bio">
          <textarea value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} />
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
