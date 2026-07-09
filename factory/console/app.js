/** Blueprint Factory Operator Console — client app */

let state = { clients: [], donors: [], prospects: [], prospectFilters: null, tasks: [], jobs: [], stats: {} };
let hostedMode = false;
let matchmakerSelectedDonor = null;
let jobPollTimer = null;
let toastTimer = null;
let highlightJobId = null;
let prospectView = "all";
let prospectSectorFilter = new Set();
let prospectFiltersReady = false;

const views = {
  today: { title: "Today", sub: "What needs your attention right now" },
  prospects: { title: "Find Clients", sub: "Browse, filter, favorite, and add Nepal leads" },
  donors: { title: "Design Library", sub: "Pre-captured reference sites to clone from" },
  "build-sites": { title: "Build Sites", sub: "Two ways to start — fill in details or drag a design onto a lead" },
  projects: { title: "My Projects", sub: "Client sites and where each one stands" },
  inbox: { title: "Activity", sub: "Jobs and tasks in progress" },
  // legacy keys kept for data-goto / commission strip fallbacks
  matchmaker: { title: "Build Sites", sub: "Two ways to start — fill in details or drag a design onto a lead" },
  restock: { title: "Design Library", sub: "Add new world-class designs to the library" },
  "new-job": { title: "Build Sites", sub: "Two blanks — name and website. Worker derives the rest." }
};

const statusLabels = {
  READY_FOR_HUMAN_REVIEW: { label: "Ready for review", class: "ready" },
  NEEDS_REFERENCE_FIRST: { label: "Pick a design", class: "warn" },
  NEEDS_ART_DIRECTION: { label: "Needs art direction", class: "warn" },
  CREATE_APP: { label: "Needs app", class: "muted" },
  CAPTURE_SCREENSHOTS: { label: "Needs screenshots", class: "muted" },
  CAPTURE_MOTION: { label: "Needs motion", class: "muted" },
  NEEDS_PAGE_COVERAGE: { label: "Pages incomplete", class: "warn" },
  RUN_BEAUTY: { label: "Beauty pass", class: "accent" },
  CREATE_SITE: { label: "Not created", class: "muted" },
  REPAIR_REQUIRED_FILES: { label: "Needs repair", class: "warn" },
  NEEDS_PREVIEW_URL: { label: "Needs preview", class: "muted" }
};

function $(sel) {
  return document.querySelector(sel);
}

function showToast(message, options = {}) {
  const { type = "info", duration = type === "error" ? 5500 : 4000, actionLabel, onAction } = options;
  const toast = $("#toast");
  toast.className = "toast";
  if (type === "error") toast.classList.add("toast-error");
  else if (type === "success") toast.classList.add("toast-success");

  toast.replaceChildren();
  const text = document.createElement("span");
  text.className = "toast-text";
  text.textContent = message;
  toast.appendChild(text);

  if (actionLabel && onAction) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toast-action";
    btn.textContent = actionLabel;
    btn.addEventListener("click", () => {
      onAction();
      toast.classList.add("hidden");
    });
    toast.appendChild(btn);
  }

  toast.classList.remove("hidden");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), duration);
}

function setButtonLoading(btn, loading, idleLabel) {
  if (!btn) return;
  btn.disabled = loading;
  if (loading) {
    if (!btn.dataset.idleLabel) btn.dataset.idleLabel = idleLabel || btn.textContent;
    btn.classList.add("is-loading");
    btn.textContent = "Running…";
  } else {
    btn.classList.remove("is-loading");
    btn.textContent = btn.dataset.idleLabel || idleLabel || btn.textContent;
  }
}

