"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SplitLines } from "@/components/ui/split-lines";

const PHASES = [
  {
    time: "20 минут",
    title: "Пульс выравнивается.",
    body: "Сердце перестаёт работать на повышенных оборотах. Тело уже начало ремонт — ты просто этого не чувствуешь.",
    vape: "пульс тоже поднимается: никотин не спрашивает, откуда он.",
    action: "ВЫДОХ: отметь время и закрой приложение.",
  },
  {
    time: "8 часов",
    title: "Кислород возвращается.",
    body: "Угарный газ в крови падает, гемоглобин снова везёт кислород. Голова может болеть — это не «хуже», это перестройка.",
    vape: "угарного газа не было, но никотин всё ещё в крови.",
    action: "ВЫДОХ: стакан воды, дыхание 4–7–8, десять минут без экрана.",
  },
  {
    time: "72 часа",
    title: "Никотин выходит.",
    body: "Самые громкие сутки позже. Тяга ещё будет приходить волнами, но пик уже не тот.",
    vape: "выходит одинаково — из сигарет и из вейпа.",
    action: "ВЫДОХ: три причины, зачем ты это делаешь. Одну покажи близкому.",
  },
];

const GATE =
  "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
const RADIUS = 92;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Hours72() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(GATE, () => {
        const section = root.current;
        if (!section) return;

        const phases = gsap.utils.toArray<HTMLElement>(
          "[data-phase]",
          section,
        );
        const ring = section.querySelector<SVGCircleElement>(
          "[data-meter-ring]",
        );

        section.dataset.mode = "rig";
        gsap.set(phases.slice(1), { yPercent: 80, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
          },
        });

        // A short hold before the first swap: the resting phase is read first.
        tl.to({}, { duration: 0.35 });

        phases.forEach((phase, index) => {
          if (index === 0) return;
          tl.to(phases[index - 1], {
            yPercent: -80,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in",
          }).to(
            phase,
            { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
            "<0.06",
          );
        });

        if (ring) {
          tl.fromTo(
            ring,
            { strokeDashoffset: CIRCUMFERENCE },
            {
              strokeDashoffset: 0,
              duration: tl.duration(),
              ease: "none",
            },
            0,
          );
        }

        return () => {
          delete section.dataset.mode;
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      id="hours"
      ref={root}
      className="group/hours relative bg-surface-1 py-[7rem] data-[mode=rig]:h-[100svh] data-[mode=rig]:overflow-hidden data-[mode=rig]:py-0 md:py-[9rem]"
    >
      <div className="mx-auto flex h-full w-full max-w-[112rem] flex-col justify-center px-[clamp(1.25rem,4vw,4.5rem)]">
        <div className="grid grid-cols-12 items-center gap-x-4 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="eyebrow text-eyebrow text-ink-muted">
              Первые 72 часа
            </p>

            <SplitLines
              as="h2"
              className="mt-5 max-w-[15ch] font-display text-h2"
              start="top 85%"
            >
              Что происходит без никотина.
            </SplitLines>

            <ol className="relative mt-10 space-y-10 lg:mt-12 lg:space-y-0 lg:group-data-[mode=rig]/hours:h-[24rem] lg:group-data-[mode=rig]/hours:overflow-hidden">
              {PHASES.map((phase) => (
                <li
                  key={phase.time}
                  data-phase
                  className="relative lg:group-data-[mode=rig]/hours:absolute lg:group-data-[mode=rig]/hours:inset-0"
                >
                  <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                    <span className="stat text-small text-ink-muted">
                      {phase.time}
                    </span>
                  </div>

                  <h3 className="mt-5 max-w-[20ch] font-display text-h3">
                    {phase.title}
                  </h3>
                  <p className="mt-4 max-w-[50ch] text-body text-ink-muted">
                    {phase.body}
                  </p>
                  <p className="mt-3 max-w-[48ch] text-small text-ink-muted">
                    <span className="text-ink">Для вейпа:</span> {phase.vape}
                  </p>
                  <p className="mt-5 max-w-[48ch] text-small text-accent">
                    {phase.action}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-12 hidden justify-center lg:col-span-5 lg:col-start-8 lg:flex">
            <div className="relative aspect-square w-[min(34vw,26rem)]">
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full -rotate-90"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="100"
                  cy="100"
                  r={RADIUS}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                />
                <circle
                  data-meter-ring
                  cx="100"
                  cy="100"
                  r={RADIUS}
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="stat text-stat text-ink">72</p>
                  <p className="eyebrow mt-1 text-eyebrow text-ink-muted">
                    часа
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-[64ch] text-small text-ink-muted lg:mt-10">
          Ориентиры по данным CDC и NHS. Для вейпов долгосрочные данные ещё
          собираются. Это не медицинская консультация: если ты беременна или
          принимаешь лекарства, сначала поговори с врачом.
        </p>
      </div>
    </section>
  );
}
