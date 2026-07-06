/* ==========================================================================
   accordion.js
   Tiny, dependency-free single-open accordion controller.

   - Self-initializes on DOMContentLoaded for every [data-accordion] on the page.
   - Single-open: opening one item closes the others in the same accordion.
   - Keeps aria-expanded (on the button) and [hidden] (on the panel) in sync.
   - Markup contract:
       <div class="ac-accordion" data-accordion>
         <div class="ac-item">
           <button class="ac-trigger" aria-expanded="false" aria-controls="p1">Title</button>
           <div class="ac-panel" id="p1" role="region" hidden> ... </div>
         </div>
         ...
       </div>
     An item may start open by setting aria-expanded="true" and removing
     [hidden] from its panel in the initial HTML.
   ========================================================================== */
(function () {
  "use strict";

  function initAccordion(root) {
    var triggers = Array.prototype.slice.call(
      root.querySelectorAll(".ac-trigger")
    );

    function setOpen(trigger, open) {
      var panelId = trigger.getAttribute("aria-controls");
      var panel = panelId ? root.querySelector("#" + CSS.escape(panelId)) : null;
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (panel) {
        if (open) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "");
        }
      }
    }

    triggers.forEach(function (trigger) {
      // Ensure a defined starting state if the author omitted the attribute.
      if (!trigger.hasAttribute("aria-expanded")) {
        setOpen(trigger, false);
      }

      trigger.addEventListener("click", function () {
        var isOpen = trigger.getAttribute("aria-expanded") === "true";
        // Single-open: close every sibling first.
        triggers.forEach(function (other) {
          setOpen(other, false);
        });
        // Toggle the clicked one (closes it if it was already open).
        setOpen(trigger, !isOpen);
      });
    });
  }

  function initAll() {
    var roots = document.querySelectorAll("[data-accordion]");
    Array.prototype.forEach.call(roots, initAccordion);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  // Expose for manual init of dynamically added accordions.
  window.initAccordion = initAccordion;
})();