function sortJobs(jobs) {
  const order = { running: 0, queued: 1, failed: 2, done: 3 };
  return [...jobs].sort((a, b) => {
    const sa = order[a.status] ?? 9;
    const sb = order[b.status] ?? 9;
    if (sa !== sb) return sa - sb;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

function shortJobId(id) {
  return id.length > 32 ? `${id.slice(0, 28)}…` : id;
}

async function loadJobLogTail(jobId, pre) {
  try {
    const res = await fetchWithAuth(`/api/jobs/${encodeURIComponent(jobId)}`);
    if (res.ok) {
      const data = await res.json();
      pre.textContent = data.logTail || "(empty log)";
      pre.dataset.loaded = "1";
      return;
    }
  } catch {
    // fall through
  }
  pre.textContent = "(could not load log)";
}

function jobStatusChip(status) {
  const labels = {
    queued: "Queued",
    running: "Running",
    done: "Done",
    failed: "Failed"
  };
  return `<span class="chip job-${status}">${labels[status] ?? status}</span>`;
}

function kindLabel(kind) {
  const map = {
    prospect_search: "Lead search",
    shelf_capture: "Save design",
    shelf_restock: "Add designs",
    clone_pair: "Client build"
  };
  return map[kind] ?? kind;
}

/** Must match factory/scripts/shelf-restock-commission.ts DONOR_SHELF_SECTORS */
const RESTOCK_SECTORS = [
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
];

const RESTOCK_MAX_PER_FIELD = 5;

function chipForAction(action) {
  const info = statusLabels[action] ?? { label: action.replaceAll("_", " ").toLowerCase(), class: "muted" };
  return `<span class="chip ${info.class}">${info.label}</span>`;
}

const NEEDS_YOU_ACTIONS = new Set([
  "NEEDS_REFERENCE_FIRST",
  "NEEDS_ART_DIRECTION",
  "RUN_BEAUTY",
  "NEEDS_PAGE_COVERAGE",
  "REPAIR_REQUIRED_FILES"
]);

const WORKING_ACTIONS = new Set([
  "CREATE_SITE",
  "CREATE_APP",
  "NEEDS_PREVIEW_URL",
  "CAPTURE_SCREENSHOTS",
  "CAPTURE_MOTION"
]);

function ownerBucketForClient(client) {
  if (client.nextAction === "READY_FOR_HUMAN_REVIEW") return "ready";
  if (NEEDS_YOU_ACTIONS.has(client.nextAction)) return "needsYou";
  if (WORKING_ACTIONS.has(client.nextAction)) return "working";
  return "working";
}

function ownerBucketChip(client) {
  const bucket = ownerBucketForClient(client);
  const map = {
    ready: { label: "Ready to send", class: "ready" },
    needsYou: { label: "Needs you", class: "warn" },
    working: { label: "Working on it", class: "accent" }
  };
  const info = map[bucket];
  return `<span class="chip ${info.class}">${info.label}</span>`;
}

function handoffButtonHtml(kind) {
  const map = {
    scout: { label: "Next: pick a design and start a build", view: "build-sites" },
    build: { label: "We're building — check Today when it's ready", view: "today" },
    review: { label: "Copy link to send to the client", view: "today", focus: "today-ready" }
  };
  const info = map[kind];
  if (!info) return "";
  const attrs = [`data-handoff-view="${info.view}"`];
  if (info.focus) attrs.push(`data-handoff-focus="${info.focus}"`);
  return `<button type="button" class="ghost-btn handoff-btn" ${attrs.join(" ")}>${info.label}</button>`;
}

function appendHandoff(resultEl, kind) {
  if (!resultEl) return;
  let row = resultEl.querySelector(".handoff-row");
  if (!row) {
    resultEl.insertAdjacentHTML("beforeend", `<div class="handoff-row">${handoffButtonHtml(kind)}</div>`);
  } else {
    row.innerHTML = handoffButtonHtml(kind);
  }
  bindHandoffButtons(resultEl);
}

function bindHandoffButtons(root = document) {
  root.querySelectorAll(".handoff-btn").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      switchView(btn.dataset.handoffView);
      const focus = btn.dataset.handoffFocus;
      if (focus) {
        requestAnimationFrame(() => {
          document.getElementById(focus)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    });
  });
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function thumbHtml(thumbnail, label) {
  if (thumbnail) {
    return `<img src="${thumbnail}" alt="${label}" loading="lazy" />`;
  }
  return `<div class="placeholder">No screenshot yet</div>`;
}

function scoreClass(score) {
  if (score >= 85) return "ready";
  if (score >= 70) return "accent";
  return "muted";
}

const CLIENT_REGION_PATTERNS = {
  kathmandu: [/kathmandu/i, /thamel/i, /goldhunga/i, /jyatha/i, /paknajol/i, /raniban/i, /saat ghumti/i],
  pokhara: [/pokhara/i],
  chitwan: [/chitwan/i, /sauraha/i, /narayani/i],
  lalitpur: [/lalitpur/i, /patan/i],
  bandipur: [/bandipur/i],
  bardia: [/bardia/i, /bheri/i]
};

const CLIENT_SECTOR_PATTERNS = {
  trekking: [/trek/i, /expedition/i, /climbing/i, /peak/i, /mountain/i, /mustang/i, /annapurna/i, /everest/i],
  tourism: [/tour/i, /travel/i, /operator/i, /attraction/i],
  hospitality: [/hotel/i, /boutique/i, /resort/i, /inn/i, /stay/i, /heritage home/i, /lodge/i],
  wellness: [/yoga/i, /ayurveda/i, /meditation/i, /retreat/i, /spa/i, /wellness/i, /detox/i],
  adventure: [/paragliding/i, /rafting/i, /bungee/i, /heli/i, /safari/i, /adventure/i],
  food: [/cooking/i, /restaurant/i, /cafe/i, /food/i, /dining/i],
  tech: [/tech/i, /saas/i, /software/i, /\bai\b/i, /digital/i, /startup/i],
  business: [/ngo/i, /nonprofit/i, /export/i, /real estate/i, /education/i, /fitness/i, /gym/i, /wedding/i]
};

const CLIENT_PROSPECT_REGIONS = [
  { id: "kathmandu", label: "Kathmandu" },
  { id: "pokhara", label: "Pokhara" },
  { id: "chitwan", label: "Chitwan" },
  { id: "lalitpur", label: "Lalitpur" },
  { id: "bandipur", label: "Bandipur" },
  { id: "bardia", label: "Bardia" },
  { id: "other", label: "Other" }
];

const CLIENT_PROSPECT_SECTORS = [
  { id: "trekking", label: "Trekking" },
  { id: "tourism", label: "Tourism" },
  { id: "hospitality", label: "Hospitality" },
  { id: "wellness", label: "Wellness" },
  { id: "adventure", label: "Adventure" },
  { id: "food", label: "Food & dining" },
  { id: "tech", label: "Tech / AI" },
  { id: "business", label: "Business" },
  { id: "other", label: "Other" }
];

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeExcerpt(text) {
  if (!text) return "";
  let s = String(text).trim();
  s = s.replace(/^#{1,6}\s+/gm, "");
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/\*([^*]+)\*/g, "$1");
  s = s.replace(/`([^`]+)`/g, "$1");
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  s = s.replace(/<[^>]+>/g, "");
  const lines = s
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !/^#{1,6}\s/.test(line));
  const content = lines[0] ?? "";
  if (!content) return "";
  const sentence = content.match(/[^.!?]+[.!?]+/);
  const excerpt = sentence ? sentence[0].trim() : content.slice(0, 160);
  return escapeHtml(excerpt);
}

function inferProspectRegion(location) {
  const text = (location ?? "").trim();
  if (!text) return "other";
  for (const [id, patterns] of Object.entries(CLIENT_REGION_PATTERNS)) {
    if (patterns.some((pattern) => pattern.test(text))) return id;
  }
  return "other";
}

function inferProspectSectors(category, businessNotes) {
  const text = `${category ?? ""} ${businessNotes ?? ""}`.toLowerCase();
  const matched = Object.entries(CLIENT_SECTOR_PATTERNS)
    .filter(([, patterns]) => patterns.some((pattern) => pattern.test(text)))
    .map(([id]) => id);
  return matched.length ? [...new Set(matched)] : ["other"];
}

function prospectRegion(p) {
  if (p.region && p.region !== "other") return p.region;
  return inferProspectRegion(p.location);
}

function prospectSectors(p) {
  if (p.sectors?.length && !(p.sectors.length === 1 && p.sectors[0] === "other" && !p.category)) {
    return p.sectors;
  }
  return inferProspectSectors(p.category, p.businessNotes);
}

function enrichProspect(p) {
  return { ...p, region: prospectRegion(p), sectors: prospectSectors(p) };
}

function deriveProspectFilterMeta(prospects) {
  const regionCounts = {};
  const sectorCounts = {};
  for (const region of CLIENT_PROSPECT_REGIONS) regionCounts[region.id] = 0;
  for (const sector of CLIENT_PROSPECT_SECTORS) sectorCounts[sector.id] = 0;
  for (const p of prospects) {
    regionCounts[p.region] = (regionCounts[p.region] ?? 0) + 1;
    for (const sectorId of p.sectors) {
      sectorCounts[sectorId] = (sectorCounts[sectorId] ?? 0) + 1;
    }
  }
  return {
    regions: CLIENT_PROSPECT_REGIONS,
    sectors: CLIENT_PROSPECT_SECTORS,
    regionCounts,
    sectorCounts
  };
}

function renderSidebarStats() {
  const el = $("#sidebar-stats");
  const s = state.stats ?? {};
  const activeJobs = s.activeJobs ?? 0;
  el.innerHTML = `
    <button type="button" class="stat-pill stat-pill-btn" data-stat-goto="today" data-stat-focus="today-ready"><strong>${s.readyForReview ?? 0}</strong><span>Ready for your review</span></button>
    <button type="button" class="stat-pill stat-pill-btn" data-stat-goto="prospects"><strong>${s.prospectCount ?? 0}</strong><span>Nepal leads</span></button>
    <button type="button" class="stat-pill stat-pill-btn" data-stat-goto="projects"><strong>${s.clientCount ?? 0}</strong><span>Client projects</span></button>
    <button type="button" class="stat-pill stat-pill-btn" data-stat-goto="inbox"><strong>${(s.pendingTasks ?? 0) + activeJobs}</strong><span>Inbox / jobs</span></button>
  `;
  el.querySelectorAll("[data-stat-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchView(btn.dataset.statGoto);
      const focus = btn.dataset.statFocus;
      if (focus) {
        requestAnimationFrame(() => {
          document.getElementById(focus)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    });
  });
  const badge = $("#inbox-badge");
  badge.textContent = String((s.pendingTasks ?? 0) + activeJobs);
  badge.classList.toggle("active", activeJobs > 0);
}

const OWNER_ACTION_STATUSES = new Set([
  "NEEDS_REFERENCE_FIRST",
  "NEEDS_ART_DIRECTION",
  "RUN_BEAUTY",
  "NEEDS_PAGE_COVERAGE"
]);

function viewForNextAction(action) {
  if (action === "NEEDS_REFERENCE_FIRST") return "donors";
  if (action === "READY_FOR_HUMAN_REVIEW") return "projects";
  return "projects";
}

async function copyClientLink(url) {
  if (!url) return;
  await navigator.clipboard.writeText(url);
  showToast("Link copied — send it to the client", { type: "success" });
}

function renderToday() {
  const readyEl = $("#today-ready-list");
  const decisionEl = $("#today-decision-list");
  const workingEl = $("#today-working");
  if (!readyEl || !decisionEl || !workingEl) return;

  const clients = state.clients ?? [];
  const ready = clients.filter((c) => c.previewUrl && c.nextAction === "READY_FOR_HUMAN_REVIEW");
  const needsDecision = clients.filter((c) => OWNER_ACTION_STATUSES.has(c.nextAction));

  if (!ready.length) {
    readyEl.innerHTML = `<div class="empty compact">Nothing ready to send yet — check back when a build has a preview link and passes review.</div>`;
  } else {
    readyEl.innerHTML = ready
      .map(
        (c) => `
      <div class="today-row">
        <div class="today-row-thumb">${thumbHtml(c.thumbnail, c.title)}</div>
        <div class="today-row-body">
          <strong>${c.title}</strong>
          <span class="muted">${c.pages}</span>
        </div>
        <div class="today-row-actions">
          <a class="ghost-btn" href="${c.previewUrl}" target="_blank" rel="noreferrer">Open preview</a>
          <button type="button" class="primary-btn today-copy-link" data-preview-url="${c.previewUrl}">Copy link for client</button>
        </div>
      </div>
    `
      )
      .join("");
    readyEl.querySelectorAll(".today-copy-link").forEach((btn) => {
      btn.addEventListener("click", () => void copyClientLink(btn.dataset.previewUrl));
    });
  }

  if (!needsDecision.length) {
    decisionEl.innerHTML = `<div class="empty compact">No decisions waiting — the builder has what it needs for now.</div>`;
  } else {
    decisionEl.innerHTML = needsDecision
      .map(
        (c) => `
      <div class="today-row">
        <div class="today-row-thumb">${thumbHtml(c.thumbnail, c.title)}</div>
        <div class="today-row-body">
          <strong>${c.title}</strong>
          <p class="muted today-row-plain">${escapeHtml(c.nextActionPlain)}</p>
        </div>
        <div class="today-row-actions">
          <button type="button" class="ghost-btn today-goto" data-view="${viewForNextAction(c.nextAction)}" data-slug="${c.slug}">Review</button>
        </div>
      </div>
    `
      )
      .join("");
    decisionEl.querySelectorAll(".today-goto").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchView(btn.dataset.view);
        openDrawer(btn.dataset.slug, "client");
      });
    });
  }

  const activeJobs = (state.jobs ?? []).filter((j) => j.status === "queued" || j.status === "running");
  if (!activeJobs.length) {
    workingEl.innerHTML = `<div class="empty compact">Nothing running in the background.</div>`;
  } else {
    workingEl.innerHTML = `
      <details class="today-working-details">
        <summary>${activeJobs.length} job${activeJobs.length === 1 ? "" : "s"} working now</summary>
        <ul class="today-working-list">
          ${activeJobs.map((j) => `<li>${inboxJobTitle(j)} ${jobStatusChip(j.status)}</li>`).join("")}
        </ul>
        <button type="button" class="link-btn" data-goto="inbox">View Activity →</button>
      </details>
    `;
  }
}

function projectCardActions(c) {
  if (!c.previewUrl) return "";
  return `
    <div class="card-inline-actions">
      <a class="ghost-btn card-preview-link" href="${c.previewUrl}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()">Open preview</a>
      <button type="button" class="ghost-btn card-copy-link" data-preview-url="${c.previewUrl}" onclick="event.stopPropagation()">Copy link for client</button>
    </div>
  `;
}

function renderProjects() {
  const q = $("#project-search").value.trim().toLowerCase();
  const filter = $("#project-filter").value;
  const grid = $("#project-grid");

  let items = [...state.clients];
  if (q) {
    items = items.filter(
      (c) =>
        c.slug.includes(q) ||
        c.title.toLowerCase().includes(q) ||
        (c.briefExcerpt ?? "").toLowerCase().includes(q)
    );
  }
  if (filter === "with-preview") items = items.filter((c) => c.previewUrl);
  else if (filter !== "all") items = items.filter((c) => c.nextAction === filter);

  if (!items.length) {
    grid.innerHTML = `<div class="empty">No projects match. Try a new job or refresh.</div>`;
    return;
  }

  grid.innerHTML = items
    .map(
      (c) => `
    <article class="card" data-slug="${c.slug}" data-kind="client">
      <div class="card-thumb">${thumbHtml(c.thumbnail, c.title)}</div>
      <div class="card-body">
        ${ownerBucketChip(c)}
        <h3 class="card-title">${c.title}</h3>
        <div class="card-meta">
          <span>${c.pages}</span>
          ${
            c.compareDesktop != null
              ? `<span>Match ${c.compareDesktop}% / ${c.compareMobile ?? "—"}%</span>`
              : ""
          }
          ${c.previewUrl ? "<span>Preview live</span>" : ""}
        </div>
        ${c.briefExcerpt ? `<p class="card-excerpt">${sanitizeExcerpt(c.briefExcerpt)}</p>` : ""}
        ${projectCardActions(c)}
      </div>
    </article>
  `
    )
    .join("");

  grid.querySelectorAll(".card-copy-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      void copyClientLink(btn.dataset.previewUrl);
    });
  });
}

function tierBadgeHtml(tier) {
  if (tier >= 2) return `<span class="chip accent tier-badge">Top pick</span>`;
  if (tier >= 1) return `<span class="chip ready tier-badge">Favorite</span>`;
  return "";
}

function collectProspectFilterParams() {
  const region = $("#prospect-region-filter")?.value ?? "all";
  const since = $("#prospect-time-filter")?.value ?? "all";
  const minScore = Number($("#prospect-min-score")?.value ?? 0);
  const starredOnly = $("#prospect-starred-only")?.checked ?? false;
  const q = $("#prospect-search")?.value.trim() ?? "";
  const sectors = [...prospectSectorFilter];

  const params = new URLSearchParams();
  params.set("view", prospectView);
  if (region && region !== "all") params.set("region", region);
  if (since && since !== "all") params.set("since", since);
  if (minScore > 0) params.set("minScore", String(minScore));
  if (starredOnly) params.set("starred", "true");
  if (q) params.set("q", q);
  if (sectors.length) params.set("sector", sectors.join(","));

  return { params, region, since, minScore, starredOnly, q, sectors };
}

function applyLocalProspectFilters(items) {
  const { region, since, minScore, starredOnly, q, sectors } = collectProspectFilterParams();

  if (prospectView === "favorites") {
    items = items.filter((p) => p.starred);
  } else if (prospectView === "recent") {
    items = [...items].sort((a, b) => {
      const aTime = a.updatedAt ?? a.firstSeenAt ?? "";
      const bTime = b.updatedAt ?? b.firstSeenAt ?? "";
      return bTime.localeCompare(aTime);
    });
  }

  if (starredOnly) items = items.filter((p) => p.starred);
  if (region && region !== "all") items = items.filter((p) => prospectRegion(p) === region);
  if (sectors.length) {
    items = items.filter((p) => prospectSectors(p).some((sectorId) => sectors.includes(sectorId)));
  }

  if (minScore > 0) items = items.filter((p) => p.score >= minScore);

  if (since && since !== "all") {
    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    if (since === "week") start.setDate(start.getDate() - 7);
    else if (since === "month") start.setMonth(start.getMonth() - 1);
    else if (since === "year") start.setFullYear(start.getFullYear() - 1);
    items = items.filter((p) => {
      const stamp = p.updatedAt ?? p.firstSeenAt;
      return stamp && new Date(stamp) >= start;
    });
  }

  if (q) {
    const needle = q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle) ||
        p.location.toLowerCase().includes(needle) ||
        (p.websiteIssues ?? "").toLowerCase().includes(needle) ||
        (p.businessNotes ?? "").toLowerCase().includes(needle)
    );
  }

  if (prospectView === "favorites") {
    items.sort((a, b) => {
      if (b.tier !== a.tier) return b.tier - a.tier;
      return (b.favoritedAt ?? "").localeCompare(a.favoritedAt ?? "") || b.score - a.score;
    });
  } else if (prospectView !== "recent") {
    items.sort((a, b) => b.score - a.score);
  }

  return items;
}

function regionLabel(regionId) {
  const meta = state.prospectFilters?.regions?.find((r) => r.id === regionId);
  return meta?.label ?? regionId;
}

function sectorLabel(sectorId) {
  const meta = state.prospectFilters?.sectors?.find((s) => s.id === sectorId);
  return meta?.label ?? sectorId;
}

function initProspectFilters() {
  if (prospectFiltersReady) return;
  const regionSelect = $("#prospect-region-filter");
  const chips = $("#prospect-sector-chips");
  const meta = state.prospectFilters ?? deriveProspectFilterMeta(state.prospects ?? []);
  if (!regionSelect || !meta) return;

  const currentRegion = regionSelect.value || "all";
  regionSelect.innerHTML =
    `<option value="all">All regions</option>` +
    (meta.regions ?? [])
      .filter((r) => (meta.regionCounts?.[r.id] ?? 0) > 0 || r.id === "other")
      .map((r) => {
        const count = meta.regionCounts?.[r.id] ?? 0;
        return `<option value="${r.id}">${r.label} (${count})</option>`;
      })
      .join("");
  regionSelect.value = [...regionSelect.options].some((opt) => opt.value === currentRegion)
    ? currentRegion
    : "all";

  if (chips) {
    const visibleSectors = (meta.sectors ?? []).filter((s) => (meta.sectorCounts?.[s.id] ?? 0) > 0);
    chips.classList.toggle("hidden", visibleSectors.length === 0);
    chips.innerHTML = visibleSectors
      .map((s) => {
        const count = meta.sectorCounts?.[s.id] ?? 0;
        const active = prospectSectorFilter.has(s.id) ? " active" : "";
        return `<button type="button" class="sector-chip${active}" data-sector="${s.id}">${s.label} <span class="chip-count">${count}</span></button>`;
      })
      .join("");

    chips.querySelectorAll("[data-sector]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.sector;
        if (prospectSectorFilter.has(id)) prospectSectorFilter.delete(id);
        else prospectSectorFilter.add(id);
        initProspectFilters();
        renderProspects();
      });
    });
  }

  prospectFiltersReady = true;
}

async function toggleProspectStar(prospectId, tier) {
  if (hostedMode) {
    showToast("Favorites only persist on local console", { type: "error" });
    return;
  }

  try {
    const res = await fetchWithAuth(`/api/prospects/${encodeURIComponent(prospectId)}/star`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tier != null ? { tier } : {})
    });
    if (!res.ok) {
      showToast("Could not update favorite", { type: "error" });
      return;
    }
    const data = await res.json();
    const idx = state.prospects.findIndex((p) => p.id === prospectId);
    if (idx >= 0 && data.prospect) {
      state.prospects[idx] = data.prospect;
    }
    renderProspects();
    showToast(data.starred ? "Added to favorites" : "Removed from favorites", { type: "success" });
  } catch {
    showToast("Could not update favorite", { type: "error" });
  }
}

function renderProspects() {
  initProspectFilters();
  const grid = $("#prospect-grid");
  const items = applyLocalProspectFilters([...(state.prospects ?? [])]);
  const hint = $("#prospect-count-hint");

  if (hint) {
    const favCount = (state.prospects ?? []).filter((p) => p.starred).length;
    hint.textContent = `Showing ${items.length} of ${state.prospects?.length ?? 0} leads · ${favCount} favorites`;
  }

  document.querySelectorAll(".prospect-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.prospectView === prospectView);
  });

  if (!items.length) {
    const { since } = collectProspectFilterParams();
    const total = state.prospects?.length ?? 0;
    let emptyHint = "No leads match these filters. Try clearing sector chips or lowering the score minimum.";
    if (total > 0 && since && since !== "all") {
      const sinceLabels = { today: "Today", week: "This week", month: "This month", year: "This year" };
      emptyHint = `No leads were added ${sinceLabels[since] ?? since.toLowerCase()} — you still have ${total} in the list. Switch the date filter to “Any time” to see them, or scout new leads.`;
    }
    grid.innerHTML = `<div class="empty">${emptyHint}</div>`;
    return;
  }

  grid.innerHTML = items
    .map((p) => {
      const starClass = p.starred ? " starred" : "";
      const starLabel = p.starred ? "Remove from favorites" : "Add to favorites";
      const sectorTags = prospectSectors(p)
        .filter((s) => s !== "other")
        .slice(0, 2)
        .map((s) => `<span class="sector-tag">${sectorLabel(s)}</span>`)
        .join("");
      const pain = sanitizeExcerpt(p.websiteIssues || p.websiteNotes || "");
      return `
    <article class="card prospect-card${starClass}" data-prospect-id="${p.id}" data-kind="prospect">
      <button type="button" class="prospect-star-btn" data-star-id="${p.id}" aria-label="${starLabel}" title="${starLabel}">
        ${p.starred ? "★" : "☆"}
      </button>
      <div class="card-thumb">${thumbHtml(p.thumbnail, p.name)}</div>
      <div class="card-body">
        <div class="prospect-card-chips">
          <span class="chip ${scoreClass(p.score)}">Score ${p.score}</span>
          ${tierBadgeHtml(p.tier)}
          ${p.manuallyAdded ? `<span class="chip muted">Manual</span>` : ""}
        </div>
        <h3 class="card-title">${p.name}</h3>
        <div class="card-meta">
          <span>${p.category}</span>
          <span>${regionLabel(prospectRegion(p))}</span>
          ${sectorTags}
        </div>
        ${pain ? `<p class="card-excerpt">${pain}</p>` : ""}
      </div>
    </article>
  `;
    })
    .join("");

  grid.querySelectorAll("[data-star-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      void toggleProspectStar(btn.dataset.starId);
    });
  });
}

function renderDonors() {
  const q = $("#donor-search").value.trim().toLowerCase();
  const grid = $("#donor-grid");
  let items = [...state.donors];
  if (q) {
    items = items.filter(
      (d) =>
        d.slug.includes(q) ||
        d.field.toLowerCase().includes(q) ||
        (d.teaches ?? "").toLowerCase().includes(q) ||
        (d.nepalFit ?? "").toLowerCase().includes(q)
    );
  }

  if (!items.length) {
    grid.innerHTML = `<div class="empty">No designs found.</div>`;
    return;
  }

  grid.innerHTML = items
    .map(
      (d) => `
    <article class="card" data-slug="${d.slug}" data-kind="donor">
      <div class="card-thumb">${thumbHtml(d.thumbnail, d.slug)}</div>
      <div class="card-body">
        <span class="chip ${d.hasEvidence ? "ready" : "warn"}">${d.hasEvidence ? "Ready to use" : "Incomplete"}</span>
        <h3 class="card-title">${d.field}</h3>
        <div class="card-meta"><span>${d.url}</span></div>
        ${d.nepalFit ? `<p class="card-excerpt">${sanitizeExcerpt(d.nepalFit)}</p>` : ""}
      </div>
    </article>
  `
    )
    .join("");
}

function prospectSearchJobSummary(job) {
  const input = job.input ?? {};
  return {
    lane: input.lane || job.title.replace(/^Prospect search —\s*/, ""),
    region: input.region || null,
    notes: input.notes || null
  };
}

function inboxJobTitle(job) {
  if (job.kind === "prospect_search") {
    const { lane, region } = prospectSearchJobSummary(job);
    return region ? `${lane} · ${region}` : lane;
  }
  return job.title;
}

function inboxJobMeta(job) {
  if (job.kind === "prospect_search") {
    const { region } = prospectSearchJobSummary(job);
    const parts = [kindLabel(job.kind), formatDate(job.createdAt)];
    if (region) parts.unshift(region);
    return parts.join(" · ");
  }
  return `${kindLabel(job.kind)} · ${formatDate(job.createdAt)}`;
}

function renderInbox() {
  const list = $("#inbox-list");
  const jobs = sortJobs(state.jobs ?? []);
  const tasks = state.tasks ?? [];
  const activeCount = jobs.filter((j) => j.status === "queued" || j.status === "running").length;

  if (!jobs.length && !tasks.length) {
    list.innerHTML = `<div class="empty">No activity yet. Start a lead search, save a design, or begin a client build.</div>`;
    return;
  }

  const activeBanner =
    activeCount > 0
      ? `<div class="inbox-active-banner"><strong>${activeCount} job${activeCount === 1 ? "" : "s"} running</strong> — logs update every few seconds.</div>`
      : "";

  const jobItems = jobs
    .map((j) => {
      const isActive = j.status === "queued" || j.status === "running";
      const failedClass = j.status === "failed" ? " job-failed" : "";
      const activeClass = isActive ? " job-active" : "";
      const highlightClass = j.id === highlightJobId ? " job-highlight" : "";
      const isProspectSearch = j.kind === "prospect_search";
      const resultLine = j.result?.message
        ? `<p class="job-result-line muted">${j.result.message}</p>`
        : "";
      const errorLine = j.error ? `<p class="job-error">${j.error}</p>` : "";
      const failHelp =
        j.status === "failed" && isProspectSearch
          ? `<p class="job-help muted">Prospect search needs <code>python3</code> and the blueprint-search-nepal skill. Open the scout task in Cursor.</p>`
          : j.status === "failed"
            ? `<p class="job-help muted">Check the log below. Capture jobs need <code>pnpm blueprint:capture</code> in terminal.</p>`
            : "";
      const viewBtn =
        j.status === "done" && j.result?.viewTarget
          ? `<button class="ghost-btn inbox-view-btn" data-view-results="${j.result.viewTarget}">${
              j.result.viewTarget === "prospects" ? "View prospects" : "View results"
            }</button>`
          : "";
      const detailsOpen = isActive || j.id === highlightJobId ? " open" : "";
      const scoutNote =
        isProspectSearch && j.status === "done"
          ? `<p class="job-help muted">CSV refreshed from local database. New AI scouting still runs via the inbox task in Cursor.</p>`
          : "";
      return `
    <div class="inbox-item job-item${failedClass}${activeClass}${highlightClass}" data-job-id="${j.id}">
      <div class="inbox-item-head">
        <div>
          <div class="inbox-kind">${isProspectSearch ? "Lead search" : kindLabel(j.kind)}</div>
          <h3>${inboxJobTitle(j)}</h3>
          <div class="muted inbox-meta">${inboxJobMeta(j)}</div>
        </div>
        <div class="inbox-item-actions">
          ${jobStatusChip(j.status)}
          ${viewBtn}
        </div>
      </div>
      ${resultLine}
      ${scoutNote}
      ${errorLine}
      ${failHelp}
      <details${detailsOpen}>
        <summary>${isActive ? "Live log" : "Log"}</summary>
        <pre class="job-log" data-job-log="${j.id}">${isActive ? "Loading…" : "Expand to load"}</pre>
      </details>
    </div>
  `;
    })
    .join("");

  const taskItems = tasks
    .map((t) => {
      const isProspectTask = t.type === "prospect_search" || t.type === "prospect_rating";
      const summary = isProspectTask
        ? t.title.replace(/^Task:\s*/i, "").replace(/^Prospect search —\s*/i, "").replace(/^Rate manual prospect —\s*/i, "")
        : t.title;
      const typeLabel =
        t.type === "prospect_search"
          ? "Scout task"
          : t.type === "prospect_rating"
            ? "Rate prospect"
            : t.type;
      return `
    <div class="inbox-item inbox-task-item">
      <div class="inbox-item-head">
        <div>
          <div class="inbox-kind">Cursor task</div>
          <h3>${summary}</h3>
          <div class="muted inbox-meta">${typeLabel} · ${t.status} · ${formatDate(t.createdAt)}</div>
        </div>
        <button class="ghost-btn inbox-view-btn" data-copy-task="${encodeURIComponent(t.callPhrase)}">Copy phrase</button>
      </div>
      ${isProspectTask ? "" : `<pre class="inbox-task-phrase">${t.callPhrase || "No instructions"}</pre>`}
    </div>
  `;
    })
    .join("");

  list.innerHTML = activeBanner + jobItems + taskItems;

  list.querySelectorAll("[data-copy-task]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(decodeURIComponent(btn.dataset.copyTask));
      showToast("Instructions copied");
    });
  });

  list.querySelectorAll("[data-view-results]").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchView(btn.dataset.viewResults);
      loadData();
    });
  });

  list.querySelectorAll("details").forEach((details) => {
    const pre = details.querySelector("[data-job-log]");
    if (details.open && pre && !pre.dataset.loaded) {
      void loadJobLogTail(pre.dataset.jobLog, pre);
    }
    details.addEventListener("toggle", async () => {
      if (!details.open) return;
      const logPre = details.querySelector("[data-job-log]");
      if (!logPre || logPre.dataset.loaded) return;
      await loadJobLogTail(logPre.dataset.jobLog, logPre);
    });
  });

  if (highlightJobId) {
    const el = list.querySelector(`[data-job-id="${CSS.escape(highlightJobId)}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function filterMatchmakerDonors() {
  const q = $("#matchmaker-donor-search")?.value.trim().toLowerCase() ?? "";
  let items = [...state.donors];
  if (q) {
    items = items.filter(
      (d) =>
        d.slug.includes(q) ||
        d.field.toLowerCase().includes(q) ||
        (d.teaches ?? "").toLowerCase().includes(q) ||
        (d.nepalFit ?? "").toLowerCase().includes(q)
    );
  }
  return items;
}

function filterMatchmakerProspects() {
  const q = $("#matchmaker-prospect-search")?.value.trim().toLowerCase() ?? "";
  let items = [...(state.prospects ?? [])];
  if (q) {
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.websiteIssues ?? "").toLowerCase().includes(q)
    );
  }
  return items;
}

function renderMatchmakerDonorCard(d) {
  const selected = matchmakerSelectedDonor === d.slug ? " selected" : "";
  return `
    <article class="match-card donor-card${selected}" draggable="true" data-donor-slug="${d.slug}">
      <div class="match-card-thumb">${thumbHtml(d.thumbnail, d.slug)}</div>
      <div class="match-card-body">
        <span class="chip ${d.hasEvidence ? "ready" : "warn"}">${d.hasEvidence ? "Ready to use" : "Incomplete"}</span>
        <h3 class="match-card-title">${d.field}</h3>
        ${d.nepalFit ? `<p class="match-card-excerpt">${sanitizeExcerpt(d.nepalFit)}</p>` : ""}
      </div>
    </article>
  `;
}

function renderMatchmakerProspectCard(p) {
  const pain = sanitizeExcerpt(p.websiteIssues || p.websiteNotes || "");
  return `
    <article class="match-card prospect-card" data-prospect-id="${p.id}">
      <div class="match-card-thumb">${thumbHtml(p.thumbnail, p.name)}</div>
      <div class="match-card-body">
        <span class="chip ${scoreClass(p.score)}">Score ${p.score}</span>
        <h3 class="match-card-title">${p.name}</h3>
        <div class="match-card-meta">${p.category} · ${p.location}</div>
        ${pain ? `<p class="match-card-excerpt">${pain}</p>` : ""}
      </div>
    </article>
  `;
}

function setupMatchmakerDragDrop() {
  const donorCards = document.querySelectorAll(".match-card.donor-card");
  const prospectCards = document.querySelectorAll(".match-card.prospect-card");

  donorCards.forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      const slug = card.dataset.donorSlug;
      e.dataTransfer.setData("text/donor-slug", slug);
      e.dataTransfer.effectAllowed = "copy";
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      document.querySelectorAll(".match-card.prospect-card.drop-target").forEach((el) => {
        el.classList.remove("drop-target");
      });
    });
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      const slug = card.dataset.donorSlug;
      matchmakerSelectedDonor = matchmakerSelectedDonor === slug ? null : slug;
      renderMatchmaker();
      if (matchmakerSelectedDonor) {
        showToast("Design selected — tap a lead to pair");
      }
    });
  });

  prospectCards.forEach((card) => {
    card.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      card.classList.add("drop-target");
    });
    card.addEventListener("dragleave", () => {
      card.classList.remove("drop-target");
    });
    card.addEventListener("drop", (e) => {
      e.preventDefault();
      card.classList.remove("drop-target");
      const donorSlug = e.dataTransfer.getData("text/donor-slug");
      const prospectId = card.dataset.prospectId;
      if (!donorSlug || !prospectId) return;
      const donor = state.donors.find((d) => d.slug === donorSlug);
      const prospect = state.prospects?.find((p) => p.id === prospectId);
      if (donor && prospect) openMatchmakerModal(donor, prospect);
    });
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!matchmakerSelectedDonor) return;
      const donor = state.donors.find((d) => d.slug === matchmakerSelectedDonor);
      const prospect = state.prospects?.find((p) => p.id === card.dataset.prospectId);
      if (donor && prospect) {
        openMatchmakerModal(donor, prospect);
        matchmakerSelectedDonor = null;
      }
    });
  });
}

