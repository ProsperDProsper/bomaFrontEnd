import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * The one card shape on this site, in the Cal.com mould: a tinted illustration well
 * on top, text underneath, the whole thing a link. Hover lifts it, warms the border,
 * grows the illustration a hair and slides the arrow out.
 */
export function LinkCard({
  href,
  title,
  body,
  illustration,
  className,
  external,
  tone = "light",
}: {
  href: string;
  title: string;
  body?: string;
  illustration?: React.ReactNode;
  className?: string;
  external?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-panel border p-2 transition-[transform,border-color,box-shadow] duration-(--duration-ui) ease-(--ease-out-quart)",
        tone === "dark"
          ? "border-brand-700/70 bg-brand-800/40 hover:border-brand-400"
          : "border-line bg-surface hover:-translate-y-1 hover:border-brand-300 hover:shadow-raised",
        className,
      )}
    >
      {illustration ? (
        <div
          className={cn(
            "relative isolate mb-1 overflow-hidden rounded-[1.15rem]",
            tone === "dark" ? "bg-brand-950/40" : "bg-paper",
          )}
        >
          <div className="transition-transform duration-(--duration-slow) ease-(--ease-out-quart) group-hover/card:scale-[1.03]">
            {illustration}
          </div>
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-3">
        <div className="min-w-0">
          <h3
            className={cn(
              "font-display text-[1.05rem] font-semibold leading-snug",
              tone === "dark" ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h3>
          {body ? (
            <p className={cn("mt-1.5 text-[0.88rem] text-pretty", tone === "dark" ? "text-brand-200" : "text-ink-muted")}>
              {body}
            </p>
          ) : null}
        </div>
        <ArrowUpRight
          size={17}
          weight="bold"
          aria-hidden
          className={cn(
            "mt-0.5 shrink-0 transition-all duration-(--duration-ui) ease-(--ease-out-quart) group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5",
            tone === "dark" ? "text-brand-300 group-hover/card:text-white" : "text-ink-faint group-hover/card:text-brand-600",
          )}
        />
      </div>
    </a>
  );
}
