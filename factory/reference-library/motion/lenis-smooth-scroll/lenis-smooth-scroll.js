/* =========================================================================
   lenis-smooth-scroll.js
   Canonical Lenis smooth-scroll boot, extracted from alpine-bloom.

   Key discipline: it SKIPS Lenis entirely under prefers-reduced-motion.
   No Lenis instance is created, no RAF loop runs — the browser's native
   scrolling is left untouched.

   Lenis is an npm package. Uncomment the import below in a bundled app:

       import Lenis from "lenis";

   For the buildless demo.html we can't npm-install, so this module reads
   Lenis from a global (window.Lenis, e.g. via a CDN <script>) if present,
   and otherwise no-ops gracefully — the demo falls back to CSS
   `scroll-behavior: smooth` (see lenis-smooth-scroll.css / demo.html).
   ========================================================================= */

// import Lenis from "lenis"; // <-- enable in a bundled (Vite/Next/webpack) app

export function initSmoothScroll() {
  // Reduced motion: do NOT start Lenis. Return a no-op cleanup.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return function cleanup() {};
  }

  // Resolve Lenis: prefer the ESM import (bundled app); fall back to a global
  // (CDN <script> in the demo). If neither exists, no-op.
  var LenisCtor =
    typeof Lenis !== "undefined"
      ? Lenis
      : typeof window !== "undefined" && window.Lenis
      ? window.Lenis
      : null;

  if (!LenisCtor) {
    // No Lenis available (e.g. buildless demo without the CDN tag loaded).
    // Native / CSS smooth scrolling remains in effect.
    return function cleanup() {};
  }

  // Same options as alpine-bloom.
  var lenis = new LenisCtor({ duration: 1.1, smoothWheel: true });

  var raf = 0;
  function loop(t) {
    lenis.raf(t);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  // Cleanup (call on unmount / teardown).
  return function cleanup() {
    if (raf) cancelAnimationFrame(raf);
    lenis.destroy();
  };
}

/* Self-initialize when loaded as a plain <script type="module"> on a page.
   In a framework, import { initSmoothScroll } and call it from an effect
   instead (see README). */
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initSmoothScroll();
    });
  } else {
    initSmoothScroll();
  }
}