function renderMatchmaker() {
  const donorGrid = $("#matchmaker-donor-cards");
  const prospectGrid = $("#matchmaker-prospect-cards");
  if (!donorGrid || !prospectGrid) return;

  const donors = filterMatchmakerDonors();
  const prospects = filterMatchmakerProspects();

  if (!donors.length) {
    donorGrid.innerHTML = `<div class="empty">No designs in the library yet. Add one from the Design Library panel.</div>`;
  } else {
    donorGrid.innerHTML = donors.map(renderMatchmakerDonorCard).join("");
  }

  if (!prospects.length) {
    prospectGrid.innerHTML = `<div class="empty">No leads found. Export leads to <code>prospects/nepal-leads.csv</code> with <code>blueprint-search-nepal</code>.</div>`;
  } else {
    prospectGrid.innerHTML = prospects.map(renderMatchmakerProspectCard).join("");
  }

  setupMatchmakerDragDrop();
}

function buildMatchmakerPreviewLine(donor, prospect) {
  return `Clone ${donor.field} structure for ${prospect.name}`;
}

function openMatchmakerModal(donor, prospect) {
  const modal = $("#matchmaker-modal");
  const backdrop = $("#matchmaker-modal-backdrop");
  const form = $("#matchmaker-form");
  const result = $("#matchmaker-result");

  form.clientName.value = prospect.name;
  form.clientWebsite.value = prospect.websiteUrl;
  form.donorShelfSlug.value = donor.slug;
  form.notes.value = "";

  $("#matchmaker-preview").textContent = buildMatchmakerPreviewLine(donor, prospect);
  updateMatchmakerTaskPreview(donor, prospect, "");

  result.classList.add("hidden");
  form.classList.remove("hidden");
  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");

  form.dataset.donorSlug = donor.slug;
  form.dataset.prospectId = prospect.id;
}

