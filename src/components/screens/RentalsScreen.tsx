"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { rentals } from "@/content/demo";
import { site } from "@/content/site";
import { product } from "@/content/copy";
import { cn, tzs } from "@/lib/utils";
import { Figure } from "@/components/motion/Figure";
import { Screen } from "@/components/ui/Screen";
import { Tag } from "@/components/ui/Tag";

/** Pick a unit on the left, its tenancy appears on the right. */
export function RentalsScreen() {
  const [id, setId] = useState<string>(rentals.units[1].id);
  const unit = rentals.units.find((u) => u.id === id) ?? rentals.units[0];
  const { labels } = rentals;

  return (
    <Screen
      title={rentals.property}
      subtitle={site.microcopy.illustrative}
      action={
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-indigo-700 px-3 py-1.5 text-[0.72rem] font-semibold text-white">
          <Plus size={12} weight="bold" aria-hidden />
          {rentals.action}
        </span>
      }
    >
      <div className="grid min-w-0 sm:grid-cols-[10.5rem_minmax(0,1fr)]">
        <div className="min-w-0 border-b border-line-soft bg-paper-warm/50 p-3 sm:border-b-0 sm:border-r">
          <p className="px-2 pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
            {rentals.listLabel}
          </p>
          <ul className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:block sm:space-y-1 sm:overflow-visible">
            {rentals.units.map((u) => (
              <li key={u.id} className="shrink-0 sm:shrink">
                <button
                  onClick={() => setId(u.id)}
                  aria-pressed={u.id === id}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors duration-(--duration-micro)",
                    u.id === id
                      ? "bg-surface font-semibold text-ink shadow-soft"
                      : "text-ink-muted hover:bg-surface/70 hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      u.tone === "due" ? "bg-clay-500" : "bg-moss-500",
                    )}
                  />
                  {u.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div key={unit.id} className="min-w-0 animate-[fade-slide_380ms_var(--ease-out-quart)] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-pill bg-indigo-100 text-[0.78rem] font-semibold text-indigo-700">
                {unit.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{unit.tenant}</span>
                <span className="block text-[0.78rem] text-ink-muted">{unit.name}</span>
              </span>
            </div>
            <Tag tone={unit.tone}>{unit.status}</Tag>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-3">
            {[
              { k: labels.monthlyRent, v: <Figure value={unit.rent} short={false} /> },
              { k: labels.paidUntil, v: <span data-figure>{unit.paidUntil}</span> },
              {
                k: labels.balance,
                v: (
                  <span className={unit.balance > 0 ? "text-clay-600" : "text-moss-600"}>
                    <Figure value={unit.balance} short={false} />
                  </span>
                ),
              },
            ].map((cell) => (
              <div key={cell.k} className="rounded-card border border-line bg-surface px-3 py-2.5">
                <dt className="truncate text-[0.68rem] text-ink-muted">{cell.k}</dt>
                <dd className="mt-1 text-[0.82rem] font-semibold text-ink">{cell.v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-wider text-ink-faint">{labels.activity}</p>
          <ul className="mt-2 divide-y divide-line-soft rounded-card border border-line">
            {unit.activity.map((a) => (
              <li key={a.title} className="flex items-center justify-between gap-3 px-3.5 py-3">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{a.title}</span>
                  <span className="block truncate text-[0.75rem] text-ink-muted">{a.meta}</span>
                </span>
                {a.amount !== null ? (
                  <span data-figure className="shrink-0 whitespace-nowrap text-sm font-semibold text-ink">
                    {tzs(a.amount, { short: false })}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.7rem] text-ink-faint">{product.hint}</p>
        </div>
      </div>
    </Screen>
  );
}
