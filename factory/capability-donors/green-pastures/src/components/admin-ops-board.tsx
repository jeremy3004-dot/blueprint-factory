"use client";

import { useMemo, useState, useTransition } from "react";
import type { DragEvent } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {
  AlertTriangle,
  Bot,
  CalendarDays,
  CalendarRange,
  Check,
  ClipboardList,
  Columns3,
  Loader2,
  MapPinned,
  Mic,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Trash2,
  UserPlus,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";

import { trekRoutes } from "@/data/treks";
import type { AdminIdentity } from "@/lib/admin-auth";
import { adminOpsDataProvider } from "@/lib/admin-data-provider";
import type { BookingFormValues } from "@/lib/booking";
import type {
  BookingRequestStatus,
  OpsBookingRequest,
  OpsDashboard,
  OpsGuide,
  OpsTrip,
  PipelineStage,
} from "@/lib/ops-types";

type Readiness = {
  connected: boolean;
  urlConfigured: boolean;
  tokenConfigured: boolean;
};

type AdminOpsBoardProps = {
  identity: AdminIdentity;
  initialBrief: string;
  initialDashboard: OpsDashboard;
  readiness: Readiness;
};

type Toast = {
  tone: "success" | "error";
  message: string;
};

type WorkspaceTab = "create" | "pipeline" | "calendar" | "guides";

type GuideDraft = {
  name: string;
  role: string;
  gender: string;
  regions: string;
  languages: string;
  certifications: string;
  active: boolean;
};

type DictationRecognition = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type AssistedBookingDraft = Partial<Omit<BookingFormValues, "addons">> & {
  addons?: string[];
};

type AssistedGuideDraft = {
  name?: string;
  role?: string;
  gender?: string;
  regions?: string[];
  languages?: string[];
  certifications?: string[];
};

type AdminDragData =
  | { type: "booking"; bookingId: string }
  | { type: "guide"; guideId: string };

const emptyBookingDraft: BookingFormValues = {
  fullName: "",
  email: "",
  departureWindow: "",
  routeSlug: "",
  groupSize: "",
  style: "",
  addons: [],
  notes: "",
};

const emptyGuideDraft: GuideDraft = {
  name: "",
  role: "Trekking guide",
  gender: "",
  regions: "",
  languages: "English, Nepali",
  certifications: "Licensed trekking guide",
  active: true,
};

const pipelineStages: Array<{
  id: PipelineStage;
  label: string;
  hint: string;
}> = [
  { id: "first_contact", label: "First contact", hint: "New inquiry or first reply due" },
  { id: "qualified", label: "Qualified", hint: "Dates, budget, route, group fit checked" },
  { id: "proposal", label: "Proposal", hint: "Custom trek proposal in progress or sent" },
  { id: "scheduled", label: "Scheduled", hint: "Trip created, dates held, guide cover next" },
  { id: "on_trek", label: "On trek", hint: "Team is in the field" },
  { id: "completed", label: "Completed", hint: "Trip finished and follow-up due" },
  { id: "lost", label: "Lost", hint: "Closed without booking" },
];

const statusLabels: Record<BookingRequestStatus, string> = {
  new: "New",
  contacted: "Contacted",
  proposal_sent: "Proposal sent",
  confirmed: "Confirmed",
  lost: "Lost",
};

const pipelineLabels = Object.fromEntries(
  pipelineStages.map((stage) => [stage.id, stage.label]),
) as Record<PipelineStage, string>;

const tripStatusTone: Record<string, string> = {
  draft: "border-stone-500/30 bg-stone-500/10 text-stone-200",
  held: "border-amber-300/35 bg-amber-300/10 text-amber-200",
  confirmed: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
  completed: "border-sky-300/35 bg-sky-300/10 text-sky-200",
  cancelled: "border-red-300/35 bg-red-300/10 text-red-200",
};

function compactDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function addCalendarEndDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + 1);

  return date.toISOString().slice(0, 10);
}

function getMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "message" in payload) {
    return String(payload.message);
  }

  return fallback;
}

function splitList(value: string) {
  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function findRouteSlug(text: string) {
  const normalized = text.toLowerCase();
  return (
    trekRoutes.find((route) =>
      [route.name, route.slug, route.region].some((candidate) =>
        normalized.includes(candidate.toLowerCase()),
      ),
    )?.slug ?? ""
  );
}

function fieldAfter(text: string, labels: string[]) {
  const labelPattern = labels.join("|");
  const nextLabelPattern = [
    "name",
    "traveler",
    "client",
    "email",
    "route",
    "departure",
    "dates",
    "window",
    "group size",
    "travelers",
    "people",
    "pax",
    "style",
    "comfort",
    "addons",
    "add ons",
    "extras",
    "guide",
    "role",
    "title",
    "position",
    "gender",
    "guide type",
    "regions",
    "routes",
    "specialties",
    "areas",
    "languages",
    "speaks",
    "certifications",
    "certs",
    "licenses",
  ].join("|");
  const match = text.match(
    new RegExp(
      `(?:${labelPattern})\\s*(?:is|:)?\\s*(.+?)(?=(?:,\\s*(?:${nextLabelPattern})\\b)|[.;\\n]|$)`,
      "i",
    ),
  );

  return match?.[1]?.trim() ?? "";
}

function inferBookingDraft(text: string, current: BookingFormValues): BookingFormValues {
  const fullName = fieldAfter(text, ["name", "traveler", "client"]);
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
  const groupSize =
    fieldAfter(text, ["group size", "travelers", "people", "pax"]) ||
    text.match(/\b(\d{1,2})\s*(?:people|travelers|pax)\b/i)?.[1] ||
    "";
  const departureWindow =
    fieldAfter(text, ["departure", "dates", "window", "start"]) ||
    text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b/i)?.[0] ||
    text.match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0] ||
    "";
  const style = fieldAfter(text, ["style", "comfort", "trip style"]) || current.style;
  const addons = fieldAfter(text, ["addons", "add ons", "extras"]);
  const routeSlug = findRouteSlug(text);

  return {
    ...current,
    fullName: fullName || current.fullName,
    email: email || current.email,
    departureWindow: departureWindow || current.departureWindow,
    routeSlug: routeSlug || current.routeSlug,
    groupSize: groupSize || current.groupSize,
    style: style || current.style,
    addons: addons ? splitList(addons) : current.addons,
    notes: text.trim() || current.notes,
  };
}

function inferGuideDraft(text: string, current: GuideDraft): GuideDraft {
  const name = fieldAfter(text, ["name", "guide"]);
  const role = fieldAfter(text, ["role", "title", "position"]);
  const gender = fieldAfter(text, ["gender", "guide type"]);
  const regions = fieldAfter(text, ["regions", "routes", "specialties", "areas"]);
  const languages = fieldAfter(text, ["languages", "speaks"]);
  const certifications = fieldAfter(text, ["certifications", "certs", "licenses"]);

  return {
    ...current,
    name: name || current.name,
    role: role || current.role,
    gender: gender || current.gender,
    regions: regions || current.regions,
    languages: languages || current.languages,
    certifications: certifications || current.certifications,
  };
}