function closeMatchmakerModal() {
  $("#matchmaker-modal").classList.add("hidden");
  $("#matchmaker-modal-backdrop").classList.add("hidden");
  matchmakerSelectedDonor = null;
  renderMatchmaker();
}

function updateMatchmakerTaskPreview(donor, prospect, notes) {
  const payload = {
    clientName: prospect.name,
    clientWebsite: prospect.websiteUrl,
    donorShelfSlug: donor.slug,
    notes: notes.trim(),
    taskType: "new_site"
  };
  $("#matchmaker-task-preview").textContent = buildLocalCallPhrase(payload);
}

function populateDonorSelect() {
  const select = $("#donor-shelf-select");
  const current = select.value;
  select.innerHTML =
    `<option value="">— none —</option>` +
    state.donors
      .map((d) => `<option value="${d.slug}">${d.field} (${d.slug})</option>`)
      .join("");
  if (current) select.value = current;
}

function openDrawer(slug, kind, prospectId) {
  if (kind === "prospect") {
    const p = state.prospects?.find((x) => x.id === prospectId);
    if (!p) return;
    const drawer = $("#drawer");
    const backdrop = $("#drawer-backdrop");
    const content = $("#drawer-content");
    content.innerHTML = `
      <div class="drawer-thumb">${thumbHtml(p.thumbnail, p.name)}</div>
      <h2>${p.name}</h2>
      <div class="slug muted">${p.category} · ${p.location}</div>
      <span class="chip ${scoreClass(p.score)}">Total score ${p.score}</span>
      ${tierBadgeHtml(p.tier)}
      <button type="button" class="ghost-btn drawer-star-btn" data-drawer-star="${p.id}">
        ${p.starred ? "★ Favorited" : "☆ Add to favorites"}
      </button>

      <div class="drawer-section">
        <h4>Score breakdown</h4>
        <div class="status-grid">
          <div><strong>Website pain</strong>${p.scores.websitePain}</div>
          <div><strong>Demand</strong>${p.scores.demand}</div>
          <div><strong>Premium fit</strong>${p.scores.premiumFit}</div>
          <div><strong>Access</strong>${p.scores.access}</div>
        </div>
      </div>

      ${
        p.rating || p.reviewCount
          ? `<div class="drawer-section"><h4>Reviews</h4><p>${p.rating ? `${p.rating}★` : ""} ${p.reviewCount ? `(${p.reviewCount} reviews)` : ""}</p></div>`
          : ""
      }

      ${
        p.websiteIssues || p.websiteNotes
          ? `<div class="drawer-section"><h4>Website pain</h4><p>${sanitizeExcerpt(p.websiteIssues || p.websiteNotes)}</p></div>`
          : ""
      }

      ${
        p.businessNotes
          ? `<div class="drawer-section"><h4>Business notes</h4><p>${p.businessNotes}</p></div>`
          : ""
      }

      <div class="drawer-section">
        <h4>Links</h4>
        <p>
          <a href="${p.websiteUrl}" target="_blank" rel="noreferrer">${p.websiteUrl}</a>
          ${p.mapsUrl ? `<br><a href="${p.mapsUrl}" target="_blank" rel="noreferrer">Maps / reviews</a>` : ""}
        </p>
        ${p.contactEmail || p.phone ? `<p class="muted">${p.contactEmail ?? ""} ${p.phone ?? ""}</p>` : ""}
      </div>

      <div class="drawer-actions">
        <button class="primary" data-action="demo-job" data-name="${encodeURIComponent(p.name)}" data-url="${encodeURIComponent(p.websiteUrl)}">Start demo job</button>
      </div>
    `;

    content.querySelector("[data-action=demo-job]")?.addEventListener("click", (e) => {
      const btn = e.currentTarget;
      prefillTask({
        clientName: decodeURIComponent(btn.dataset.name),
        clientWebsite: decodeURIComponent(btn.dataset.url),
        taskType: "new_site"
      });
      switchView("build-sites");
      closeDrawer();
    });

    content.querySelector("[data-drawer-star]")?.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.drawerStar;
      void toggleProspectStar(id).then(() => {
        openDrawer(null, "prospect", id);
      });
    });

    drawer.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    return;
  }

  const item =
    kind === "donor" ? state.donors.find((d) => d.slug === slug) : state.clients.find((c) => c.slug === slug);
  if (!item) return;

  const drawer = $("#drawer");
  const backdrop = $("#drawer-backdrop");
  const content = $("#drawer-content");

  if (kind === "client") {
    const c = item;
    content.innerHTML = `
      <h2>${c.title}</h2>
      <div class="slug muted">Reference: ${c.slug}</div>
      ${ownerBucketChip(c)}
      <p>${escapeHtml(c.nextActionPlain)}</p>

      <div class="drawer-section">
        <h4>Build detail</h4>
        ${chipForAction(c.nextAction)}
      </div>

      <div class="drawer-section">
        <h4>Status</h4>
        <div class="status-grid">
          <div><strong>References</strong>${c.status.referenceReady ? "Ready" : "Missing"}</div>
          <div><strong>Art direction</strong>${c.status.artReady ? "Ready" : "Missing"}</div>
          <div><strong>App</strong>${c.status.appExists ? "Present" : "Missing"}</div>
          <div><strong>Screenshots</strong>${c.status.screenshotsReady ? "Ready" : "Missing"}</div>
          <div><strong>Motion</strong>${c.status.motionReady ? "Ready" : "Missing"}</div>
          <div><strong>Pages</strong>${c.pages}</div>
        </div>
      </div>

      ${
        c.compareDesktop != null
          ? `<div class="drawer-section"><h4>Donor match</h4><p>Desktop ${c.compareDesktop}% · Mobile ${c.compareMobile ?? "—"}%</p></div>`
          : ""
      }

      ${
        c.donorSlug || c.donorUrl
          ? `<div class="drawer-section"><h4>Visual donor</h4><p>${c.donorSlug ?? ""} ${c.donorUrl ? `<br><a href="${c.donorUrl}" target="_blank" rel="noreferrer">${c.donorUrl}</a>` : ""}</p></div>`
          : ""
      }

      <div class="drawer-actions">
        ${
          c.previewUrl
            ? `<a class="primary" href="${c.previewUrl}" target="_blank" rel="noreferrer">Open preview</a>
               <button type="button" class="ghost-btn" data-action="copy-preview" data-url="${c.previewUrl}">Copy link for client</button>`
            : ""
        }
        <button data-action="continue" data-slug="${c.slug}">Create continue task</button>
        <button data-action="review" data-slug="${c.slug}">Create review task</button>
      </div>
    `;

    content.querySelector("[data-action=copy-preview]")?.addEventListener("click", () => {
      void copyClientLink(c.previewUrl);
    });
  } else {
    const d = item;
    content.innerHTML = `
      <h2>${d.field}</h2>
      <div class="slug muted">Reference: ${d.slug}</div>
      <p><a href="${d.url}" target="_blank" rel="noreferrer">${d.url}</a></p>
      ${d.teaches ? `<div class="drawer-section"><h4>What it teaches</h4><p>${escapeHtml(d.teaches)}</p></div>` : ""}
      ${d.nepalFit ? `<div class="drawer-section"><h4>Nepal client fit</h4><p>${sanitizeExcerpt(d.nepalFit)}</p></div>` : ""}
      <div class="drawer-actions">
        <button class="primary" data-action="use-donor" data-slug="${d.slug}">Use this design</button>
      </div>
    `;
  }

  content.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const s = btn.dataset.slug;
      if (action === "use-donor") {
        switchView("build-sites");
        $("#donor-shelf-select").value = s;
        closeDrawer();
        return;
      }
      if (action === "continue") {
        prefillTask({ clientName: s, taskType: "continue_site" });
        switchView("build-sites");
        closeDrawer();
        return;
      }
      if (action === "review") {
        prefillTask({ clientName: s, taskType: "review" });
        switchView("build-sites");
        closeDrawer();
      }
    });
  });

  drawer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}

