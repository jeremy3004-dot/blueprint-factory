import {
  createDemoDashboard,
  demoDashboardWithBooking,
} from "../data/ops-demo.ts";
import { tenantConfig } from "../data/tenant.ts";
import type {
  BookingApiResult,
  BookingFormValues,
  BookingRequestStatus,
  OpsDashboard,
  OpsGuide,
  OpsReadiness,
  PipelineStage,
} from "./ops-types.ts";

const opsApiUrl = process.env.OPS_API_URL?.replace(/\/$/, "");
const opsApiToken = process.env.OPS_API_TOKEN;

export const opsBackendReadiness: OpsReadiness = {
  connected: Boolean(opsApiUrl && opsApiToken),
  urlConfigured: Boolean(opsApiUrl),
  tokenConfigured: Boolean(opsApiToken),
};

export const opsReadiness = {
  mode: opsBackendReadiness.connected ? "connected" : "setup-required",
  connected: opsBackendReadiness.connected,
  message: opsBackendReadiness.connected
    ? "Ops backend is connected."
    : "Ops backend setup required. Configure OPS_API_URL and OPS_API_TOKEN for durable admin writes.",
};

export function opsSetupRequiredMessage() {
  const missing = [
    opsBackendReadiness.urlConfigured ? null : "OPS_API_URL",
    opsBackendReadiness.tokenConfigured ? null : "OPS_API_TOKEN",
  ].filter(Boolean);

  return `Ops backend setup required${missing.length ? `: add ${missing.join(" and ")}` : ""}.`;
}

async function opsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!opsApiUrl || !opsApiToken) {
    throw new Error(opsSetupRequiredMessage());
  }

  const response = await fetch(`${opsApiUrl}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${opsApiToken}`,
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String(payload.message)
        : `Ops backend request failed with ${response.status}.`;
    throw new Error(message);
  }

  return payload as T;
}

export async function fetchOpsDashboard(): Promise<OpsDashboard> {
  if (!opsBackendReadiness.connected) {
    return createDemoDashboard();
  }

  try {
    return await opsFetch<OpsDashboard>(`/admin/dashboard?tenantId=${tenantConfig.tenantId}`);
  } catch (error) {
    console.error("Ops backend dashboard fetch failed", error);
    return createDemoDashboard();
  }
}

export async function createPublicOpsBooking(
  values: BookingFormValues,
  request: Request,
): Promise<BookingApiResult> {
  if (!opsBackendReadiness.connected) {
    return {
      accepted: false,
      stored: false,
      provider: "preview",
      message:
        "Alpine Bloom proposal preview is open, but online booking storage is not connected yet. Please contact the team directly before making travel plans.",
    };
  }

  try {
    return await opsFetch<BookingApiResult>("/bookings", {
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
  } catch (error) {
    console.error("Ops backend booking create failed", error);

    return {
      accepted: false,
      stored: false,
      provider: "preview",
      message:
        "Alpine Bloom could not store this proposal request right now. Please contact the team directly before making travel plans.",
    };
  }
}

export async function createAdminOpsBooking(values: BookingFormValues) {
  await opsFetch<BookingApiResult>("/bookings", {
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

export async function updateOpsBooking(
  bookingId: string,
  updates: Partial<BookingFormValues> & {
    status?: BookingRequestStatus;
    pipelineStage?: PipelineStage;
  },
) {
  return opsFetch<OpsDashboard>(`/admin/bookings/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...updates,
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

export async function assignOpsGuideToTrip(tripId: string, guideId: string) {
  return opsFetch<OpsDashboard>("/admin/assignments", {
    method: "POST",
    body: JSON.stringify({
      tripId,
      guideId,
      role: "Lead women guide",
      tenantId: tenantConfig.tenantId,
    }),
  });
}

export async function removeOpsGuideAssignment(assignmentId: string) {
  return opsFetch<OpsDashboard>(
    `/admin/assignments/${assignmentId}?tenantId=${tenantConfig.tenantId}`,
    {
    method: "DELETE",
    body: JSON.stringify({
      tenantId: tenantConfig.tenantId,
    }),
    },
  );
}

export async function createOpsGuide(values: Omit<OpsGuide, "id" | "slug" | "gender">) {
  return opsFetch<OpsDashboard>("/admin/guides", {
    method: "POST",
    body: JSON.stringify({
      ...values,
      gender: "woman",
      tenantId: tenantConfig.tenantId,
    }),
  });
}

export async function updateOpsGuide(
  guideId: string,
  updates: Partial<Omit<OpsGuide, "id" | "slug" | "gender">>,
) {
  return opsFetch<OpsDashboard>(`/admin/guides/${guideId}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...updates,
      gender: "woman",
      tenantId: tenantConfig.tenantId,
    }),
  });
}
