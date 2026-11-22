"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "div";

export function SplitLines({
  children,
  as: Tag = "h2",
  className = "",
  start = "top 82%",
}: {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
  start?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current?.querySelector<HTMLElement>("[data-split]");
        if (!el) return;

        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.05,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: root.current,
                start,
                once: true,
              },
            });
          },
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <Tag data-split className={className}>
        {children}
      </Tag>
    </div>
  );
}