function closeDrawer() {
  $("#drawer").classList.add("hidden");
  $("#drawer-backdrop").classList.add("hidden");
}

function switchView(name) {
  if (name === "matchmaker" || name === "new-job") name = "build-sites";
  if (name === "restock") name = "donors";

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === name);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === `view-${name}`);
  });
  const meta = views[name] ?? views.today;
  $("#view-title").textContent = meta.title;
  $("#view-subtitle").textContent = meta.sub;
  $("#sidebar").classList.remove("open");
  if (name === "build-sites" || name === "matchmaker" || name === "new-job") {
    renderMatchmaker();
    updateJobFormMode();
  }
  if (name === "prospects") renderProspects();
  if (name === "today") renderToday();
  if (name === "donors" || name === "restock") initRestockSectors();
}

function updateJobFormMode() {
  const form = $("#job-form");
  const taskType = form.taskType.value;
  const isCloneJob = taskType === "new_site";
  $("#client-website-field")?.classList.toggle("hidden", !isCloneJob);
  form.querySelector('[name="donorShelfSlug"]')?.closest("label")?.classList.toggle("hidden", !isCloneJob);
  form.querySelector('[name="notes"]')?.closest("label")?.classList.toggle("hidden", !isCloneJob);
  $("#build-option-form .job-intro")?.classList.toggle("hidden", !isCloneJob);
}