function mergeAssistedBookingDraft(
  current: BookingFormValues,
  draft: AssistedBookingDraft,
  fallbackText: string,
): BookingFormValues {
  return {
    ...current,
    fullName: draft.fullName || current.fullName,
    email: draft.email || current.email,
    departureWindow: draft.departureWindow || current.departureWindow,
    routeSlug: draft.routeSlug || current.routeSlug,
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
    role: draft.role || current.role,
    gender: draft.gender || current.gender,
    regions: draft.regions?.join(", ") || current.regions,
    languages: draft.languages?.join(", ") || current.languages,
    certifications: draft.certifications?.join(", ") || current.certifications,
  };
}

function statValue(dashboard: OpsDashboard) {
  const newBookings = dashboard.bookings.filter(
    (booking) => booking.pipelineStage === "first_contact",
  ).length;
  const scheduled = dashboard.bookings.filter(
    (booking) => booking.pipelineStage === "scheduled",
  ).length;
  const unassignedTrips = dashboard.trips.filter(
    (trip) => trip.assignedGuides.length === 0 && trip.status !== "cancelled",
  ).length;

  return [
    { label: "First contact", value: String(newBookings), icon: ClipboardList },
    { label: "Scheduled", value: String(scheduled), icon: CalendarDays },
    { label: "Active guides", value: String(dashboard.guides.filter((guide) => guide.active).length), icon: UsersRound },
    { label: "Needs guide", value: String(unassignedTrips), icon: UserRoundCheck },
  ];
}

