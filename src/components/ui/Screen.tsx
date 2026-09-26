import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * The chrome every product screen sits in: a quiet window frame with a title bar.
 * Keeping it in one place stops the four screens drifting apart.
 */
export function Screen({
  title,
  subtitle,
  action,
  children,
  className,
  tone = "light",
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-panel border shadow-float",
        tone === "dark" ? "border-indigo-800 bg-indigo-900" : "border-line bg-surface",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-3",
          tone === "dark" ? "border-indigo-800 bg-indigo-900/60" : "border-line-soft bg-paper-warm/70",
        )}
      >
        <span className="flex gap-1.5" aria-hidden>
          {["bg-clay-400", "bg-indigo-300", "bg-moss-500"].map((c) => (
            <span key={c} className={cn("size-2.5 rounded-full opacity-70", c)} />
          ))}
        </span>
        <div className="min-w-0 flex-1">
          <p className={cn("truncate text-sm font-semibold", tone === "dark" ? "text-white" : "text-ink")}>{title}</p>
          {subtitle ? (
            <p className={cn("truncate text-[0.72rem]", tone === "dark" ? "text-indigo-300" : "text-ink-faint")}>
              {subtitle ?? site.microcopy.illustrative}
            </p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
