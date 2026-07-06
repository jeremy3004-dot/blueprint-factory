/* ==========================================================================
   carousel.js
   Dependency-free, self-initializing version of the tab-filtered
   prev/active/next carousel. No build, no framework.

   - Self-initializes on DOMContentLoaded for every [data-carousel] on the page.
   - Reads its data from a JSON <script type="application/json"> inside the root
     (a "slides" array of { location, type, image, copy } objects).
   - Renders an ARIA tablist of the unique `type` values with roving tabIndex,
     a prev/active/next stage, arrow controls, and dot navigation.
   - The entrance keyframes re-fire on every change because the backdrop and
     card nodes are re-created (fresh DOM node = fresh animation), mirroring the
     React `key=` remount trick.
   - Respects prefers-reduced-motion (the CSS clamps durations; the JS adds no
     scripted animation of its own).

   Markup contract:
     <section class="crs-root" data-carousel aria-label="...">
       <script type="application/json">[ ...slides... ]</script>
     </section>
   ========================================================================== */
(function () {
  "use strict";

  function slug(text) {
    return text.replace(/\s+/g, "-").toLowerCase();
  }

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

  function initCarousel(root) {
    var dataScript = root.querySelector('script[type="application/json"]');
    if (!dataScript) return;

    var slides;
    try {
      slides = JSON.parse(dataScript.textContent);
    } catch (err) {
      return;
    }
    if (!Array.isArray(slides) || slides.length === 0) return;

    // Unique tab types, in first-seen order.
    var types = [];
    slides.forEach(function (s) {
      if (types.indexOf(s.type) === -1) types.push(s.type);
    });

    var state = { type: types[0], index: 0 };

    // Build stable containers once.
    var tabs = el("div", "crs-tabs", { role: "tablist", "aria-label": "Categories" });
    var stage = el("div", "crs-stage", {
      role: "tabpanel",
      "aria-live": "polite"
    });
    var controls = el("div", "crs-controls");
    var dots = el("div", "crs-dots", { "aria-label": "Carousel position" });

    root.appendChild(tabs);
    root.appendChild(stage);
    root.appendChild(controls);
    root.appendChild(dots);

    function filtered() {
      return slides.filter(function (s) {
        return s.type === state.type;
      });
    }

    function tabId(type) {
      return "crs-tab-" + slug(type);
    }

    function render() {
      var pool = filtered();
      if (pool.length === 0) return;
      var activeIndex = ((state.index % pool.length) + pool.length) % pool.length;
      state.index = activeIndex;
      var prevIndex = (activeIndex - 1 + pool.length) % pool.length;
      var nextIndex = (activeIndex + 1) % pool.length;
      var active = pool[activeIndex];

      // ---- Tabs (roving tabIndex) ----
      tabs.innerHTML = "";
      types.forEach(function (type) {
        var isActive = type === state.type;
        var btn = el("button", isActive ? "isActive" : "", {
          type: "button",
          id: tabId(type),
          role: "tab",
          "aria-selected": isActive ? "true" : "false",
          tabindex: isActive ? "0" : "-1"
        });
        btn.textContent = type;
        btn.addEventListener("click", function () {
          selectType(type);
        });
        btn.addEventListener("keydown", function (event) {
          handleTabKey(event, type);
        });
        tabs.appendChild(btn);
      });
      stage.setAttribute("aria-labelledby", tabId(state.type));

      // ---- Stage: rebuild so entrance keyframes re-fire ----
      stage.innerHTML = "";

      var backdrop = el("img", "crs-backdrop", { src: active.image, alt: "" });
      stage.appendChild(backdrop);

      if (pool.length > 1) {
        stage.appendChild(buildPreview(pool[prevIndex], "Previous", prevIndex));
      }

      stage.appendChild(buildCard(active));

      if (pool.length > 1) {
        stage.appendChild(buildPreview(pool[nextIndex], "Next", nextIndex));
      }

      // ---- Controls ----
      controls.innerHTML = "";
      var prevBtn = el("button", "", { type: "button", "aria-label": "Previous" });
      prevBtn.appendChild(el("span", "", { "aria-hidden": "true" }));
      prevBtn.addEventListener("click", function () {
        move(-1);
      });
      var counter = el("span");
      counter.textContent = activeIndex + 1 + " / " + pool.length;
      var nextBtn = el("button", "", { type: "button", "aria-label": "Next" });
      nextBtn.appendChild(el("span", "", { "aria-hidden": "true" }));
      nextBtn.addEventListener("click", function () {
        move(1);
      });
      controls.appendChild(prevBtn);
      controls.appendChild(counter);
      controls.appendChild(nextBtn);

      // ---- Dots ----
      dots.innerHTML = "";
      pool.forEach(function (slide, i) {
        var dot = el("button", i === activeIndex ? "isActive" : "", {
          type: "button",
          "aria-label": "Show " + slide.location
        });
        dot.addEventListener("click", function () {
          state.index = i;
          render();
        });
        dots.appendChild(dot);
      });
    }

    function buildCard(slide) {
      var card = el("article", "crs-card");
      card.appendChild(
        el("img", "crs-card-media", {
          src: slide.image,
          alt: slide.location + " preview"
        })
      );
      var body = el("div", "crs-card-body");
      var kicker = el("p");
      kicker.textContent = slide.type;
      var title = el("h3");
      title.textContent = slide.location;
      var copy = el("span");
      copy.textContent = slide.copy;
      var cta = el("button", "", { type: "button" });
      cta.textContent = "View";
      body.appendChild(kicker);
      body.appendChild(title);
      body.appendChild(copy);
      body.appendChild(cta);
      card.appendChild(body);
      return card;
    }

    function buildPreview(slide, label, targetIndex) {
      var btn = el("button", "crs-preview", {
        type: "button",
        "aria-label": "Show " + slide.location
      });
      btn.appendChild(el("img", "", { src: slide.image, alt: "" }));
      var span = el("span");
      span.textContent = label;
      var strong = el("strong");
      strong.textContent = slide.location;
      btn.appendChild(span);
      btn.appendChild(strong);
      btn.addEventListener("click", function () {
        state.index = targetIndex;
        render();
      });
      return btn;
    }

    function move(direction) {
      var pool = filtered();
      state.index = (state.index + direction + pool.length) % pool.length;
      render();
    }

    function selectType(type) {
      state.type = type;
      state.index = 0;
      render();
    }

    function handleTabKey(event, type) {
      var offset =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (offset === 0) return;
      event.preventDefault();
      var currentIndex = types.indexOf(type);
      var nextType = types[(currentIndex + offset + types.length) % types.length];
      selectType(nextType);
      var nextTab = root.querySelector("#" + CSS.escape(tabId(nextType)));
      if (nextTab) nextTab.focus();
    }

    render();
  }

  function boot() {
    var roots = document.querySelectorAll("[data-carousel]");
    Array.prototype.forEach.call(roots, initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
