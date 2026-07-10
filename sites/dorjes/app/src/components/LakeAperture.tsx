"use client";

import { useEffect, useRef, useState } from "react";

export function LakeAperture() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      if (window.innerWidth <= 720) {
        frame.style.width = "";
        frame.style.marginLeft = "";
        return;
      }
      const parentWidth = frame.parentElement?.clientWidth ?? frame.clientWidth;
      const spread = Math.max(0, window.innerWidth - parentWidth);
      const progress = Math.min(1, Math.max(0, window.scrollY / 300));
      frame.style.width = `${parentWidth + spread * progress}px`;
      frame.style.marginLeft = `${-(spread * progress) / 2}px`;
    };
    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const toggleFilm = async () => {
    const video = videoRef.current;
    if (!playing) {
      setPlaying(true);
      requestAnimationFrame(() => videoRef.current?.play());
      return;
    }
    video?.pause();
    setPlaying(false);
  };

  return (
    <div ref={frameRef} className={`lake-hero-frame media-frame ${playing ? "is-playing" : ""}`}>
      <img className="lake-hero-photo" src="/media/resort-view.jpg" alt="A shaded terrace at Dorje's overlooking Phewa Lake" />
      <video ref={videoRef} muted loop playsInline aria-label="Dorje's illustrated resort film" preload="metadata">
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>
      <div className="lake-hero-mark" aria-hidden="true">
        <span>DORJE&apos;S</span>
        <small>Pokhara · Nepal</small>
      </div>
      <button className="film-toggle" type="button" onClick={toggleFilm} aria-pressed={playing}>
        <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
        {playing ? "Pause film" : "Watch the resort film"}
      </button>
    </div>
  );
}

