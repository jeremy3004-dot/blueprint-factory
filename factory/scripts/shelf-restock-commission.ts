// Structured shelf restock commissions from the Operator Console Restock tab.

import type { NewTaskInput } from "./console-data";

/** Canonical donor-shelf sectors (matches docs/donor-shelf.md field labels). */
export const DONOR_SHELF_SECTORS = [
  "Trekking / luxury adventure",
  "Trekking / group adventure",
  "Boutique hotels / ultra-luxury",
  "Boutique hotels / mid-tier",
  "Restaurants / cafes",
  "Wellness / yoga retreats",
  "NGOs / nonprofits",
  "Real estate",
  "Education",
  "Coffee / tea / export",
  "Gyms / fitness",
  "Photographers / weddings",
  "Tech / SaaS"
] as const;

export type DonorShelfSector = (typeof DONOR_SHELF_SECTORS)[number];

export type ShelfRestockTarget = {
  field: string;
  count: number;
};

export type ShelfRestockCommission = {
  targets: ShelfRestockTarget[];
  notes?: string;
  totalCap?: number;
};

const MAX_PER_FIELD = 5;
const MAX_TOTAL_TARGETS = 20;

function normalizeField(field: string): string {
  return field.trim().replace(/\s+/g, " ");
}

export function validateShelfRestockCommission(body: unknown): ShelfRestockCommission {
  if (!body || typeof body !== "object") throw new Error("Invalid body");
  const { targets, notes, totalCap } = body as Record<string, unknown>;

  if (!Array.isArray(targets) || targets.length === 0) {
    throw new Error("At least one target area is required");
  }

  const parsed: ShelfRestockTarget[] = [];
  for (const item of targets) {
    if (!item || typeof item !== "object") throw new Error("Each target must be an object");
    const { field, count } = item as Record<string, unknown>;
    if (typeof field !== "string" || !field.trim()) throw new Error("Each target needs a field name");
    const normalized = normalizeField(field);
    const n = typeof count === "number" ? count : Number(count);
    if (!Number.isFinite(n) || n < 1 || n > MAX_PER_FIELD) {
      throw new Error(`Count for "${normalized}" must be 1–${MAX_PER_FIELD}`);
    }
    parsed.push({ field: normalized, count: Math.floor(n) });
  }

  const total = parsed.reduce((sum, t) => sum + t.count, 0);
  if (total > MAX_TOTAL_TARGETS) {
    throw new Error(`Total donors requested (${total}) exceeds maximum (${MAX_TOTAL_TARGETS})`);
  }

  let cap: number | undefined;
  if (totalCap != null && totalCap !== "") {
    const n = typeof totalCap === "number" ? totalCap : Number(totalCap);
    if (!Number.isFinite(n) || n < 1) throw new Error("totalCap must be a positive number");
    cap = Math.floor(n);
    if (cap < total) {
      throw new Error(`totalCap (${cap}) is less than sum of per-field counts (${total})`);
    }
  }

  return {
    targets: parsed,
    notes: typeof notes === "string" && notes.trim() ? notes.trim() : undefined,
    totalCap: cap
  };
}

/** Short human summary for console UI and job titles. */
export function formatCommissionSummary(commission: ShelfRestockCommission): string {
  const parts = commission.targets.map((t) => {
    const label = t.count === 1 ? t.field : `${t.count} × ${t.field}`;
    return label;
  });
  const total = commission.targets.reduce((sum, t) => sum + t.count, 0);
  const cap =
    commission.totalCap != null && commission.totalCap !== total
      ? ` (cap ${commission.totalCap})`
      : "";
  return `Find ${parts.join(" + ")} donors (${total} total${cap})`;
}

/** One-line Job Card restock request for legacy call-phrase compatibility. */
export function formatRestockRequestLine(commission: ShelfRestockCommission): string {
  const lines = commission.targets.map((t) => `${t.count} donor(s) for ${t.field}`);
  let text = `Find ${lines.join("; ")}. Use beauty audition. Fill emptiest shelf slots.`;
  if (commission.totalCap != null) {
    text += ` Total cap: ${commission.totalCap}.`;
  }
  return text;
}

export function commissionToJson(commission: ShelfRestockCommission): string {
  const payload: Record<string, unknown> = {
    targets: commission.targets.map((t) => ({ field: t.field, count: t.count }))
  };
  if (commission.notes) payload.notes = commission.notes;
  if (commission.totalCap != null) payload.totalCap = commission.totalCap;
  return JSON.stringify(payload, null, 2);
}

export function buildStructuredJobCardMarkdown(commission: ShelfRestockCommission, jobId?: string): string {
  const lines = [
    "- **Commission type:** structured multi-field restock (Operator Console)",
    "",
    "```json",
    commissionToJson(commission),
    "```",
    "",
    `- **Summary:** ${formatRestockRequestLine(commission)}`
  ];
  if (commission.notes) {
    lines.push(`- **Notes:** ${commission.notes}`);
  }
  if (jobId) {
    lines.push(`- **Console job:** \`factory/inbox/jobs/${jobId}.json\``);
  }
  return lines.join("\n");
}

export function buildRestockCallPhrase(commission: ShelfRestockCommission): string {
  const parts = [
    "Restock the donor shelf. Read factory/playbooks/master-shelf-stocking-prompt.md.",
    `Job Card: ${formatRestockRequestLine(commission)}`,
    `Structured commission:\n${commissionToJson(commission)}`
  ];
  if (commission.notes) parts.push(`Notes: ${commission.notes}`);
  return parts.join(" ");
}

export function buildRestockTaskInput(
  commission: ShelfRestockCommission,
  jobId?: string
): NewTaskInput & { restockCommission: ShelfRestockCommission } {
  return {
    taskType: "restock_shelf",
    restockRequest: formatRestockRequestLine(commission),
    restockCommission: commission,
    notes: jobId
      ? commission.notes
        ? `${commission.notes}\n\nConsole job: ${jobId}`
        : `Console job: ${jobId}`
      : commission.notes
  };
}

export function shelfRestockJobTitle(commission: ShelfRestockCommission): string {
  const total = commission.targets.reduce((sum, t) => sum + t.count, 0);
  const fields = commission.targets.length;
  if (fields === 1) {
    const t = commission.targets[0];
    return `Shelf restock — ${t.count}× ${t.field}`;
  }
  return `Shelf restock — ${total} donors across ${fields} sectors`;
}
