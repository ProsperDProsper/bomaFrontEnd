"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll reveal. Direct children rise a few pixels as the block enters, staggered
 * when there is more than one. Transform and opacity only, and matchMedia drops
 * the whole thing for reduced motion.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 18,
  as: Tag = "div",
  selector = ":scope > *",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  as?: "div" | "section" | "ul" | "header";
  selector?: string;
}) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>(selector, scope.current);
        if (!targets.length) return;
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.7,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: scope.current, start: "top 82%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <Tag ref={scope as React.Ref<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
