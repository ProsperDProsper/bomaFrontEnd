"use client";

import { useState } from "react";
import { WhatsappLogo, Phone, SignIn } from "@phosphor-icons/react";
import { cta } from "@/content/copy";
import { site } from "@/content/site";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Blob } from "@/components/ui/Blob";

/** Closing band: ask for a demo, or pretend to sign in — this build has no backend. */
export function Cta() {
  const [tenant, setTenant] = useState("");
  const [touched, setTouched] = useState(false);

  return (
    <section id="start" className="relative overflow-hidden bg-brand-900 text-white section-y dark:bg-brand-950">
      <Blob tone="deep" organic className="-left-36 -top-24 size-[36rem]" opacity={0.5} darkOpacity={0.16} blur={95} />
      <Blob tone="violet" organic className="-bottom-44 right-0 size-[32rem]" opacity={0.3} darkOpacity={0.12} blur={95} delay={-7} />
      <Blob tone="sky" className="left-1/2 top-1/2 size-[24rem]" opacity={0.18} darkOpacity={0.08} blur={95} delay={-13} />

      <div className="container-site relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal className="max-w-xl">
          <h2 className="text-h2 text-white text-balance">{cta.heading}</h2>
          <p className="mt-5 text-lead text-band-muted text-pretty">{cta.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={site.contact.whatsappHref} external variant="onDark">
              {cta.primary}
              <WhatsappLogo size={18} weight="fill" aria-hidden />
            </ButtonLink>
            <a
              href={site.contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-pill border border-white/15 px-5 py-3 text-[0.95rem] font-medium text-white transition-colors hover:border-white/35 hover:bg-white/10"
            >
              <Phone size={16} weight="fill" aria-hidden />
              {site.contact.phone}
            </a>
          </div>
        </Reveal>

        <Reveal y={22}>
          <div className="rounded-panel border border-white/15 bg-white/5 p-6 backdrop-blur sm:p-8">
            <h3 className="font-display text-h3 text-white">{cta.signIn.heading}</h3>
            <p className="mt-1.5 text-[0.92rem] text-band-muted">{cta.signIn.body}</p>

            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                setTouched(true);
              }}
            >
              <label htmlFor="tenant" className="block text-[0.8rem] font-medium text-band-muted">
                {cta.signIn.label}
              </label>
              <div className="mt-2 flex items-center rounded-pill border border-brand-600 bg-black/20 pr-4 focus-within:border-brand-300">
                <input
                  id="tenant"
                  value={tenant}
                  onChange={(e) => setTenant(e.target.value.replace(/[^a-z0-9-]/gi, "").toLowerCase())}
                  placeholder={cta.signIn.placeholder}
                  autoComplete="off"
                  className="w-full bg-transparent px-5 py-3 text-[0.95rem] text-white outline-none placeholder:text-band-faint"
                />
                <span className="shrink-0 text-[0.9rem] text-band-faint">{cta.signIn.suffix}</span>
              </div>
              <Button type="submit" variant="onDark" className="mt-4 w-full">
                {cta.signIn.button}
                <SignIn size={16} weight="bold" aria-hidden />
              </Button>
              <p aria-live="polite" className="mt-3 text-[0.78rem] text-band-faint">
                {touched ? cta.signIn.demoNote : cta.signIn.note}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
