/** Guided product tour UI — no external dependencies. */

import { TOUR_STEPS } from "./tour-steps.js";

const STORAGE_SEEN = "bf-tour-seen";
const STORAGE_COMPLETED = "bf-tour-completed";

let switchViewFn = () => {};
let currentIndex = -1;
let active = false;

const els = {
  root: null,
  overlay: null,
  highlight: null,
  popover: null,
  title: null,
  body: null,
  counter: null,
  back: null,
  next: null,
  skip: null,
  arrow: null
};

function ensureDom() {
  if (els.root) return;

  const root = document.createElement("div");
  root.className = "tour-root hidden";
  root.id = "tour-root";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Product tour");
  root.innerHTML = `
    <div class="tour-overlay" id="tour-overlay"></div>
    <div class="tour-highlight" id="tour-highlight" aria-hidden="true"></div>
    <div class="tour-popover" id="tour-popover">
      <div class="tour-arrow" id="tour-arrow" aria-hidden="true"></div>
      <p class="tour-counter" id="tour-counter"></p>
      <h3 class="tour-title" id="tour-title"></h3>
      <p class="tour-body" id="tour-body"></p>
      <div class="tour-actions">
        <button type="button" class="ghost-btn tour-skip" id="tour-skip">Skip tour</button>
        <div class="tour-nav">
          <button type="button" class="ghost-btn tour-back" id="tour-back">Back</button>
          <button type="button" class="primary-btn tour-next" id="tour-next">Next</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  els.root = root;
  els.overlay = root.querySelector("#tour-overlay");
  els.highlight = root.querySelector("#tour-highlight");
  els.popover = root.querySelector("#tour-popover");
  els.arrow = root.querySelector("#tour-arrow");
  els.title = root.querySelector("#tour-title");
  els.body = root.querySelector("#tour-body");
  els.counter = root.querySelector("#tour-counter");
  els.back = root.querySelector("#tour-back");
  els.next = root.querySelector("#tour-next");
  els.skip = root.querySelector("#tour-skip");

  els.back.addEventListener("click", () => goBack());
  els.next.addEventListener("click", () => goNext());
  els.skip.addEventListener("click", () => endTour(false));
  els.overlay.addEventListener("click", () => endTour(false));

  document.addEventListener("keydown", onKeyDown);
}

function onKeyDown(e) {
  if (!active) return;
  if (e.key === "Escape") {
    e.preventDefault();
    endTour(false);
  } else if (e.key === "ArrowRight" || e.key === "Enter") {
    if (document.activeElement?.closest(".tour-popover")) return;
    e.preventDefault();
    goNext();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    goBack();
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORAGE_SEEN, "1");
  } catch {
    // ignore
  }
  hideWelcomeBanner();
}

function markCompleted(completed) {
  try {
    if (completed) localStorage.setItem(STORAGE_COMPLETED, "1");
    else localStorage.removeItem(STORAGE_COMPLETED);
  } catch {
    // ignore
  }
  syncSettingsCheckbox();
}

export function isTourCompleted() {
  try {
    return localStorage.getItem(STORAGE_COMPLETED) === "1";
  } catch {
    return false;
  }
}

export function syncSettingsCheckbox() {
  const cb = document.querySelector("#tour-completed-checkbox");
  if (cb) cb.checked = isTourCompleted();
}

function hideWelcomeBanner() {
  document.querySelector("#tour-welcome-banner")?.classList.add("hidden");
}

function showStep(index) {
  const step = TOUR_STEPS[index];
  if (!step) return;

  currentIndex = index;
  switchViewFn(step.view);

  window.requestAnimationFrame(() => {
    step.beforeShow?.();
    window.requestAnimationFrame(() => renderStep(step, index));
  });
}

function renderStep(step, index) {
  const total = TOUR_STEPS.length;
  els.counter.textContent = `${index + 1} of ${total}`;
  els.title.textContent = step.title;
  els.body.textContent = step.body;
  els.back.disabled = index === 0;
  els.next.textContent = index === total - 1 ? "Finish" : "Next";

  els.popover.classList.remove(
    "placement-top",
    "placement-bottom",
    "placement-left",
    "placement-right",
    "placement-center"
  );
  els.popover.classList.add(`placement-${step.placement}`);

  if (!step.target) {
    els.highlight.classList.add("hidden");
    els.popover.classList.add("placement-center");
    positionCenterPopover();
    return;
  }

  const target = document.querySelector(step.target);
  if (!target) {
    els.highlight.classList.add("hidden");
    positionCenterPopover();
    return;
  }

  target.scrollIntoView({ block: "nearest", behavior: "smooth" });
  window.requestAnimationFrame(() => positionAroundTarget(target, step.placement));
}

function positionCenterPopover() {
  els.highlight.classList.add("hidden");
  els.popover.style.top = "50%";
  els.popover.style.left = "50%";
  els.popover.style.transform = "translate(-50%, -50%)";
  els.arrow.classList.add("hidden");
}

function positionAroundTarget(target, placement) {
  const rect = target.getBoundingClientRect();
  const pad = 8;
  const hl = els.highlight;
  hl.classList.remove("hidden");
  hl.style.top = `${Math.max(0, rect.top - pad)}px`;
  hl.style.left = `${Math.max(0, rect.left - pad)}px`;
  hl.style.width = `${rect.width + pad * 2}px`;
  hl.style.height = `${rect.height + pad * 2}px`;

  const pop = els.popover;
  pop.style.transform = "";
  pop.classList.remove("placement-center");

  pop.style.visibility = "hidden";
  pop.style.top = "0";
  pop.style.left = "0";
  const popW = pop.offsetWidth || 360;
  const popH = pop.offsetHeight || 200;
  pop.style.visibility = "";

  const margin = 16;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let top;
  let left;
  let effectivePlacement = placement;

  if (placement === "center") {
    positionCenterPopover();
    return;
  }

  const fits = {
    bottom: rect.bottom + margin + popH < vh,
    top: rect.top - margin - popH > 0,
    right: rect.right + margin + popW < vw,
    left: rect.left - margin - popW > 0
  };

  if (!fits[effectivePlacement]) {
    if (effectivePlacement === "bottom" && fits.top) effectivePlacement = "top";
    else if (effectivePlacement === "top" && fits.bottom) effectivePlacement = "bottom";
    else if (effectivePlacement === "right" && fits.left) effectivePlacement = "left";
    else if (effectivePlacement === "left" && fits.right) effectivePlacement = "right";
    else if (fits.bottom) effectivePlacement = "bottom";
    else if (fits.top) effectivePlacement = "top";
    else if (fits.right) effectivePlacement = "right";
    else effectivePlacement = "left";
  }

  pop.classList.remove("placement-top", "placement-bottom", "placement-left", "placement-right");
  pop.classList.add(`placement-${effectivePlacement}`);

  switch (effectivePlacement) {
    case "bottom":
      top = rect.bottom + margin;
      left = rect.left + rect.width / 2 - popW / 2;
      break;
    case "top":
      top = rect.top - margin - popH;
      left = rect.left + rect.width / 2 - popW / 2;
      break;
    case "right":
      top = rect.top + rect.height / 2 - popH / 2;
      left = rect.right + margin;
      break;
    case "left":
    default:
      top = rect.top + rect.height / 2 - popH / 2;
      left = rect.left - margin - popW;
      break;
  }

  left = Math.max(12, Math.min(left, vw - popW - 12));
  top = Math.max(12, Math.min(top, vh - popH - 12));

  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;

  const arrow = els.arrow;
  arrow.classList.remove("hidden");
  arrow.className = `tour-arrow arrow-${effectivePlacement}`;

  if (effectivePlacement === "bottom" || effectivePlacement === "top") {
    const arrowLeft = rect.left + rect.width / 2 - left;
    arrow.style.left = `${Math.max(20, Math.min(arrowLeft, popW - 20))}px`;
    arrow.style.top = effectivePlacement === "bottom" ? "-8px" : `${popH - 8}px`;
  } else {
    arrow.style.top = `${rect.top + rect.height / 2 - top}px`;
    arrow.style.left = effectivePlacement === "right" ? "-8px" : `${popW - 8}px`;
  }
}

function onResize() {
  if (!active || currentIndex < 0) return;
  renderStep(TOUR_STEPS[currentIndex], currentIndex);
}

export function initTour({ switchView }) {
  switchViewFn = switchView;
  ensureDom();
  syncSettingsCheckbox();
  maybeShowWelcomeBanner();
  window.addEventListener("resize", onResize);
}

function maybeShowWelcomeBanner() {
  try {
    if (localStorage.getItem(STORAGE_SEEN) === "1") return;
  } catch {
    return;
  }
  const banner = document.querySelector("#tour-welcome-banner");
  if (banner) banner.classList.remove("hidden");
}

export function startTour(fromStep = 0) {
  ensureDom();
  active = true;
  markSeen();
  els.root.classList.remove("hidden");
  document.body.classList.add("tour-active");
  showStep(fromStep);
}

function goNext() {
  if (currentIndex >= TOUR_STEPS.length - 1) {
    endTour(true);
    return;
  }
  showStep(currentIndex + 1);
}

function goBack() {
  if (currentIndex <= 0) return;
  showStep(currentIndex - 1);
}

function endTour(completed) {
  active = false;
  currentIndex = -1;
  els.root?.classList.add("hidden");
  document.body.classList.remove("tour-active");
  markSeen();
  if (completed) markCompleted(true);
}

export function bindTourUi() {
  document.querySelector("#start-tour-btn")?.addEventListener("click", () => startTour());
  document.querySelector("#tour-welcome-start")?.addEventListener("click", () => startTour());
  document.querySelector("#tour-welcome-dismiss")?.addEventListener("click", () => {
    markSeen();
  });
  document.querySelector("#tour-completed-checkbox")?.addEventListener("change", (e) => {
    markCompleted(e.target.checked);
  });
}