export function AdminOpsBoard({
  identity,
  initialBrief,
  initialDashboard,
  readiness,
}: AdminOpsBoardProps) {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [brief, setBrief] = useState(initialBrief);
  const [draggedGuideId, setDraggedGuideId] = useState<string | null>(null);
  const [draggedBookingId, setDraggedBookingId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceTab>("create");
  const [toast, setToast] = useState<Toast | null>(null);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [isRefreshing, startRefresh] = useTransition();
  const setupRequired = dashboard.provider === "setup-required" || !readiness.connected;
  const stats = useMemo(() => statValue(dashboard), [dashboard]);
  const selectedBooking = selectedBookingId
    ? dashboard.bookings.find((booking) => booking.id === selectedBookingId)
    : undefined;
  const selectedTrip = selectedBooking
    ? dashboard.trips.find((trip) => trip.requestId === selectedBooking.id)
    : undefined;

  async function requestDashboard() {
    const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(getMessage(payload, "Dashboard refresh failed."));
    }

    setDashboard(payload as OpsDashboard);
  }

  async function mutate(
    key: string,
    path: string,
    init: RequestInit,
    successMessage: string,
    onSuccess?: (dashboard: OpsDashboard) => void,
  ) {
    setPendingKey(key);
    setToast(null);

    try {
      const { data: nextDashboard } = await adminOpsDataProvider.custom<OpsDashboard>(path, {
        method: init.method as "POST" | "PATCH" | "DELETE" | undefined,
        body: init.body ? JSON.parse(String(init.body)) : undefined,
      });
      setDashboard(nextDashboard);
      onSuccess?.(nextDashboard);
      setToast({ tone: "success", message: successMessage });
    } catch (error) {
      setToast({
        tone: "error",
        message: error instanceof Error ? error.message : "The admin action failed.",
      });
    } finally {
      setPendingKey(null);
    }
  }

  function refreshBrief() {
    startRefresh(async () => {
      setToast(null);

      try {
        const response = await fetch("/api/admin/brief", { cache: "no-store" });
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(getMessage(payload, "Brief refresh failed."));
        }

        if (payload && typeof payload === "object" && "brief" in payload) {
          setBrief(String(payload.brief));
        }
      } catch (error) {
        setToast({
          tone: "error",
          message: error instanceof Error ? error.message : "Brief refresh failed.",
        });
      }
    });
  }

  function refreshDashboard() {
    startRefresh(async () => {
      try {
        await requestDashboard();
        setToast({ tone: "success", message: "Dashboard refreshed." });
      } catch (error) {
        setToast({
          tone: "error",
          message: error instanceof Error ? error.message : "Dashboard refresh failed.",
        });
      }
    });
  }

  function assignGuide(tripId: string, guideId: string) {
    void mutate(
      `assign:${tripId}:${guideId}`,
      "/api/admin/assignments",
      {
        method: "POST",
        body: JSON.stringify({ tripId, guideId }),
      },
      "Guide assigned to trip.",
    );
  }

  function updatePipelineStage(bookingId: string, pipelineStage: PipelineStage) {
    void mutate(
      `pipeline:${bookingId}:${pipelineStage}`,
      `/api/admin/bookings/${bookingId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ pipelineStage }),
      },
      `Moved to ${pipelineLabels[pipelineStage]}.`,
    );
  }

  function createManualBooking(values: BookingFormValues) {
    void mutate(
      "create:booking",
      "/api/admin/bookings",
      {
        method: "POST",
        body: JSON.stringify(values),
      },
      "Manual booking created.",
      (nextDashboard) => {
        const newestAdminBooking = nextDashboard.bookings
          .filter((booking) => booking.source === "admin")
          .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))[0];

        setSelectedBookingId(newestAdminBooking?.id ?? null);
        setActiveWorkspace("pipeline");
      },
    );
  }

  function createTrackingGuide(values: GuideDraft) {
    void mutate(
      "create:guide",
      "/api/admin/guides",
      {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          role: values.role,
          gender: values.gender,
          regions: splitList(values.regions),
          languages: splitList(values.languages),
          certifications: splitList(values.certifications),
          active: values.active,
        }),
      },
      "Tracking guide added.",
      () => setActiveWorkspace("guides"),
    );
  }

  function updateBookingDetails(bookingId: string, values: BookingFormValues) {
    void mutate(
      `booking:update:${bookingId}`,
      `/api/admin/bookings/${bookingId}`,
      {
        method: "PATCH",
        body: JSON.stringify(values),
      },
      "Booking details updated.",
    );
  }

  function updateTrackingGuide(guideId: string, values: GuideDraft) {
    void mutate(
      `guide:update:${guideId}`,
      `/api/admin/guides/${guideId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: values.name,
          role: values.role,
          gender: values.gender,
          regions: splitList(values.regions),
          languages: splitList(values.languages),
          certifications: splitList(values.certifications),
          active: values.active,
        }),
      },
      "Guide profile updated.",
    );
  }

  function handleDragStart(event: DragStartEvent) {
    const activeData = event.active.data.current as AdminDragData | undefined;

    if (activeData?.type === "booking") {
      setDraggedBookingId(activeData.bookingId);
    }

    if (activeData?.type === "guide") {
      setDraggedGuideId(activeData.guideId);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setDraggedBookingId(null);
    setDraggedGuideId(null);

    const activeData = event.active.data.current as AdminDragData | undefined;
    const overData = event.over?.data.current as
      | { type: "pipeline-stage"; pipelineStage: PipelineStage }
      | { type: "trip"; tripId: string }
      | undefined;

    if (!activeData || !overData || setupRequired) {
      return;
    }

    if (activeData.type === "booking" && overData.type === "pipeline-stage") {
      updatePipelineStage(activeData.bookingId, overData.pipelineStage);
      return;
    }

    if (activeData.type === "guide" && overData.type === "trip") {
      assignGuide(overData.tripId, activeData.guideId);
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragCancel={() => {
        setDraggedBookingId(null);
        setDraggedGuideId(null);
      }}
      onDragEnd={handleDragEnd}
    >
    <section className="section-shell space-y-8">
      <div className="grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-4">
          <p className="section-kicker">Expedition operations</p>
          <div className="space-y-3">
            <h1 className="font-display text-5xl leading-none text-white md:text-7xl">
              Admin field board
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-stone-300 md:text-base">
              Lead intake, departure planning, guide coverage, and the daily ops brief for{" "}
              {dashboard.tenantName}.
            </p>
          </div>
        </div>
        <div className="grid gap-3 text-sm text-stone-300 sm:grid-cols-2 lg:text-right">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Signed in</p>
            <p className="mt-2 break-words text-stone-100">{identity.email}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-amber-200/70">
              {identity.role.replace("_", " ")}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Provider</p>
            <p className="mt-2 text-stone-100">{dashboard.provider}</p>
          </div>
        </div>
      </div>

      {setupRequired ? <SetupBanner readiness={readiness} /> : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{stat.label}</p>
                <Icon className="h-4 w-4 text-amber-300" />
              </div>
              <p className="mt-4 font-display text-4xl text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <SectionTitle
              icon={
                activeWorkspace === "create"
                  ? Sparkles
                  : activeWorkspace === "pipeline"
                    ? Columns3
                    : activeWorkspace === "calendar"
                      ? CalendarRange
                      : UsersRound
              }
              kicker="Workflow"
              title={
                activeWorkspace === "create"
                  ? "Create desk"
                  : activeWorkspace === "pipeline"
                    ? "Lead pipeline"
                    : activeWorkspace === "calendar"
                      ? "Year schedule"
                      : "Guide tracking"
              }
            />
            <WorkspaceTabs active={activeWorkspace} onChange={setActiveWorkspace} />
          </div>

          {activeWorkspace === "create" ? (
            <CreateDesk
              disabled={setupRequired}
              pendingKey={pendingKey}
              onCreateBooking={createManualBooking}
              onCreateGuide={createTrackingGuide}
            />
          ) : null}

          {activeWorkspace === "pipeline" ? (
            <PipelineBoard
              bookings={dashboard.bookings}
              disabled={setupRequired}
              draggedBookingId={draggedBookingId}
              draggedGuideId={draggedGuideId}
              trips={dashboard.trips}
              onAssign={assignGuide}
              onDragEnd={() => setDraggedBookingId(null)}
              onDragStart={setDraggedBookingId}
              onMove={updatePipelineStage}
              onSelect={setSelectedBookingId}
            />
          ) : null}

          {activeWorkspace === "calendar" ? (
            <YearSchedule
              disabled={setupRequired}
              draggedGuideId={draggedGuideId}
              guides={dashboard.guides}
              pendingKey={pendingKey}
              trips={dashboard.trips}
              onAssign={assignGuide}
              onRemoveAssignment={(assignmentId) =>
                void mutate(
                  `remove:${assignmentId}`,
                  `/api/admin/assignments/${assignmentId}`,
                  { method: "DELETE" },
                  "Guide assignment removed.",
                )
              }
            />
          ) : null}

          {activeWorkspace === "guides" ? (
            <GuideTrackingPanel
              guides={dashboard.guides}
              pendingKey={pendingKey}
              trips={dashboard.trips}
              onUpdate={updateTrackingGuide}
            />
          ) : null}
        </section>
        <aside className="min-w-0 space-y-5">
          <BriefPanel
            brief={brief}
            generatedAt={dashboard.generatedAt}
            isRefreshing={isRefreshing}
            onRefreshBrief={refreshBrief}
            onRefreshDashboard={refreshDashboard}
          />
          <GuideRoster
            guides={dashboard.guides}
            onDragStart={setDraggedGuideId}
            onDragEnd={() => setDraggedGuideId(null)}
          />
          <ConflictPanel dashboard={dashboard} />
        </aside>
      </div>

      {toast ? (
        <div
          className={`fixed bottom-6 left-1/2 z-40 w-[min(92vw,34rem)] -translate-x-1/2 rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur ${
            toast.tone === "success"
              ? "border-emerald-300/30 bg-emerald-950/90 text-emerald-100"
              : "border-red-300/30 bg-red-950/90 text-red-100"
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      {selectedBooking ? (
        <LeadDetailModal
          booking={selectedBooking}
          disabled={setupRequired}
          pendingKey={pendingKey}
          trip={selectedTrip}
          onClose={() => setSelectedBookingId(null)}
          onCreateTrip={(bookingId) =>
            void mutate(
              `trip:${bookingId}`,
              "/api/admin/trips",
              {
                method: "POST",
                body: JSON.stringify({ bookingId }),
              },
              "Trip created from lead.",
            )
          }
          onMove={updatePipelineStage}
          onUpdate={updateBookingDetails}
        />
      ) : null}
    </section>
    </DndContext>
  );
}

function SetupBanner({ readiness }: { readiness: Readiness }) {
  return (
    <div className="rounded-3xl border border-amber-300/25 bg-amber-300/10 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-3">
          <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white">Operations backend setup required</h2>
            <p className="max-w-3xl text-sm leading-7 text-amber-50/80">
              The admin board is running with preview data. Connect the Cloudflare operations API
              before changing lead status, creating trips, or assigning guides.
            </p>
          </div>
        </div>
        <div className="grid min-w-56 gap-2 text-xs uppercase tracking-[0.2em] text-amber-100/80">
          <span>OPS_API_URL: {readiness.urlConfigured ? "set" : "missing"}</span>
          <span>OPS_API_TOKEN: {readiness.tokenConfigured ? "set" : "missing"}</span>
        </div>
      </div>
    </div>
  );
}

function WorkspaceTabs({
  active,
  onChange,
}: {
  active: WorkspaceTab;
  onChange: (tab: WorkspaceTab) => void;
}) {
  const tabs: Array<{ id: WorkspaceTab; label: string; icon: typeof Plus }> = [
    { id: "create", label: "Create", icon: Sparkles },
    { id: "pipeline", label: "Pipeline", icon: Columns3 },
    { id: "calendar", label: "Calendar", icon: CalendarRange },
    { id: "guides", label: "Guides", icon: UsersRound },
  ];

  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-black/25 p-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-300 sm:grid-cols-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 transition ${
              active === tab.id ? "bg-amber-300 text-stone-950" : "hover:text-amber-100"
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function CreateDesk({
  disabled,
  pendingKey,
  onCreateBooking,
  onCreateGuide,
}: {
  disabled: boolean;
  pendingKey: string | null;
  onCreateBooking: (values: BookingFormValues) => void;
  onCreateGuide: (values: GuideDraft) => void;
}) {
  const [mode, setMode] = useState<"booking" | "guide">("booking");
  const [assistantText, setAssistantText] = useState("");
  const [bookingDraft, setBookingDraft] = useState<BookingFormValues>(emptyBookingDraft);
  const [guideDraft, setGuideDraft] = useState<GuideDraft>(emptyGuideDraft);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isListening, setIsListening] = useState(false);

  async function applyAssistant() {
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

      if (response.ok && payload?.draft) {
        if (mode === "booking") {
          setBookingDraft((draft) =>
            mergeAssistedBookingDraft(
              draft,
              payload.draft as AssistedBookingDraft,
              assistantText,
            ),
          );
        } else {
          setGuideDraft((draft) =>
            mergeAssistedGuideDraft(draft, payload.draft as AssistedGuideDraft),
          );
        }

        return;
      }
    } catch {
      // Fall back to the deterministic extractor when the model endpoint is unavailable.
    } finally {
      setIsDrafting(false);
    }

    if (mode === "booking") {
      setBookingDraft((draft) => inferBookingDraft(assistantText, draft));
    } else {
      setGuideDraft((draft) => inferGuideDraft(assistantText, draft));
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
        text ? text : "Dictation is not available in this browser. Paste notes here instead.",
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
    <div className="mt-4 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-amber-100/60">AI assist</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Talk or paste intake notes</h3>
          </div>
          <div className="grid grid-cols-2 rounded-full border border-amber-300/20 bg-black/20 p-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-100">
            <button
              type="button"
              onClick={() => setMode("booking")}
              className={`rounded-full px-3 py-2 ${mode === "booking" ? "bg-amber-300 text-stone-950" : ""}`}
            >
              Booking
            </button>
            <button
              type="button"
              onClick={() => setMode("guide")}
              className={`rounded-full px-3 py-2 ${mode === "guide" ? "bg-amber-300 text-stone-950" : ""}`}
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
              ? "Example: Name Sarah Chen, email sarah@example.com, 4 travelers, Everest Base Camp, October 2026, private comfort trek, heli return."
              : "Example: Name Tenzing Lama, role Langtang and family trek lead, regions Langtang, Helambu, languages English, Nepali, Tibetan."
          }
          className="mt-4 min-h-52 w-full resize-y rounded-2xl border border-white/10 bg-black/25 p-3 text-sm leading-6 text-stone-100 outline-none placeholder:text-stone-600 focus:border-amber-300/45"
        />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={startDictation}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/25 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-amber-300/10"
          >
            <Mic className="h-4 w-4" />
            {isListening ? "Listening" : "Dictate"}
          </button>
          <button
            type="button"
            onClick={applyAssistant}
            disabled={isDrafting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-950 transition hover:bg-amber-200"
          >
            {isDrafting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {isDrafting ? "Drafting" : "Draft fields"}
          </button>
        </div>
      </section>

      {mode === "booking" ? (
        <BookingDraftForm
          disabled={disabled}
          draft={bookingDraft}
          pending={pendingKey === "create:booking"}
          onChange={setBookingDraft}
          onSubmit={onCreateBooking}
        />
      ) : (
        <GuideDraftForm
          disabled={disabled}
          draft={guideDraft}
          pending={pendingKey === "create:guide"}
          onChange={setGuideDraft}
          onSubmit={onCreateGuide}
        />
      )}
    </div>
  );
}

function BookingDraftForm({
  disabled,
  draft,
  pending,
  onChange,
  onSubmit,
}: {
  disabled: boolean;
  draft: BookingFormValues;
  pending: boolean;
  onChange: (draft: BookingFormValues) => void;
  onSubmit: (draft: BookingFormValues) => void;
}) {
  return (
    <form
      className="rounded-2xl border border-white/10 bg-black/20 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(draft);
      }}
    >
      <FormHeader icon={MapPinned} title="Manual booking" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <TextInput label="Traveler name" value={draft.fullName} onChange={(fullName) => onChange({ ...draft, fullName })} />
        <TextInput label="Email" type="email" value={draft.email} onChange={(email) => onChange({ ...draft, email })} />
        <TextInput label="Departure window" value={draft.departureWindow} onChange={(departureWindow) => onChange({ ...draft, departureWindow })} />
        <TextInput label="Group size" value={draft.groupSize} onChange={(groupSize) => onChange({ ...draft, groupSize })} />
        <label className="text-xs uppercase tracking-[0.18em] text-stone-500">
          Route
          <select
            value={draft.routeSlug}
            onChange={(event) => onChange({ ...draft, routeSlug: event.target.value })}
            className="mt-2 w-full rounded-xl border border-white/10 bg-stone-950 px-3 py-2 text-sm normal-case tracking-normal text-stone-100 outline-none focus:border-amber-300/45"
          >
            <option value="">Select route</option>
            {trekRoutes.map((route) => (
              <option key={route.slug} value={route.slug}>
                {route.name}
              </option>
            ))}
          </select>
        </label>
        <TextInput label="Style" value={draft.style} onChange={(style) => onChange({ ...draft, style })} />
      </div>
      <TextInput
        label="Add-ons"
        value={draft.addons.join(", ")}
        onChange={(addons) => onChange({ ...draft, addons: splitList(addons) })}
      />
      <TextArea label="Notes" value={draft.notes ?? ""} onChange={(notes) => onChange({ ...draft, notes })} />
      <SubmitButton disabled={disabled || pending} pending={pending} label="Create booking" />
    </form>
  );
}

function GuideDraftForm({
  disabled,
  draft,
  pending,
  onChange,
  onSubmit,
}: {
  disabled: boolean;
  draft: GuideDraft;
  pending: boolean;
  onChange: (draft: GuideDraft) => void;
  onSubmit: (draft: GuideDraft) => void;
}) {
  return (
    <form
      className="rounded-2xl border border-white/10 bg-black/20 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(draft);
      }}
    >
      <FormHeader icon={UserPlus} title="Tracking guide" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <TextInput label="Guide name" value={draft.name} onChange={(name) => onChange({ ...draft, name })} />
        <TextInput label="Role" value={draft.role} onChange={(role) => onChange({ ...draft, role })} />
        <TextInput label="Guide type" value={draft.gender} onChange={(gender) => onChange({ ...draft, gender })} />
        <TextInput label="Languages" value={draft.languages} onChange={(languages) => onChange({ ...draft, languages })} />
      </div>
      <TextInput label="Regions" value={draft.regions} onChange={(regions) => onChange({ ...draft, regions })} />
      <TextInput label="Certifications" value={draft.certifications} onChange={(certifications) => onChange({ ...draft, certifications })} />
      <label className="mt-4 flex items-center gap-3 text-sm text-stone-200">
        <input
          type="checkbox"
          checked={draft.active}
          onChange={(event) => onChange({ ...draft, active: event.target.checked })}
          className="h-4 w-4 accent-amber-300"
        />
        Active for assignment tracking
      </label>
      <SubmitButton disabled={disabled || pending} pending={pending} label="Add guide" />
    </form>
  );
}

function GuideTrackingPanel({
  guides,
  pendingKey,
  trips,
  onUpdate,
}: {
  guides: OpsGuide[];
  pendingKey: string | null;
  trips: OpsTrip[];
  onUpdate: (guideId: string, values: GuideDraft) => void;
}) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {guides.map((guide) => {
        const assignments = trips.flatMap((trip) =>
          trip.assignedGuides
            .filter((assignment) => assignment.guideId === guide.id)
            .map((assignment) => ({ trip, assignment })),
        );

        return (
          <GuideTrackingCard
            key={guide.id}
            assignments={assignments}
            guide={guide}
            pending={pendingKey === `guide:update:${guide.id}`}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}

function GuideTrackingCard({
  assignments,
  guide,
  pending,
  onUpdate,
}: {
  assignments: Array<{ trip: OpsTrip; assignment: OpsTrip["assignedGuides"][number] }>;
  guide: OpsGuide;
  pending: boolean;
  onUpdate: (guideId: string, values: GuideDraft) => void;
}) {
  const [draft, setDraft] = useState<GuideDraft>({
    name: guide.name,
    role: guide.role,
    gender: guide.gender,
    regions: guide.regions.join(", "),
    languages: guide.languages.join(", "),
    certifications: guide.certifications.join(", "),
    active: guide.active,
  });

  return (
    <article className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onUpdate(guide.id, draft);
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">{guide.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">
              {guide.role}
            </p>
          </div>
          <Badge>{guide.active ? "Active" : "Inactive"}</Badge>
        </div>
        <div className="mt-3 grid gap-2">
          <TextInput
            label="Name"
            value={draft.name}
            onChange={(name) => setDraft({ ...draft, name })}
          />
          <TextInput
            label="Role"
            value={draft.role}
            onChange={(role) => setDraft({ ...draft, role })}
          />
          <TextInput
            label="Regions"
            value={draft.regions}
            onChange={(regions) => setDraft({ ...draft, regions })}
          />
          <TextInput
            label="Languages"
            value={draft.languages}
            onChange={(languages) => setDraft({ ...draft, languages })}
          />
          <TextInput
            label="Certifications"
            value={draft.certifications}
            onChange={(certifications) => setDraft({ ...draft, certifications })}
          />
          <label className="flex items-center gap-3 text-sm text-stone-200">
            <input
              type="checkbox"
              checked={draft.active}
              onChange={(event) => setDraft({ ...draft, active: event.target.checked })}
              className="h-4 w-4 accent-amber-300"
            />
            Active for assignment tracking
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/25 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save profile
        </button>
      </form>
      <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
        {assignments.length === 0 ? (
          <EmptyState text="No tracked assignments yet." />
        ) : (
          assignments.map(({ trip, assignment }) => (
            <div
              key={assignment.id}
              className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-3"
            >
              <p className="truncate text-sm font-semibold text-emerald-50">{trip.name}</p>
              <p className="mt-1 text-xs text-emerald-50/70">
                {compactDate(assignment.startDate)} - {compactDate(assignment.endDate)}
              </p>
            </div>
          ))
        )}
      </div>
    </article>
  );
}

function PipelineBoard({
  bookings,
  disabled,
  draggedBookingId,
  draggedGuideId,
  trips,
  onAssign,
  onDragEnd,
  onDragStart,
  onMove,
  onSelect,
}: {
  bookings: OpsBookingRequest[];
  disabled: boolean;
  draggedBookingId: string | null;
  draggedGuideId: string | null;
  trips: OpsTrip[];
  onAssign: (tripId: string, guideId: string) => void;
  onDragEnd: () => void;
  onDragStart: (bookingId: string) => void;
  onMove: (bookingId: string, pipelineStage: PipelineStage) => void;
  onSelect: (bookingId: string) => void;
}) {
  const tripByBookingId = new Map(trips.map((trip) => [trip.requestId, trip]));
  const bookingsByStage = pipelineStages.map((stage) => ({
    ...stage,
    bookings: bookings.filter((booking) => booking.pipelineStage === stage.id),
  }));

  return (
    <div className="mt-4 overflow-x-auto pb-2">
      <div className="grid min-w-[105rem] grid-cols-7 gap-4">
        {bookingsByStage.map((stage) => (
          <PipelineColumn
            key={stage.id}
            disabled={disabled}
            draggedBookingId={draggedBookingId}
            draggedGuideId={draggedGuideId}
            onAssign={onAssign}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onMove={onMove}
            onSelect={onSelect}
            stage={stage}
            tripByBookingId={tripByBookingId}
          />
        ))}
      </div>
    </div>
  );
}

function PipelineColumn({
  disabled,
  draggedBookingId,
  draggedGuideId,
  onAssign,
  onDragEnd,
  onDragStart,
  onMove,
  onSelect,
  stage,
  tripByBookingId,
}: {
  disabled: boolean;
  draggedBookingId: string | null;
  draggedGuideId: string | null;
  onAssign: (tripId: string, guideId: string) => void;
  onDragEnd: () => void;
  onDragStart: (bookingId: string) => void;
  onMove: (bookingId: string, pipelineStage: PipelineStage) => void;
  onSelect: (bookingId: string) => void;
  stage: (typeof pipelineStages)[number] & { bookings: OpsBookingRequest[] };
  tripByBookingId: Map<string | undefined, OpsTrip>;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `pipeline-stage:${stage.id}`,
    data: { type: "pipeline-stage", pipelineStage: stage.id },
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      onDragOver={(event) => {
        if (!disabled && draggedBookingId) {
          event.preventDefault();
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        const bookingId = event.dataTransfer.getData("text/plain") || draggedBookingId;

        if (!disabled && bookingId) {
          onMove(bookingId, stage.id);
        }
      }}
      className="min-h-[34rem] rounded-2xl border border-white/10 bg-black/20 p-3 transition data-[active=true]:border-amber-300/45 data-[active=true]:bg-amber-300/10"
      data-active={Boolean(draggedBookingId) || isOver}
    >
      <div className="min-h-24 border-b border-white/10 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {stage.label}
            </h3>
            <p className="mt-2 text-xs leading-5 text-stone-500">{stage.hint}</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 px-2 py-1 text-xs text-stone-300">
            {stage.bookings.length}
          </span>
        </div>
      </div>
      <div className="mt-3 space-y-3">
        {stage.bookings.length === 0 ? (
          <EmptyState text="Drop a lead here." />
        ) : (
          stage.bookings.map((booking) => (
            <PipelineCard
              key={booking.id}
              booking={booking}
              disabled={disabled}
              draggedGuideId={draggedGuideId}
              trip={tripByBookingId.get(booking.id)}
              onAssign={onAssign}
              onDragEnd={onDragEnd}
              onDragStart={onDragStart}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}

function PipelineCard({
  booking,
  disabled,
  draggedGuideId,
  trip,
  onAssign,
  onDragEnd,
  onDragStart,
  onSelect,
}: {
  booking: OpsBookingRequest;
  disabled: boolean;
  draggedGuideId: string | null;
  trip?: OpsTrip;
  onAssign: (tripId: string, guideId: string) => void;
  onDragEnd: () => void;
  onDragStart: (bookingId: string) => void;
  onSelect: (bookingId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `booking:${booking.id}`,
    data: { type: "booking", bookingId: booking.id },
    disabled,
  });
  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: `booking-trip:${booking.id}`,
    data: { type: "trip", tripId: trip?.id ?? "" },
    disabled: disabled || !trip,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <article
      ref={(node) => {
        setNodeRef(node);
        setDroppableNodeRef(node);
      }}
      style={style}
      draggable={!disabled}
      onClick={() => onSelect(booking.id)}
      onDragOver={(event) => {
        if (canDropGuide(event, disabled, draggedGuideId, trip)) {
          event.preventDefault();
        }
      }}
      onDragStart={(event) => {
        event.dataTransfer.setData("application/x-booking-id", booking.id);
        event.dataTransfer.setData("text/plain", booking.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart(booking.id);
      }}
      onDrop={(event) => {
        const guideId = guideIdFromDrop(event, draggedGuideId);

        if (!disabled && trip && guideId) {
          event.preventDefault();
          event.stopPropagation();
          onAssign(trip.id, guideId);
        }
      }}
      onDragEnd={onDragEnd}
      className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-lg shadow-black/10 transition hover:border-amber-300/35 hover:bg-white/[0.07] active:cursor-grabbing data-[dragging=true]:opacity-60 data-[guide-drop=true]:border-amber-300/45 data-[guide-drop=true]:bg-amber-300/10"
      data-dragging={isDragging}
      data-guide-drop={Boolean((draggedGuideId && trip) || isOver)}
      {...attributes}
      {...listeners}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <Badge>{statusLabels[booking.status]}</Badge>
          <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.14em] text-stone-600">
            {booking.groupSize} pax
          </span>
        </div>
        <div className="min-w-0">
          <h4 className="truncate font-semibold leading-5 text-white" title={booking.fullName}>
            {booking.fullName}
          </h4>
          <p className="mt-1 truncate text-xs text-stone-400" title={booking.email}>
            {booking.email}
          </p>
        </div>
      </div>
      <p className="mt-3 truncate text-xs uppercase tracking-[0.14em] text-stone-500" title={booking.routeSlug}>
        {booking.routeSlug}
      </p>
      <p className="mt-2 truncate text-sm text-stone-300" title={booking.departureWindow}>
        {booking.departureWindow}
      </p>
      {trip ? (
        <div className="mt-3 space-y-2">
          <p className="truncate rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
            {compactDate(trip.startDate)} - {compactDate(trip.endDate)}
          </p>
          <p className="truncate text-[0.65rem] uppercase tracking-[0.12em] text-stone-500">
            {trip.assignedGuides.length === 0 ? "Drop guide here" : `${trip.assignedGuides.length} guide assigned`}
          </p>
        </div>
      ) : null}
    </article>
  );
}

function LeadDetailModal({
  booking,
  disabled,
  pendingKey,
  trip,
  onClose,
  onCreateTrip,
  onMove,
  onUpdate,
}: {
  booking: OpsBookingRequest;
  disabled: boolean;
  pendingKey: string | null;
  trip?: OpsTrip;
  onClose: () => void;
  onCreateTrip: (bookingId: string) => void;
  onMove: (bookingId: string, pipelineStage: PipelineStage) => void;
  onUpdate: (bookingId: string, values: BookingFormValues) => void;
}) {
  const [draft, setDraft] = useState<BookingFormValues>({
    fullName: booking.fullName,
    email: booking.email,
    departureWindow: booking.departureWindow,
    routeSlug: booking.routeSlug,
    groupSize: booking.groupSize,
    style: booking.style,
    addons: booking.addons,
    notes: booking.notes,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <article className="max-h-[90vh] w-[min(92vw,44rem)] overflow-y-auto rounded-3xl border border-white/10 bg-stone-950 p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-amber-200">
              {pipelineLabels[booking.pipelineStage]}
            </p>
            <h3 className="mt-2 text-3xl font-semibold leading-tight text-white">
              {booking.fullName}
            </h3>
            <p className="mt-2 break-words text-sm text-stone-400">{booking.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lead details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-stone-300 transition hover:border-amber-300/40 hover:text-amber-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <dl className="mt-5 grid gap-4 text-sm text-stone-300 sm:grid-cols-2">
          <Info label="Route" value={booking.routeSlug} />
          <Info label="Departure" value={booking.departureWindow} />
          <Info label="Group" value={`${booking.groupSize} travelers`} />
          <Info label="Style" value={booking.style} />
          <Info label="Status" value={statusLabels[booking.status]} />
          <Info label="Source" value={booking.source} />
        </dl>

        <form
          className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            onUpdate(booking.id, draft);
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Editable profile
            </p>
            <button
              type="submit"
              disabled={disabled || Boolean(pendingKey)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/25 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pendingKey === `booking:update:${booking.id}` ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save
            </button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <TextInput
              label="Traveler"
              value={draft.fullName}
              onChange={(fullName) => setDraft({ ...draft, fullName })}
            />
            <TextInput
              label="Email"
              type="email"
              value={draft.email}
              onChange={(email) => setDraft({ ...draft, email })}
            />
            <TextInput
              label="Departure"
              value={draft.departureWindow}
              onChange={(departureWindow) => setDraft({ ...draft, departureWindow })}
            />
            <TextInput
              label="Group size"
              value={draft.groupSize}
              onChange={(groupSize) => setDraft({ ...draft, groupSize })}
            />
            <label className="mt-3 block text-xs uppercase tracking-[0.18em] text-stone-500">
              Route
              <select
                value={draft.routeSlug}
                onChange={(event) => setDraft({ ...draft, routeSlug: event.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-stone-950 px-3 py-2 text-sm normal-case tracking-normal text-stone-100 outline-none focus:border-amber-300/45"
              >
                {trekRoutes.map((route) => (
                  <option key={route.slug} value={route.slug}>
                    {route.name}
                  </option>
                ))}
              </select>
            </label>
            <TextInput
              label="Style"
              value={draft.style}
              onChange={(style) => setDraft({ ...draft, style })}
            />
          </div>
          <TextInput
            label="Add-ons"
            value={draft.addons.join(", ")}
            onChange={(addons) => setDraft({ ...draft, addons: splitList(addons) })}
          />
          <TextArea
            label="Notes"
            value={draft.notes ?? ""}
            onChange={(notes) => setDraft({ ...draft, notes })}
          />
        </form>

        {trip ? (
          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
              Scheduled trip
            </p>
            <p className="mt-2 font-semibold text-emerald-50">{trip.name}</p>
            <p className="mt-1 text-sm text-emerald-50/75">
              {compactDate(trip.startDate)} - {compactDate(trip.endDate)}
            </p>
          </div>
        ) : null}

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Move lead</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pipelineStages.map((stage) => (
              <button
                key={stage.id}
                type="button"
                disabled={disabled || Boolean(pendingKey) || booking.pipelineStage === stage.id}
                onClick={() => onMove(booking.id, stage.id)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-45 ${
                  booking.pipelineStage === stage.id
                    ? "border-amber-300 bg-amber-300 text-stone-950"
                    : "border-white/10 text-stone-200 hover:border-amber-300/40 hover:text-amber-100"
                }`}
              >
                {pendingKey === `pipeline:${booking.id}:${stage.id}` ? "Saving" : stage.label}
              </button>
            ))}
          </div>
          {!trip && booking.pipelineStage === "scheduled" ? (
            <button
              type="button"
              disabled={disabled || Boolean(pendingKey)}
              onClick={() => onCreateTrip(booking.id)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {pendingKey === `trip:${booking.id}` ? "Creating trip" : "Create trip"}
            </button>
          ) : null}
        </div>
      </article>
    </div>
  );
}

function canDropGuide(
  event: DragEvent,
  disabled: boolean,
  draggedGuideId: string | null,
  trip?: OpsTrip,
) {
  return (
    !disabled &&
    Boolean(trip) &&
    (Boolean(draggedGuideId) || event.dataTransfer.types.includes("application/x-guide-id"))
  );
}

function guideIdFromDrop(event: DragEvent, draggedGuideId: string | null) {
  return (
    event.dataTransfer.getData("application/x-guide-id") ||
    event.dataTransfer.getData("text/plain") ||
    draggedGuideId
  );
}

function YearSchedule({
  disabled,
  draggedGuideId,
  guides,
  pendingKey,
  trips,
  onAssign,
  onRemoveAssignment,
}: {
  disabled: boolean;
  draggedGuideId: string | null;
  guides: OpsGuide[];
  pendingKey: string | null;
  trips: OpsTrip[];
  onAssign: (tripId: string, guideId: string) => void;
  onRemoveAssignment: (assignmentId: string) => void;
}) {
  const currentYear = new Date().getFullYear();
  const calendarEvents = trips.map((trip) => ({
    id: trip.id,
    title: trip.name,
    start: trip.startDate,
    end: addCalendarEndDate(trip.endDate),
    classNames: [`ops-trip-${trip.status}`],
    extendedProps: {
      routeSlug: trip.routeSlug,
      assignedGuides: trip.assignedGuides.length,
      status: trip.status,
    },
  }));
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(currentYear, index, 1);

    return {
      label: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
      trips: trips.filter((trip) => {
        const startDate = new Date(`${trip.startDate}T00:00:00`);

        return startDate.getFullYear() === currentYear && startDate.getMonth() === index;
      }),
    };
  });

  return (
    <div className="mt-4 space-y-5">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-stone-100">
        <FullCalendar
          height="auto"
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          events={calendarEvents}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          eventContent={(eventInfo) => (
            <div className="min-w-0 px-1 py-0.5">
              <p className="truncate text-[0.7rem] font-semibold leading-4">
                {eventInfo.event.title}
              </p>
              <p className="truncate text-[0.62rem] leading-4 opacity-75">
                {String(eventInfo.event.extendedProps.routeSlug)} -{" "}
                {String(eventInfo.event.extendedProps.assignedGuides)} guide
              </p>
            </div>
          )}
          eventClassNames="rounded-md border border-emerald-300/20 bg-emerald-300/15 text-emerald-50"
          dayMaxEvents={3}
          fixedWeekCount={false}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
        {months.map((month) => (
          <div key={month.label} className="min-h-44 rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                {month.label}
              </h3>
              <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-stone-300">
                {month.trips.length}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {month.trips.length === 0 ? (
                <p className="text-xs text-stone-500">No scheduled departures.</p>
              ) : (
                month.trips.map((trip) => (
                  <TripScheduleCard
                    key={trip.id}
                    disabled={disabled}
                    draggedGuideId={draggedGuideId}
                    pendingKey={pendingKey}
                    trip={trip}
                    onAssign={onAssign}
                    onRemoveAssignment={onRemoveAssignment}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
          Guide year view
        </p>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[72rem] space-y-2">
            <div className="grid grid-cols-[11rem_repeat(12,minmax(4.5rem,1fr))] gap-2 text-xs uppercase tracking-[0.16em] text-stone-500">
              <span>Guide</span>
              {months.map((month) => (
                <span key={month.label}>{month.label}</span>
              ))}
            </div>
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="grid grid-cols-[11rem_repeat(12,minmax(4.5rem,1fr))] gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{guide.name}</p>
                  <p className="mt-1 text-xs text-stone-500">{guide.role}</p>
                </div>
                {months.map((month) => {
                  const assignments = month.trips.flatMap((trip) =>
                    trip.assignedGuides
                      .filter((assignment) => assignment.guideId === guide.id)
                      .map((assignment) => ({ assignment, trip })),
                  );

                  return (
                    <div key={month.label} className="min-h-14 rounded-lg border border-white/10 bg-black/20 p-1">
                      {assignments.map(({ assignment, trip }) => (
                        <div
                          key={assignment.id}
                          className="rounded-md bg-emerald-300/15 px-2 py-1 text-[0.65rem] leading-4 text-emerald-50"
                        >
                          {trip.routeSlug}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TripScheduleCard({
  disabled,
  draggedGuideId,
  pendingKey,
  trip,
  onAssign,
  onRemoveAssignment,
}: {
  disabled: boolean;
  draggedGuideId: string | null;
  pendingKey: string | null;
  trip: OpsTrip;
  onAssign: (tripId: string, guideId: string) => void;
  onRemoveAssignment: (assignmentId: string) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `trip:${trip.id}`,
    data: { type: "trip", tripId: trip.id },
    disabled,
  });

  return (
    <article
      ref={setNodeRef}
      onDragOver={(event) => {
        if (canDropGuide(event, disabled, draggedGuideId, trip)) {
          event.preventDefault();
        }
      }}
      onDrop={(event) => {
        const guideId = guideIdFromDrop(event, draggedGuideId);

        if (!disabled && guideId) {
          event.preventDefault();
          onAssign(trip.id, guideId);
        }
      }}
      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 transition data-[active=true]:border-amber-300/45 data-[active=true]:bg-amber-300/10"
      data-active={Boolean(draggedGuideId) || isOver}
    >
      <div className="flex min-w-0 items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-white">{trip.name}</p>
          <p className="mt-0.5 truncate text-[0.65rem] text-stone-500">
            {compactDate(trip.startDate)} - {compactDate(trip.endDate)}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.1em] ${
            tripStatusTone[trip.status] ?? tripStatusTone.draft
          }`}
        >
          {trip.status}
        </span>
      </div>
      <div className="mt-1 flex flex-wrap gap-1">
        {trip.assignedGuides.length === 0 ? (
          <span className="text-[0.6rem] uppercase tracking-[0.12em] text-stone-600">
            Drop guide
          </span>
        ) : null}
        {trip.assignedGuides.map((assignment) => (
          <div
            key={assignment.id}
            className="inline-flex max-w-full items-center gap-1 rounded-md border border-white/10 bg-black/20 px-2 py-0.5"
          >
            <span className="truncate text-[0.62rem] text-stone-200">{assignment.guideName}</span>
            <button
              type="button"
              disabled={disabled || Boolean(pendingKey)}
              onClick={() => onRemoveAssignment(assignment.id)}
              aria-label={`Remove ${assignment.guideName} from ${trip.name}`}
              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-stone-500 transition hover:text-red-200 disabled:opacity-40"
            >
              {pendingKey === `remove:${assignment.id}` ? (
                <Loader2 className="h-2.5 w-2.5 animate-spin" />
              ) : (
                <Trash2 className="h-2.5 w-2.5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}

function GuideRoster({
  guides,
  onDragStart,
  onDragEnd,
}: {
  guides: OpsGuide[];
  onDragStart: (guideId: string) => void;
  onDragEnd: () => void;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
      <SectionTitle icon={UsersRound} kicker="Guide roster" title="Drag to assign" />
      <div className="mt-4 space-y-2">
        {guides.map((guide) => (
          <GuideRosterItem
            key={guide.id}
            guide={guide}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </section>
  );
}

function GuideRosterItem({
  guide,
  onDragStart,
  onDragEnd,
}: {
  guide: OpsGuide;
  onDragStart: (guideId: string) => void;
  onDragEnd: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `guide:${guide.id}`,
    data: { type: "guide", guideId: guide.id },
    disabled: !guide.active,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      draggable={guide.active}
      onDragStart={(event) => {
        event.dataTransfer.setData("application/x-guide-id", guide.id);
        event.dataTransfer.setData("text/plain", guide.id);
        event.dataTransfer.effectAllowed = "copy";
        onDragStart(guide.id);
      }}
      onDragEnd={onDragEnd}
      className="cursor-grab rounded-2xl border border-white/10 bg-black/20 p-3 active:cursor-grabbing data-[dragging=true]:opacity-60"
      data-dragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{guide.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-500">
            {guide.role}
          </p>
        </div>
        {guide.active ? (
          <Check className="h-4 w-4 text-emerald-300" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-red-300" />
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-stone-300">
        {guide.regions.slice(0, 3).join(", ")}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-stone-500">
        {guide.languages.join(" / ")}
      </p>
    </div>
  );
}

function BriefPanel({
  brief,
  generatedAt,
  isRefreshing,
  onRefreshBrief,
  onRefreshDashboard,
}: {
  brief: string;
  generatedAt: string;
  isRefreshing: boolean;
  onRefreshBrief: () => void;
  onRefreshDashboard: () => void;
}) {
  return (
    <section className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.07] p-4">
      <SectionTitle icon={Bot} kicker="AI ops brief" title="Daily priorities" />
      <p className="mt-4 text-sm leading-7 text-amber-50/85">{brief}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-amber-100/45">
        Board generated {new Date(generatedAt).toLocaleString()}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onRefreshBrief}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/25 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-300/10 disabled:opacity-50"
        >
          <Bot className="h-4 w-4" />
          Brief
        </button>
        <button
          type="button"
          onClick={onRefreshDashboard}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/25 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-300/10 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Board
        </button>
      </div>
    </section>
  );
}

function ConflictPanel({ dashboard }: { dashboard: OpsDashboard }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
      <SectionTitle icon={AlertTriangle} kicker="Risk watch" title="Conflicts" />
      <div className="mt-4 space-y-2">
        {dashboard.conflicts.length === 0 ? (
          <EmptyState text="No guide conflicts are currently reported." />
        ) : (
          dashboard.conflicts.map((conflict) => (
            <div key={`${conflict.guideId}-${conflict.tripId}-${conflict.startDate}`} className="rounded-2xl border border-red-300/20 bg-red-500/10 p-3">
              <p className="font-semibold text-red-100">{conflict.guideName}</p>
              <p className="mt-2 text-sm leading-6 text-red-50/75">{conflict.reason}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-red-100/50">
                {compactDate(conflict.startDate)} - {compactDate(conflict.endDate)}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function SectionTitle({
  icon: Icon,
  kicker,
  title,
}: {
  icon: typeof ClipboardList;
  kicker: string;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{kicker}</p>
        <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
      </div>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-amber-300">
        <Icon className="h-5 w-5" />
      </span>
    </div>
  );
}

function FormHeader({ icon: Icon, title }: { icon: typeof Plus; title: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-amber-300">
        <Icon className="h-4 w-4" />
      </span>
    </div>
  );
}

function TextInput({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-3 block text-xs uppercase tracking-[0.18em] text-stone-500">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-stone-950 px-3 py-2 text-sm normal-case tracking-normal text-stone-100 outline-none placeholder:text-stone-600 focus:border-amber-300/45"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-3 block text-xs uppercase tracking-[0.18em] text-stone-500">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/10 bg-stone-950 px-3 py-2 text-sm normal-case leading-6 tracking-normal text-stone-100 outline-none focus:border-amber-300/45"
      />
    </label>
  );
}

function SubmitButton({
  disabled,
  pending,
  label,
}: {
  disabled: boolean;
  pending: boolean;
  label: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {pending ? "Saving" : label}
    </button>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">{label}</dt>
      <dd className="mt-1 break-words text-stone-200">{value}</dd>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 whitespace-nowrap rounded-md border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-center text-[0.65rem] uppercase tracking-[0.12em] text-amber-100">
      {children}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="min-h-16 overflow-hidden rounded-2xl border border-dashed border-white/10 p-4 text-sm leading-6 text-stone-400">
      {text}
    </div>
  );
}
