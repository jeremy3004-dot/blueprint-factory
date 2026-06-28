type BookingStatus = "new" | "contacted" | "proposal_sent" | "confirmed" | "lost";
type PipelineStage =
  | "first_contact"
  | "qualified"
  | "proposal"
  | "scheduled"
  | "on_trek"
  | "completed"
  | "lost";
type TripStatus = "draft" | "held" | "confirmed" | "completed" | "cancelled";

type Env = {
  DB: D1Database;
  OPS_API_TOKEN?: string;
  DEFAULT_TENANT_ID?: string;
  TEAM_EMAIL?: string;
  EMAIL_FROM?: string;
  BOOKING_EMAIL?: EmailSender;
  TEAM_EMAIL_SERVICE?: EmailSender;
};

type EmailSender = {
  send: (message: unknown) => Promise<unknown>;
};

type D1Database = {
  prepare: (query: string) => D1PreparedStatement;
  batch: (statements: D1PreparedStatement[]) => Promise<D1Result[]>;
};

type D1PreparedStatement = {
  bind: (...values: unknown[]) => D1PreparedStatement;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  all: <T = Record<string, unknown>>() => Promise<{ results?: T[] }>;
  run: () => Promise<D1Result>;
};

type D1Result = {
  success: boolean;
  meta?: { changes?: number };
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type Row = Record<string, unknown>;

const BOOKING_STATUSES = new Set<BookingStatus>([
  "new",
  "contacted",
  "proposal_sent",
  "confirmed",
  "lost",
]);

const PIPELINE_STAGES = new Set<PipelineStage>([
  "first_contact",
  "qualified",
  "proposal",
  "scheduled",
  "on_trek",
  "completed",
  "lost",
]);

const BOOKING_SOURCES = new Set(["web", "admin", "import"]);

const TRIP_STATUSES = new Set<TripStatus>([
  "draft",
  "held",
  "confirmed",
  "completed",
  "cancelled",
]);

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "access-control-allow-headers": "authorization,content-type",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      if (url.pathname === "/health" && request.method === "GET") {
        return json({ ok: true, provider: "cloudflare-d1", generatedAt: nowIso() });
      }

      requireAuth(request, env);

      if (url.pathname === "/bookings" && request.method === "POST") {
        return createBooking(request, env);
      }

      if (url.pathname === "/admin/dashboard" && request.method === "GET") {
        const tenantId = requireTenant(url.searchParams.get("tenantId") ?? undefined, env);
        return json(await dashboard(env, tenantId));
      }

      const bookingMatch = url.pathname.match(/^\/admin\/bookings\/([^/]+)$/);
      if (bookingMatch && request.method === "PATCH") {
        return updateBookingStatus(request, env, bookingMatch[1]);
      }

      if (url.pathname === "/admin/trips" && request.method === "POST") {
        return createTripFromBooking(request, env);
      }

      if (url.pathname === "/admin/guides" && request.method === "POST") {
        return createGuide(request, env);
      }

      const guideMatch = url.pathname.match(/^\/admin\/guides\/([^/]+)$/);
      if (guideMatch && request.method === "PATCH") {
        return updateGuide(request, env, guideMatch[1]);
      }

      if (url.pathname === "/admin/assignments" && request.method === "POST") {
        return assignGuide(request, env);
      }

      const assignmentMatch = url.pathname.match(/^\/admin\/assignments\/([^/]+)$/);
      if (assignmentMatch && request.method === "DELETE") {
        return unassignGuide(request, env, assignmentMatch[1]);
      }

      return error(404, "not_found", "Route not found.");
    } catch (err) {
      if (err instanceof ApiError) {
        return error(err.status, err.code, err.message, err.details);
      }

      console.error("Unhandled ops API error", err);
      return error(500, "internal_error", "Unexpected ops API error.");
    }
  },
};

