import { Plus } from "@phosphor-icons/react/dist/ssr";
import { faq } from "@/content/copy";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/** Native <details>, so it works before hydration and keyboard users get it free. */
export function Faq() {
  const [before, after] = faq.lead.split("{phone}");
  return (
    <section id="questions" className="relative section-y">

      <div className="container-site relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="max-w-sm">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-brand-600">{faq.eyebrow}</p>
          <h2 className="mt-4 text-h2 text-ink text-balance">{faq.heading}</h2>
          <p className="mt-5 text-ink-muted text-pretty">
            {before}
            <a href={site.contact.phoneHref} className="link-underline font-medium text-brand-700">
              {site.contact.phone}
            </a>
            {after}
          </p>
        </Reveal>

        <Reveal as="ul" className="divide-y divide-line-soft" stagger={0.06}>
          {faq.items.map((item) => (
            <li key={item.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.02rem] font-medium text-ink transition-colors hover:text-brand-700">
                  {item.q}
                  <Plus
                    size={17}
                    weight="bold"
                    aria-hidden
                    className="shrink-0 text-ink-faint transition-transform duration-(--duration-ui) ease-(--ease-out-quart) group-open:rotate-45 group-open:text-brand-600"
                  />
                </summary>
                <p className="max-w-2xl pb-5 pr-8 text-[0.95rem] text-ink-muted text-pretty">{item.a}</p>
              </details>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
};
