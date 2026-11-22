"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Wave() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-wave]", {
          drawSVG: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            once: true,
          },
        });
        gsap.from("[data-wave-dot]", {
          scale: 0,
          autoAlpha: 0,
          duration: 0.5,
          delay: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <p className="eyebrow text-eyebrow text-ink-muted">пик</p>
      <svg
        viewBox="0 0 360 150"
        className="mt-3 w-full"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 128H356"
          stroke="var(--color-line)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          data-wave
          d="M4 120C40 120 58 112 82 70C106 28 132 20 160 52C190 88 214 112 250 112C292 112 312 92 344 84"
          stroke="var(--color-ink-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M132 20V128"
          stroke="var(--color-line)"
          strokeWidth="1"
          strokeDasharray="2 6"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          data-wave-dot
          cx="132"
          cy="20"
          r="4"
          fill="var(--color-accent)"
        />
      </svg>
      <div className="mt-2 flex justify-between text-small text-ink-muted">
        <span>0</span>
        <span>3–5 минут</span>
        <span>прошло</span>
      </div>
    </div>
  );
}
