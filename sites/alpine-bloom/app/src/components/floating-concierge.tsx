"use client";

import { useEffect, useState } from "react";

import { Concierge } from "@/components/concierge";

export function FloatingConcierge() {
  const [open, setOpen] = useState(false);

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
        onClick={() => setOpen((current) => !current)}
      >
        <span>Ask Alpine Bloom</span>
        <small>Routes, altitude, women guides</small>
      </button>
    </div>
  );
}
