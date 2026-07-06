/* ==========================================================================
   media-gallery.js
   Dependency-free, self-initializing folding gallery. No build, no framework.

   - Self-initializes on DOMContentLoaded for every [data-media-gallery].
   - Reads its data from a JSON <script type="application/json"> inside the root
     (an array of { title, label, image, copy } objects).
   - Builds the three-panel folding row, a caption, and Prev/Next controls.
   - Clicking a panel (or a control) promotes it; the active panel gets
     .isActive (the CSS handles the lift + dim). Controls wrap with modulo,
     mirroring `nextJourney`.
   - No scripted animation, so prefers-reduced-motion is fully honored by CSS.

   Markup contract:
     <section class="mg-root" data-media-gallery aria-label="...">
       <script type="application/json">[ ...items... ]</script>
     </section>
   ========================================================================== */
(function () {
  "use strict";

  function el(tag, className, attrs) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        node.setAttribute(key, attrs[key]);
      });
    }
    return node;
  }

  function initGallery(root) {
    var dataScript = root.querySelector('script[type="application/json"]');
    if (!dataScript) return;

    var items;
    try {
      items = JSON.parse(dataScript.textContent);
    } catch (err) {
      return;
    }
    if (!Array.isArray(items) || items.length === 0) return;

    var activeIndex = 0;

    var gallery = el("div", "mg-gallery", { "aria-live": "polite" });
    var caption = el("article", "mg-caption");

    var panels = items.map(function (item, i) {
      var btn = el("button", "mg-panel", {
        type: "button",
        "aria-label": "Show " + item.title
      });
      btn.appendChild(el("img", "", { src: item.image, alt: "" }));
      btn.addEventListener("click", function () {
        setActive(i);
      });
      gallery.appendChild(btn);
      return btn;
    });

    // Caption nodes (updated in place).
    var title = el("h3");
    var copy = el("p");
    var link = el("a", "", { href: "#" });
    var controls = el("div", "mg-controls");
    var prev = el("button", "", { type: "button", "aria-label": "Previous" });
    var track = el("span");
    var next = el("button", "", { type: "button", "aria-label": "Next" });
    prev.addEventListener("click", function () {
      move(-1);
    });
    next.addEventListener("click", function () {
      move(1);
    });
    controls.appendChild(prev);
    controls.appendChild(track);
    controls.appendChild(next);
    caption.appendChild(title);
    caption.appendChild(copy);
    caption.appendChild(link);
    caption.appendChild(controls);

    root.appendChild(gallery);
    root.appendChild(caption);

    function move(direction) {
      setActive((activeIndex + direction + items.length) % items.length);
    }

    function setActive(index) {
      activeIndex = index;
      panels.forEach(function (panel, i) {
        panel.classList.toggle("isActive", i === index);
      });
      var item = items[index];
      title.textContent = item.title;
      copy.textContent = item.copy;
      link.textContent = "Explore " + (item.label || item.title);
    }

    setActive(0);
  }

  function boot() {
    var roots = document.querySelectorAll("[data-media-gallery]");
    Array.prototype.forEach.call(roots, initGallery);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
