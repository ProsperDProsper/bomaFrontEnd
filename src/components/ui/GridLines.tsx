"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A faint engineering grid that lights up around the pointer. The lines themselves
 * are a repeating gradient; the glow is a mask that follows the cursor, so nothing
 * re-renders — the handler only writes two CSS variables.
 */
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
      {/* Base grid: barely there. */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
          maskImage: "radial-gradient(120% 90% at 50% 0%, black 30%, transparent 78%)",
        }}
      />
      {/* The same grid in brand blue, revealed only around the pointer. */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-(--ease-out-quart)"
        style={{
          opacity: "var(--glow, 0)",
          backgroundImage:
            "linear-gradient(to right, var(--color-brand-400) 1px, transparent 1px), linear-gradient(to bottom, var(--color-brand-400) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
          maskImage: `radial-gradient(${radius}px ${radius}px at var(--mx, 50%) var(--my, 50%), black, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(${radius}px ${radius}px at var(--mx, 50%) var(--my, 50%), black, transparent 70%)`,
        }}
      />
    </div>
  );
}
