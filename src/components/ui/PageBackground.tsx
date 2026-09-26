import { Blob } from "@/components/ui/Blob";
import { Orbit } from "@/components/ui/Orbit";
import { GridLines } from "@/components/ui/GridLines";

/**
 * One continuous backdrop for the whole light run of the page — hero through the
 * questions. Keeping the grid, the blobs and the rings in a single layer is what
 * stops a hard seam appearing wherever one section ends and the next begins.
 */
export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <GridLines size={84} radius={420} className="pointer-events-auto" />

      {/* Colour fields, spread down the whole run rather than per section. */}
      <Blob tone="brand" organic className="-left-40 -top-16 size-[42rem]" opacity={0.26} blur={90} />
      <Blob tone="sky" organic className="left-1/4 top-[6%] size-[26rem]" opacity={0.22} delay={-5} />
      <Blob tone="violet" organic className="-right-24 top-[9%] size-[34rem]" opacity={0.22} delay={-9} blur={90} />
      <Blob tone="brand" organic className="-right-44 top-[30%] size-[36rem]" opacity={0.2} delay={-3} blur={90} />
      <Blob tone="moss" organic className="-left-36 top-[44%] size-[30rem]" opacity={0.14} delay={-12} blur={90} />
      <Blob tone="violet" organic className="-right-36 top-[58%] size-[32rem]" opacity={0.18} delay={-6} blur={90} />
      <Blob tone="sky" organic className="-left-28 top-[72%] size-[28rem]" opacity={0.2} delay={-16} blur={90} />
      <Blob tone="clay" className="right-1/4 top-[86%] size-[24rem]" opacity={0.12} delay={-14} blur={90} />

      {/* Rings: quiet in the light theme, quieter still in the dark one. */}
      <Orbit className="-left-32 top-[4%] size-[34rem] opacity-70 dark:opacity-25" seconds={86} />
      <Orbit className="-right-40 top-[12%] size-[40rem] opacity-60 dark:opacity-20" seconds={104} reverse bead />
      <Orbit className="-left-40 top-[38%] size-[30rem] opacity-60 dark:opacity-20" seconds={74} bead />
      <Orbit className="-right-28 top-[62%] size-[26rem] opacity-70 dark:opacity-25" seconds={64} reverse />
      <Orbit className="-left-24 top-[84%] size-[22rem] opacity-60 dark:opacity-20" seconds={58} />
    </div>
  );
}

/**
 * The closing band. The call to action and the footer sit inside one element, so
 * nothing can show a seam between them.
 */
export function ClosingBand({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-brand-900 dark:bg-brand-950">
      {/* A wide, soft glow just inside the top edge: the band arrives without a
          grey veil over it and without a hard rule across the page. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-56 bg-[radial-gradient(120%_100%_at_50%_0%,rgb(74_110_229/0.55),transparent_70%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
