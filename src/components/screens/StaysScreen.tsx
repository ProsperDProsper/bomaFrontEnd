"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { stays } from "@/content/demo";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Figure } from "@/components/motion/Figure";
import { Screen } from "@/components/ui/Screen";
import { Tag } from "@/components/ui/Tag";

const DAYS = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

/** Pick a room, see the booking, the nights it covers and what is still owed. */
export function StaysScreen() {
  const [id, setId] = useState<string>(stays.rooms[0].id);
  const room = stays.rooms.find((r) => r.id === id) ?? stays.rooms[0];
  const { labels } = stays;
  const balance = room.charges - room.paid;
  const readiness: string = room.readiness;

  return (
    <Screen
      title={stays.property}
      subtitle={site.microcopy.illustrative}
      action={
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-indigo-700 px-3 py-1.5 text-[0.72rem] font-semibold text-white">
          <Plus size={12} weight="bold" aria-hidden />
          {stays.action}
        </span>
      }
    >
      <div className="grid min-w-0 sm:grid-cols-[10.5rem_minmax(0,1fr)]">
        <div className="min-w-0 border-b border-line-soft bg-paper-warm/50 p-3 sm:border-b-0 sm:border-r">
          <p className="px-2 pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
            {stays.listLabel}
          </p>
          <ul className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:block sm:space-y-1 sm:overflow-visible">
            {stays.rooms.map((r) => (
              <li key={r.id} className="shrink-0 sm:shrink">
                <button
                  onClick={() => setId(r.id)}
                  aria-pressed={r.id === id}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors duration-(--duration-micro)",
                    r.id === id
                      ? "bg-surface font-semibold text-ink shadow-soft"
                      : "text-ink-muted hover:bg-surface/70 hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      r.tone === "due" ? "bg-clay-500" : r.tone === "ready" ? "bg-moss-500" : "bg-indigo-400",
                    )}
                  />
                  {r.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div key={room.id} className="min-w-0 animate-[fade-slide_380ms_var(--ease-out-quart)] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold text-ink">{room.name}</span>
              <span className="block text-[0.78rem] text-ink-muted">
                {room.guest} · {room.guests}
              </span>
            </span>
            <Tag tone={room.tone}>{room.status}</Tag>
          </div>

          {/* Night strip: the booked nights are filled, the rest stay open. */}
          <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-wider text-ink-faint">
            {labels.dates} · {stays.calendarLabel}
          </p>
          <ul className="mt-2 flex gap-1">
            {DAYS.map((d) => {
              const booked = room.nights > 0 && d >= room.from && d < room.to;
              return (
                <li
                  key={d}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-center text-[0.7rem] transition-colors duration-(--duration-ui)",
                    booked
                      ? "border-indigo-600 bg-indigo-600 font-semibold text-white"
                      : "border-line bg-surface text-ink-faint",
                  )}
                >
                  {d}
                </li>
              );
            })}
          </ul>
          {room.nights > 0 ? (
            <p className="mt-2 text-[0.75rem] text-ink-muted">
              {room.nights} {stays.nightsLabel}
            </p>
          ) : null}

          <dl className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-3">
            {[
              { k: labels.charges, v: <Figure value={room.charges} short={false} />, tone: "text-ink" },
              { k: labels.paid, v: <Figure value={room.paid} short={false} />, tone: "text-moss-600" },
              {
                k: labels.balance,
                v: <Figure value={balance} short={false} />,
                tone: balance > 0 ? "text-clay-600" : "text-ink",
              },
            ].map((cell) => (
              <div key={cell.k} className="rounded-card border border-line bg-surface px-3 py-2.5">
                <dt className="truncate text-[0.68rem] text-ink-muted">{cell.k}</dt>
                <dd className={cn("mt-1 text-[0.82rem] font-semibold", cell.tone)}>{cell.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-3 flex items-center justify-between rounded-card border border-line bg-paper-warm/60 px-3.5 py-3">
            <span className="text-[0.78rem] text-ink-muted">{labels.readiness}</span>
            <Tag tone={readiness === "Ready" ? "ready" : readiness === "Cleaning" ? "due" : "neutral"}>
              {readiness}
            </Tag>
          </div>
        </div>
      </div>
    </Screen>
  );
}
