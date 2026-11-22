"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "@struq/icons";
import { gsap, useGSAP } from "@/lib/gsap";

const formatCount = (value: number) =>
  Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const formatRub = (value: number) => `${formatCount(value)} ₽`;

const formatMl = (value: number) => `${formatCount(value)} мл`;

function AnimatedNumber({
  value,
  format,
  className = "",
}: {
  value: number;
  format: (value: number) => string;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  // The server and the first client render share this string; GSAP owns the
  // text after that, so React must never re-render it from the new value.
  const [initial] = useState(() => format(value));
  const displayed = useRef(value);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      if (displayed.current === value) {
        el.textContent = format(value);
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { v: displayed.current };
        gsap.to(proxy, {
          v: value,
          duration: 0.65,
          ease: "power2.out",
          onUpdate: () => {
            displayed.current = proxy.v;
            el.textContent = format(proxy.v);
          },
          onComplete: () => {
            displayed.current = value;
            el.textContent = format(value);
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        displayed.current = value;
        el.textContent = format(value);
      });
    },
    { dependencies: [value], scope: root },
  );

  return (
    <span ref={root} className={className}>
      {initial}
    </span>
  );
}

function RangeField({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-ui text-ui text-ink">
          {label}
        </label>
        <output htmlFor={id} className="stat text-h3 text-ink">
          {display}
        </output>
      </div>
      <input
        id={id}
        className="range mt-3"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

type Mode = "cigarettes" | "vape";

export function Calculator() {
  const [mode, setMode] = useState<Mode>("cigarettes");
  const [cigarettes, setCigarettes] = useState(15);
  const [price, setPrice] = useState(230);
  const [liquid, setLiquid] = useState(5);
  const [liquidPrice, setLiquidPrice] = useState(350);

  const isVape = mode === "vape";
  const dailyCost = isVape
    ? (liquid / 10) * liquidPrice
    : (cigarettes / 20) * price;
  const perMonth = dailyCost * 30.4;
  const perYear = dailyCost * 365;
  const fiveYears = perYear * 5;
  const cigarettesFive = cigarettes * 365 * 5;
  const days = Math.round((cigarettesFive * 11) / 1440);
  const mlFive = liquid * 365 * 5;
  const bottlesFive = Math.round(mlFive / 10);

  return (
    <section
      id="money"
      className="relative bg-surface-0 px-[clamp(1.25rem,4vw,4.5rem)] py-[8rem] md:py-[11rem]"
    >
      <div className="mx-auto max-w-[112rem]">
        <div className="grid grid-cols-12 gap-x-4 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <p className="eyebrow text-eyebrow text-ink-muted">
              Твоя арифметика
            </p>

            <h2 className="mt-5 max-w-[14ch] font-display text-h2">
              Сколько стоит твоя привычка.
            </h2>

            <p className="mt-6 max-w-[44ch] text-body text-ink-muted">
              Пачка в день за пять лет — это около 420 000 ₽ и почти девять
              месяцев жизни. Вейп — те же деньги, только незаметнее. Подставь
              свои цифры.
            </p>

            <div
              role="group"
              aria-label="Что считаем"
              className="mt-10 inline-flex rounded-[2px] border border-line p-1"
            >
              <button
                type="button"
                aria-pressed={!isVape}
                onClick={() => setMode("cigarettes")}
                className={`rounded-[2px] px-4 py-2 font-ui text-ui transition-colors duration-300 ${
                  !isVape
                    ? "bg-ink text-surface-0"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Сигареты
              </button>
              <button
                type="button"
                aria-pressed={isVape}
                onClick={() => setMode("vape")}
                className={`rounded-[2px] px-4 py-2 font-ui text-ui transition-colors duration-300 ${
                  isVape
                    ? "bg-ink text-surface-0"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Вейп
              </button>
            </div>

            <div className="mt-8 max-w-[30rem] space-y-9">
              {isVape ? (
                <>
                  <RangeField
                    id="liquid"
                    label="Жидкости в день"
                    value={liquid}
                    display={`${liquid} мл`}
                    min={1}
                    max={30}
                    step={1}
                    onChange={setLiquid}
                  />
                  <RangeField
                    id="liquid-price"
                    label="Цена за 10 мл"
                    value={liquidPrice}
                    display={formatRub(liquidPrice)}
                    min={150}
                    max={800}
                    step={10}
                    onChange={setLiquidPrice}
                  />
                </>
              ) : (
                <>
                  <RangeField
                    id="cigarettes"
                    label="Сигарет в день"
                    value={cigarettes}
                    display={String(cigarettes)}
                    min={1}
                    max={60}
                    step={1}
                    onChange={setCigarettes}
                  />
                  <RangeField
                    id="price-range"
                    label="Цена пачки"
                    value={price}
                    display={formatRub(price)}
                    min={80}
                    max={600}
                    step={10}
                    onChange={setPrice}
                  />
                </>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="border-t border-line pt-6">
              <p className="eyebrow text-eyebrow text-ink-muted">
                Не потратишь за пять лет
              </p>
              <p className="mt-3 stat text-stat text-accent">
                <AnimatedNumber value={fiveYears} format={formatRub} />
              </p>
              <p className="mt-3 max-w-[38ch] text-body text-ink-muted">
                {isVape ? (
                  <>
                    И{" "}
                    <AnimatedNumber
                      key="ml"
                      value={mlFive}
                      format={formatMl}
                      className="text-ink"
                    />{" "}
                    жидкости, которые не нужно покупать.
                  </>
                ) : (
                  <>
                    И примерно{" "}
                    <AnimatedNumber
                      key="days"
                      value={days}
                      format={formatCount}
                      className="text-ink"
                    />{" "}
                    дней жизни, которые не уйдут вместе с дымом.
                  </>
                )}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <p className="text-small text-ink-muted">За месяц</p>
                <p className="mt-2 stat text-h3">
                  <AnimatedNumber value={perMonth} format={formatRub} />
                </p>
              </div>
              <div>
                <p className="text-small text-ink-muted">За год</p>
                <p className="mt-2 stat text-h3">
                  <AnimatedNumber value={perYear} format={formatRub} />
                </p>
              </div>
              <div>
                <p className="text-small text-ink-muted">
                  {isVape ? "Заправок за 5 лет" : "Сигарет за 5 лет"}
                </p>
                <p className="mt-2 stat text-h3">
                  <AnimatedNumber
                    key={isVape ? "bottles" : "cigarettes"}
                    value={isVape ? bottlesFive : cigarettesFive}
                    format={formatCount}
                  />
                </p>
              </div>
            </div>

            <p className="mt-10 max-w-[54ch] text-small text-ink-muted">
              {isVape
                ? "Считаем 10 мл жидкости за одну заправку. Долгосрочный вред вейпов ещё изучается; никотиновая зависимость и расходы — уже реальны."
                : "Считаем пачку за 20 сигарет. Оценка 11 минут на сигарету — BMJ, 2000. Это арифметика, не гарантия."}
            </p>

            <a
              href="#price"
              className="btn-ghost link-under mt-8 items-center gap-2"
            >
              <span>Начать возвращать</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
