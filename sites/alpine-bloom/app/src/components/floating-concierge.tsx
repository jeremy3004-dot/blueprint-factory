"use client";

import { useEffect, useState } from "react";

import { Concierge } from "@/components/concierge";
import { analytics } from "@/lib/analytics";

export function FloatingConcierge() {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((current) => {
      const next = !current;
      if (next) analytics.chatOpened({ source: "floating_concierge_button", variant: "floating" });
      return next;
    });
  }

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="floatingConcierge">
      {open ? (
        <div className="floatingConciergePanel" id="floating-concierge-panel">
          <button
            className="floatingConciergeClose"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close Alpine Bloom concierge"
          >
            ×
          </button>
          <Concierge variant="floating" />
        </div>
      ) : null}
      <button
        className="floatingConciergeButton"
        type="button"
        aria-expanded={open}
        aria-controls="floating-concierge-panel"
        onClick={toggleOpen}
      >
        <span>Ask Alpine Bloom</span>
        <small>Routes, altitude, women guides</small>
      </button>
    </div>
  );
}
