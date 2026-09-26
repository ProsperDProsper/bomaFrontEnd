"use client";

import { useState } from "react";
import { Plus, CheckCircle, Circle } from "@phosphor-icons/react";
import { projects } from "@/content/demo";
import { site } from "@/content/site";
import { reports } from "@/content/copy";
import { cn } from "@/lib/utils";
import { Figure } from "@/components/motion/Figure";
import { Screen } from "@/components/ui/Screen";

/** Pick a building, see what it has cost and how much of that has come back. */
export function ProjectsScreen() {
  const [id, setId] = useState<string>(projects.buildings[0].id);
  const building = projects.buildings.find((b) => b.id === id) ?? projects.buildings[0];
  const { labels } = projects;

  return (
    <Screen
      title={projects.screenTitle}
      subtitle={site.microcopy.illustrative}
      action={
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand-700 px-3 py-1.5 text-[0.72rem] font-semibold text-white">
          <Plus size={12} weight="bold" aria-hidden />
          {projects.action}
        </span>
      }
    >
      <div className="grid min-w-0 @[30rem]:grid-cols-[11rem_minmax(0,1fr)]">
        <div className="min-w-0 border-b border-line-soft bg-paper-warm/50 p-3 @[30rem]:border-b-0 @[30rem]:border-r">
          <p className="px-2 pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
            {projects.listLabel}
          </p>
          <ul className="flex max-w-full gap-2 overflow-x-auto pb-1 @[30rem]:block @[30rem]:space-y-1 @[30rem]:overflow-visible">
            {projects.buildings.map((b) => (
              <li key={b.id} className="shrink-0 @[30rem]:shrink">
                <button
                  onClick={() => setId(b.id)}
                  aria-pressed={b.id === id}
                  className={cn(
                    "w-full rounded-xl px-3 py-2 text-left text-sm transition-colors duration-(--duration-micro)",
                    b.id === id
                      ? "bg-surface font-semibold text-ink shadow-soft"
                      : "text-ink-muted hover:bg-surface/70 hover:text-ink",
                  )}
                >
                  {b.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div key={building.id} className="min-w-0 animate-[fade-slide_380ms_var(--ease-out-quart)] p-4 @[30rem]:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold text-ink">{building.name}</span>
              <span className="block text-[0.78rem] text-ink-muted">{building.subtitle}</span>
            </span>
            <span className="text-[0.78rem] text-ink-muted">
              {building.inUse} of {building.unitTotal} {labels.inUse.toLowerCase()}
            </span>
          </div>

          {/* Recovery bar: how much of the build cost has come back as rent. */}
          <div className="mt-5 rounded-card border border-line bg-surface p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-[0.78rem] text-ink-muted">{labels.recovered}</p>
              <p data-figure className="font-display text-[1.5rem] leading-none text-ink">
                {building.recovered.toFixed(1)}%
              </p>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-pill bg-surface-sunk">
              <span
                className="block h-full rounded-pill bg-moss-500 transition-[width] duration-slow ease-(--ease-out-expo)"
                style={{ width: `${Math.max(building.recovered, 1.5)}%` }}
              />
            </div>
            <p className="mt-3 text-[0.72rem] text-ink-faint">{reports.disclaimer}</p>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-2 @[34rem]:grid-cols-3">
            {[
              { k: labels.costs, v: <Figure value={building.costs} />, tone: "text-ink" },
              { k: labels.collected, v: <Figure value={building.collected} />, tone: "text-moss-600" },
              { k: labels.payback, v: <span className="text-[0.85rem]">{building.payback}</span>, tone: "text-ink-muted" },
            ].map((cell) => (
              <div key={cell.k} className="rounded-card border border-line bg-surface px-3 py-2.5">
                <dt className="truncate text-[0.68rem] text-ink-muted">{cell.k}</dt>
                <dd className={cn("mt-1 text-[0.82rem] font-semibold", cell.tone)}>{cell.v}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-3 divide-y divide-line-soft rounded-card border border-line">
            {building.units.map((u) => (
              <li key={u.name} className="flex items-center gap-3 px-3.5 py-3">
                {u.done ? (
                  <CheckCircle size={18} weight="fill" className="text-moss-500" aria-hidden />
                ) : (
                  <Circle size={18} className="text-ink-faint" aria-hidden />
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{u.name}</span>
                  <span className="block truncate text-[0.75rem] text-ink-muted">{u.state}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Screen>
  );
}
