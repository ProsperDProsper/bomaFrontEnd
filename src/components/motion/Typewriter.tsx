"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Types a list of phrases, pauses, deletes, moves on. The first phrase is rendered
 * on the server so the line never starts empty, and the caret only appears once the
 * animation is actually running — under reduced motion nothing moves at all.
 * Text is written to the node directly, so the surrounding section never re-renders.
 */
export function Typewriter({
  words,
  className,
  typeMs = 58,
  deleteMs = 28,
  holdMs = 1900,
}: {
  words: readonly string[];
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    caretRef.current?.classList.remove("opacity-0");

    let word = 0;
    let chars = words[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = words[word];
      chars += deleting ? -1 : 1;
      el.textContent = current.slice(0, chars);

      let wait = deleting ? deleteMs : typeMs;
      if (!deleting && chars === current.length) {
        deleting = true;
        wait = holdMs;
      } else if (deleting && chars === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        wait = 260;
      }
      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, holdMs);
    return () => {
      clearTimeout(timer);
      caretRef.current?.classList.add("opacity-0");
    };
  }, [words, typeMs, deleteMs, holdMs]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span ref={textRef}>{words[0]}</span>
      <span
        ref={caretRef}
        aria-hidden
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.08em] animate-[caret_1.05s_step-end_infinite] bg-current opacity-0"
      />
    </span>
  );
}
