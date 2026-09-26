import { cn } from "@/lib/utils";

/**
 * Cal.com-style hairlines: two vertical rules down the edges of the content column
 * with a small cross at each corner. Structure, not decoration — they give the eye
 * an edge to sit against now that the sections share one background.
 */
export function FrameLines({ className, crosses = true }: { className?: string; crosses?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 hidden lg:block", className)}>
      <div className="container-site relative h-full">
        <span className="absolute inset-y-0 left-5 w-px bg-linear-to-b from-transparent via-line to-transparent md:left-10 xl:left-14" />
        <span className="absolute inset-y-0 right-5 w-px bg-linear-to-b from-transparent via-line to-transparent md:right-10 xl:right-14" />
        {crosses ? (
          <>
            <Cross className="left-5 top-10 md:left-10 xl:left-14" />
            <Cross className="right-5 top-10 md:right-10 xl:right-14" />
            <Cross className="bottom-10 left-5 md:left-10 xl:left-14" />
            <Cross className="bottom-10 right-5 md:right-10 xl:right-14" />
          </>
        ) : null}
      </div>
    </div>
  );
}

function Cross({ className }: { className?: string }) {
  return (
    <span className={cn("absolute -translate-x-1/2", className)}>
      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-line" />
      <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-line" />
    </span>
  );
}
