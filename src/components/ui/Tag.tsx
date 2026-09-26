import { cn } from "@/lib/utils";
import type { Tone } from "@/content/demo";

const tones: Record<Tone, string> = {
  due: "bg-clay-50 text-clay-600 ring-clay-400/30",
  ready: "bg-moss-50 text-moss-600 ring-moss-500/25",
  moved: "bg-brand-50 text-brand-700 ring-brand-300/40",
  neutral: "bg-surface-sunk text-ink-muted ring-line",
};

/** Status pill. Colour carries meaning, so the word always says it too. */
export function Tag({ tone = "neutral", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[0.72rem] font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "due" && "bg-clay-500",
          tone === "ready" && "bg-moss-500",
          tone === "moved" && "bg-brand-500",
          tone === "neutral" && "bg-ink-faint",
        )}
      />
      {children}
    </span>
  );
}
