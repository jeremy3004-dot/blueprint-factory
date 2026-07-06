/* =========================================================================
   scroll-reveal.js
   Vanilla, self-initializing one-shot reveal.
   Extracted from alpine-bloom's IntersectionObserver reveal loop.

   - Observes every [data-reveal] element.
   - Adds .in the first time it enters the viewport, then unobserves it
     (one-shot: never re-hides on scroll-up).
   - Early-returns under prefers-reduced-motion so nothing is ever hidden;
     the CSS already forces the final visible state in that case.

   No imports. Scoped to the [data-reveal] selector.
   ========================================================================= */
(function () {
  "use strict";

  function initScrollReveal() {
    // Respect reduced-motion: do nothing. CSS keeps elements visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var els = Array.prototype.slice.call(
      document.querySelectorAll("[data-reveal]")
    );
    if (!els.length) return;

    // Fallback for very old browsers without IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("in");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target); // one-shot
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
