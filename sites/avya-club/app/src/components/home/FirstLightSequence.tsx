"use client";

import { useEffect, useState } from "react";

import { MediaFrame } from "../MediaFrame";
import { nextSequenceIndex, sequenceProgress } from "../../lib/experience-sequence";

const sequenceStates = [
  {
    label: "Pure energy",
    support: "Fitness, healing, and mindfulness in one holistic club.",
    objectPosition: "50% center",
    src: "/media/avya-pure-energy-gym.jpg",
    alt: "Avya Club gym equipment"
  },
  {
    label: "Deep recovery",
    support: "A space for personal growth, recovery, and peak performance.",
    objectPosition: "50% center",
    src: "/media/avya-deep-recovery-physiotherapy.jpg",
    alt: "Physiotherapy treatment at Avya Club"
  },
  {
    label: "First light",
    support: "Avya means pure and first light.",
    objectPosition: "50% center",
    src: "/media/avya-first-light-club.jpg",
    alt: "Avya Club campus and pool beneath a blue sky"
  }
] as const;

export function FirstLightSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionAllowed, setMotionAllowed] = useState(
    () => typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const activeState = sequenceStates[activeIndex];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setMotionAllowed(!preference.matches);
      if (preference.matches) setActiveIndex(0);
    };

    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!motionAllowed) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => nextSequenceIndex(index, 1, sequenceStates.length));
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, motionAllowed]);

  function selectState(index: number) {
    setActiveIndex(index);
  }

  return (
    <>
      <div className="firstLightMedia">
        {sequenceStates.map((state, index) => (
          <MediaFrame
            key={state.label}
            alt={index === activeIndex ? state.alt : ""}
            className={`firstLightMediaLayer${index === activeIndex ? " isActive" : ""}`}
            dataExperience={state.label}
            objectPosition={state.objectPosition}
            src={state.src}
          />
        ))}
        <span className="firstLightScrim" />
      </div>

      <div className="heroLayout">
        <div className="heroCopy textReveal" aria-live="polite">
          <p className="heroEyebrow">Avya Club · Pokhara</p>
          <h1 id="home-hero-title" key={activeState.label}>
            <span>{activeState.label}</span>
          </h1>
          <p className="heroSupport" key={activeState.support}>
            {activeState.support}
          </p>
        </div>

        <div className="heroActions">
          <a className="heroPrimaryCta" href="/membership">
            Explore membership
          </a>
          <a className="heroSecondaryCta" href="https://avya.club/register">
            Register with Avya
          </a>
        </div>

        <div className="sequenceControl" aria-label="First light sequence states">
          <div className="sequenceLabels">
            {sequenceStates.map((state, index) => (
              <button
                aria-current={index === activeIndex ? "true" : undefined}
                key={state.label}
                onClick={() => selectState(index)}
                type="button"
              >
                {state.label}
              </button>
            ))}
          </div>
          <div className="sequenceTrack" aria-hidden="true">
            <span style={{ width: sequenceProgress(activeIndex, sequenceStates.length) }} />
          </div>
        </div>
      </div>
    </>
  );
}
