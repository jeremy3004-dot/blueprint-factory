import { guideProfiles } from "@/data/guides";
import { tenantConfig } from "@/data/tenant";
import type { BookingFormValues } from "@/lib/booking";
import type {
  BookingRequestStatus,
  OpsBookingCreateResult,
  OpsDashboard,
  OpsGuide,
  OpsTrip,
  PipelineStage,
} from "@/lib/ops-types";

const opsApiUrl = process.env.OPS_API_URL?.replace(/\/$/, "");
const opsApiToken = process.env.OPS_API_TOKEN;

export const opsBackendReadiness = {
  connected: Boolean(opsApiUrl && opsApiToken),
  urlConfigured: Boolean(opsApiUrl),
  tokenConfigured: Boolean(opsApiToken),
};

function authHeaders() {
  return {
    authorization: `Bearer ${opsApiToken}`,
    "content-type": "application/json",
  };
}

async function opsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!opsApiUrl || !opsApiToken) {
    throw new Error("Cloudflare ops backend is not configured.");
  }

  const response = await fetch(`${opsApiUrl}${path}`, {
    ...init,
    headers: {
      ...authHeaders(),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String(payload.message)
        : `Ops backend request failed with ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

function demoGuides(): OpsGuide[] {
  return guideProfiles.map((guide) => ({
    id: guide.slug,
    slug: guide.slug,
    name: guide.name,
    role: guide.title,
    gender: guide.gender,
    regions: guide.specialties,
    languages: guide.languages,
    certifications: ["Licensed trekking guide"],
    active: true,
  }));
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function createSetupDashboard(): OpsDashboard {
  const now = new Date();
  const startDate = addDays(now, 45).toISOString().slice(0, 10);
  const endDate = addDays(now, 58).toISOString().slice(0, 10);

  const trips: OpsTrip[] = [
    {
      id: "demo-everest-october",
      name: "Demo Everest private departure",
      routeSlug: "everest-base-camp",
      startDate,
      endDate,
      status: "held",
      travelerCount: 4,
      notes: "Demo trip shown until the Cloudflare D1 backend is connected.",
      assignedGuides: [
        {
          id: "demo-assignment-maya",
          guideId: "maya-sherpa",
          guideName: "Maya Sherpa",
          guideSlug: "maya-sherpa",
          role: "Lead guide",
          startDate,
          endDate,
        },
      ],
    },
  ];

  return {
    provider: "setup-required",
    tenantId: tenantConfig.tenantId,
    tenantName: tenantConfig.tenantName,
    generatedAt: now.toISOString(),
    bookings: [
      {
        id: "demo-lead-first-contact",
        status: "contacted",
        pipelineStage: "first_contact",
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        source: "web",
        fullName: "Demo traveler",
        email: "traveler@example.com",
        departureWindow: "October 2026",
        routeSlug: "annapurna-circuit",
        groupSize: "2",
        style: "Private comfort trek",
        addons: ["Guide matching"],
        notes: "Demo lead shown until the Cloudflare D1 backend is connected.",
      },
    ],
    guides: demoGuides(),
    trips,
    conflicts: [],
  };
}

export async function createOpsBooking(
  values: BookingFormValues,
  request: Request,
): Promise<OpsBookingCreateResult | null> {
  if (!opsBackendReadiness.connected) {
    return null;
  }

  return opsFetch<OpsBookingCreateResult>("/bookings", {
    method: "POST",
    body: JSON.stringify({
      ...values,
      tenantId: tenantConfig.tenantId,
      source: "web",
      metadata: {
        userAgent: request.headers.get("user-agent"),
        referrer: request.headers.get("referer"),
      },
    }),
  });
}

export async function createAdminOpsBooking(values: BookingFormValues) {
  await opsFetch<OpsBookingCreateResult>("/bookings", {
    method: "POST",
    body: JSON.stringify({
      ...values,
      tenantId: tenantConfig.tenantId,
      source: "admin",
      metadata: {
        createdBy: "admin-board",
      },
    }),
  });

  return fetchOpsDashboard();
}

export async function fetchOpsDashboard(): Promise<OpsDashboard> {
  if (!opsBackendReadiness.connected) {
    return createSetupDashboard();
  }

  return opsFetch<OpsDashboard>(`/admin/dashboard?tenantId=${tenantConfig.tenantId}`);
}

export async function updateOpsBookingStatus(
  bookingId: string,
  updates:
    | BookingRequestStatus
    | ({
        status?: BookingRequestStatus;
        pipelineStage?: PipelineStage;
      } & Partial<BookingFormValues>),
) {
  return opsFetch<OpsDashboard>(`/admin/bookings/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...(typeof updates === "string" ? { status: updates } : updates),
      tenantId: tenantConfig.tenantId,
    }),
  });
}

export async function createOpsTripFromBooking(bookingId: string) {
  return opsFetch<OpsDashboard>("/admin/trips", {
    method: "POST",
    body: JSON.stringify({
      bookingId,
      tenantId: tenantConfig.tenantId,
    }),
  });
}

export async function createOpsGuide(values: {
  name: string;
  role: string;
  gender?: string;
  regions: string[];
  languages: string[];
  certifications: string[];
  active: boolean;
}) {
  return opsFetch<OpsDashboard>("/admin/guides", {
    method: "POST",
    body: JSON.stringify({
      ...values,
      tenantId: tenantConfig.tenantId,
    }),
  });
}

export async function updateOpsGuide(
  guideId: string,
  values: {
    name: string;
    role: string;
    gender?: string;
    regions: string[];
    languages: string[];
    certifications: string[];
    active: boolean;
  },
) {
  return opsFetch<OpsDashboard>(`/admin/guides/${guideId}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...values,
      tenantId: tenantConfig.tenantId,
    }),
  });
}

export async function assignOpsGuideToTrip(tripId: string, guideId: string) {
  return opsFetch<OpsDashboard>("/admin/assignments", {
    method: "POST",
    body: JSON.stringify({
      tripId,
      guideId,
      tenantId: tenantConfig.tenantId,
      role: "Lead guide",
    }),
  });
}

export async function removeOpsGuideAssignment(assignmentId: string) {
  return opsFetch<OpsDashboard>(`/admin/assignments/${assignmentId}`, {
    method: "DELETE",
    body: JSON.stringify({
      tenantId: tenantConfig.tenantId,
    }),
  });
}
