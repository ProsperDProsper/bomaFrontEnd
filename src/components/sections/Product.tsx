import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { product } from "@/content/copy";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { RentalsScreen } from "@/components/screens/RentalsScreen";
import { StaysScreen } from "@/components/screens/StaysScreen";
import { ProjectsScreen } from "@/components/screens/ProjectsScreen";

const screens = {
  rentals: RentalsScreen,
  stays: StaysScreen,
  projects: ProjectsScreen,
} as const;

/** The three record types, each beside the screen you would actually use. */
export function Product() {
  return (
    <section id="product" className="relative section-y">

      <div className="container-site relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-brand-600">{product.eyebrow}</p>
          <h2 className="mt-4 text-h2 text-ink text-balance">{product.heading}</h2>
          <p className="mt-5 text-lead text-ink-muted text-pretty">{product.lead}</p>
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {product.sections.map((s, i) => {
            const ScreenBody = screens[s.id as keyof typeof screens];
            const flip = i % 2 === 1;
            return (
              <div
                key={s.id}
                id={s.id}
                className={cn(
                  "grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14",
                  flip && "lg:[&>*:first-child]:order-2",
                )}
              >
                <Reveal className="min-w-0 max-w-xl">
                  <p className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-brand-600">
                    <span className="size-1.5 rounded-full bg-brand-500" />
                    {s.kicker}
                  </p>
                  <h3 className="mt-4 text-h2 text-ink text-balance">
                    {s.heading.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-5 text-ink-muted text-pretty">{s.body}</p>
                  {/* Every feature is a card you can click through to getting started. */}
                  <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f.title} className="contents">
                        <a
                          href="#start"
                          className="group/f rounded-card border border-line bg-surface/70 p-4 transition-[transform,border-color,background-color] duration-(--duration-ui) ease-(--ease-out-quart) hover:-translate-y-0.5 hover:border-brand-300 hover:bg-surface"
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="text-[0.95rem] font-semibold text-ink">{f.title}</span>
                            <ArrowUpRight
                              size={14}
                              weight="bold"
                              aria-hidden
                              className="mt-0.5 shrink-0 text-ink-faint opacity-0 transition-all duration-(--duration-ui) group-hover/f:-translate-y-0.5 group-hover/f:translate-x-0.5 group-hover/f:text-brand-600 group-hover/f:opacity-100"
                            />
                          </span>
                          <span className="mt-1 block text-[0.86rem] text-ink-muted text-pretty">{f.body}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal y={26} stagger={0} className="min-w-0">
                  <div className="group/screen">
                    <ScreenBody />
                    {/* The screen itself stays interactive, so the link sits under it. */}
                    <a
                      href="#start"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-pill px-1 text-[0.85rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
                    >
                      {product.screenCta}
                      <ArrowUpRight size={14} weight="bold" aria-hidden className="transition-transform duration-(--duration-ui) group-hover/screen:-translate-y-0.5 group-hover/screen:translate-x-0.5" />
                    </a>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
