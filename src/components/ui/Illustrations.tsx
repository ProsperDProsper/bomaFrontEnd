import { Buildings, UsersThree, DeviceMobile, Check } from "@phosphor-icons/react/dist/ssr";

/**
 * Small abstract product pictures for the cards — built from the same UI parts as
 * the real screens, so they read as this software rather than as stock art.
 */

const row = "flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2.5";

/** Three properties, one of them flagged. */
export function PortfolioArt() {
  return (
    <div className="space-y-2 p-5">
      {[
        { name: "Mlimani Court", meta: "12 units", tag: "Let", tone: "moss" },
        { name: "Coast Lodge", meta: "9 rooms", tag: "Open", tone: "brand" },
        { name: "Mlimani annex", meta: "4 units", tag: "Building", tone: "clay" },
      ].map((p) => (
        <div key={p.name} className={row}>
          <Buildings size={15} className="shrink-0 text-brand-600" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.78rem] font-semibold text-ink">{p.name}</span>
            <span className="block text-[0.68rem] text-ink-faint">{p.meta}</span>
          </span>
          <span
            className={`shrink-0 rounded-pill px-2 py-0.5 text-[0.62rem] font-semibold ${
              p.tone === "moss"
                ? "bg-moss-50 text-moss-600"
                : p.tone === "clay"
                  ? "bg-clay-50 text-clay-600"
                  : "bg-brand-50 text-brand-700"
            }`}
          >
            {p.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Who can see what. */
export function TeamArt() {
  return (
    <div className="space-y-2 p-5">
      {[
        { who: "You", scope: "All properties", initials: "PD" },
        { who: "Caretaker", scope: "Mlimani Court", initials: "JK" },
        { who: "Reception", scope: "Coast Lodge", initials: "NM" },
      ].map((p, i) => (
        <div key={p.who} className={row}>
          <span
            className={`grid size-7 shrink-0 place-items-center rounded-full text-[0.6rem] font-semibold ${
              i === 0 ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700"
            }`}
          >
            {p.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.78rem] font-semibold text-ink">{p.who}</span>
            <span className="block truncate text-[0.68rem] text-ink-faint">{p.scope}</span>
          </span>
          <UsersThree size={14} className="shrink-0 text-ink-faint" aria-hidden />
        </div>
      ))}
    </div>
  );
}

/** Same account, two screens. */
export function DevicesArt() {
  return (
    <div className="flex items-end justify-center gap-3 p-5">
      <div className="w-40 rounded-xl border border-line bg-surface p-2.5">
        <div className="h-2 w-10 rounded-pill bg-brand-200" />
        <div className="mt-2 space-y-1.5">
          <div className="h-6 rounded-lg bg-paper" />
          <div className="h-6 rounded-lg bg-paper" />
          <div className="h-6 rounded-lg bg-brand-50" />
        </div>
      </div>
      <div className="w-16 rounded-2xl border border-line bg-surface p-2">
        <div className="mx-auto h-1 w-5 rounded-pill bg-line" />
        <div className="mt-2 space-y-1.5">
          <div className="h-4 rounded-md bg-paper" />
          <div className="h-4 rounded-md bg-brand-50" />
          <div className="flex items-center gap-1 rounded-md bg-moss-50 px-1 py-1">
            <Check size={9} weight="bold" className="text-moss-600" aria-hidden />
            <span className="h-1.5 w-6 rounded-pill bg-moss-500/40" />
          </div>
        </div>
      </div>
      <DeviceMobile size={0} aria-hidden />
    </div>
  );
}

export const audienceArt = [PortfolioArt, TeamArt, DevicesArt];
