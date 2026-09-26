"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Types a list of phrases, pauses, deletes, moves on. The first phrase is rendered
 * on the server, so the line never starts empty, and reduced motion keeps it there
 * without ever animating.
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
  const [text, setText] = useState(words[0]);
  const [typing, setTyping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let word = 0;
    let chars = words[0].length;
    let deleting = false;
    setTyping(true);

    const tick = () => {
      const current = words[word];
      chars += deleting ? -1 : 1;
      setText(current.slice(0, chars));

      let wait = deleting ? deleteMs : typeMs;
      if (!deleting && chars === current.length) {
        deleting = true;
        wait = holdMs;
      } else if (deleting && chars === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        wait = 260;
      }
      timer.current = setTimeout(tick, wait);
    };

    timer.current = setTimeout(tick, holdMs);
    return () => clearTimeout(timer.current);
  }, [words, typeMs, deleteMs, holdMs]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>{text}</span>
      {typing ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.08em] animate-[caret_1.05s_step-end_infinite] bg-current"
        />
      ) : null}
    </span>
  );
}
