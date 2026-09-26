import { cn } from "@/lib/utils";

/**
 * A slowly turning dashed ring, optionally with a bead riding it. Pure decoration —
 * it gives the flat sections something circular to sit against.
 */
export function Orbit({
  className,
  seconds = 48,
  reverse = false,
  dashed = true,
  bead = false,
}: {
  className?: string;
  seconds?: number;
  reverse?: boolean;
  dashed?: boolean;
  bead?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full border border-brand-300/45 dark:border-brand-300/12",
        dashed && "border-dashed",
        "motion-safe:animate-[spin_var(--orbit-duration)_linear_infinite]",
        className,
      )}
      style={
        {
          "--orbit-duration": `${seconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      {bead ? (
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-brand-500/70 shadow-[0_0_12px_2px_rgb(49_91_216/0.35)] dark:bg-brand-300/40 dark:shadow-none" />
      ) : null}
    </span>
  );
}
