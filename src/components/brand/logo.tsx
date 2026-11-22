import { Mark } from "./mark";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={22} className="text-accent" />
      <span className="font-display text-[1.3rem] leading-none tracking-[0.14em]">
        ВЫДОХ
      </span>
    </span>
  );
}