function prefillTask({ clientName, taskType, donorShelfSlug, clientWebsite }) {
  const form = $("#job-form");
  form.clientName.value = clientName;
  form.taskType.value = taskType ?? "new_site";
  if (donorShelfSlug) form.donorShelfSlug.value = donorShelfSlug;
  if (clientWebsite) form.clientWebsite.value = clientWebsite;
  updateJobFormMode();
}

function authHeaders() {
  const stored = sessionStorage.getItem("console-auth");
  return stored ? { Authorization: stored } : {};
}

async function fetchWithAuth(url, options = {}) {
  const headers = { ...authHeaders(), ...(options.headers || {}) };
  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    const pass = window.prompt("Console password:");
    if (!pass) throw new Error("Authentication required");
    const auth = "Basic " + btoa(`owner:${pass}`);
    sessionStorage.setItem("console-auth", auth);
    res = await fetch(url, { ...options, headers: { ...options.headers, Authorization: auth } });
  }

  return res;
}

function scheduleJobPolling() {
  const active = (state.jobs ?? []).some((j) => j.status === "queued" || j.status === "running");
  if (active && !jobPollTimer) {
    jobPollTimer = setInterval(() => {
      refreshJobs().catch(() => {});
    }, 3000);
  } else if (!active && jobPollTimer) {
    clearInterval(jobPollTimer);
    jobPollTimer = null;
  }
}

async function refreshJobs() {
  const res = await fetchWithAuth("/api/jobs").catch(() => null);
  if (!res?.ok) return;
  const data = await res.json();
  state.jobs = data.jobs ?? [];
  const prevActive = state.stats?.activeJobs ?? 0;
  state.stats = state.stats ?? {};
  state.stats.activeJobs = state.jobs.filter((j) => j.status === "queued" || j.status === "running").length;
  if (highlightJobId) {
    const highlighted = state.jobs.find((j) => j.id === highlightJobId);
    if (highlighted && (highlighted.status === "done" || highlighted.status === "failed")) {
      highlightJobId = null;
    }
  }
  renderSidebarStats();
  renderInbox();
  renderToday();
  scheduleJobPolling();

  const activeLogPres = document.querySelectorAll(
    "#inbox-list details[open] [data-job-log]"
  );
  activeLogPres.forEach((pre) => {
    const jobId = pre.dataset.jobLog;
    const job = state.jobs.find((j) => j.id === jobId);
    if (job && (job.status === "queued" || job.status === "running")) {
      pre.dataset.loaded = "";
      void loadJobLogTail(jobId, pre);
    }
  });

  if (prevActive > 0 && state.stats.activeJobs === 0) {
    await loadData();
    showToast("Job finished — data refreshed", { type: "success" });
  }
}

function jobStartHint(job) {
  if (job.kind === "prospect_search") {
    return "Refreshing CSV from local database and creating a Cursor scout task. AI web search runs in Cursor, not in the console.";
  }
  if (job.kind === "shelf_capture") {
    const input = job.input ?? {};
    const hasUrl = input.urls?.length || /https?:\/\//i.test(input.request ?? "");
    return hasUrl
      ? "Running blueprint:capture — watch the live log below."
      : "No URLs detected — shelf restock task created for Cursor beauty audition.";
  }
  if (job.kind === "shelf_restock") {
    return "Add designs started — open the Activity task in Cursor. Worker researches, checks phone and desktop, and saves designs.";
  }
  return "Client build started — check Activity for progress.";
}

async function submitJob(endpoint, payload, { onSuccess, resultEl, messageEl, submitBtn, idleLabel } = {}) {
  if (hostedMode) {
    showToast("Background jobs only run on local console", { type: "error" });
    return null;
  }

  setButtonLoading(submitBtn, true, idleLabel);

  try {
    const res = await fetchWithAuth(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let err = {};
      try {
        err = await res.json();
      } catch {
        // ignore
      }
      showToast(err.error ?? "Could not start job", { type: "error" });
      return null;
    }

    const { job } = await res.json();
    highlightJobId = job.id;

    state.jobs = [job, ...(state.jobs ?? []).filter((j) => j.id !== job.id)];
    state.stats = state.stats ?? {};
    state.stats.activeJobs = state.jobs.filter((j) => j.status === "queued" || j.status === "running").length;

    if (resultEl) resultEl.classList.remove("hidden");
    if (messageEl) messageEl.textContent = jobStartHint(job);

    renderSidebarStats();
    switchView("inbox");
    renderInbox();
    scheduleJobPolling();

    showToast(`Job started — ${shortJobId(job.id)}`, { type: "success", duration: 5000 });

    await refreshJobs();
    onSuccess?.(job);
    return job;
  } catch (error) {
    showToast(error instanceof Error ? error.message : "Could not start job", { type: "error" });
    return null;
  } finally {
    setButtonLoading(submitBtn, false, idleLabel);
  }
}

function updateHostedUi() {
  const notice = $("#hosted-job-notice");
  const restockNotice = $("#hosted-restock-notice");
  const submit = $("#job-form button[type=submit]");
  const restockSubmit = $("#restock-submit");
  const matchmakerSubmit = $("#matchmaker-submit");
  const prospectSearchSubmit = $("#prospect-search-submit");
  const prospectAddSubmit = $("#prospect-add-submit");
  const prospectSearchNotice = $("#hosted-prospect-search-notice");
  const prospectAddNotice = $("#hosted-prospect-add-notice");

  if (hostedMode) {
    notice?.classList.remove("hidden");
    restockNotice?.classList.remove("hidden");
    prospectSearchNotice?.classList.remove("hidden");
    prospectAddNotice?.classList.remove("hidden");
    if (submit) submit.textContent = "Generate instructions for Cursor";
    if (restockSubmit) restockSubmit.textContent = "Generate instructions for Cursor";
    if (matchmakerSubmit) matchmakerSubmit.textContent = "Generate instructions for Cursor";
    if (prospectSearchSubmit) {
      prospectSearchSubmit.disabled = true;
      prospectSearchSubmit.title = "Available on your local console only";
    }
    if (prospectAddSubmit) {
      prospectAddSubmit.disabled = true;
      prospectAddSubmit.title = "Available on your local console only";
    }
  } else {
    notice?.classList.add("hidden");
    restockNotice?.classList.add("hidden");
    prospectSearchNotice?.classList.add("hidden");
    prospectAddNotice?.classList.add("hidden");
    if (submit) submit.textContent = "Create task in inbox";
    if (restockSubmit) restockSubmit.textContent = "Find & save designs";
    if (matchmakerSubmit) matchmakerSubmit.textContent = "Run clone job";
    if (prospectSearchSubmit) {
      prospectSearchSubmit.disabled = false;
      prospectSearchSubmit.title = "";
    }
    if (prospectAddSubmit) {
      prospectAddSubmit.disabled = false;
      prospectAddSubmit.title = "";
    }
  }
}

