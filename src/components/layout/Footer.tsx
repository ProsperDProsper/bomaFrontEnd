import Image from "next/image";
import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { fmt } from "@/lib/utils";

export function Footer() {
  const { footer, brand, contact } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-brand-100 dark:bg-brand-950">
      <div className="container-wide py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src={brand.logoSrc}
                alt=""
                width={109}
                height={115}
                className="h-7 w-auto brightness-0 invert"
              />
              <span className="font-display text-[1.35rem] font-semibold tracking-tight text-white">
                {brand.name}
              </span>
            </div>
            <p className="mt-4 text-[0.95rem] text-band-muted/90 text-pretty">{footer.statement}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-white/35 hover:bg-white/10"
              >
                <WhatsappLogo size={16} weight="fill" aria-hidden />
                {contact.whatsappLabel}
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-pill border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-white/35 hover:bg-white/10"
              >
                <Phone size={16} weight="fill" aria-hidden />
                {contact.phone}
              </a>
            </div>
          </div>

          <nav aria-label={footer.columnsLabel} className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
            {footer.links.map((l) => (
              <a key={l.href} href={l.href} className="link-underline w-fit text-[0.95rem] text-band-muted hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-band-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.legal}</p>
          <p>{fmt(footer.copyright, { year })}</p>
        </div>
      </div>
    </footer>
  );
}
