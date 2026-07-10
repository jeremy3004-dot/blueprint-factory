"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";

interface RevealStyle extends CSSProperties {
  "--delay"?: string;
}

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  readonly delay?: number;
}

export function Reveal({ delay = 0, style, ...props }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add("in");
          observer.unobserve(element);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealStyle: RevealStyle = { ...style, "--delay": `${delay}ms` };

  return <div ref={elementRef} data-reveal style={revealStyle} {...props} />;
}
