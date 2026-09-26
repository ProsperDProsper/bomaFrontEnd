import { Buildings, UsersThree, DeviceMobile, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { audience } from "@/content/copy";
import { Reveal } from "@/components/motion/Reveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { Blob } from "@/components/ui/Blob";
import { Orbit } from "@/components/ui/Orbit";
import { GridLines } from "@/components/ui/GridLines";

const icons = [Buildings, UsersThree, DeviceMobile];

/**
 * Bento: one tall card carries the heading, the three audiences sit around it in
 * cards of different weights. A pointer-reactive grid runs behind the whole thing.
 */
export function Audience() {
  return (
    <section aria-labelledby="audience-heading" className="relative overflow-hidden bg-surface section-y">
      <GridLines size={72} radius={340} />
      <Blob tone="brand" organic className="-left-32 top-0 size-[28rem]" opacity={0.18} />
      <Blob tone="violet" organic className="-right-28 bottom-0 size-[26rem]" opacity={0.18} delay={-8} />
      <Orbit className="-right-24 top-10 size-[22rem]" seconds={70} bead />
      <Orbit className="-left-16 bottom-4 size-[16rem]" seconds={54} reverse dashed={false} />

      <div className="container-site relative">
        <Reveal className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2" stagger={0.09}>
          {/* Heading tile spans the left column, two rows tall. */}
          <div className="relative overflow-hidden rounded-panel bg-brand-900 p-8 text-white lg:row-span-2 lg:p-10">
            <Blob tone="deep" organic className="-right-20 -top-16 size-[20rem]" opacity={0.55} blur={70} />
            <Blob tone="violet" organic className="-bottom-24 -left-10 size-[16rem]" opacity={0.3} blur={70} delay={-6} />
            <Orbit className="-bottom-20 -right-16 size-[18rem] border-white/15" seconds={64} />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-300">
                {audience.eyebrow}
              </p>
              <div>
                <h2 id="audience-heading" className="font-display text-h2 leading-[1.05] text-white text-balance">
                  {audience.headingLead}{" "}
                  <span className="block text-brand-300">
                    <Typewriter words={audience.headingWords} />
                  </span>
                </h2>
                <p className="mt-5 max-w-xs text-[0.95rem] text-brand-200/90 text-pretty">{audience.note}</p>
              </div>
            </div>
          </div>

          {/* The three audiences: first one wide, the other two side by side. */}
          {audience.items.map((item, i) => {
            const Icon = icons[i];
            const wide = i === 0;
            return (
              <article
                key={item.title}
                className={[
                  "group relative overflow-hidden rounded-panel border border-line bg-surface p-7 lift",
                  wide ? "lg:col-span-2" : "",
                ].join(" ")}
              >
                <span
                  aria-hidden
                  className="absolute -right-10 -top-10 size-28 rounded-full bg-brand-100/70 transition-transform duration-(--duration-slow) ease-(--ease-out-quart) group-hover:scale-125"
                />
                <div className="relative flex items-start justify-between gap-6">
                  <div className="max-w-md">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-600/10 text-brand-700 ring-1 ring-brand-200 transition-colors duration-(--duration-ui) group-hover:bg-brand-600 group-hover:text-white">
                      <Icon size={20} weight="duotone" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-h3 text-ink">{item.title}</h3>
                    <p className="mt-2 text-[0.92rem] text-ink-muted text-pretty">{item.body}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    aria-hidden
                    className="shrink-0 text-ink-faint opacity-0 transition-all duration-(--duration-ui) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600 group-hover:opacity-100"
                  />
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
