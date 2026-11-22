"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Reveal({
  children,
  className = "",
  y = 36,
  stagger = 0.08,
  start = "top 78%",
  selector = "[data-reveal]",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
  selector?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(selector, root.current);
        if (!items.length) return;

        gsap.from(items, {
          y,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: root.current,
            start,
            once: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
