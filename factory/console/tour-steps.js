/**
 * Guided tour steps for the Operator Console.
 * Update this file when nav/features change.
 * See factory/console/TOUR.md for how to maintain.
 */

/** @typedef {"top"|"bottom"|"left"|"right"|"center"} TourPlacement */

/**
 * @typedef {Object} TourStep
 * @property {string} id
 * @property {string} view - Nav view to switch to before showing this step
 * @property {string|null} target - CSS selector to highlight (null = centered intro modal)
 * @property {string} title
 * @property {string} body
 * @property {TourPlacement} placement
 * @property {() => void} [beforeShow] - Optional DOM prep (open details, set tab, etc.)
 */

/** @type {TourStep[]} */
export const TOUR_STEPS = [
  {
    id: "intro",
    view: "today",
    target: null,
    title: "Welcome to Blueprint Factory",
    body:
      "This console is your control room for finding Nepal clients, picking world-class designs, and starting site builds. This short tour walks through each area — you can replay it anytime from Settings.",
    placement: "center"
  },
  {
    id: "nav-today",
    view: "today",
    target: "#nav-today",
    title: "Today",
    body:
      "Start here every morning. Today shows what needs your attention — previews ready to send, builds waiting on you, and jobs running right now.",
    placement: "right"
  },
  {
    id: "today-ready",
    view: "today",
    target: "#today-ready",
    title: "Ready to send",
    body:
      "Projects with a live preview that passed automated review land here. Open one to review the full picture before you share the link with a client.",
    placement: "bottom"
  },
  {
    id: "today-decision",
    view: "today",
    target: "#today-decision",
    title: "Needs your decision",
    body:
      "Builds stuck on you — pick a design, approve art direction, or run the beauty pass. Tap a card to jump into the project.",
    placement: "bottom"
  },
  {
    id: "today-working",
    view: "today",
    target: "#today-working",
    title: "Working now",
    body:
      "Active jobs and recent progress. When a scout search or client build is running, you'll see it here without opening Activity.",
    placement: "bottom"
  },
  {
    id: "commission-strip",
    view: "today",
    target: "#commission-strip",
    title: "Quick actions",
    body:
      "Shortcuts to the three main workflows: scout new leads, add designs to the library, or start a client build by pairing a design with a lead.",
    placement: "bottom"
  },
  {
    id: "nav-prospects",
    view: "prospects",
    target: "#nav-prospects",
    title: "Find Clients",
    body:
      "Browse and manage Nepal business leads. Filter by region, score, and sector; star your favorites; add businesses manually or run a scout search.",
    placement: "right"
  },
  {
    id: "prospect-filters",
    view: "prospects",
    target: "#prospect-filters",
    title: "Filters & search",
    body:
      "Narrow the list by name, region, date added, minimum score, or starred-only. Sector chips below filter by business type.",
    placement: "bottom"
  },
  {
    id: "prospect-tabs",
    view: "prospects",
    target: ".prospect-view-tabs",
    title: "Favorites & recent",
    body:
      "Switch between all leads, your starred favorites, and recently added prospects. Star a card to pin it for quick access.",
    placement: "bottom"
  },
  {
    id: "prospect-add",
    view: "prospects",
    target: "#prospect-add-panel",
    title: "Add a specific business",
    body:
      "Know a business already? Enter name and website (or Google Maps link). The console rates and adds it to your lead list.",
    placement: "bottom",
    beforeShow() {
      const panel = document.querySelector("#prospect-add-panel");
      if (panel && !panel.open) panel.open = true;
    }
  },
  {
    id: "prospect-scout",
    view: "prospects",
    target: "#prospect-scout-panel",
    title: "Scout new leads",
    body:
      "Search for businesses in a lane (e.g. Pokhara restaurants). Creates a Cursor task that refreshes your Nepal leads CSV from the scout database.",
    placement: "bottom",
    beforeShow() {
      const panel = document.querySelector("#prospect-scout-panel");
      if (panel && !panel.open) panel.open = true;
    }
  },
  {
    id: "nav-donors",
    view: "donors",
    target: "#nav-donors",
    title: "Design Library",
    body:
      "Pre-captured reference sites to clone from. Each donor passed a beauty audition — browse by sector before pairing one with a client.",
    placement: "right"
  },
  {
    id: "donor-browse",
    view: "donors",
    target: "#donor-grid",
    title: "Browse designs",
    body:
      "Search designs by sector. Click a card to see capture details, screenshots, and which client projects already used it.",
    placement: "top"
  },
  {
    id: "add-designs",
    view: "donors",
    target: "#add-designs-panel",
    title: "Add designs to the library",
    body:
      "Commission a worker to find and capture new world-class sites by sector, or paste URLs you already have. Research and capture finish in Cursor.",
    placement: "top",
    beforeShow() {
      const panel = document.querySelector("#add-designs-panel");
      if (panel && !panel.open) panel.open = true;
    }
  },
  {
    id: "nav-build-sites",
    view: "build-sites",
    target: "#nav-build-sites",
    title: "Build Sites",
    body:
      "Start a client site build two ways: fill in client details, or drag a design onto a lead. Both create an inbox task for Cursor.",
    placement: "right"
  },
  {
    id: "build-mode-form",
    view: "build-sites",
    target: "#build-mode-form",
    title: "Enter client details",
    body:
      "The simple path: two blanks — client name and their current website. Optionally pick a design from the library; the worker derives the rest.",
    placement: "top",
    beforeShow() {
      document.querySelector('.build-mode-tab[data-build-mode="form"]')?.click();
    }
  },
  {
    id: "build-mode-pair",
    view: "build-sites",
    target: ".build-mode-tabs",
    title: "Drag design onto lead",
    body:
      "Switch to this tab to pair visually — drag a design card onto a lead (or tap design then lead on mobile). Great when you've already picked both sides.",
    placement: "bottom",
    beforeShow() {
      document.querySelector('.build-mode-tab[data-build-mode="pair"]')?.click();
    }
  },
  {
    id: "nav-projects",
    view: "projects",
    target: "#nav-projects",
    title: "My Projects",
    body:
      "Every client site in the factory. See status, preview links, and which design each project adopted.",
    placement: "right"
  },
  {
    id: "project-filters",
    view: "projects",
    target: "#view-projects .filters",
    title: "Search & filter projects",
    body:
      "Search by name and filter by status — ready for review, needs a design, beauty pass, or has a preview link.",
    placement: "bottom"
  },
  {
    id: "nav-inbox",
    view: "inbox",
    target: "#nav-inbox",
    title: "Activity",
    body:
      "All jobs and inbox tasks — scout searches, design captures, and client builds. Watch progress, read logs, and jump to results.",
    placement: "right"
  },
  {
    id: "inbox-list",
    view: "inbox",
    target: "#inbox-list",
    title: "Jobs & progress",
    body:
      "Each row shows status (queued, running, done, failed). Expand for logs. When a job finishes, use View results to jump back to leads or projects.",
    placement: "top"
  },
  {
    id: "nav-settings",
    view: "settings",
    target: "#nav-settings",
    title: "Settings & replay",
    body:
      "Come back here anytime to restart this tour or mark it completed. Update tour-steps.js when you add or change console features.",
    placement: "right"
  }
];
