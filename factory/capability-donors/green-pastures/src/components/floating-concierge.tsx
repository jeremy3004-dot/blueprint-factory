"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircleMore, X } from "lucide-react";

import { AIConcierge } from "@/components/ai-concierge";
import { ConciergeAvatarIcon } from "@/components/concierge-avatar-icon";
import { companyProfile } from "@/data/company";
import { analytics } from "@/lib/analytics";

export function FloatingConcierge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            id="floating-concierge-panel"
            className="fixed bottom-28 right-4 z-50 w-[calc(100vw-2rem)] max-w-[26rem] md:bottom-32 md:right-6"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/25 p-2 text-stone-300 transition hover:bg-black/40 hover:text-white"
                aria-label="Close chat helper"
              >
                <X className="h-4 w-4" />
              </button>
              <AIConcierge variant="floating" className="pr-14" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => {
          setOpen((current) => {
            const nextOpen = !current;

            if (nextOpen) {
              analytics.chatOpened({ source: "floating_concierge" });
            }

            return nextOpen;
          });
        }}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-[rgba(11,14,18,0.92)] p-0 shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition hover:border-amber-300/30 sm:h-auto sm:w-auto sm:gap-3 sm:px-3 sm:py-3 sm:pr-5 md:bottom-6 md:right-6"
        aria-expanded={open}
        aria-controls="floating-concierge-panel"
      >
        <span className="relative hidden h-16 w-16 overflow-hidden rounded-full border border-amber-300/30 bg-[#2d1d1b] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] sm:block">
          <ConciergeAvatarIcon />
        </span>
          <span className="hidden text-left sm:block">
            <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-stone-500">
              Ask {companyProfile.shortName}
            </span>
            <span className="mt-1 block text-sm leading-5 text-stone-100">
              Routes, permits, guide options, helicopter exits.
            </span>
          </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-300">
          <MessageCircleMore className="h-4 w-4" />
        </span>
      </motion.button>
    </>
  );
}
