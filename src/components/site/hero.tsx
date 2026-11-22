"use client";

import { useRef } from "react";
import { ArrowRight } from "@struq/icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { HeroHeadline } from "@/components/ui/hero-headline";
import { BreathArc } from "@/components/ui/breath-arc";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-arc]", {
          drawSVG: 0,
          duration: 2,
          ease: "power2.inOut",
          delay: 0.35,
        });

        gsap.from("[data-hero-copy]", {
          y: 28,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.35,
          stagger: 0.08,
        });

        gsap.from("[data-hero-aside]", {
          autoAlpha: 0,
          y: 24,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.8,
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .to("[data-hero-title]", { yPercent: -22, ease: "none" }, 0)
          .to("[data-hero-ghost]", { yPercent: -12, ease: "none" }, 0)
          .to("[data-hero-meta]", { autoAlpha: 0.2, yPercent: -40, ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-x-clip pb-7 pt-32 md:pt-40"
    >
      <BreathArc />

      <div className="relative z-10 mx-auto w-full max-w-[112rem] px-[clamp(1.25rem,4vw,4.5rem)]">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 lg:col-span-8">
            <div data-hero-title>
              <p
                data-hero-copy
                className="eyebrow text-eyebrow text-ink-muted"
              >
                21 день · без силы воли
              </p>

              <HeroHeadline className="mt-6 max-w-[14ch] font-display text-display md:mt-8">
                Бросить курить и вейпить.
              </HeroHeadline>

              <p
                data-hero-copy
                className="mt-8 max-w-[46ch] text-lead text-ink-muted md:mt-10"
              >
                ВЫДОХ — система на 21 день для сигарет, вейпов и электронок. Не
                уговаривает и не пугает. Знает, в какую минуту тянет, и что
                делать тогда.
              </p>
            </div>

            <div
              data-hero-copy
              className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center md:mt-12"
            >
              <a href="#price" className="btn-primary">
                <span>Начать бесплатно</span>
                <ArrowRight size={18} strokeWidth={1.5} />
              </a>
              <a href="#money" className="btn-ghost link-under">
                <span>Посчитать мои деньги</span>
              </a>
            </div>
          </div>

          <aside
            data-hero-aside
            className="col-span-4 hidden flex-col items-center justify-end gap-7 self-end pb-2 lg:flex"
          >
            <div
              className="relative aspect-square w-[min(19vw,15rem)]"
              aria-hidden
            >
              <div className="breathe absolute inset-0 rounded-full border border-ink/25" />
              <div
                className="breathe absolute inset-[19%] rounded-full border border-ink/10"
                style={{ animationDelay: "-4s" }}
              />
              <span className="absolute inset-0 grid place-items-center eyebrow text-eyebrow text-ink-muted">
                вдох
              </span>
            </div>
            <p className="max-w-[20ch] text-center text-small text-ink-muted">
              Дыши медленнее, чем хочется. Это первое, что возвращается.
            </p>
          </aside>
        </div>
      </div>

      <div
        data-hero-meta
        className="relative z-10 mx-auto mt-24 w-full max-w-[112rem] px-[clamp(1.25rem,4vw,4.5rem)]"
      >
        <div className="flex items-end justify-between gap-6 border-t border-line pt-5">
          <p className="max-w-[38ch] text-small text-ink-muted">
            18+ · образовательный продукт, не заменяет помощь врача
          </p>
          <p className="hidden text-small text-ink-muted sm:block">
            листай
            <span className="ml-3 inline-block h-7 w-px bg-line align-middle" />
          </p>
        </div>
      </div>

      <span
        data-hero-ghost
        aria-hidden
        className="pointer-events-none absolute -right-[7vw] bottom-[3vh] z-0 select-none whitespace-nowrap font-display text-ghost text-ink/[0.055]"
      >
        ВЫДОХ
      </span>
    </section>
  );
}
