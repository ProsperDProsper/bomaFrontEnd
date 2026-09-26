"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A faint engineering grid that lights up around the pointer. The lines themselves
 * are a repeating gradient; the glow is a mask that follows the cursor, so nothing
 * re-renders — the handler only writes two CSS variables.
 */
/**
 * Keeps the lines out of the middle of the section: solid near the four edges,
 * transparent across the band where headings and body copy sit.
 */
const EDGE_MASK =
  "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.7) 62%, black 88%)";

export function GridLines({
  className,
  size = 64,
  radius = 320,
}: {
  className?: string;
  size?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = parent.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        el.style.setProperty("--glow", "1");
      });
    };
    const onLeave = () => el.style.setProperty("--glow", "0");

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Base grid: strongest at the edges, almost gone where the copy sits. */}
      <div
        className="absolute inset-0 opacity-90 dark:opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
          maskImage: EDGE_MASK,
          WebkitMaskImage: EDGE_MASK,
        }}
      />
      {/* The same grid in brand blue, revealed only around the pointer — and still
          held back over the middle of the section, where the text lives. */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-(--ease-out-quart)"
        style={{
          opacity: "calc(var(--glow, 0) * 0.75)",
          backgroundImage:
            "linear-gradient(to right, var(--color-brand-400) 1px, transparent 1px), linear-gradient(to bottom, var(--color-brand-400) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
          maskImage: `radial-gradient(${radius}px ${radius}px at var(--mx, 50%) var(--my, 50%), black, transparent 70%), ${EDGE_MASK}`,
          WebkitMaskImage: `radial-gradient(${radius}px ${radius}px at var(--mx, 50%) var(--my, 50%), black, transparent 70%), ${EDGE_MASK}`,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </div>
  );
}
