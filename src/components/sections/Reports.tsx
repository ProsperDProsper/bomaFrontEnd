"use client";

import { useState } from "react";
import { reports } from "@/content/copy";
import { reportData } from "@/content/demo";
import { site } from "@/content/site";
import { cn, pct, tzs } from "@/lib/utils";
import { Figure } from "@/components/motion/Figure";
import { Reveal } from "@/components/motion/Reveal";

const incomeTones = ["bg-brand-400", "bg-brand-300", "bg-moss-500"];

export function Reports() {
  const [row, setRow] = useState<string | null>(null);
  const income = reportData.income.reduce((a, b) => a + b.value, 0);

  return (
    <section id="reports" className="relative section-y">

      <div className="container-site relative">
        <Reveal className="max-w-2xl">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-brand-600">{reports.eyebrow}</p>
          <h2 className="mt-4 text-h2 text-ink text-balance">{reports.heading}</h2>
          <p className="mt-5 text-lead text-ink-muted text-pretty">{reports.lead}</p>
        </Reveal>

        <Reveal className="mt-12 rounded-panel border border-white/10 bg-brand-900 p-5 text-brand-100 shadow-float sm:p-8" y={26} stagger={0.07}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-sm font-semibold text-white">{reportData.period}</p>
            <p className="text-[0.75rem] text-band-faint">{site.microcopy.illustrativeFigures}</p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Operating profit, with the income split underneath it. */}
            <div className="rounded-card border border-white/10 bg-white/5 p-5">
              <p className="font-display text-[2.4rem] leading-none text-white">
                <Figure value={reportData.profit} />
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{reports.cards.profit.label}</p>
              <p className="mt-1 text-[0.82rem] text-band-faint text-pretty">{reports.cards.profit.note}</p>

              <ul className="mt-5 space-y-2.5">
                {reportData.income.map((line, i) => (
                  <li key={line.label}>
                    <div className="flex items-baseline justify-between text-[0.8rem]">
                      <span className="text-band-muted">{line.label}</span>
                      <span data-figure className="font-semibold text-white">{tzs(line.value)}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-pill bg-brand-950/60">
                      <span
                        className={cn("block h-full rounded-pill transition-[width] duration-slow ease-(--ease-out-expo)", incomeTones[i])}
                        style={{ width: `${pct(line.value, income)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[0.8rem]">
                <span className="text-band-faint">{reportData.costsLabel}</span>
                <span data-figure className="text-white">{tzs(reportData.runningCosts)}</span>
              </div>
            </div>

            {/* What empty days cost — click a row to hold it. */}
            <div className="rounded-card border border-white/10 bg-white/5 p-5">
              <p className="font-display text-[2.4rem] leading-none text-clay-400">
                <Figure value={reportData.vacancy.total} short={false} />
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{reports.cards.vacancy.label}</p>
              <p className="mt-1 text-[0.82rem] text-band-faint text-pretty">{reports.cards.vacancy.note}</p>

              <ul className="mt-5 space-y-3">
                {reportData.vacancy.rows.map((r) => {
                  const on = row === r.label;
                  return (
                    <li key={r.label}>
                      <button
                        onClick={() => setRow(on ? null : r.label)}
                        aria-pressed={on}
                        className="w-full text-left"
                      >
                        <span className="flex items-baseline justify-between text-[0.8rem]">
                          <span className={on ? "text-white" : "text-band-muted"}>{r.label}</span>
                          <span data-figure className={r.value > 0 ? "text-clay-400" : "text-band-faint"}>
                            {tzs(r.value, { short: false })}
                          </span>
                        </span>
                        {/* One cell per day: filled where the space earned. */}
                        <span className="mt-1.5 flex gap-[3px]">
                          {Array.from({ length: 30 }).map((_, d) => (
                            <span
                              key={d}
                              className={cn(
                                "h-3.5 flex-1 rounded-[2px] transition-colors duration-(--duration-ui)",
                                d < r.occupied ? "bg-brand-400" : "bg-clay-500/70",
                                on && "ring-1 ring-white/30",
                              )}
                            />
                          ))}
                        </span>
                        {on ? (
                          <span className="mt-1 block text-[0.72rem] text-band-faint">
                            {r.occupied} {reportData.vacancy.daysLabel}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex gap-4 border-t border-white/10 pt-3 text-[0.72rem] text-band-faint">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-[2px] bg-brand-400" />
                  {reportData.vacancy.legendLet}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-[2px] bg-clay-500/70" />
                  {reportData.vacancy.legendEmpty}
                </span>
              </div>
            </div>

            {/* Building investment, kept out of the profit line. */}
            <div className="rounded-card border border-white/10 bg-white/5 p-5">
              <p className="font-display text-[2.4rem] leading-none text-white">
                <Figure value={reportData.investment.thisMonth} />
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{reports.cards.investment.label}</p>
              <p className="mt-1 text-[0.82rem] text-band-faint text-pretty">{reports.cards.investment.note}</p>

              <dl className="mt-5 space-y-3 text-[0.82rem]">
                {[
                  { k: reportData.investment.labels.investment, v: tzs(reportData.investment.thisMonth), accent: true },
                  { k: reportData.investment.labels.running, v: tzs(reportData.investment.runningCosts), accent: false },
                  { k: reportData.investment.labels.toDate, v: tzs(reportData.investment.toDate), accent: false },
                  { k: reportData.investment.labels.units, v: reportData.investment.unitsInUse, accent: false },
                ].map((r) => (
                  <div key={r.k} className="flex items-baseline justify-between border-b border-white/10 pb-2">
                    <dt className="text-band-faint">{r.k}</dt>
                    <dd data-figure className={r.accent ? "font-semibold text-white" : "text-brand-100"}>
                      {r.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.72rem] text-band-faint">{reports.disclaimer}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