function sectorFieldId(field) {
  return `sector-${field.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function initRestockSectors() {
  const grid = $("#restock-sector-grid");
  if (!grid || grid.dataset.ready) return;

  grid.innerHTML = RESTOCK_SECTORS.map((field) => {
    const id = sectorFieldId(field);
    return `
      <label class="restock-sector-row" for="${id}">
        <input type="checkbox" name="sector-enabled" value="${field}" id="${id}" data-field="${field}" />
        <span class="restock-sector-label">${field}</span>
        <input
          type="number"
          name="sector-count"
          data-field="${field}"
          min="1"
          max="${RESTOCK_MAX_PER_FIELD}"
          value="1"
          disabled
          aria-label="How many donors for ${field}"
        />
      </label>
    `;
  }).join("");

  grid.querySelectorAll('input[type="checkbox"][name="sector-enabled"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      const countInput = grid.querySelector(`input[type="number"][data-field="${CSS.escape(cb.dataset.field)}"]`);
      if (countInput) {
        countInput.disabled = !cb.checked;
        if (cb.checked && !countInput.value) countInput.value = "1";
      }
      updateRestockSummary();
    });
  });

  grid.querySelectorAll('input[type="number"][name="sector-count"]').forEach((input) => {
    input.addEventListener("input", updateRestockSummary);
  });

  const otherEnabled = $("#restock-other-enabled");
  const otherField = $("#restock-other-field");
  const otherCount = $("#restock-other-count");
  otherEnabled?.addEventListener("change", () => {
    const on = otherEnabled.checked;
    if (otherField) otherField.disabled = !on;
    if (otherCount) otherCount.disabled = !on;
    updateRestockSummary();
  });
  otherField?.addEventListener("input", updateRestockSummary);
  otherCount?.addEventListener("input", updateRestockSummary);
  $("#restock-total-cap")?.addEventListener("input", updateRestockSummary);

  grid.dataset.ready = "1";
  updateRestockSummary();
}

function collectRestockTargets() {
  const targets = [];
  $("#restock-sector-grid")
    ?.querySelectorAll('input[type="checkbox"][name="sector-enabled"]:checked')
    .forEach((cb) => {
      const field = cb.dataset.field;
      const countInput = $("#restock-sector-grid")?.querySelector(
        `input[type="number"][data-field="${CSS.escape(field)}"]`
      );
      const count = Math.min(
        RESTOCK_MAX_PER_FIELD,
        Math.max(1, parseInt(countInput?.value ?? "1", 10) || 1)
      );
      targets.push({ field, count });
    });

  if ($("#restock-other-enabled")?.checked) {
    const field = $("#restock-other-field")?.value.trim();
    if (field) {
      const count = Math.min(
        RESTOCK_MAX_PER_FIELD,
        Math.max(1, parseInt($("#restock-other-count")?.value ?? "1", 10) || 1)
      );
      targets.push({ field, count });
    }
  }

  return targets;
}

function formatRestockSummaryText(targets, totalCap) {
  if (!targets.length) return null;
  const parts = targets.map((t) => {
    const short = t.field.split(" / ").pop()?.toLowerCase() ?? t.field.toLowerCase();
    return t.count === 1 ? `1 ${short}` : `${t.count} ${short}`;
  });
  const total = targets.reduce((sum, t) => sum + t.count, 0);
  const cap =
    totalCap && Number(totalCap) > 0 && Number(totalCap) !== total ? ` (cap ${totalCap})` : "";
  return `Find ${parts.join(" + ")} donors (${total} total${cap}) — beauty audition, scored, captured to shelf`;
}

function updateRestockSummary() {
  const el = $("#restock-summary");
  if (!el) return;
  const targets = collectRestockTargets();
  const capRaw = $("#restock-total-cap")?.value.trim();
  const totalCap = capRaw ? parseInt(capRaw, 10) : undefined;
  const text = formatRestockSummaryText(targets, totalCap);
  if (!text) {
    el.classList.add("hidden");
    el.replaceChildren();
    return;
  }
  el.classList.remove("hidden");
  el.innerHTML = `<strong>Commission summary</strong>${text}`;
}

function buildRestockCommissionPayload(form) {
  const targets = collectRestockTargets();
  const capRaw = form.totalCap?.value.trim();
  const totalCap = capRaw ? parseInt(capRaw, 10) : undefined;
  const notes = form.notes?.value.trim();
  const payload = { targets };
  if (notes) payload.notes = notes;
  if (totalCap && totalCap > 0) payload.totalCap = totalCap;
  return payload;
}

function buildLocalStructuredRestockPhrase(commission) {
  const lines = commission.targets.map((t) => `${t.count} donor(s) for ${t.field}`);
  const parts = [
    "Restock the donor shelf. Read factory/playbooks/master-shelf-stocking-prompt.md.",
    `Job Card: Find ${lines.join("; ")}. Use beauty audition. Fill emptiest shelf slots.`,
    `Structured commission: ${JSON.stringify(commission)}`
  ];
  if (commission.notes) parts.push(`Notes: ${commission.notes}`);
  return parts.join(" ");
}

async function loadData() {
  let res = await fetchWithAuth("/api/data").catch(() => null);
  if (!res || !res.ok) {
    res = await fetch("/snapshot.json");
  }
  if (!res.ok) throw new Error("Failed to load factory data");

  const data = await res.json();
  state = data;
  state.prospects = (state.prospects ?? []).map(enrichProspect);
  state.prospectFilters = state.prospectFilters ?? deriveProspectFilterMeta(state.prospects);
  hostedMode = data.mode === "snapshot" || window.location.hostname.endsWith(".vercel.app");

  if (hostedMode) showHostedBanner(data.snapshotNote);

  $("#updated-at").textContent = hostedMode
    ? `Snapshot from ${formatDate(data.generatedAt)}`
    : `Updated ${formatDate(data.generatedAt)}`;

  updateHostedUi();
  prospectFiltersReady = false;
  renderSidebarStats();
  renderToday();
  renderProjects();
  renderProspects();
  renderDonors();
  renderMatchmaker();
  renderInbox();
  populateDonorSelect();
  initRestockSectors();
  scheduleJobPolling();
}

function showHostedBanner(note) {
  if (document.getElementById("hosted-banner")) return;
  const banner = document.createElement("div");
  banner.id = "hosted-banner";
  banner.className = "hosted-banner";
  banner.innerHTML = `<strong>Hosted snapshot mode.</strong> ${note ?? "This view is a point-in-time export."} For live data and inbox tasks, bookmark <a href="http://blueprint.local:4177">blueprint.local</a> after <code>pnpm blueprint:console:install</code>.`;
  document.querySelector(".main").prepend(banner);
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => switchView(btn.dataset.view));
});

$("#menu-toggle").addEventListener("click", () => {
  $("#sidebar").classList.toggle("open");
});

$("#refresh-btn").addEventListener("click", async () => {
  try {
    await loadData();
    showToast("Data refreshed");
  } catch {
    showToast("Refresh failed");
  }
});

$("#project-search").addEventListener("input", renderProjects);
$("#project-filter").addEventListener("change", renderProjects);
$("#prospect-search")?.addEventListener("input", renderProspects);
$("#prospect-region-filter")?.addEventListener("change", renderProspects);
$("#prospect-time-filter")?.addEventListener("change", renderProspects);
$("#prospect-min-score")?.addEventListener("input", (e) => {
  const label = $("#prospect-min-score-label");
  if (label) label.textContent = e.target.value;
  renderProspects();
});
$("#prospect-starred-only")?.addEventListener("change", renderProspects);
document.querySelectorAll(".prospect-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    prospectView = btn.dataset.prospectView ?? "all";
    renderProspects();
  });
});
$("#donor-search").addEventListener("input", renderDonors);
$("#matchmaker-donor-search")?.addEventListener("input", renderMatchmaker);
$("#matchmaker-prospect-search")?.addEventListener("input", renderMatchmaker);

document.body.addEventListener("click", (e) => {
  const goto = e.target.closest("[data-goto]");
  if (goto) {
    switchView(goto.dataset.goto);
    const focus = goto.dataset.focus;
    if (focus) {
      requestAnimationFrame(() => {
        document.getElementById(focus)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    return;
  }
  if (e.target.closest(".match-card")) return;
  if (e.target.closest(".prospect-star-btn")) return;
  const card = e.target.closest(".card");
  if (!card) return;
  if (card.dataset.kind === "prospect") {
    openDrawer(null, "prospect", card.dataset.prospectId);
    return;
  }
  openDrawer(card.dataset.slug, card.dataset.kind);
});

$("#drawer-close").addEventListener("click", closeDrawer);
$("#drawer-backdrop").addEventListener("click", closeDrawer);

function buildLocalCallPhrase(payload) {
  if (payload.taskType === "continue_site") {
    const slug = payload.clientName.toLowerCase().replace(/\s+/g, "-");
    return `Continue the ${payload.clientName} clone job. Read factory/playbooks/master-clone-job-prompt.md, then sites/${slug}/qa/run-log.md and qa/worker-notes.md, find the last completed step, and continue.`;
  }
  if (payload.taskType === "review") {
    return `run a beauty pass for ${payload.clientName}`;
  }
  if (payload.taskType === "restock_shelf") {
    const parts = [
      "Restock the donor shelf. Read factory/playbooks/master-shelf-stocking-prompt.md.",
      `Job Card: Restock request: ${payload.restockRequest}`
    ];
    if (payload.notes) parts.push(`Notes: ${payload.notes}`);
    return parts.join(" ");
  }
  if (payload.taskType === "stock_donor") {
    const parts = [
      "Restock the donor shelf. Read factory/playbooks/master-shelf-stocking-prompt.md.",
      `Job Card: Restock request: ${payload.sector ? `${payload.sector}${payload.donorUrl ? ` — ${payload.donorUrl}` : ""}` : payload.donorUrl}`
    ];
    if (payload.whyThisDonor) parts.push(`Notes: ${payload.whyThisDonor}`);
    return parts.join(" ");
  }

  const parts = [
    `Run the ${payload.clientName} clone job. Read factory/playbooks/master-clone-job-prompt.md.`,
    `Job Card: Client name: ${payload.clientName}, Client's current website: ${payload.clientWebsite}`
  ];
  if (payload.donorShelfSlug) {
    parts.push(`Copy the look of a specific site? ${payload.donorShelfSlug}`);
  }
  if (payload.notes) {
    parts.push(`Anything else: ${payload.notes}`);
  }
  return parts.join(" ");
}

async function submitTask(payload, resultEl, phraseEl, copyBtnId) {
  const res = await fetchWithAuth("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    let err = {};
    try {
      err = await res.json();
    } catch {
      // ignore
    }
    if (res.status === 501 || hostedMode) {
      const phrase = buildLocalCallPhrase(payload);
      showToast(hostedMode ? "Copy instructions into Cursor" : "Use local console to create inbox tasks");
      phraseEl.textContent = phrase;
      resultEl.classList.remove("hidden");
      document.getElementById(copyBtnId).onclick = async () => {
        await navigator.clipboard.writeText(phrase);
        showToast("Copied to clipboard");
      };
      return null;
    }
    showToast(err.error ?? "Could not create task");
    return null;
  }

  const { task } = await res.json();
  phraseEl.textContent = task.callPhrase;
  resultEl.classList.remove("hidden");
  document.getElementById(copyBtnId).onclick = async () => {
    await navigator.clipboard.writeText(task.callPhrase);
    showToast("Copied to clipboard");
  };
  await loadData();
  showToast("Task created in inbox");
  return task;
}

