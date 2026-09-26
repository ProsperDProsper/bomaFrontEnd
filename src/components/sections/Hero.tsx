"use client";

import { useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, WhatsappLogo, HandTap } from "@phosphor-icons/react";
import { hero } from "@/content/copy";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, Ring } from "@/components/ui/Blob";

// WebGL only on the client, and only once the rest of the page is interactive.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

/** Reads the media query without an effect, so the server render stays "no preference". */
const motionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = motionQuery();
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => motionQuery().matches,
    () => false,
  );
}

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-hero-line] > span", { yPercent: 118, duration: 0.9, stagger: 0.09 })
          .from("[data-hero-eyebrow]", { opacity: 0, y: 10, duration: 0.5 }, 0.15)
          .from("[data-hero-brush]", { scaleX: 0, opacity: 0, duration: 0.7, transformOrigin: "left center" }, 0.7)
          .from("[data-hero-lead]", { opacity: 0, y: 14, duration: 0.6 }, 0.55)
          .from("[data-hero-cta] > *", { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, 0.7)
          .from("[data-hero-scene]", { opacity: 0, scale: 0.94, duration: 1.1, ease: "power2.out" }, 0.1)
          .from("[data-hero-foot]", { opacity: 0, duration: 0.6 }, 1);
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="top" className="relative overflow-hidden pt-(--header-h)">
      <Blob tone="brand" organic className="-left-40 -top-10 size-[40rem]" opacity={0.3} blur={80} />
      <Blob tone="sky" organic className="left-1/4 top-1/3 size-[26rem]" opacity={0.28} delay={-5} />
      <Blob tone="violet" organic className="-right-20 top-24 size-[34rem]" opacity={0.26} delay={-9} blur={85} />
      <Blob tone="clay" className="bottom-4 right-1/3 size-[20rem]" opacity={0.16} delay={-14} />
      <Ring className="-left-24 top-1/4 size-[30rem]" opacity={0.35} />
      <Ring className="-right-40 bottom-0 size-[36rem]" opacity={0.25} />

      <div className="container-site relative grid items-center gap-10 pb-16 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="max-w-2xl">
          <p
            data-hero-eyebrow
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface/80 px-3.5 py-1.5 text-[0.78rem] font-medium text-ink-muted backdrop-blur"
          >
            <span className="size-1.5 animate-[pulse-dot_2.6s_ease-in-out_infinite] rounded-full bg-moss-500" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-h1 text-ink">
            {hero.headline.map((line, i) => (
              <span key={line} data-hero-line className="block overflow-hidden pb-1">
                <span className="relative block">
                  {i === 0 ? (
                    <>
                      {line.replace("paid,", "")}
                      <span className="relative inline-block">
                        paid,
                        <span data-hero-brush className="absolute inset-x-[-4%] bottom-[0.06em] -z-10 block h-[0.3em]">
                          <Image
                            src="/brand/hero-brush-stroke.webp"
                            alt=""
                            fill
                            priority
                            sizes="20rem"
                            className="object-fill opacity-45 [filter:saturate(0.9)]"
                          />
                        </span>
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero-lead className="mt-6 max-w-lg text-lead text-ink-muted text-pretty">
            {hero.lead}
          </p>

          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={site.contact.whatsappHref} external variant="primary">
              {hero.primaryCta}
              <WhatsappLogo size={18} weight="fill" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#overview" variant="secondary">
              {hero.secondaryCta}
              <ArrowDown size={16} weight="bold" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <div data-hero-scene className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-10 -z-10 h-2/3 rounded-full bg-brand-200/40 blur-3xl"
          />
          <div className="relative aspect-4/3 w-full sm:aspect-square lg:-mr-10 lg:aspect-4/3 xl:-mr-20">
            <HeroScene reduced={reduced} />
          </div>
          <p
            data-hero-foot
            className="pointer-events-none mt-1 flex items-center justify-center gap-2 text-xs text-ink-faint lg:justify-end"
          >
            <HandTap size={14} aria-hidden />
            {hero.sceneHint}
          </p>
        </div>
      </div>
    </section>
  );
}
