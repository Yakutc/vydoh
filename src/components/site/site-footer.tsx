import { ArrowUp } from "@struq/icons";
import { SplitLines } from "@/components/ui/split-lines";
import { EmailCta } from "@/components/site/email-cta";
import { LocalTime } from "@/components/site/local-time";
import { CONTACT_EMAIL } from "@/lib/site";

const LINKS = [
  { href: "#method", label: "Метод" },
  { href: "#hours", label: "72 часа" },
  { href: "#money", label: "Деньги" },
  { href: "#price", label: "Цена" },
];

export function SiteFooter() {
  return (
    <footer
      id="start"
      className="relative overflow-x-clip bg-surface-1 pt-[8rem] md:pt-[11rem]"
    >
      <div className="mx-auto w-full max-w-[112rem] px-[clamp(1.25rem,4vw,4.5rem)]">
        <div className="grid grid-cols-12 items-end gap-x-4 gap-y-12">
          <div className="col-span-12 lg:col-span-8">
            <p className="eyebrow text-eyebrow text-ink-muted">Начать</p>
            <SplitLines
              as="h2"
              className="mt-5 max-w-[12ch] font-display text-display"
              start="top 90%"
            >
              Сделай последний выдох дыма.
            </SplitLines>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <p className="max-w-[38ch] text-body text-ink-muted">
              Оставь почту — пришлём план на 21 день и одно упражнение, которое
              работает в 14:40.
            </p>
            <EmailCta />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-4 gap-y-10 border-t border-line pt-7">
          <div className="col-span-12 md:col-span-5">
            <p className="font-ui text-ui text-ink">ВЫДОХ</p>
            <p className="mt-2 max-w-[40ch] text-small text-ink-muted">
              Система, которая держит тебя в ту минуту, когда тянет.
            </p>
          </div>

          <nav
            aria-label="Подвал"
            className="col-span-6 flex flex-col gap-2 md:col-span-3"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-under w-fit font-ui text-ui text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="col-span-6 flex flex-col gap-2 md:col-span-4 md:items-end md:text-right">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="link-under w-fit font-ui text-ui text-ink"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-small text-ink-muted">
              <LocalTime />
            </p>
            <a
              href="#top"
              className="link-under mt-2 inline-flex w-fit items-center gap-2 font-ui text-ui text-ink-muted"
            >
              <span>Наверх</span>
              <ArrowUp size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-small text-ink-muted md:flex-row md:items-baseline md:justify-between">
          <p className="max-w-[62ch]">
            ВЫДОХ — образовательный продукт. Не заменяет консультацию врача и не
            гарантирует результат. 18+
          </p>
          <p className="shrink-0">© 2026 ВЫДОХ</p>
        </div>
      </div>

      <div className="mt-14 overflow-hidden md:mt-20" aria-hidden>
        <p className="-mb-[0.2em] whitespace-nowrap text-center font-display text-ghost leading-[0.8] text-ink/[0.07]">
          ВЫДОХ
        </p>
      </div>
    </footer>
  );
}
