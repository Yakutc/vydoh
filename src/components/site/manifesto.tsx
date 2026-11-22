import { SplitLines } from "@/components/ui/split-lines";
import { Reveal } from "@/components/ui/reveal";

export function Manifesto() {
  return (
    <section
      id="method"
      className="relative px-[clamp(1.25rem,4vw,4.5rem)] py-[10rem] md:py-[18rem]"
    >
      <div className="mx-auto max-w-[112rem]">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10">
          <p className="eyebrow col-span-12 text-eyebrow text-ink-muted md:col-span-3">
            Почему это работает
          </p>

          <div className="col-span-12 md:col-span-9 lg:col-span-7 lg:col-start-4">
            <SplitLines
              as="p"
              className="max-w-[24ch] font-display text-statement"
              start="top 85%"
            >
              Сигарета, вейп, электронка — не снимают стресс. Они его создают —
              и <em>продают</em> тебе обратно.
            </SplitLines>

            <Reveal className="mt-12">
              <p
                data-reveal
                className="max-w-[46ch] text-body text-ink-muted"
              >
                Никотин выходит за 72 часа — неважно, из сигареты он или из
                вейпа. Дальше остаётся привычка: руки, паузы, балкон, кофе. С
                привычкой можно работать. С «просто держись» — нет.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
