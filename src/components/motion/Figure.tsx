"use client";

import { useEffect, useRef } from "react";
import { tzs } from "@/lib/utils";

/**
 * A shilling amount (or plain count) that counts up the first time it is seen and
 * re-counts whenever the value changes — which is what makes switching tabs in the
 * product screens feel alive. It writes to the DOM node rather than holding state,
 * so it never re-renders the screen around it, and it renders the final number on
 * the server for anyone without JavaScript.
 */
export function Figure({
  value,
  money = true,
  short = true,
  suffix,
  className,
  duration = 700,
}: {
  value: number;
  money?: boolean;
  short?: boolean;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const format = (n: number) => (money ? tzs(n, { short }) : n.toLocaleString("en-US"));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const write = (n: number) => {
      el.textContent = format(n);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = value;
      write(value);
      return;
    }

    const begin = shown.current;
    let raf = 0;
    let start = 0;
    const run = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(begin + (value - begin) * eased);
      shown.current = n;
      write(n);
      if (p < 1) raf = requestAnimationFrame(run);
    };

    // Count where it is seen, not where it is mounted.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `format` is derived from these
  }, [value, duration, money, short]);

  return (
    <>
      <span ref={ref} data-figure className={className}>
        {format(value)}
      </span>
      {suffix ? <span className="ml-1 text-[0.8em] text-ink-muted">{suffix}</span> : null}
    </>
  );
}
