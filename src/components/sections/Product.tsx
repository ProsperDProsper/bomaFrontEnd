import { product } from "@/content/copy";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Blob } from "@/components/ui/Blob";
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
    <section id="product" className="relative overflow-hidden bg-paper-warm section-y">
      <Blob tone="brand" organic className="-left-44 top-[12%] size-[34rem]" opacity={0.24} blur={80} />
      <Blob tone="violet" organic className="-right-40 top-[42%] size-[32rem]" opacity={0.22} delay={-6} />
      <Blob tone="moss" organic className="-left-32 bottom-[8%] size-[28rem]" opacity={0.16} delay={-12} />
      <Blob tone="sky" className="right-1/4 bottom-[30%] size-[22rem]" opacity={0.2} delay={-17} />

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
                  <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f.title} className="border-t border-line pt-3">
                        <p className="text-[0.95rem] font-semibold text-ink">{f.title}</p>
                        <p className="mt-1 text-[0.88rem] text-ink-muted text-pretty">{f.body}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal y={26} stagger={0} className="min-w-0">
                  <ScreenBody />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
