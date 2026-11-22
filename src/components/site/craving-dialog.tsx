"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";

type Phase = "вдох" | "держи" | "выдох" | "дыши ровно";

export function CravingDialog() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("вдох");
  const panel = useRef<HTMLDivElement | null>(null);
  const breath = useRef<gsap.core.Timeline | null>(null);
  const enter = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const lenis = useLenis();

  useEffect(
    () => () => {
      enter.current?.kill();
      breath.current?.kill();
      lenis?.start();
    },
    [lenis],
  );

  const setPanel = useCallback((node: HTMLDivElement | null) => {
    panel.current = node;
    if (!node) return;

    const circle = node.querySelector<HTMLElement>("[data-breath-circle]");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!reduced && circle) gsap.set(circle, { scale: 0.62 });

    enter.current = gsap
      .timeline()
      .fromTo(node, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });

    if (circle) {
      enter.current.fromTo(
        circle,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6, ease: "power3.out" },
        "<0.05",
      );
    }

    if (reduced || !circle) {
      setPhase("дыши ровно");
      return;
    }

    setPhase("вдох");
    breath.current = gsap
      .timeline({ repeat: -1, defaults: { ease: "sine.inOut" } })
      .call(() => setPhase("вдох"))
      .to(circle, { scale: 1, duration: 4 })
      .call(() => setPhase("держи"))
      .to(circle, { scale: 1, duration: 4 })
      .call(() => setPhase("выдох"))
      .to(circle, { scale: 0.62, duration: 6 });
  }, []);

  const onOpenChange = (next: boolean) => {
    if (next) {
      lenis?.stop();
      setOpen(true);
      return;
    }

    if (closing.current) return;
    closing.current = true;
    enter.current?.kill();
    breath.current?.kill();
    breath.current = null;

    const node = panel.current;
    if (!node) {
      closing.current = false;
      setOpen(false);
      lenis?.start();
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.to(node, {
      autoAlpha: 0,
      y: reduced ? 0 : 18,
      duration: reduced ? 0.18 : 0.32,
      ease: "power2.in",
      onComplete: () => {
        closing.current = false;
        setOpen(false);
        setPhase("вдох");
        lenis?.start();
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button type="button" className="btn-primary">
          <span className="flex items-center gap-3">
            <span
              className="size-2.5 shrink-0 rounded-full bg-surface-0 ring-2 ring-surface-0/30"
              aria-hidden
            />
            Меня тянет прямо сейчас
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30" />
        <Dialog.Content
          ref={setPanel}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-ink text-surface-0"
        >
          <Dialog.Title className="sr-only">
            Пережди пик тяги: дыхание 4–4–6
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Дыши с кругом: вдох на четыре счёта, задержка на четыре, выдох на
            шесть. Волна пройдёт.
          </Dialog.Description>

          <div className="flex items-center justify-between px-[clamp(1.25rem,4vw,4.5rem)] pt-6">
            <p className="eyebrow text-eyebrow text-surface-2">ВЫДОХ · пауза</p>
            <Dialog.Close className="font-ui text-ui grid h-12 min-w-12 place-items-center px-2 text-surface-2">
              Закрыть
            </Dialog.Close>
          </div>

          <div className="grid flex-1 place-items-center px-6 py-8">
            <div className="relative grid aspect-square w-[min(78vw,34rem)] place-items-center">
              <div
                data-breath-circle
                className="absolute inset-0 rounded-full border border-surface-0/30 bg-surface-0/[0.04]"
              />
              <div
                aria-hidden
                className="absolute inset-[18%] rounded-full border border-surface-0/10"
              />
              <p
                aria-live="polite"
                className="relative font-display text-h2 text-surface-0"
              >
                {phase}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 px-[clamp(1.25rem,4vw,4.5rem)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[34ch] text-small text-surface-2">
              Вдох на 4. Держи 4. Выдох на 6. Не борись с тягой — дай ей пройти
              через тебя.
            </p>
            <Dialog.Close className="btn-primary self-start bg-surface-0 text-ink sm:self-auto">
              <span>Мне уже легче</span>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
