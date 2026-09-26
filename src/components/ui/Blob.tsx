import { cn } from "@/lib/utils";

const tones = {
  brand: "bg-brand-400",
  deep: "bg-brand-600",
  sky: "bg-sky-300",
  violet: "bg-violet-300",
  clay: "bg-clay-400",
  moss: "bg-moss-500",
  pale: "bg-brand-100",
} as const;

/**
 * Decorative colour field behind a section. `organic` blobs slowly change their own
 * outline as well as drifting, which keeps a long page from feeling like a stack of
 * rectangles. Motion stops under prefers-reduced-motion (handled in globals.css).
 */
export function Blob({
  tone = "brand",
  className,
  opacity = 0.4,
  darkOpacity,
  blur = 70,
  delay = 0,
  organic = false,
}: {
  tone?: keyof typeof tones;
  className?: string;
  opacity?: number;
  /** Dark surfaces need far less colour before text starts to suffer. */
  darkOpacity?: number;
  blur?: number;
  delay?: number;
  organic?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "blob",
        organic ? "animate-[blob-morph_26s_ease-in-out_infinite]" : "animate-[blob-drift_22s_ease-in-out_infinite]",
        tones[tone],
        className,
      )}
      style={
        {
          "--blob-opacity": opacity,
          "--blob-opacity-dark": darkOpacity ?? opacity * 0.5,
          "--blob-blur": `${blur}px`,
          animationDelay: `${delay}s`,
          ...(organic ? { borderRadius: "62% 38% 46% 54% / 55% 42% 58% 45%" } : null),
        } as React.CSSProperties
      }
    />
  );
}

/** A thin ring of brand colour. Reads as structure rather than atmosphere. */
export function Ring({ className, opacity = 0.5 }: { className?: string; opacity?: number }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full border border-brand-300", className)}
      style={{ opacity }}
    />
  );
}
