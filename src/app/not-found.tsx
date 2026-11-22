import Link from "next/link";
import { ArrowLeft } from "@struq/icons";
import { Mark } from "@/components/brand/mark";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col justify-between px-[clamp(1.25rem,4vw,4.5rem)] py-10">
      <div className="flex items-center justify-between">
        <Mark size={28} title="ВЫДОХ" />
        <p className="font-ui text-ui text-ink-muted">404</p>
      </div>

      <div className="mx-auto w-full max-w-[112rem]">
        <p className="eyebrow text-eyebrow text-ink-muted">Страница</p>
        <h1 className="mt-5 max-w-[13ch] font-display text-display">
          Такой страницы нет.
        </h1>
        <p className="mt-8 max-w-[42ch] text-lead text-ink-muted">
          Зато есть воздух, который возвращается. Вернись на главную.
        </p>
        <Link href="/" className="btn-primary mt-10">
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span>На главную</span>
        </Link>
      </div>

      <p className="text-small text-ink-muted">ВЫДОХ · 18+</p>
    </main>
  );
}
