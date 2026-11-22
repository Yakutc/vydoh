"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import type Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Mobile URL-bar show/hide resizes the viewport; without this every pin
    // re-measures mid-scroll and jumps.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Resolve the instance INSIDE the ticker callback, every frame. Never
    // capture it once: ReactLenis populates the ref during its own mount, and
    // an early return here makes the page completely unscrollable.
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();

    let poll: ReturnType<typeof setInterval> | undefined;
    let currentLenis: Lenis | undefined;
    const bind = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return false;
      currentLenis = lenis;
      lenis.on("scroll", onScroll);
      // Delayed initial re-measure: pins sized before webfonts land are stale.
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 400);
      return true;
    };
    if (!bind()) {
      poll = setInterval(() => {
        if (bind()) clearInterval(poll);
      }, 50);
    }

    return () => {
      if (poll) clearInterval(poll);
      currentLenis?.off("scroll", onScroll);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, autoRaf: false, anchors: true }}
    >
      {children}
    </ReactLenis>
  );
}
