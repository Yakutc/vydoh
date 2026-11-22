import { ArrowRight } from "@struq/icons";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT_EMAIL } from "@/lib/site";

const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`ВЫДОХ — ${subject}`)}`;

const PLANS = [
  {
    name: "Бесплатно",
    price: "0 ₽",
    unit: "",
    note: "без карты",
    description: "Калькулятор, первые 72 часа и дыхание 4–4–6.",
    cta: "Посчитать",
    href: "#money",
    featured: false,
  },
  {
    name: "Pro",
    price: "490 ₽",
    unit: "в месяц",
    note: "7 дней бесплатно",
    description:
      "План на 21 день, дневник тяги, тревожные кнопки и отчёты о возвращённом.",
    cta: "Оставить заявку",
    href: mailto("заявка на Pro"),
    featured: true,
  },
  {
    name: "Pro на год",
    price: "3 900 ₽",
    unit: "в год",
    note: "два месяца в подарок",
    description: "То же, но дешевле: 325 ₽ в месяц вместо 490.",
    cta: "Запросить год",
    href: mailto("заявка на год"),
    featured: false,
  },
  {
    name: "Компаниям",
    price: "по запросу",
    unit: "",
    note: "от 20 человек",
    description:
      "Программа для команд. Считаем возврат инвестиций вместе с вашим HR.",
    cta: "Написать нам",
    href: mailto("программа для компании"),
    featured: false,
  },
];

export function Pricing() {
  return (
    <section
      id="price"
      className="bg-surface-0 px-[clamp(1.25rem,4vw,4.5rem)] py-[8rem] md:py-[11rem]"
    >
      <div className="mx-auto max-w-[112rem]">
        <div className="grid grid-cols-12 items-end gap-x-4 gap-y-6">
          <p className="eyebrow col-span-12 text-eyebrow text-ink-muted">
            Цена
          </p>

          <h2 className="col-span-12 max-w-[18ch] font-display text-h2 lg:col-span-8">
            Дешевле, чем пачка в день.
          </h2>

          <p className="col-span-12 max-w-[40ch] text-body text-ink-muted lg:col-span-4 lg:col-start-9">
            Pro стоит шестнадцать рублей в день. Это меньше пачки сигарет или
            одной заправки. Год — как два месяца в подарок.
          </p>
        </div>

        <Reveal className="mt-14 border-t border-line">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              data-reveal
              className={`grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-b border-line py-7 md:py-8 ${
                plan.featured
                  ? "-mx-4 bg-surface-1 px-4 md:-mx-6 md:px-6"
                  : ""
              }`}
            >
              <div className="col-span-12 md:col-span-3">
                <h3 className="type-h3 text-h3">{plan.name}</h3>
                <p className="mt-1 text-small text-ink-muted">{plan.note}</p>
              </div>

              <div className="col-span-8 md:col-span-3">
                <p className="font-display text-h2">{plan.price}</p>
                {plan.unit ? (
                  <p className="mt-1 text-small text-ink-muted">{plan.unit}</p>
                ) : null}
              </div>

              <p className="col-span-12 max-w-[42ch] text-body text-ink-muted md:col-span-4">
                {plan.description}
              </p>

              <a
                href={plan.href}
                className="link-under col-span-12 inline-flex items-center gap-2 justify-self-start font-ui text-ui text-ink md:col-span-2 md:justify-self-end"
              >
                <span>{plan.cta}</span>
                <ArrowRight size={18} strokeWidth={1.5} />
              </a>
            </div>
          ))}
        </Reveal>

        <p className="mt-8 max-w-[62ch] text-small text-ink-muted">
          Сейчас собираем первых участников: заявка, потом доступ и оплата.
          Отмена в один клик, без звонков.
        </p>
      </div>
    </section>
  );
}
