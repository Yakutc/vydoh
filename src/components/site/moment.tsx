import { SplitLines } from "@/components/ui/split-lines";
import { Reveal } from "@/components/ui/reveal";
import { CravingDialog } from "@/components/site/craving-dialog";
import { Wave } from "@/components/site/wave";

const ROWS = [
  {
    label: "14:40",
    title: "Пауза",
    body: "Работа закончилась, следующая не началась. Сигарета вставляет в день пробку.",
  },
  {
    label: "кофе",
    title: "Ритуал",
    body: "Кофе и сигарета срослись в одно действие. Разрежь связку — оставь кофе.",
  },
  {
    label: "22:10",
    title: "Балкон",
    body: "День закончился, ты наконец один. Тяга приходит как награда, которой ты не просил.",
  },
  {
    label: "розетка",
    title: "Зарядка",
    body: "Вейп не заканчивается — он садится. Ты ищешь зарядку так же, как раньше пачку.",
  },
];

export function Moment() {
  return (
    <section
      id="moment"
      className="px-[clamp(1.25rem,4vw,4.5rem)] pb-[8rem] pt-[7rem] md:pb-[11rem] md:pt-[9rem]"
    >
      <div className="mx-auto max-w-[112rem]">
        <div className="grid grid-cols-12 items-end gap-x-4 gap-y-8">
          <p className="eyebrow col-span-12 text-eyebrow text-ink-muted">
            Тот самый момент
          </p>

          <div className="col-span-12 lg:col-span-8">
            <SplitLines
              as="h2"
              className="max-w-[20ch] font-display text-h2"
            >
              Всё решается не 1 января. А в 14:40 во вторник.
            </SplitLines>
          </div>

          <p className="col-span-12 max-w-[44ch] text-body text-ink-muted lg:col-span-4 lg:col-start-9">
            Совещание закончилось. Ты не голоден, не зол, не устал. Просто руки
            ищут пачку или вейп. Именно здесь рушится большинство попыток — не
            в день решения, а в пустую минуту.
          </p>
        </div>

        <Reveal className="mt-16 border-t border-line">
          {ROWS.map((row, index) => (
            <div
              key={row.label}
              data-reveal
              className={`grid grid-cols-12 gap-x-4 gap-y-3 border-b border-line py-8 md:py-10 ${
                index % 2 === 1 ? "pl-[8vw] md:pl-0" : ""
              }`}
            >
              <p className="col-span-12 font-display text-h3 text-ink-muted sm:col-span-2">
                {row.label}
              </p>
              <h3 className="col-span-12 type-h3 text-h3 sm:col-span-3">
                {row.title}
              </h3>
              <p className="col-span-12 max-w-[52ch] text-body text-ink-muted sm:col-span-7">
                {row.body}
              </p>
            </div>
          ))}
        </Reveal>

        <div className="mt-24 grid grid-cols-12 items-end gap-x-4 gap-y-12 md:mt-32">
          <div className="col-span-12 lg:col-span-6">
            <p className="max-w-[16ch] font-display text-h2">
              Тяга — это волна.
            </p>
            <p className="mt-6 max-w-[46ch] text-body text-ink-muted">
              Она нарастает, держится и уходит. Пик проходит за три-пять минут.
              Тебе не нужно быть сильнее её — нужно просто дышать, пока она не
              спадёт.
            </p>
            <div className="mt-9">
              <CravingDialog />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Wave />
          </div>
        </div>
      </div>
    </section>
  );
}
