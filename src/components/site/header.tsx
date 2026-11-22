"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import { Dialog } from "radix-ui";
import { useLenis } from "lenis/react";
import { ArrowRight } from "@struq/icons";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Logo } from "@/components/brand/logo";
import { Mark } from "@/components/brand/mark";
import { CITY, CONTACT_EMAIL } from "@/lib/site";

const LINKS = [
  { href: "#method", label: "Метод" },
  { href: "#hours", label: "72 часа" },
  { href: "#money", label: "Деньги" },
  { href: "#price", label: "Цена" },
];

export function Header() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement | null>(null);
  const enterTl = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const pendingHref = useRef<string | null>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;

      const surface = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const next = self.scroll() > 80 ? "true" : "false";
          if (el.dataset.surfaced !== next) el.dataset.surfaced = next;
        },
      });

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const show = gsap.quickTo(el, "yPercent", {
            duration: 0.4,
            ease: "power4.out",
          });
          const hide = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              if (self.scroll() < 80) {
                show(0);
                return;
              }
              show(self.direction === 1 ? -100 : 0);
            },
          });
          return () => {
            hide.kill();
            gsap.set(el, { yPercent: 0 });
          };
        },
      );

      return () => {
        surface.kill();
        mm.revert();
      };
    },
    { scope: header },
  );

  const setPanel = useCallback((node: HTMLDivElement | null) => {
    panel.current = node;
    if (!node) return;

    const links = node.querySelectorAll("[data-menu-link]");
    const meta = node.querySelector("[data-menu-meta]");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      enterTl.current = gsap
        .timeline()
        .fromTo(node, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });
      return;
    }

    enterTl.current = gsap
      .timeline()
      .fromTo(
        node,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.6, ease: "power4.inOut" },
      )
      .fromTo(
        links,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 },
        "-=0.15",
      )
      .fromTo(
        meta,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        "<0.1",
      );
  }, []);

  const onOpenChange = (next: boolean) => {
    if (next) {
      lenis?.stop();
      setOpen(true);
      return;
    }

    if (closing.current || !panel.current) {
      setOpen(false);
      lenis?.start();
      return;
    }

    closing.current = true;
    enterTl.current?.kill();

    const node = panel.current;
    const links = node.querySelectorAll("[data-menu-link]");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const exit = gsap.timeline({
      onComplete: () => {
        closing.current = false;
        setOpen(false);
        lenis?.start();
        const href = pendingHref.current;
        pendingHref.current = null;
        if (href) {
          if (lenis) {
            lenis.scrollTo(href, { offset: -72, duration: 1.1 });
          } else {
            document
              .querySelector(href)
              ?.scrollIntoView({ behavior: "smooth" });
          }
        }
      },
    });

    if (reduced) {
      exit.to(node, { autoAlpha: 0, duration: 0.18, ease: "power2.in" });
      return;
    }

    exit
      .to(links, {
        yPercent: -110,
        duration: 0.35,
        ease: "power2.in",
        stagger: { each: 0.03, from: "end" },
      })
      .to(
        node,
        { yPercent: -100, duration: 0.5, ease: "power4.inOut" },
        "-=0.1",
      );
  };

  const onLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.button !== 0
    ) {
      return;
    }
    event.preventDefault();
    pendingHref.current = href;
    onOpenChange(false);
  };

  return (
    <header
      ref={header}
      data-surfaced="false"
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent transition-colors duration-500 data-[surfaced=true]:border-line data-[surfaced=true]:bg-surface-0"
    >
      <div className="flex h-20 items-center justify-between gap-6 px-[clamp(1.25rem,4vw,4.5rem)]">
        <a
          href="#top"
          aria-label="ВЫДОХ — наверх"
          className="inline-flex shrink-0 items-center"
        >
          <Logo />
        </a>

        <nav
          aria-label="Главное"
          className="hidden items-center gap-8 md:flex lg:gap-10"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-under font-ui text-ui text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#price" className="btn-primary hidden md:inline-flex">
            <span>Начать</span>
            <ArrowRight size={18} strokeWidth={1.5} />
          </a>

          <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger className="font-ui text-ui grid h-12 min-w-12 place-items-center px-2 md:hidden">
              Меню
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Content
                ref={setPanel}
                className="fixed inset-0 z-50 overscroll-contain bg-ink text-surface-0"
              >
                <Dialog.Title className="sr-only">Меню сайта</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Навигация по разделам ВЫДОХ
                </Dialog.Description>

                <div className="absolute inset-x-0 top-5 flex items-center justify-between px-[clamp(1.25rem,4vw,4.5rem)]">
                  <span className="inline-flex items-center gap-2.5">
                    <Mark size={22} className="text-surface-0" />
                    <span className="font-display text-[1.3rem] leading-none tracking-[0.14em]">
                      ВЫДОХ
                    </span>
                  </span>

                  <Dialog.Close className="grid h-12 min-w-12 place-items-center px-2 font-ui text-ui text-surface-2">
                    Закрыть
                  </Dialog.Close>
                </div>

                <nav
                  aria-label="Мобильное меню"
                  className="flex h-full flex-col justify-between px-[clamp(1.25rem,4vw,4.5rem)] pb-8 pt-28"
                >
                  <ul>
                    {LINKS.map((link) => (
                      <li
                        key={link.href}
                        className="-my-[0.12em] overflow-hidden py-[0.12em]"
                      >
                        <a
                          data-menu-link
                          href={link.href}
                          onClick={(event) => onLinkClick(event, link.href)}
                          className="font-display text-display block"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div
                    data-menu-meta
                    className="flex flex-col gap-2 text-small text-surface-2 sm:flex-row sm:items-end sm:justify-between"
                  >
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="link-under"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <span>{CITY} · 18+</span>
                  </div>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
