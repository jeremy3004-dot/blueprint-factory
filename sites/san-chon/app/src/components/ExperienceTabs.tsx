"use client";

import { type KeyboardEvent, useState } from "react";

import { experiences } from "@/data/site";

export default function ExperienceTabs() {
  const [activeId, setActiveId] = useState(experiences[0].id);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % experiences.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + experiences.length) % experiences.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = experiences.length - 1;
    }

    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextExperience = experiences[nextIndex];
    setActiveId(nextExperience.id);
    document.getElementById(`experience-tab-${nextExperience.id}`)?.focus();
  }

  return (
    <section className={`experience experience--${activeId}`} id="experience" aria-labelledby="experience-title">
      <div className="experience__heading container">
        <p className="eyebrow">The San Chon experience</p>
        <h2 className="display" id="experience-title">
          Come hungry. Leave at an easier pace.
        </h2>
      </div>

      <div className="experience__tabs container" role="tablist" aria-label="Dining experiences">
        {experiences.map((experience, index) => {
          const isActive = experience.id === activeId;
          return (
            <button
              aria-controls={`experience-panel-${experience.id}`}
              aria-selected={isActive}
              className={`experience__item${isActive ? " is-active" : ""}`}
              id={`experience-tab-${experience.id}`}
              key={experience.id}
              onClick={() => setActiveId(experience.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <span className="eyebrow">{experience.eyebrow}</span>
              <strong>{experience.title}</strong>
            </button>
          );
        })}
      </div>
      <div className="experience__panels container">
        {experiences.map((experience) => {
          const isActive = experience.id === activeId;
          return (
            <div
              aria-labelledby={`experience-tab-${experience.id}`}
              className="experience__panel"
              hidden={!isActive}
              id={`experience-panel-${experience.id}`}
              key={experience.id}
              role="tabpanel"
              tabIndex={0}
            >
              <p>{experience.description}</p>
              <a href="/menu">Explore the menu <span aria-hidden="true">↗</span></a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
