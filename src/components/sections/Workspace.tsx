"use client";

import { useState } from "react";
import { MagnifyingGlass, CaretRight } from "@phosphor-icons/react";
import { overview } from "@/content/copy";
import { site } from "@/content/site";
import { workspace } from "@/content/demo";
import { cn, pct, tzs } from "@/lib/utils";
import { Figure } from "@/components/motion/Figure";
import { Typewriter } from "@/components/motion/Typewriter";
import { Reveal } from "@/components/motion/Reveal";
import { Blob } from "@/components/ui/Blob";
import { Orbit } from "@/components/ui/Orbit";
import { GridLines } from "@/components/ui/GridLines";
import { FrameLines } from "@/components/ui/FrameLines";
import { Tag } from "@/components/ui/Tag";
import { Screen } from "@/components/ui/Screen";

export function Workspace() {
  const [active, setActive] = useState(0);
  const tab = workspace.tabs[active];
  const { chart } = workspace;
  const collectedPct = pct(chart.collected, chart.expected);

  return (
    <section id="overview" className="relative overflow-hidden section-y">
      <GridLines size={80} radius={360} />
      <FrameLines />
      <Blob tone="brand" organic className="-right-44 top-10 size-[36rem]" opacity={0.26} blur={80} />
      <Blob tone="sky" organic className="-left-36 top-1/2 size-[30rem]" opacity={0.24} delay={-8} />
      <Blob tone="pale" className="left-1/3 -top-10 size-[24rem]" opacity={0.55} delay={-3} />
      <Orbit className="-left-40 top-1/4 size-[30rem]" seconds={82} />
      <Orbit className="-right-24 bottom-0 size-[18rem]" seconds={50} reverse bead />

      <div className="container-site relative">
        <Reveal className="max-w-2xl">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-brand-600">{overview.eyebrow}</p>
          <h2 className="mt-4 text-h2 text-ink text-balance">{overview.heading}</h2>
          <p className="mt-5 text-lead text-ink-muted text-pretty">{overview.lead}</p>
        </Reveal>

        <div className="relative mt-12">
          {/* Tabs double as the section's interaction: every figure below re-counts. */}
          <div
            role="tablist"
            aria-label={overview.tabsLabel}
            className="inline-flex flex-wrap gap-1 rounded-pill border border-line bg-surface p-1 shadow-soft"
          >
            {workspace.tabs.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === active}
                aria-controls={`ws-panel-${t.id}`}
                id={`ws-tab-${t.id}`}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-pill px-4 py-2 text-sm font-semibold transition-colors duration-(--duration-ui)",
                  i === active ? "bg-(--color-btn) text-white" : "text-ink-muted hover:text-brand-700",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Screen
            title={`${site.brand.name} — ${tab.label}`}
            subtitle={workspace.brandLine}
            className="mt-5"
            action={
              <span className="hidden min-w-56 items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.72rem] text-ink-muted sm:inline-flex">
                <MagnifyingGlass size={13} className="text-ink-faint" aria-hidden />
                <Typewriter words={workspace.searchQueries} typeMs={52} holdMs={2200} />
              </span>
            }
          >
            <div className="grid min-w-0 lg:grid-cols-[13rem_minmax(0,1fr)]">
              {/* Left rail: decoration, so it is hidden from assistive tech. */}
              <div aria-hidden className="hidden border-r border-line-soft bg-paper-warm/50 p-4 lg:block">
                <ul className="space-y-1">
                  {workspace.nav.map((item, i) => (
                    <li
                      key={item}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-2 text-sm",
                        i === 0 ? "bg-surface font-semibold text-ink shadow-soft" : "text-ink-muted",
                      )}
                    >
                      {item}
                      {i === 0 ? <CaretRight size={12} weight="bold" /> : null}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl border border-dashed border-line px-3 py-3">
                  <p className="text-[0.7rem] leading-snug text-ink-faint">{site.microcopy.demoNotice}</p>
                </div>
              </div>

              <div
                role="tabpanel"
                id={`ws-panel-${tab.id}`}
                aria-labelledby={`ws-tab-${tab.id}`}
                key={tab.id}
                className="min-w-0 animate-[fade-slide_420ms_var(--ease-out-quart)] p-4 sm:p-6"
              >
                <p className="text-sm text-ink-muted">{tab.summary}</p>

                <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {tab.metrics.map((m) => (
                    <li key={m.label} className="rounded-card border border-line bg-surface p-4 lift">
                      <p className="text-[0.78rem] text-ink-muted">{m.label}</p>
                      <p className="mt-2 font-display text-[1.65rem] leading-none text-ink">
                        <Figure
                          value={m.value}
                          money={m.value > 1000}
                          suffix={"unit" in m ? (m as { unit?: string }).unit : undefined}
                        />
                      </p>
                      <p
                        className={cn(
                          "mt-2 text-[0.75rem]",
                          m.tone === "due" ? "text-clay-600" : m.tone === "ready" ? "text-moss-600" : "text-ink-faint",
                        )}
                      >
                        {m.note}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
                  <ul className="divide-y divide-line-soft rounded-card border border-line bg-surface">
                    {tab.rows.map((row) => (
                      <li key={row.title} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink">{row.title}</span>
                          <span className="block text-[0.78rem] text-ink-muted">{row.meta}</span>
                        </span>
                        <Tag tone={row.tone}>{row.tag}</Tag>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-card border border-line bg-surface p-4">
                    <p className="text-sm font-semibold text-ink">{chart.heading}</p>
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="flex items-baseline justify-between text-[0.78rem] text-ink-muted">
                          <span>{chart.collectedLabel}</span>
                          <span data-figure className="font-semibold text-ink">{tzs(chart.collected)}</span>
                        </div>
                        <div className="mt-1.5 h-2.5 overflow-hidden rounded-pill bg-surface-sunk">
                          <span
                            className="block h-full rounded-pill bg-brand-600 transition-[width] duration-slow ease-(--ease-out-expo)"
                            style={{ width: `${collectedPct}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between text-[0.78rem] text-ink-muted">
                        <span>{chart.expectedLabel}</span>
                        <span data-figure>{tzs(chart.expected)}</span>
                      </div>
                      <div className="flex items-baseline justify-between text-[0.78rem]">
                        <span className="text-ink-muted">{chart.dueLabel}</span>
                        <span data-figure className="font-semibold text-clay-600">{tzs(chart.due)}</span>
                      </div>
                    </div>
                    <p className="mt-4 text-[0.7rem] text-ink-faint">{site.microcopy.illustrativeFigures}</p>
                  </div>
                </div>
              </div>
            </div>
          </Screen>
        </div>
      </div>
    </section>
  );
}
