import { Buildings, UsersThree, DeviceMobile } from "@phosphor-icons/react/dist/ssr";
import { audience } from "@/content/copy";
import { Reveal } from "@/components/motion/Reveal";

const icons = [Buildings, UsersThree, DeviceMobile];

/** The quiet band between the workspace and the product detail. */
export function Audience() {
  return (
    <section aria-labelledby="audience-heading" className="border-y border-line bg-surface">
      <div className="container-site py-14">
        <Reveal>
          <h2 id="audience-heading" className="max-w-lg font-display text-h3 text-ink text-balance">
            {audience.heading}
          </h2>
        </Reveal>
        <Reveal as="ul" className="mt-10 grid gap-8 md:grid-cols-3" stagger={0.1}>
          {audience.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title} className="border-t border-line pt-4">
                <Icon size={22} className="text-brand-600" aria-hidden />
                <p className="mt-3 text-[0.98rem] font-semibold text-ink">{item.title}</p>
                <p className="mt-1.5 text-[0.9rem] text-ink-muted text-pretty">{item.body}</p>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