async function createBooking(request: Request, env: Env) {
  const body = await readBody(request);
  const tenantId = requireTenant(stringField(body, "tenantId"), env);
  await ensureTenant(env, tenantId);

  const id = crypto.randomUUID();
  const createdAt = nowIso();
  const payload = normalizeBookingPayload(body);

  await env.DB.prepare(
    `INSERT INTO booking_requests (
      id, tenant_id, status, source, full_name, email, departure_window,
      route_slug, group_size, style, addons_json, notes, metadata_json,
      created_at, updated_at
    ) VALUES (?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      tenantId,
      payload.source,
      payload.fullName,
      payload.email,
      payload.departureWindow,
      payload.routeSlug,
      payload.groupSize,
      payload.style,
      JSON.stringify(payload.addons),
      payload.notes,
      JSON.stringify(payload.metadata),
      createdAt,
      createdAt,
    )
    .run();

  const emailSent = await sendBookingEmail(env, tenantId, id, payload);
  await audit(env, tenantId, "booking_request", id, "booking.created", {
    source: payload.source,
    emailSent,
  });

  return json(
    {
      accepted: true,
      stored: true,
      bookingId: id,
      emailSent,
      provider: "cloudflare-ops",
      message: "Booking request received.",
    },
    201,
  );
}

async function updateBookingStatus(request: Request, env: Env, bookingId: string) {
  const body = await readBody(request);
  const tenantId = requireTenant(stringField(body, "tenantId"), env);
  const status = stringField(body, "status");
  const pipelineStage = stringField(body, "pipelineStage");
  const fieldUpdates: Array<{ column: string; value: unknown }> = [];

  if (status && !BOOKING_STATUSES.has(status as BookingStatus)) {
    throw new ApiError(400, "invalid_status", "Booking status is not valid.");
  }

  if (pipelineStage && !PIPELINE_STAGES.has(pipelineStage as PipelineStage)) {
    throw new ApiError(400, "invalid_pipeline_stage", "Pipeline stage is not valid.");
  }

  for (const [bodyKey, column] of [
    ["fullName", "full_name"],
    ["email", "email"],
    ["departureWindow", "departure_window"],
    ["routeSlug", "route_slug"],
    ["groupSize", "group_size"],
    ["style", "style"],
    ["notes", "notes"],
  ] as const) {
    if (bodyKey in body) {
      const value = bodyKey === "notes" ? stringField(body, bodyKey) ?? "" : requiredString(body, bodyKey);
      fieldUpdates.push({ column, value });
    }
  }

  if ("addons" in body) {
    fieldUpdates.push({ column: "addons_json", value: JSON.stringify(arrayField(body, "addons")) });
  }

  if (!status && !pipelineStage && fieldUpdates.length === 0) {
    throw new ApiError(400, "empty_update", "No booking update was provided.");
  }

  const nextStage =
    pipelineStage || (status ? pipelineStageFromBookingStatus(status as BookingStatus) : undefined);
  const nextStatus =
    status || (pipelineStage ? bookingStatusFromPipelineStage(pipelineStage as PipelineStage) : undefined);

  if (nextStatus && nextStage) {
    fieldUpdates.push({ column: "status", value: nextStatus });
    fieldUpdates.push({ column: "pipeline_stage", value: nextStage });
  }

  const assignments = fieldUpdates.map((update) => `${update.column} = ?`).join(", ");
  const updatedAt = nowIso();
  const result = await env.DB.prepare(
    `UPDATE booking_requests SET ${assignments}, updated_at = ? WHERE id = ? AND tenant_id = ?`,
  )
    .bind(...fieldUpdates.map((update) => update.value), updatedAt, bookingId, tenantId)
    .run();

  if (!result.meta?.changes) {
    throw new ApiError(404, "booking_not_found", "Booking request was not found.");
  }

  await audit(env, tenantId, "booking_request", bookingId, "booking.status_updated", {
    status: nextStatus ?? null,
    pipelineStage: nextStage ?? null,
    fields: fieldUpdates.map((update) => update.column),
  });
  return json(await dashboard(env, tenantId));
}

async function createTripFromBooking(request: Request, env: Env) {
  const body = await readBody(request);
  const tenantId = requireTenant(stringField(body, "tenantId"), env);
  const bookingId = requiredString(body, "bookingId");

  const booking = await env.DB.prepare(
    "SELECT * FROM booking_requests WHERE id = ? AND tenant_id = ?",
  )
    .bind(bookingId, tenantId)
    .first<Row>();

  if (!booking) {
    throw new ApiError(404, "booking_not_found", "Booking request was not found.");
  }

  const existing = await env.DB.prepare(
    "SELECT id FROM trips WHERE booking_request_id = ? AND tenant_id = ? LIMIT 1",
  )
    .bind(bookingId, tenantId)
    .first<Row>();

  if (existing) {
    throw new ApiError(409, "trip_exists", "A trip already exists for this booking request.");
  }

  const tripId = crypto.randomUUID();
  const createdAt = nowIso();
  const dates = inferTripDates(String(booking.departure_window ?? ""), body);
  const name = `${String(booking.full_name ?? "Guest")} - ${String(booking.route_slug ?? "trek")}`;
  const status = parseTripStatus(stringField(body, "status") || "held");

  await env.DB.prepare(
    `INSERT INTO trips (
      id, tenant_id, booking_request_id, name, route_slug, start_date, end_date,
      status, traveler_count, notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      tripId,
      tenantId,
      bookingId,
      stringField(body, "name") || name,
      String(booking.route_slug ?? ""),
      dates.startDate,
      dates.endDate,
      status,
      groupSizeToCount(String(booking.group_size ?? "")),
      String(booking.notes ?? ""),
      createdAt,
      createdAt,
    )
    .run();

  await env.DB.prepare(
    "UPDATE booking_requests SET status = 'confirmed', pipeline_stage = 'scheduled', updated_at = ? WHERE id = ? AND tenant_id = ?",
  )
    .bind(createdAt, bookingId, tenantId)
    .run();

  await audit(env, tenantId, "trip", tripId, "trip.created_from_booking", { bookingId });
  return json(await dashboard(env, tenantId), 201);
}

async function createGuide(request: Request, env: Env) {
  const body = await readBody(request);
  const tenantId = requireTenant(stringField(body, "tenantId"), env);
  await ensureTenant(env, tenantId);

  const name = requiredString(body, "name");
  const role = stringField(body, "role") || "Trekking guide";
  const slug = await uniqueGuideSlug(env, tenantId, stringField(body, "slug") || slugify(name));
  const gender = stringField(body, "gender") || "";
  const regions = arrayField(body, "regions");
  const languages = arrayField(body, "languages");
  const certifications = arrayField(body, "certifications");
  const active = body.active === undefined ? 1 : body.active ? 1 : 0;
  const guideId = crypto.randomUUID();
  const createdAt = nowIso();

  await env.DB.prepare(
    `INSERT INTO guides (
      id, tenant_id, slug, name, role, gender, regions_json, languages_json,
      certifications_json, active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      guideId,
      tenantId,
      slug,
      name,
      role,
      gender,
      JSON.stringify(regions),
      JSON.stringify(languages),
      JSON.stringify(certifications),
      active,
      createdAt,
      createdAt,
    )
    .run();

  await audit(env, tenantId, "guide", guideId, "guide.created", { slug, source: "admin" });
  return json(await dashboard(env, tenantId), 201);
}

async function updateGuide(request: Request, env: Env, guideId: string) {
  const body = await readBody(request);
  const tenantId = requireTenant(stringField(body, "tenantId"), env);
  const name = requiredString(body, "name");
  const role = stringField(body, "role") || "Trekking guide";
  const gender = stringField(body, "gender") || "";
  const regions = arrayField(body, "regions");
  const languages = arrayField(body, "languages");
  const certifications = arrayField(body, "certifications");
  const active = body.active === undefined ? 1 : body.active ? 1 : 0;
  const updatedAt = nowIso();

  const result = await env.DB.prepare(
    `UPDATE guides
     SET name = ?, role = ?, gender = ?, regions_json = ?, languages_json = ?,
       certifications_json = ?, active = ?, updated_at = ?
     WHERE id = ? AND tenant_id = ?`,
  )
    .bind(
      name,
      role,
      gender,
      JSON.stringify(regions),
      JSON.stringify(languages),
      JSON.stringify(certifications),
      active,
      updatedAt,
      guideId,
      tenantId,
    )
    .run();

  if (!result.meta?.changes) {
    throw new ApiError(404, "guide_not_found", "Guide was not found.");
  }

  await audit(env, tenantId, "guide", guideId, "guide.updated", {});
  return json(await dashboard(env, tenantId));
}

async function assignGuide(request: Request, env: Env) {
  const body = await readBody(request);
  const tenantId = requireTenant(stringField(body, "tenantId"), env);
  const tripId = requiredString(body, "tripId");
  const guideId = requiredString(body, "guideId");
  const role = stringField(body, "role") || "Lead guide";

  const trip = await env.DB.prepare("SELECT * FROM trips WHERE id = ? AND tenant_id = ?")
    .bind(tripId, tenantId)
    .first<Row>();
  const guide = await env.DB.prepare("SELECT * FROM guides WHERE id = ? AND tenant_id = ? AND active = 1")
    .bind(guideId, tenantId)
    .first<Row>();

  if (!trip) throw new ApiError(404, "trip_not_found", "Trip was not found.");
  if (!guide) throw new ApiError(404, "guide_not_found", "Guide was not found or is inactive.");

  const conflicts = await guideConflicts(
    env,
    tenantId,
    guideId,
    String(trip.start_date),
    String(trip.end_date),
    tripId,
  );

  if (conflicts.length > 0) {
    throw new ApiError(409, "guide_conflict", "Guide has overlapping commitments.", { conflicts });
  }

  const existing = await env.DB.prepare(
    "SELECT id FROM trip_guides WHERE tenant_id = ? AND trip_id = ? AND guide_id = ? LIMIT 1",
  )
    .bind(tenantId, tripId, guideId)
    .first<Row>();

  if (existing) {
    return json(await dashboard(env, tenantId));
  }

  const assignmentId = crypto.randomUUID();
  const createdAt = nowIso();
  await env.DB.prepare(
    `INSERT INTO trip_guides (
      id, tenant_id, trip_id, guide_id, role, start_date, end_date, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      assignmentId,
      tenantId,
      tripId,
      guideId,
      role,
      String(trip.start_date),
      String(trip.end_date),
      createdAt,
      createdAt,
    )
    .run();

  await audit(env, tenantId, "trip_guide", assignmentId, "guide.assigned", { tripId, guideId, role });
  return json(await dashboard(env, tenantId), 201);
}

async function unassignGuide(request: Request, env: Env, assignmentId: string) {
  const body = await readBody(request);
  const tenantId = requireTenant(stringField(body, "tenantId"), env);

  const result = await env.DB.prepare("DELETE FROM trip_guides WHERE id = ? AND tenant_id = ?")
    .bind(assignmentId, tenantId)
    .run();

  if (!result.meta?.changes) {
    throw new ApiError(404, "assignment_not_found", "Guide assignment was not found.");
  }

  await audit(env, tenantId, "trip_guide", assignmentId, "guide.unassigned", {});
  return json(await dashboard(env, tenantId));
}

async function dashboard(env: Env, tenantId: string) {
  await ensureTenant(env, tenantId);
  const tenant = await env.DB.prepare("SELECT * FROM tenants WHERE id = ?").bind(tenantId).first<Row>();
  const [bookings, guides, trips, assignments, conflicts] = await Promise.all([
    env.DB.prepare(
      "SELECT * FROM booking_requests WHERE tenant_id = ? ORDER BY created_at DESC LIMIT 100",
    )
      .bind(tenantId)
      .all<Row>(),
    env.DB.prepare("SELECT * FROM guides WHERE tenant_id = ? ORDER BY name").bind(tenantId).all<Row>(),
    env.DB.prepare(
      "SELECT * FROM trips WHERE tenant_id = ? ORDER BY start_date DESC, created_at DESC LIMIT 100",
    )
      .bind(tenantId)
      .all<Row>(),
    env.DB.prepare(
      `SELECT tg.*, g.name AS guide_name, g.slug AS guide_slug
       FROM trip_guides tg
       JOIN guides g ON g.id = tg.guide_id
       WHERE tg.tenant_id = ?
       ORDER BY tg.start_date`,
    )
      .bind(tenantId)
      .all<Row>(),
    env.DB.prepare(
      `SELECT gu.*, g.name AS guide_name
       FROM guide_unavailability gu
       JOIN guides g ON g.id = gu.guide_id
       WHERE gu.tenant_id = ? AND gu.end_date >= date('now')
       ORDER BY gu.start_date
       LIMIT 50`,
    )
      .bind(tenantId)
      .all<Row>(),
  ]);

  const assignmentsByTrip = new Map<string, Row[]>();
  for (const assignment of assignments.results ?? []) {
    const key = String(assignment.trip_id);
    assignmentsByTrip.set(key, [...(assignmentsByTrip.get(key) ?? []), assignment]);
  }

  return {
    provider: "cloudflare-d1",
    tenantId,
    tenantName: String(tenant?.name ?? tenantId),
    generatedAt: nowIso(),
    bookings: (bookings.results ?? []).map(formatBooking),
    guides: (guides.results ?? []).map(formatGuide),
    trips: (trips.results ?? []).map((trip) => formatTrip(trip, assignmentsByTrip.get(String(trip.id)) ?? [])),
    conflicts: (conflicts.results ?? []).map((conflict) => ({
      guideId: String(conflict.guide_id),
      guideName: String(conflict.guide_name),
      startDate: String(conflict.start_date),
      endDate: String(conflict.end_date),
      reason: String(conflict.reason),
    })),
  };
}

async function guideConflicts(
  env: Env,
  tenantId: string,
  guideId: string,
  startDate: string,
  endDate: string,
  tripId: string,
) {
  const [tripConflicts, unavailable] = await Promise.all([
    env.DB.prepare(
      `SELECT tg.*, t.name AS trip_name, g.name AS guide_name
       FROM trip_guides tg
       JOIN trips t ON t.id = tg.trip_id
       JOIN guides g ON g.id = tg.guide_id
       WHERE tg.tenant_id = ?
         AND tg.guide_id = ?
         AND tg.trip_id != ?
         AND t.status NOT IN ('completed', 'cancelled')
         AND tg.start_date <= ?
         AND tg.end_date >= ?`,
    )
      .bind(tenantId, guideId, tripId, endDate, startDate)
      .all<Row>(),
    env.DB.prepare(
      `SELECT gu.*, g.name AS guide_name
       FROM guide_unavailability gu
       JOIN guides g ON g.id = gu.guide_id
       WHERE gu.tenant_id = ?
         AND gu.guide_id = ?
         AND gu.start_date <= ?
         AND gu.end_date >= ?`,
    )
      .bind(tenantId, guideId, endDate, startDate)
      .all<Row>(),
  ]);

  return [
    ...(tripConflicts.results ?? []).map((row) => ({
      guideId,
      guideName: String(row.guide_name),
      tripId: String(row.trip_id),
      tripName: String(row.trip_name),
      startDate: String(row.start_date),
      endDate: String(row.end_date),
      reason: "Assigned to another active trip.",
    })),
    ...(unavailable.results ?? []).map((row) => ({
      guideId,
      guideName: String(row.guide_name),
      startDate: String(row.start_date),
      endDate: String(row.end_date),
      reason: String(row.reason),
    })),
  ];
}

async function sendBookingEmail(
  env: Env,
  tenantId: string,
  bookingId: string,
  payload: ReturnType<typeof normalizeBookingPayload>,
) {
  const sender = env.BOOKING_EMAIL ?? env.TEAM_EMAIL_SERVICE;
  if (payload.source === "admin" || !sender || !env.TEAM_EMAIL) return false;

  const subject = `New trekking booking: ${payload.fullName}`;
  const text = [
    `Tenant: ${tenantId}`,
    `Booking ID: ${bookingId}`,
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Route: ${payload.routeSlug}`,
    `Departure: ${payload.departureWindow}`,
    `Group size: ${payload.groupSize}`,
    `Style: ${payload.style}`,
    `Add-ons: ${payload.addons.join(", ") || "None"}`,
    `Notes: ${payload.notes || "None"}`,
  ].join("\n");

  try {
    await sender.send({
      from: env.EMAIL_FROM ?? env.TEAM_EMAIL,
      to: env.TEAM_EMAIL,
      subject,
      text,
    });
    return true;
  } catch (err) {
    console.error("Booking email failed", err);
    return false;
  }
}

async function ensureTenant(env: Env, tenantId: string) {
  const exists = await env.DB.prepare("SELECT id FROM tenants WHERE id = ?").bind(tenantId).first<Row>();
  if (exists) return;

  const createdAt = nowIso();
  await env.DB.prepare(
    "INSERT INTO tenants (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)",
  )
    .bind(tenantId, tenantId, createdAt, createdAt)
    .run();
}

async function audit(env: Env, tenantId: string, entityType: string, entityId: string, action: string, details: JsonValue) {
  await env.DB.prepare(
    `INSERT INTO audit_events (
      id, tenant_id, actor_type, entity_type, entity_id, action, details_json, created_at
    ) VALUES (?, ?, 'system', ?, ?, ?, ?, ?)`,
  )
    .bind(crypto.randomUUID(), tenantId, entityType, entityId, action, JSON.stringify(details), nowIso())
    .run();
}

function normalizeBookingPayload(body: Row) {
  const source = stringField(body, "source") || "web";
  if (!BOOKING_SOURCES.has(source)) {
    throw new ApiError(400, "invalid_source", "Booking source is not valid.");
  }

  return {
    source,
    fullName: requiredString(body, "fullName"),
    email: requiredString(body, "email"),
    departureWindow: requiredString(body, "departureWindow"),
    routeSlug: requiredString(body, "routeSlug"),
    groupSize: requiredString(body, "groupSize"),
    style: requiredString(body, "style"),
    addons: arrayField(body, "addons"),
    notes: stringField(body, "notes"),
    metadata: objectField(body, "metadata"),
  };
}

function formatBooking(row: Row) {
  const status = String(row.status) as BookingStatus;
  return {
    id: String(row.id),
    status,
    pipelineStage: row.pipeline_stage
      ? String(row.pipeline_stage)
      : pipelineStageFromBookingStatus(status),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    source: String(row.source),
    fullName: String(row.full_name),
    email: String(row.email),
    departureWindow: String(row.departure_window),
    routeSlug: String(row.route_slug),
    groupSize: String(row.group_size),
    style: String(row.style),
    addons: parseJson<string[]>(row.addons_json, []),
    notes: String(row.notes ?? ""),
  };
}

function pipelineStageFromBookingStatus(status: BookingStatus): PipelineStage {
  switch (status) {
    case "new":
      return "first_contact";
    case "contacted":
      return "qualified";
    case "proposal_sent":
      return "proposal";
    case "confirmed":
      return "scheduled";
    case "lost":
      return "lost";
  }
}

function bookingStatusFromPipelineStage(stage: PipelineStage): BookingStatus {
  switch (stage) {
    case "first_contact":
      return "new";
    case "qualified":
      return "contacted";
    case "proposal":
      return "proposal_sent";
    case "scheduled":
    case "on_trek":
    case "completed":
      return "confirmed";
    case "lost":
      return "lost";
  }
}

function formatGuide(row: Row) {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    role: String(row.role),
    gender: String(row.gender ?? ""),
    regions: parseJson<string[]>(row.regions_json, []),
    languages: parseJson<string[]>(row.languages_json, []),
    certifications: parseJson<string[]>(row.certifications_json, []),
    active: Boolean(row.active),
  };
}

function formatTrip(row: Row, assignments: Row[]) {
  return {
    id: String(row.id),
    requestId: row.booking_request_id ? String(row.booking_request_id) : undefined,
    name: String(row.name),
    routeSlug: String(row.route_slug),
    startDate: String(row.start_date),
    endDate: String(row.end_date),
    status: String(row.status),
    travelerCount: Number(row.traveler_count),
    notes: String(row.notes ?? ""),
    assignedGuides: assignments.map((assignment) => ({
      id: String(assignment.id),
      guideId: String(assignment.guide_id),
      guideName: String(assignment.guide_name),
      guideSlug: String(assignment.guide_slug),
      role: String(assignment.role),
      startDate: String(assignment.start_date),
      endDate: String(assignment.end_date),
    })),
  };
}

async function readBody(request: Request): Promise<Row> {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ApiError(400, "invalid_json", "Request body must be a JSON object.");
  }

  return body as Row;
}

function requireAuth(request: Request, env: Env) {
  if (!env.OPS_API_TOKEN) {
    throw new ApiError(503, "auth_not_configured", "OPS_API_TOKEN must be configured.");
  }

  const header = request.headers.get("authorization") ?? "";
  if (header !== `Bearer ${env.OPS_API_TOKEN}`) {
    throw new ApiError(401, "unauthorized", "A valid bearer token is required.");
  }
}

function requireTenant(input: string | undefined, env: Env) {
  const tenantId = input || env.DEFAULT_TENANT_ID;
  if (!tenantId) throw new ApiError(400, "tenant_required", "tenantId is required.");
  return tenantId;
}

function parseTripStatus(value: string) {
  if (!TRIP_STATUSES.has(value as TripStatus)) {
    throw new ApiError(400, "invalid_status", "Trip status is not valid.");
  }
  return value;
}

function inferTripDates(departureWindow: string, body: Row) {
  const explicitStart = stringField(body, "startDate");
  const explicitEnd = stringField(body, "endDate");
  if (explicitStart && explicitEnd) {
    validateDateRange(explicitStart, explicitEnd);
    return { startDate: explicitStart, endDate: explicitEnd };
  }

  const matchedDate = departureWindow.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const start = matchedDate ? new Date(`${matchedDate}T00:00:00Z`) : addDays(new Date(), 45);
  const end = addDays(start, 12);
  const dates = { startDate: isoDate(start), endDate: isoDate(end) };
  validateDateRange(dates.startDate, dates.endDate);
  return dates;
}

function validateDateRange(startDate: string, endDate: string) {
  if (!isIsoDate(startDate) || !isIsoDate(endDate) || startDate > endDate) {
    throw new ApiError(400, "invalid_dates", "Trip dates must be valid YYYY-MM-DD values.");
  }
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function groupSizeToCount(value: string) {
  const count = Number(value.match(/\d+/)?.[0] ?? 1);
  return Number.isFinite(count) && count > 0 ? count : 1;
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || crypto.randomUUID();
}

async function uniqueGuideSlug(env: Env, tenantId: string, slug: string) {
  let candidate = slug;
  let suffix = 2;

  while (
    await env.DB.prepare("SELECT id FROM guides WHERE tenant_id = ? AND slug = ? LIMIT 1")
      .bind(tenantId, candidate)
      .first<Row>()
  ) {
    candidate = `${slug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function requiredString(body: Row, key: string) {
  const value = stringField(body, key);
  if (!value) throw new ApiError(400, "field_required", `${key} is required.`);
  return value;
}

function stringField(body: Row, key: string) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : undefined;
}

function arrayField(body: Row, key: string) {
  const value = body[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function objectField(body: Row, key: string) {
  const value = body[key];
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, JsonValue>) : {};
}

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json; charset=utf-8" },
  });
}

function error(status: number, code: string, message: string, details?: unknown) {
  return json({ ok: false, code, message, details }, status);
}

function nowIso() {
  return new Date().toISOString();
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
  }
}
