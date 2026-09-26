import { cn } from "@/lib/utils";

const tones = {
  indigo: "bg-indigo-300",
  clay: "bg-clay-400",
  moss: "bg-moss-500",
  paper: "bg-indigo-100",
} as const;

/**
 * Decorative colour field. Drifts slowly so a long page never feels static, and
 * holds still under prefers-reduced-motion (handled globally in globals.css).
 */
export function Blob({
  tone = "indigo",
  className,
  opacity = 0.35,
  blur = 70,
  delay = 0,
}: {
  tone?: keyof typeof tones;
  className?: string;
  opacity?: number;
  blur?: number;
  delay?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("blob animate-[blob-drift_22s_ease-in-out_infinite]", tones[tone], className)}
      style={
        {
          "--blob-opacity": opacity,
          "--blob-blur": `${blur}px`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties
      }
    />
  );
}