$("#job-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const payload = {
    clientName: form.clientName.value.trim(),
    clientWebsite: form.clientWebsite.value.trim(),
    donorShelfSlug: form.donorShelfSlug.value,
    notes: form.notes.value.trim(),
    taskType: form.taskType.value
  };

  if (!payload.clientName) {
    showToast("Client name is required");
    return;
  }
  if (payload.taskType === "new_site" && !payload.clientWebsite) {
    showToast("Client website is required");
    return;
  }

  const task = await submitTask(payload, $("#task-result"), $("#task-call-phrase"), "copy-call-phrase");
  if (task) {
    $("#view-inbox").onclick = () => {
      switchView("inbox");
      loadData();
    };
    appendHandoff($("#task-result"), payload.taskType === "review" ? "review" : "build");
  }
});


$("#restock-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const commission = buildRestockCommissionPayload(form);

  if (!commission.targets.length) {
    showToast("Select at least one target area", { type: "error" });
    return;
  }
  if ($("#restock-other-enabled")?.checked && !$("#restock-other-field")?.value.trim()) {
    showToast("Enter a name for Other, or uncheck it", { type: "error" });
    return;
  }

  const total = commission.targets.reduce((sum, t) => sum + t.count, 0);
  if (commission.totalCap != null && commission.totalCap < total) {
    showToast(`Total cap (${commission.totalCap}) is less than requested donors (${total})`, {
      type: "error"
    });
    return;
  }

  const resultEl = $("#restock-result");
  const messageEl = $("#restock-result-message");
  const phraseEl = $("#restock-call-phrase");
  const copyBtn = $("#copy-restock-call-phrase");

  if (!hostedMode) {
    const job = await submitJob("/api/jobs/shelf-restock", commission, {
      submitBtn: $("#restock-submit"),
      idleLabel: "Find & save designs",
      resultEl,
      messageEl,
      onSuccess: (job) => {
        const h3 = resultEl?.querySelector("h3");
        if (h3) h3.textContent = "Restock commissioned";
        if (messageEl) messageEl.textContent = jobStartHint(job);
        phraseEl?.classList.add("hidden");
        copyBtn?.classList.add("hidden");
      }
    });
    if (job) {
      $("#view-restock-inbox").onclick = () => {
        switchView("inbox");
        loadData();
      };
    }
    return;
  }

  const phrase = buildLocalStructuredRestockPhrase(commission);
  if (messageEl) messageEl.textContent = phrase;
  if (phraseEl) {
    phraseEl.textContent = phrase;
    phraseEl.classList.remove("hidden");
  }
  copyBtn?.classList.remove("hidden");
  resultEl?.classList.remove("hidden");
  copyBtn.onclick = async () => {
    await navigator.clipboard.writeText(phrase);
    showToast("Copied to clipboard");
  };
  showToast("Copy instructions into Cursor", { type: "success" });
});

$("#restock-urls-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const raw = form.urls.value.trim();
  const notes = form.notes.value.trim();
  if (!raw) {
    showToast("At least one URL is required", { type: "error" });
    return;
  }

  const urls = raw
    .split(/\s+/)
    .map((u) => u.trim())
    .filter((u) => /^https?:\/\//i.test(u));

  if (!urls.length) {
    showToast("Paste valid http(s) URLs", { type: "error" });
    return;
  }

  const resultEl = $("#restock-result");
  const messageEl = $("#restock-result-message");
  const phraseEl = $("#restock-call-phrase");
  const copyBtn = $("#copy-restock-call-phrase");

  if (!hostedMode) {
    const job = await submitJob(
      "/api/jobs/shelf-capture",
      { request: urls.join("\n"), urls, notes: notes || undefined },
      {
        submitBtn: $("#restock-urls-submit"),
        idleLabel: "Save URLs directly",
        resultEl,
        messageEl,
        onSuccess: (job) => {
          const h3 = resultEl?.querySelector("h3");
          if (h3) h3.textContent = "Capture started";
          if (messageEl) messageEl.textContent = jobStartHint(job);
          phraseEl?.classList.add("hidden");
          copyBtn?.classList.add("hidden");
        }
      }
    );
    if (job) {
      $("#view-restock-inbox").onclick = () => {
        switchView("inbox");
        loadData();
      };
    }
    return;
  }

  const payload = { restockRequest: urls.join("\n"), notes, taskType: "restock_shelf" };
  await submitTask(payload, resultEl, phraseEl, "copy-restock-call-phrase");
  phraseEl?.classList.remove("hidden");
  copyBtn?.classList.remove("hidden");
  if (messageEl) messageEl.textContent = "Copy instructions into Cursor to save the design.";
});

$("#matchmaker-modal-close")?.addEventListener("click", closeMatchmakerModal);
$("#matchmaker-cancel")?.addEventListener("click", closeMatchmakerModal);
$("#matchmaker-modal-backdrop")?.addEventListener("click", closeMatchmakerModal);

$("#matchmaker-form")?.addEventListener("input", (e) => {
  const form = e.currentTarget;
  const donor = state.donors.find((d) => d.slug === form.dataset.donorSlug);
  const prospect = state.prospects?.find((p) => p.id === form.dataset.prospectId);
  if (!donor || !prospect) return;
  const notes = form.notes.value;
  const previewDonor = { ...donor, slug: form.donorShelfSlug.value };
  const previewProspect = { ...prospect, name: form.clientName.value, websiteUrl: form.clientWebsite.value };
  $("#matchmaker-preview").textContent = buildMatchmakerPreviewLine(previewDonor, previewProspect);
  updateMatchmakerTaskPreview(previewDonor, previewProspect, notes);
});

$("#matchmaker-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const payload = {
    clientName: form.clientName.value.trim(),
    clientWebsite: form.clientWebsite.value.trim(),
    donorShelfSlug: form.donorShelfSlug.value.trim(),
    notes: form.notes.value.trim()
  };

  if (!payload.clientName || !payload.clientWebsite) {
    showToast("Client name and website are required");
    return;
  }

  const submitBtn = $("#matchmaker-submit");
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = hostedMode ? "Generating…" : "Starting…";

  if (!hostedMode) {
    const job = await submitJob("/api/jobs/clone-pair", payload, {
      submitBtn,
      idleLabel: originalLabel,
      resultEl: $("#matchmaker-result"),
      onSuccess: () => {
        form.classList.add("hidden");
        $("#matchmaker-call-phrase").textContent =
          "Client build started — check Activity for progress.";
        appendHandoff($("#matchmaker-result"), "build");
      }
    });
    if (job) {
      $("#matchmaker-view-inbox").onclick = () => {
        closeMatchmakerModal();
        switchView("inbox");
        loadData();
      };
    }
    return;
  }

  const taskPayload = { ...payload, taskType: "new_site" };
  const task = await submitTask(
    taskPayload,
    $("#matchmaker-result"),
    $("#matchmaker-call-phrase"),
    "matchmaker-copy-phrase"
  );

  submitBtn.disabled = false;
  submitBtn.textContent = originalLabel;

  if (task) {
    form.classList.add("hidden");
    appendHandoff($("#matchmaker-result"), "build");
    $("#matchmaker-view-inbox").onclick = () => {
      closeMatchmakerModal();
      switchView("inbox");
      loadData();
    };
  }
});

$("#prospect-search-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const lane = form.lane.value.trim();
  const region = form.region.value.trim();
  const notes = form.notes.value.trim();
  if (!lane) {
    showToast("Search lane is required", { type: "error" });
    return;
  }

  await submitJob(
    "/api/jobs/prospect-search",
    { lane, region: region || undefined, notes: notes || undefined },
    {
      submitBtn: $("#prospect-search-submit"),
      idleLabel: "Start search",
      resultEl: $("#prospect-search-result"),
      messageEl: $("#prospect-search-message"),
      onSuccess: () => {
        $("#prospect-search-inbox").onclick = () => switchView("inbox");
        appendHandoff($("#prospect-search-result"), "scout");
      }
    }
  );
});

$("#prospect-add-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (hostedMode) {
    showToast("Manual add only works on local console", { type: "error" });
    return;
  }

  const form = e.target;
  const payload = {
    name: form.name.value.trim(),
    website: form.website.value.trim(),
    location: form.location.value.trim() || undefined,
    category: form.category.value.trim() || undefined
  };

  if (!payload.name || !payload.website) {
    showToast("Name and website are required", { type: "error" });
    return;
  }

  const submitBtn = $("#prospect-add-submit");
  setButtonLoading(submitBtn, true, "Rate & add");

  try {
    const res = await fetchWithAuth("/api/prospects/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let err = {};
      try {
        err = await res.json();
      } catch {
        // ignore
      }
      showToast(err.error ?? "Could not add prospect", { type: "error" });
      return;
    }

    const result = await res.json();
    const resultEl = $("#prospect-add-result");
    const messageEl = $("#prospect-add-message");
    if (resultEl) resultEl.classList.remove("hidden");
    if (messageEl) messageEl.textContent = result.message;

    await loadData();
    showToast(`${payload.name} added`, { type: "success" });
    form.reset();
  } catch {
    showToast("Could not add prospect", { type: "error" });
  } finally {
    setButtonLoading(submitBtn, false, "Rate & add");
  }
});

loadData().catch(() => {
  $("#project-grid").innerHTML = `<div class="empty">Could not reach the console server. Run <code>pnpm blueprint:console</code> from the factory root.</div>`;
});
