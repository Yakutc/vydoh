export function BreathArc({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        data-arc
        d="M-40 700C170 700 220 486 430 486C640 486 700 650 930 566C1160 482 1230 330 1480 300"
        stroke="var(--color-line)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
